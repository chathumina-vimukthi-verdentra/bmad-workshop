---
run_id: 'framework-20261016-fullstack'
recovery_decision: 'fresh'
workflowStatus: 'completed'
setup_scope: 'framework'
setup_operation: 'create'
setup_entry: 'bmad-tea-framework'
ci_scope_answered: true
ci_scope_defaulted: false
framework_first_accepted: false
framework_reused: false
phase_status:
  framework: 'completed'
phase_checkpoints:
  framework: '{test_artifacts}/framework/framework-setup-progress.md'
contract:
  stack: 'fullstack'
  language: 'typescript'
  frameworks: ['playwright', 'vitest']
  toolchain: 'Node.js 24'
  package_manager: 'npm'
  lockfile: 'package-lock.json'
  install_commands: ['npm install', 'npx playwright install chromium']
  config_paths: ['playwright.config.ts', 'apps/api/vitest.config.ts']
  test_dir: 'tests'
  test_commands: ['npm test', 'npm run test:e2e']
  service_commands: ['npm run start -w apps/api', 'npm run dev:web']
  artifact_paths: ['test-results/', 'playwright-report/']
  test_surfaces: ['api', 'browser', 'unit']
  dependency_decisions:
    playwright_utils: 'accepted'
    pactjs_utils: 'not relevant, no consumer-provider boundary'
  integration_flags:
    tea_use_playwright_utils: true
    tea_use_pactjs_utils: true
    tea_pact_mcp: 'none'
---

# Setup run journal

Reference example of the journal `/bmad-tea-framework` keeps so a run can resume. The step-by-step record is in `framework-setup-progress.md` beside this file.
