# Appendix (optional): how BMad and TEA were installed

Workshop sample values, not real emission factors.

This is a demo and slide topic. It is not part of the live exercise. The `dev` and `qa` folders are already set up, so nobody needs to do any of this in the session.

## Warning: where these commands install

These commands install into the folder where you run them. BMad finds its project root as the nearest folder that holds `_bmad/`, starting from the folder you work in and moving up. Run them in a throwaway, empty copy, never in `dev` or `qa`. Check where you are first:

```bash
pwd
```

## What was done

The installs end with 43 skills in `.agents/skills`: 33 from BMad and 10 from the Test Architect module (TEA). The `_bmad/` folder holds the configuration and your answers. The `.agents/skills` folder is read by GitHub Copilot and other coding assistants.

### 1. Install BMad (terminal)

```bash
npx skills add bmad-code-org/BMAD-METHOD
```

The installer asks five questions. The answers used:

```text
Which skills: select all (the 33 BMad skills)
```

```text
Which agents: github-copilot
```

```text
Install scope: project
```

```text
Install method: copy
```

```text
Proceed: yes
```

### 2. Set up BMad (assistant chat)

BMad core asks no questions. It creates the `_bmad/` folder.

```text
bmad setup
```

If your chat only runs skills with a slash, type `/bmad setup` instead.

### 3. Install the Test Architect module (terminal)

```bash
npx skills add bmad-code-org/bmad-method-test-architecture-enterprise
```

It asks the same five questions. The same answers were used: select all skills (10 of them), github-copilot, project, copy, yes.

### 4. Set up the Test Architect module (assistant chat)

```text
bmad setup tea
```

It asks 13 questions. Each one shows a default. Keep 11 defaults and change 2:

| # | Question (short) | Default | Answer used |
|---|---|---|---|
| 1 | Where to store test artifacts | `{project-root}/_bmad-output/test-artifacts` | keep the default |
| 2 | Use Playwright Utils | `true` | keep the default |
| 3 | Use Pact.js Utils | `true` | keep the default |
| 4 | Use the SmartBear MCP for PactFlow or a Pact Broker | `mcp` | change to `none` |
| 5 | How to drive live browsers while generating tests | `auto` | keep the default |
| 6 | How to run multi-step generation | `auto` | keep the default |
| 7 | Check what the tool supports first | `true` | keep the default |
| 8 | Project type | `auto` | change to `fullstack` |
| 9 | Test framework | `auto` | keep the default |
| 10 | Run generated tests during Create | `true` | keep the default |
| 11 | Repair defects in generated tests | `true` | keep the default |
| 12 | Repair rounds, 0 to 3 | `3` | keep the default |
| 13 | Use browser evidence tools to diagnose failures | `true` | keep the default |

The answers are saved in `_bmad/config.toml`, in a `[modules.tea]` block.

### 5. Set the active initiative (assistant chat)

```text
bmad set the active initiative to initiative-fac-factor-library
```

This writes `_bmad/custom/config.user.toml`. In this workshop that file is committed, so everyone works on the same initiative. For that, the line `*.user.toml` was deleted from `_bmad/custom/.gitignore`. BMad may then say the custom folder is "unprotected". That is expected here.

### 6. Compare an install with the reference (terminal)

From inside `dev` or `qa`:

```bash
../scripts/check-install.sh .
```

It compares each skill's hash in `skills-lock.json` with `scripts/baseline-skills-lock.json` and prints `OK` or the skills that drifted. A drift means a different version of BMad or TEA, and the reference output can then differ from what you see.

Back to the [README](README.md).
