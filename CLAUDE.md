# CLAUDE.MD

## Project Overview

**betk-publishing** is a static web UI for browsing Finnish precast concrete element data following the BETK (2.0) standard. It presents a hierarchical catalog of precast products and their associated IFC (Industry Foundation Classes) properties, giving engineers and designers a standardized way to inspect building product data.

### Tech Stack

- **Framework**: Astro 6 (static site generation)
- **Language**: TypeScript
- **Data**: JSON files derived from Excel source data (`BETK propertyt.xlsx`)
- **Data pipeline**: Python scripts to convert excel to json. User runs manually.
- **Runtime requirement**: Node.js >= 22.12

### Architecture

- **Build-time data loading** via `loader.ts` — indexes properties and builds the product tree
- **Three-level hierarchy**: Koodisto (catalog) → Pääryhmä (main group: pre-stressed / reinforced) → Alaryhmä (subgroup: beams, slabs, walls, etc.)
- **Key components**: ProductTree, ProductRow, DetailModal (property inspector), Sidebar
- **Output**: Static HTML deployed to GitHub Pages

### Original scope & Data

- **65 products**, **133 properties** (current PRECAST scope)
- Other product types (e.g. steel, wood) will get separate JSON files later
- BEC is the legacy 1.0 format; BETK is the active 2.0 format used here

## Core Principles

- **Minimal scope**: Keep each change small, touch only what's necessary, don't bundle unrelated work or introduce side effects.
- **No laziness**: Find root causes. No temporary fixes. Senior developer standards.

## Project layout

- **Plans** ALWAYS go to `.modus/plans/<plan-name>.md`. Even if a skill or plugin defaults to some other location.
- **Tasklists** go to `.modus/tasks/<tasklist-name>.md`. They will be archived when done or discarded.
- **Scripts** go to `.modus/scripts/[name_of_script]`.
- **Lessons** go to `.modus/lessons.md`
- **Issues** go to `.modus/issues.md`

If a skill tries to write to a different path, redirect the output here. Do not create parallel directories outside `.modus/`.

## Planning

### Plan mode

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately; do not keep pushing a broken approach
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity
- **Subagent budget (required line in every plan)**: N Haiku for X, N Sonnet for Y, and for each Opus agent a one-sentence justification per "Opus is for" in Delegation
- **Hard cap: 2 Opus subagents per session.** If the work seems to need more, stop and re-plan — don't spawn past the cap
- Plans saved to disk go to `.modus/plans/<descriptive-name>.md`

### Phased execution

- Never attempt multi-file refactors in a single response
- Break work into explicit phases; each phase touches no more than 5 files
- Complete the phase, verify, wait for user approval
- A phase is a human-approval gate — distinct from subagent scope in Delegation
- If a phase's scope grows mid-execution, stop and re-plan before continuing

## Tool discipline

### File read budget

- Each file read is capped at 2000 lines
- For files >500 LOC, read in chunks using offset/limit
- Never assume you have seen a complete file from a single read

### Output integrity

- Tool results over 50000 characters are silently truncated to a 2000-byte preview
- If any search or command returns suspiciously few results, re-run with narrower scope (single directory, stricter glob)
- **Artifact sanity check**: when a tool or subagent returns an artifact (SQL, function body, config, code), verify it's structurally complete — matched braces/parens, terminators, no mid-line cutoff. If clipped, re-fetch verbatim with explicit bounds, or use a direct Read instead of a subagent summary
- **Subagent contract**: when asking a subagent to return an artifact, require it verbatim and require it to flag any truncation — never accept a paraphrase or summary as the artifact
- When you suspect truncation, log it in `.modus/issues.md`

### Exhaustive search

- You have grep, not AST

- When renaming or tracing any identifier, search separately for every surface form it can appear in (filenames, definitions, references, config keys, cross-reference artifacts, any project-specific linking syntax)

- Do not assume a single grep caught everything

### Edit integrity

- Before every file edit, re-read the file
- After editing, read it again to confirm the change applied correctly
- The edit tool fails silently when old_string doesn't match due to stale context
- Never batch more than 3 edits to the same file without a verification read

## Delegation

### Subagent strategy

- **Two goals, in tension**: keep the main context clean AND minimize total token spend across all agents — spawning has a cost
- **Spawn when**: output would be noisy (broad searches, large file reads, multi-file exploration), 2+ independent queries can run in parallel, or the task touches > 5 independent files — spawn multiple agents, max 5 files each
- **Skip when**: target is known (exact path or symbol), result would already be short, or spawn cost exceeds context saved — use the direct tool instead
- **One task per subagent** for focused execution
- **Parallelize**: independent spawns go in a single message so they run concurrently, not sequentially
- **Brief tightly**: self-contained prompt with goal, prior context, and exact scope — don't make the agent re-explore what you already know
- **Cap output**: ask for summaries, not transcripts ("under 200 words", "file:line references only")
- **Don't delegate synthesis**: if you already know what needs doing, don't ask the agent to decide
- **Default model**: Haiku. Swarm freely
- **Opus is for**: multi-step reasoning across unfamiliar code, architectural tradeoffs, or non-trivial debugging Haiku or Sonnet has already failed at once — never for file reads, searches, summaries, or straightforward edits. Before spawning Opus, state which criterion applies; if none fits, use Haiku or Sonnet

## Completion

### Verification before done

- Never mark a task complete without verifying it accomplishes what was planned
- Diff behavior between main and your changes when relevant
- Ask yourself "Would a senior engineer approve this?"
- Run tests, check logs, demonstrate correctness

### Senior dev override

- If code or docs are flawed, inconsistent, or duplicated, fix structurally — don't paper over
- For non-trivial changes, pause and ask "is there a more elegant way?" and "would a senior engineer reject this?"
- For trivial fixes (typos, one-line bugs, obvious corrections), make the fix directly — don't invent refactors or over-engineer
- Challenge your own work before presenting it

## Hygiene

### Self-improvement

- Log a lesson when a correction reveals a rule you'd want to follow on future tasks, or when the same correction appears twice. One-off nits don't need to be logged
- Write rules for yourself that prevent the same mistake — concrete triggers, not aspirations
- If the same correction recurs after logging, tighten the rule (narrower trigger, stronger wording) rather than adding a duplicate
- Review `.modus/lessons.md` at session start when the harness loads it into context; if not loaded, read it before starting non-trivial work

### Tool improvement and safety

- Never run scripts automatically
- Save needed scripts to `.modus/scripts/` for review
- **Installations**: Never install python, npm or cargo packages automatically

## Task runbook

Skip this runbook for trivial work — one-line fixes, typos, obvious corrections. It applies to non-trivial tasks only.

1. **Plan First**: Write a plan and a tasklist with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to the feature's tasklist
6. **Capture Lessons**: Update `.modus/lessons.md` after correction
