# Reconstruction recipe: VGamer1991 Boredom Emergency Arcade 2.0

If a future AI model, platform, or conversation loses the arcade context, **give it this document and `index.html`**. The working source is the authoritative reference. This document explains the requested behaviour and the original ChatGPT integration so the design can be re-created without guesswork.

## Purpose

Create a **usable interactive arcade**, not a picture, a mock-up, a list of game ideas, or an indefinitely continuing story. Its style is absurd, witty, playful, welcoming, and inspired by VGamer1991 Studios, cats, retro computers and the Sunshine Island characters. The experience should work on a phone and a desktop.

## Navigation and core state

The landing experience shows **two selectable games at a time**, drawn from these three pairs:

1. Angel's Memory Heist / Cloakster Cipher Lock
2. Nap Credit Audit / GOATMaster Boot Doctor
3. Sunshine Island Crisis Desk / Honk Signal Memory

The button **Give me TWO DIFFERENT games** advances the pair in a loop (1→2→3→1) and starts the first game in the new pair. Both cards allow direct selection. **Replay** resets the current game with a fresh board, code, randomized challenge or event order.

Each game has an explicit `result` state (`win`, `lose`, or not finished). At completion it displays a real ending and offers Play Again and Another Pair buttons. Replay and rotation remain available; the user is never trapped in a game or story.

## Game mechanics

### 1. Angel's Memory Heist
- Eight face-down cards in four pairs: 🐈‍⬛, 🪿, 💾, 🎹.
- Two clicks reveal two cards. A matched pair stays exposed, unmatched pair stays exposed until the next card is selected, then hides.
- Four matched pairs = win; track mismatches; randomize every run.

### 2. Cloakster Cipher Lock
- Secret code is **three distinct digits from 1–5**.
- Six guesses allowed. After each guess return number of digits correctly placed and number of correct digits incorrectly placed.
- Exact match = win; six unsuccessful guesses = lose; randomize secret each run.

### 3. Nap Credit Audit
- Five invoices per session chosen from a pool of funny named accounts.
- Each invoice is residents × rent-per-resident + fine.
- Show four possible numerical answers. Four or five correct out of five = win, otherwise lose.
- Provide actual correct total after an error and require Next Invoice before proceeding.

### 4. GOATMaster Boot Doctor
- Choose from four themed VM repair missions, each with a strictly ordered set of four steps and an explanatory clue.
- Players tap repair operations in sequence. Wrong operation resets step progress and counts as a mistake.
- Three mistakes = lose; all four correct steps = win.

### 5. Sunshine Island Crisis Desk
- Four randomly chosen crises, each with a cheap and expensive solution.
- Initial repair budget = six tokens; initial stability = zero.
- Cheap option costs zero and awards one stability. Proper fix costs two tokens and awards three stability.
- Reach ten stability by the fourth crisis = win; otherwise lose. Show the consequence of each choice.

### 6. Honk Signal Memory
- Three sequences of increasing length (3, 4, 5), using four symbols.
- Show the sequence during study phase; user can hide it and repeat via buttons.
- Incorrect signal counts as a mistake and returns to study phase for the current sequence.
- Three mistakes = lose; all three sequences reproduced = win.

## Game Factory and expanding the arcade

The original in-chat arcade used a **host interaction**, not a permanently self-editing codebase. Its source-authored buttons called `GenUI.issueNewTurn(prompt)` to send a new message to ChatGPT. That new turn could generate a totally new Intelligent UI game. The buttons did not insert additional game code into the prior message or permanently modify a standalone HTML program.

In the saveable edition, a **copyable prompt** plus **Open ChatGPT** link replaces this host-only action. Those exact prompts are in `GAME_FACTORY_PROMPTS.md` and are editable in the `PROMPTS` object in `index.html`. Don't claim they work offline or mutate `index.html`.

When asked to create **two new games**, use different mechanics from the existing six and provide real, interactive controls and game-end logic, never a description-only response. For long-term archiving, offer a standalone source file as well.

## Story engine: avoiding the original bug

The initial Sunshine Island story became effectively nonterminating because each episode ended with `three more choices` and each choice's action requested another episode with three more choices. It had no finite end condition.

In future adventures:
- Declare a finite episode limit **up front** (default four).
- Name the win condition/objective by Episode 1.
- Give three choices at the end of each **non-final** episode only.
- The final episode resolves the conflict and offers an epilogue and **THE END**; it must not automatically demand three more choices.
- Starting a sequel is a **separate deliberate choice**, not a hidden continuation.

## Source and fidelity caveat

`index.html` is the **complete source for the saveable browser version** and recreates the game mechanics and expansion recipes of Arcade 2.0. It is not a byte-for-byte dump of OpenAI's private Intelligent UI client, server code, browser runtime or earlier hidden state. Do not infer or fabricate those unavailable components. The original source-authored component markup is in the assistant's Arcade 2.0 response in the originating conversation.

## One-paragraph restart prompt

> Rebuild my VGamer1991 Boredom Emergency Arcade based on the attached `index.html` and `REBUILD_RECIPE.md`. Create a genuinely playable, attractive interactive arcade (not an illustration or a list of ideas) with two rotating mini-games visible at a time, six fully implemented starter games with the exact mechanics described, replayable randomized variations, clear victories/losses, and an explicit ability to request two new *playable* games through ChatGPT. Don't confuse requesting games from GPT-6 with permanently adding them to a standalone browser file. Preserve the ability to export/save the source. Interactive stories MUST end within a declared finite episode limit; no infinite three-choice recursion. Show me the working result and provide full source files for backup.