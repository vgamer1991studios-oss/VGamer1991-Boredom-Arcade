# Play Arcade 2.0 — public deployment and verification

Play directly in your browser: https://vgamer1991-boredom-arcade.vgamer1991.chatgpt.site/

Verified October 10, 2026, in the published site using Chrome browser controls. No sign-in was required. This deployment uses ChatGPT Sites; the expected GitHub Pages URL returned HTTP 404 during setup. GitHub Pages administration is not exposed by the connected GitHub tools, and the browser had no signed-in GitHub session.

## Original publication: edition and preservation

This is the standalone, saveable **Arcade 2.0 Source Edition**, an independent recreation. The original in-chat Intelligent UI's hidden implementation was never recovered. This deployment does not claim to recover or export it.

The deployed index.html is byte-identical to the repository file at commit 67e7e5e20c290c5f51c949e9ebe71de4ed517daf. SHA-256: ffa77bf8aa7f4c6a2754712d09d3e1fcfba2271957bc2aedce6ea6a0c7a24615.

index.html, README.md, REBUILD_RECIPE.md and GAME_FACTORY_PROMPTS.md were preserved unchanged. This verification document is an additional file. The public host also serves those four unchanged files.

## Browser-tested paths

| Game | Reachable ending exercised | Replay |
| --- | --- | --- |
| Angel's Memory Heist | Matched all four pairs after four mismatches; YOU WIN | Play again cleared all matches and mismatches |
| Cloakster Cipher Lock | Deduced code from visible clues and won in three guesses; a separate run exhausted six guesses and lost; repeated-digit input rejected | Play again reset guesses; header Replay also exercised |
| Nap Credit Audit | Five correct invoices produced 5/5 victory; five incorrect invoices produced 0/5 defeat; Next Invoice/See result controls exercised | Play again reset invoice index and score |
| GOATMaster Boot Doctor | Four ordered steps won; three incorrect steps lost | Play again reset progress and mistakes |
| Sunshine Island Crisis Desk | Three proper fixes plus one cheap fix won at 10 stability; four cheap fixes lost at 4; proper fix disabled at zero budget | Play again restored six tokens and zero stability |
| Honk Signal Memory | Repeated sequences of lengths 3, 4 and 5 to win; three wrong signals lost | Play again reset transmission and mistakes |

Angel's Memory Heist intentionally has no normal loss condition or turn cap: its finite objective is four pairs. The other five games have explicit defeat paths. Replay is optional and starts a separate run.

## Shared controls and saves

- All three pairs and both game selections exercised; pair rotation returned from pair 3 to pair 1.
- Reload restored the selected Honk cartridge and its displayed sequence.
- Export save downloaded a JSON file. After changing cartridges, Import save restored that exported Honk run and displayed the success message; the restored gameplay text matched the pre-export state.
- All games use embedded CSS and JavaScript without external script or stylesheet dependencies.

## Verification limits

These checks cover the listed browser paths, not every randomized scenario or every device/browser. iOS Safari, exhaustive save-file validation, offline local-file execution and all Game Factory helper interactions were not browser-tested in this pass. Normal gameplay required no code repairs. Published source and reconstruction documents remain available in this repository.

## Mobile usability audit — October 10, 2026

### Confirmed findings and repairs

- Desktop Chrome measured secondary controls (Play this, Replay, Export save, Import save) at 35.94 CSS pixels high. Buttons now have a minimum 44 × 44 CSS-pixel target and touch-action: manipulation; zoom remains enabled.
- The old validator accepted {pair:0,slot:0,plays:0,game:{id:0}}. Source regression reproduced import persisting this incomplete state before rendering failed. Imported saves now receive cartridge-specific shape checks, render before persistence, and retain previous progress on rejection. Invalid local saves fall back to a fresh run. This is structural validation, not exhaustive protection against every fabricated game state.
- Storage failures were silently ignored. They now produce a visible warning to export before leaving; an import without storage succeeds for the current session with an explicit warning.
- Save feedback formerly appeared in the Game Factory panel. It now appears beside the save controls, with polite live announcements and iPhone Files guidance.

### Preventive mobile improvements (not reproduced Safari defects)

Grid tracks allow shrinking, headers and stats wrap, and cards stack at 380 pixels or narrower. Four-column memory and signal controls remain intact. Form text is at least 16 CSS pixels to reduce an iOS focus-zoom risk. Download object URLs are retained for 60 seconds rather than one second to give file handling more time. The JSON envelope, format marker, storage key and game fields are unchanged; no new game or ending was added.

### Checks performed

- Live desktop Chrome: measured targets, selected Cipher, entered repeated digits (rejected), and rotated to the next pair.
- Node source regression with minimal DOM/storage doubles: six victories, five defeats (Memory has no loss path), replay, save round-trips for all six active cartridges and their victory states, rejection of incomplete game data and malformed JSON without progress loss, storage-denied import and export-request construction. Baseline import corruption was reproduced separately. Run: node tests/source-regression.cjs index.html [optional-path-to-original-index.html].
- Syntax execution and source regression passed on the changed HTML. These doubles do not prove layout, touch events, native downloads, file chooser behavior or Safari compatibility.

### Remaining verification limits and iPhone checklist

Only desktop Chrome browser control is exposed in this session. No supported viewport resize/touch emulation, WebKit runtime or actual iPhone Safari testing was available. Managed preview browser tooling is unavailable, so no local browser preview was run. Narrow-screen layouts have been reviewed in CSS, not rendered at mobile widths in this pass.

On a real iPhone, check portrait widths around 320/375/390/430 CSS pixels, landscape, text enlargement and pinch zoom. Check all six games for clipped text, horizontal scrolling, reachable controls, accidental repeat actions and endings/replay. In Cipher, check the numeric keyboard and submit button. Export to Files, switch cartridges, import that same JSON, verify restored state, and select the same file again. Test a canceled picker, malformed JSON, browser reload and any private/storage-restricted mode used. Confirm that import errors keep current progress and that save feedback is visible. In-app browsers may handle downloads differently; test Safari itself before calling it Safari-verified.

Potential iOS risks still unverified: native download versus JSON preview, Files picker behavior, delayed file reads, storage eviction/restrictions, keyboard viewport changes, font/emoji sizing and actual touch targeting. No actual iPhone Safari compatibility claim is made.

Changed index.html SHA-256: 78a1b274164a89c09535bff44784f091263158ae2d02ee32d3b9406529932844. The byte-identical and unchanged-source statements above describe the original publication, not this later repaired edition.

### Post-publication desktop checks

The repaired edition was published to the same public address on October 10, 2026 (America/Toronto). Live Chrome measured the formerly small controls at 44 CSS pixels high. Export downloaded a JSON file; after switching from Nap Credit Audit to Sunshine Island, importing it restored the prior Audit gameplay text exactly. Re-importing the same file succeeded. An incomplete Memory save was rejected with visible feedback while preserving the current Audit state. Reload restored that state exactly. These checks are desktop Chrome checks, not mobile Safari or touch-emulation checks.
