# Pre-work message (copy and send before the session)

**Subject:** Carbon Hub BMad workshop: 10 minutes of setup before we start

Hi all,

We run a hands-on session on the BMad Method with GitHub Copilot in VS Code. You work on a small slice of Carbon Hub, in one of two tracks: Developer (build, walk through and review a ticket) or QA (set up and write tests with the Test Architect). All emission factor numbers are fictional sample values. To save time on the day, please do the one-time setup below beforehand. It takes about 10 minutes and about 1 GB of disk.

**Checklist before you start**

- [ ] Node 20 or later (Node 24 LTS is best) and npm
- [ ] git, with your name and email set
- [ ] uv (a small Python tool runner). Install with `pip install uv`, or `brew install uv` on a Mac
- [ ] VS Code with the GitHub Copilot Chat extension, and Copilot access on your account
- [ ] About 1 GB of free disk space and an internet connection

**What to do**

1. Clone the repository or unzip it to a short path, for example `C:\bmad` on Windows or `~/bmad` on Mac and Linux. Keep all the folders together.
2. Open a terminal in that folder.
3. Run the single setup command.

Mac, Linux, Git Bash or WSL:

```bash
./scripts/setup.sh
```

Windows, cmd or PowerShell:

```bat
scripts\setup.cmd
```

**How to know it worked**

The last line printed is: `Ready. Open dev or qa in VS Code.`

If a tool is missing, the script stops and tells you what to install. Install it, open a new terminal and run the same command again. It is safe to run more than once.

**On the day**

You pick your track: Developer or QA. In VS Code use File > Open Folder and choose the `dev` or `qa` folder itself, not the folder above it. Then read `TRACK.md` in that folder. There is nothing else to install.

**If it fails**

Send a screenshot or the text of the terminal to [Presenter name], at [email or chat handle], before the session if you can.

See you there.
[Presenter name]
