@echo off
rem Usage: scripts\setup.cmd   (run once, from the repository folder, in cmd or PowerShell)
rem Checks your tools, installs the shared packages at the repository root, installs the
rem Playwright browser and runs a smoke test. Safe to run again.
rem It never installs a tool for you. If one is missing it tells you how to get it.
rem NOTE: written for Windows but not tested on Windows by the author.
setlocal enableextensions
cd /d "%~dp0.."

echo Checking your tools

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Stop: Node is not installed or not on your PATH.
  echo   Install Node 24 LTS from https://nodejs.org ^(Node 20 or later works^).
  echo   Then open a new terminal and run this script again.
  exit /b 1
)
set "NODEMAJOR="
for /f "usebackq delims=" %%v in (`node -p "process.versions.node.split('.')[0]"`) do set "NODEMAJOR=%%v"
if not defined NODEMAJOR (
  echo.
  echo Stop: could not read the Node version.
  exit /b 1
)
if %NODEMAJOR% LSS 20 (
  echo.
  echo Stop: Node 20 or later is needed. You have major version %NODEMAJOR%.
  echo   Install Node 24 LTS from https://nodejs.org, then run this script again.
  exit /b 1
)
echo   node found, major version %NODEMAJOR%

where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo Stop: npm is not installed or not on your PATH.
  echo   npm comes with Node. Reinstall Node from https://nodejs.org.
  exit /b 1
)
echo   npm found

where git >nul 2>nul
if errorlevel 1 (
  echo.
  echo Stop: git is not installed or not on your PATH.
  echo   Install git from https://git-scm.com/downloads, then run this script again.
  exit /b 1
)
echo   git found

where uv >nul 2>nul
if errorlevel 1 (
  echo.
  echo Stop: uv is not installed or not on your PATH. The BMad skills call it.
  echo   Any system with Python: pip install uv
  echo   Official installer: see https://docs.astral.sh/uv/getting-started/installation/
  echo   Then open a new terminal and run this script again.
  exit /b 1
)
echo   uv found

where code >nul 2>nul
if errorlevel 1 (
  echo   Warning: the 'code' command was not found. You can still open the folders from VS Code itself.
) else (
  echo   VS Code command 'code' found
)

echo.
if exist "node_modules\vitest" if exist "node_modules\@playwright\test" if exist "node_modules\vite" (
  echo Packages are already installed at the repository root. Skipping npm install.
  goto browser
)
echo Installing packages at the repository root. This takes a few minutes.
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo Stop: npm install failed. Check your internet connection and run this script again.
  exit /b 1
)

:browser
echo.
echo Installing the Playwright browser ^(Chromium^). Already installed browsers are skipped.
call npx playwright install chromium
if errorlevel 1 (
  echo.
  echo Stop: the Playwright browser install failed. Check your internet connection and run this script again.
  exit /b 1
)

echo.
echo Smoke test: running the tests of the qa folder
pushd qa
call npm test
set "SMOKE=%errorlevel%"
popd
if not "%SMOKE%"=="0" (
  echo.
  echo Stop: the smoke test failed. Send the output above to the presenter.
  exit /b 1
)
echo   PASS

echo.
echo Ready. Open dev or qa in VS Code.
endlocal
