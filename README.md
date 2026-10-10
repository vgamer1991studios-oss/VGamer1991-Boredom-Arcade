# VGamer1991 Boredom Emergency Arcade 2.0 — Saveable Source Edition

This folder is the **sauce**: an actual, readable implementation and the exact request recipes for extending it.

## Play it

Open `index.html` in a modern browser. The six built-in games work **offline** without a server, an API key, installations, or third-party packages. On Windows you can double-click `index.html`; on iPhone or iPad you may need to open it with a browser or serve the file from a local or hosted file location, as iOS file-preview behaviour varies.

The entire HTML, CSS and JavaScript source is included *inside `index.html`*. Use any code editor to inspect or modify it. The same file can be copied for safekeeping.

## Features

- Six fully playable games across three rotating pairs.
- A **TWO DIFFERENT games** button cycles the pairs.
- **Replay** restarts the selected game with a fresh randomized puzzle or scenario.
- All games have explicit victory/defeat conditions. No unbounded story loops.
- Four ChatGPT expansion recipes, visible in the Game Factory area and separately stored in `GAME_FACTORY_PROMPTS.md`.
- Automatic best-effort browser-local progress saves, plus manual **Export save** and **Import save** in JSON format.

## Important: original ChatGPT Intelligent UI vs this file

The original Arcade 2.0 displayed in the conversation was built using ChatGPT's interactive message components and in-message state. Its **Game Factory** buttons made `GenUI.issueNewTurn(...)` calls to request games *in ChatGPT*. Those components and their rendering runtime are not an ordinary stand-alone website.

`index.html` is an independently written, **fully functional browser implementation of the same six game designs**, not a byte-for-byte export of ChatGPT's proprietary Intelligent UI renderer. It does not contain ChatGPT's platform internals and cannot invoke GPT-6 autonomously while offline. Instead, the **Copy prompt** and **Open ChatGPT** controls provide the exact expansion requests for generating new games in conversation. That difference is deliberate and visible.

The original UI source/logic remains visible in the previous Arcade 2.0 assistant message in this conversation. This archive makes the gameplay portable without relying on reconstructing a hidden UI component later.

## Game source map

Open `index.html` and search for these function names:

| Game | Logic |
| --- | --- |
| Angel's Memory Heist | `memoryView`, `flipCard` |
| Cloakster Cipher Lock | `cipherView`, `guess` |
| Nap Credit Audit | `auditView`, `audit`, `auditNext` |
| GOATMaster Boot Doctor | `bootView`, `boot` |
| Sunshine Island Crisis Desk | `crisisView`, `actCrisis` |
| Honk Signal Memory | `honkView`, `signalTap` |

The global source-inspection helper `window.VGamerArcade.getState()` returns a copy of the current state. `window.VGamerArcade.newRun()` starts a fresh puzzle. `window.VGamerArcade.nextPair()` loads the next two cartridges.

## How to extend the real arcade

Ask ChatGPT to create new playable games via a Game Factory prompt. To keep them as files rather than only in ChatGPT, select **A new saveable offline game** and ask for a self-contained HTML file with source. You can retain separate files or ask for a merged Arcade 3.0.

## What is and isn't preserved

Preserved: game rules, themed text, working controls, full gameplay logic, data, victory/defeat conditions, replayability, game-factory prompt recipes, and a file you can back up.

Not claimed: byte-identical capture of ChatGPT's platform runtime or private/internal system code; unexposed generated assets from earlier conversations; the ability to run GPT-6 in an offline browser.

## Version

- 2.0-source-edition (2026-10-10)
- Zero network dependencies for built-in games
- License: This edition is provided for your own editing and reuse.