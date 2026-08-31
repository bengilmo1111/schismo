# Schismo art direction: The Divergence Machine

**Status:** proposed direction  
**Reviewed:** 1 September 2026  
**Scope:** the live application at `https://schismo.vercel.app/` and the current `main` branch

## North star

> **A playful public-science exhibit about how people pull one another apart.**

Schismo should feel like a machine you can poke, not an essay you have to study. The visual
language is a 1970s science museum exhibit crossed with a tabletop strategy game: bold,
tactile, kinetic, slightly mischievous, and very clear about what is data and what is
decoration.

The proposed internal name for the language is **The Divergence Machine**.

It should make people want to try one more mechanism or seed. It must not make polarisation
look desirable, turn real social conflict into a joke, or weaken the app's unusually careful
distinction between a simulated pattern and a claim about the world.

## The break from the current look

The live app has a strong argument and an effective reveal. Its visual treatment currently
uses nearly every ingredient of the recognisable “Claude demo” look:

- a narrow cream paper column;
- Georgia headings paired with small system-sans text;
- muted burgundy, navy and olive;
- hairline grey rules and two-pixel corner radii;
- quiet rectangular buttons;
- charts that visually merge into the page; and
- a lot of low-contrast, 11–13 px explanatory copy.

That treatment says *thoughtful editorial note*. Schismo needs to say *hands-on social
physics*. This direction explicitly replaces the parchment, serif restraint and tiny grey UI
with saturated colour, chunky type, dark instrument panels, thick edges, physical controls and
much stronger hierarchy.

### Keep

- The four-act teaching structure.
- The “pattern is not the mechanism” reveal.
- The honest language about fitting, arbitrary units and caricature.
- The actual people, ties, newcomers and ghost runs in the visualisations.
- The sparse, dependency-free implementation and the existing CSS-variable colour pipeline.

### Change

- Treat the page as a sequence of experiment bays rather than one long article.
- Make the simulation the visual hero and move supporting prose out of its way.
- Make controls feel touchable and consequences feel immediate.
- Give Group A, Group B, common ground, intervention and rupture distinct visual identities.
- Separate the guided story from the advanced laboratory more decisively.
- Raise functional type sizes and touch targets substantially.

## Personality

Schismo is:

- **curious, not academic**;
- **energetic, not frantic**;
- **playful, not cute**;
- **bold, not shouty**;
- **mechanical, not corporate**; and
- **honest, not solemn**.

Fun comes from prediction, motion and consequence. It does not come from mascots, confetti,
emojis or jokes about the people being modelled.

## The central visual metaphor: split and tether

Everything starts as a pair.

- Two tokens begin near one another.
- Threads, arrows or an elastic band show their relationship.
- A mechanism stretches, rewires, amplifies or cuts those connections.
- Space opens between the tokens.
- Shared ground is a visible third state, not empty background.

This motif should appear in the wordmark, section dividers, group chips, charts, icons and
loading/empty states. It is decorative only when no data is being encoded. Inside a chart,
position, colour, shape and line style keep their precise meanings.

## The experience arc

| Stage | Desired feeling | Visual move | Primary action |
|---|---|---|---|
| 1. The mystery | Curiosity | One neutral line on a dark plot board | Make a prediction |
| 2. The reveal | Surprise | The single line “unzips” into three matching curves with different crowds underneath | Replay the people |
| 3. The intervention | Agency | One remedy is fed into all three machines; outcome stamps show help, no effect or backfire | Try another remedy |
| 4. The laboratory | Mastery | Mechanism cartridges, a large live plot and a control deck | Build and rerun a system |

The first meaningful choice should fit in the first viewport on a typical phone. The expanded
Bateson explanation can sit in a clearly labelled “About the idea” disclosure near the hero;
it should not delay the mystery.

## One machine, two registers

The current `main` branch includes **Explain it simply**, a second set of words aimed at a
younger reader. Treat this as a first-class mode of the same exhibit, not as a junior skin or a
separate product.

- Keep the charts, numbers, group encoding, timing and underlying geometry identical in both
  registers. The visual continuity is evidence that the model did not change.
- Put the register switch in the hero as a prominent two-position instrument control. It must
  be keyboard operable, linkable through `?simple=1` and understandable before either version
  has been read.
- Let the simple register use its current larger type, shorter lines and hidden laboratory.
  It may also surface mechanism pictograms more prominently, but it must not introduce cartoon
  faces, childish colours or simplified data.
- Use the same theory tickets and mechanism machines with the simpler names supplied by
  `src/simple.js`. A switch between registers should not move the user's place in the story or
  reset a run.
- Hide research chips and advanced controls in the simple register as the code already does;
  keep the pretend-world caveat visually prominent.
- Test both registers at every responsive breakpoint. The longer label in either register—not
  the convenient one—sets the component size.

The product lockup can change from **SCHISMO** to **THE SPLITTING GAME** in the simple register,
but the small descriptor should still say that both names refer to the same simulator.

## Brand treatment

### Name

Use **SCHISMO** as the large display name and **A simulator for schismogenesis** as the plain
language descriptor. Use the full word *schismogenesis* in the explanatory copy and document
title so the concept remains findable and credible.

### Wordmark

Set `SCHISMO` in heavy, slightly condensed capitals. Give the two halves a small but obvious
horizontal pull away from a central seam. The seam may continue downward as a pair of coloured
paths or threads, but it must not become a literal cracked-screen effect.

Suggested lockup:

- `SCHISMO` — display line;
- `THE DIVERGENCE MACHINE` — small instrument-label line; and
- `A simulator for schismogenesis` — optional explanatory line.

The favicon should be two simple tokens connected by a line that forks, using the same geometry
as the group markers in the charts.

### Voice

Keep the existing plain, careful voice. The interface can be friendlier and shorter without
becoming breathless.

- Prefer: “Set it in motion”, “Try another seed”, “Cut the feedback loop”, “Replay the people”.
- Keep the excellent “Not wrong, exactly.”
- Use concrete outcome language: “helped”, “no measurable effect”, “backfired”. Always retain
  the number beside the verdict.
- Avoid exclamation marks, hype, puns, game-score language and winning/losing metaphors.
- Keep research references available but visually secondary, ideally as compact source chips
  or within disclosures rather than peppered through primary instructions.

## Colour system

The page is light and inviting; the simulations live on a dark instrument surface. Bright
group colours therefore read as signals rather than decoration.

| Token | Value | Use |
|---|---:|---|
| `--ink` | `#111827` | Primary text, borders and physical shadows |
| `--page` | `#DFF4EE` | Cool mint page background; deliberately not parchment |
| `--surface` | `#FFFDF5` | Warm-white experiment bays and reading surfaces |
| `--plot` | `#11182B` | All primary chart and simulation canvases |
| `--plot-grid` | `#34405C` | Quiet grid and secondary links on dark plots |
| `--ink-soft` | `#596275` | Secondary text; 6.0:1 against `--surface` |
| `--group-a` | `#FF526C` | Group A marks on plots and large fills |
| `--group-a-ink` | `#A21636` | Accessible Group A text on light surfaces |
| `--group-b` | `#397BFF` | Group B marks on plots and large fills |
| `--group-b-ink` | `#1745A2` | Accessible Group B text on light surfaces |
| `--shared` | `#B7E64A` | Common ground, successful reconnection and overlap |
| `--action` | `#FFC83D` | Selected theory, playhead, focus moments and intervention |
| `--rupture` | `#D48BFF` | Rupture marks on the dark plot |
| `--rupture-ink` | `#7B3FB3` | Rupture text on a light surface |

Rules:

- Do not use American red/blue political semantics in copy. These are simply A and B.
- Never rely on colour alone. A is also a circle/solid line; B is a diamond/dashed line.
- Common ground is lime plus a woven or overlapping pattern. It is not merely the space
  between A and B.
- Use the dark variants for small coloured text. The bright plot colours are for marks, large
  fills and controls with dark text.
- Reserve yellow for action and selection. If everything is yellow, the machine has no lever.
- Reserve purple for limits and rupture; it is not a general accent colour.

## Typography

The typography should be friendly, wide-open and unmistakably sans serif.

| Role | Preferred face | Treatment |
|---|---|---|
| Display and section titles | Bricolage Grotesque | 700–800 weight, tight but not crushed |
| Body and controls | Atkinson Hyperlegible | 400/700, comfortable apertures and generous leading |
| Metrics, ticks and seeds | IBM Plex Mono | 500–600, tabular figures |

Self-host WOFF2 files if these faces are adopted; do not introduce a runtime font service. The
dependency-free first pass may use `Arial Black`/system sans, `system-ui` and `ui-monospace` as
fallbacks, but Georgia should not remain as a display fallback.

Type scale:

- Product display: `clamp(3rem, 8vw, 6rem)`.
- Act title: `clamp(1.8rem, 4vw, 2.7rem)`.
- Body: 17 px / 1.55 on desktop, never below 16 px on mobile.
- Control labels: 15–16 px.
- Captions and research references: 13–14 px; nothing functional below 13 px.
- Key metrics: 28–48 px in the mono face.

Use weight, size and colour for hierarchy. Do not reintroduce editorial italics as a primary
style device.

## Shape, depth and spacing

- Main experiment bays: 3 px ink border, 16 px radius, `5px 5px 0 var(--ink)` shadow.
- Interactive controls: 2 px ink border, 10–12 px radius, 3 px physical bottom shadow.
- A pressed control moves down 2–3 px and loses the equivalent shadow.
- Plot boards: 14 px radius, dark background, 3 px ink frame, no drop shadow inside the bay.
- Section number tabs sit across the top border like labels on museum equipment.
- Use an 8 px spacing base, with 24–40 px inside bays and 56–96 px between acts.
- Keep the outer page breathable. The boldness belongs to the objects, not to visual clutter.

Avoid a page full of interchangeable SaaS cards. A card should represent a theory, mechanism,
outcome or instrument—not merely contain text.

## Group and mechanism grammar

### Group identity

- **Group A:** circle, solid line, coral.
- **Group B:** diamond, dashed line, cobalt.
- **Shared ground:** overlapping capsule or woven hatch, lime.
- **New member:** the appropriate group shape with a yellow outer ring.
- **Cross-boundary tie:** thin cool-grey thread; brighten briefly when it forms, retract when it
  breaks.
- **Rupture:** jagged terminal mark plus purple boundary pattern.

Repeat the shapes in legends, endpoints, people plots, tables and accessible text labels. The
shapes are especially important for colour-vision deficiencies and monochrome screenshots.

### Mechanism pictograms

Use small code-native SVG pictograms with 2.5–3 px rounded strokes. They should behave like
diagrams, not illustrations.

- Reciprocal response: two arrows echoing outward.
- Complementary response: an offset seesaw or two perpendicular response arrows.
- Bounded confidence: a token inside a listening radius.
- Sorting: a woven set of ties becoming two bundles.
- Selective exit: centre tokens moving through two side doors.
- Pure drift: a loose cloud and a die-like directional nudge.

Each icon keeps the same A/B shapes and colours. No stock icons and no anthropomorphic faces.

## Data visualisation

The visualisations are the product. Their information hierarchy should be designed before the
surrounding decoration.

### Plot boards

- Draw charts on `--plot` with restrained `--plot-grid` lines.
- Use 3 px primary curves on desktop and at least 2.5 px on mobile.
- Use 12–14 px labels and place important annotations directly beside the relevant mark.
- Keep comparable charts on identical scales. Never improve drama by changing a scale.
- Give the live endpoint its group shape. The marker should visibly travel during a run.
- Show previous seeds as thin, low-opacity dotted ghosts; never let them compete with the live
  line.
- Mark an intervention with a yellow vertical “bolt” and its short label.
- Mark thresholds with patterned zones as well as colour. Rupture should look like a boundary,
  not a prize.

### The mystery curve

Act 1 must remain visually neutral so it does not leak the answer. Use a warm-white curve and
round endpoint on the dark board, with no A/B legend. When the user chooses a theory, clone the
curve into three smaller boards and reveal the distinct mechanism colour/icon around each one.

### The people replay

This is the most important new visual surface on `main` and should be treated as the proof, not
as a supplementary chart.

- Synchronise all three runs to one playhead and one replay button.
- Make people larger than the current dots where density allows.
- Keep ties underneath people, never on top.
- Show changing minds by movement, sorting by threads retracting and selective exit by the
  yellow-ringed newcomer entrance.
- Add a compact legend that names those three motions before replay begins.
- After replay, let the common-ground band expand across all three cards so the difference is
  readable before opening the numerical table.

### Diagnostic tables

Tables remain exact but should look like instrument readouts:

- large row labels;
- mono numerals;
- A/B shape markers in the headings;
- one selected row at a time;
- a short plain-language conclusion directly beneath; and
- both a symbol and text label for a standout value.

Do not turn the table into a heat map whose colour implies more certainty than the model has.

## Key screen treatments

### Hero and Act 1: the theory booth

- Use a wide 10–12 column shell, up to about 1180 px rather than the current 720 px article.
- Place the short hero/definition at left and a decorative two-token tether at right on desktop.
- Put the mystery chart and three **theory tickets** in the first experiment bay.
- Theory tickets are large, illustrated buttons with a short label and a press-down state. Do
  not mark one as correct before the reveal.
- Add a small “Skip to the laboratory” link for returning users.

### Act 2: three ways to make the same line

- Use three equal **mechanism machines**, each with a coloured title plate, pictogram, people
  plot and one-line verdict.
- Start from the same visible crowd and animate together.
- Preserve simultaneous comparison on desktop. On mobile, stack all three with a shared sticky
  play bar; do not hide two of them in a carousel.
- Keep “Every measure, as numbers” collapsed by default, as current `main` already does.

### Act 3: the remedy bench

- Render remedies as five chunky switch cards rather than a row of small buttons.
- The cycle control is a labelled timeline with the intervention bolt on it, not a generic
  browser slider floating above the plots.
- Feed the selected remedy visually into all three plots.
- Stamp each outcome **HELPED**, **NO EFFECT** or **BACKFIRED**, with a directional symbol and
  exact percentage. The stamp is a status label, not celebratory feedback.

### Act 4: the laboratory

- Give the laboratory a stronger visual break, like entering the control room behind the
  exhibit.
- Desktop layout: a sticky 4-column control deck beside an 8-column live instrument area.
- Mobile layout: visualisation first, sticky Run/Pause/Reset bar, then mechanism controls in
  named disclosures.
- Present presets as **mechanism cartridges**. Selecting one inserts it into the machine,
  highlights only the controls it changed and starts the run.
- Keep manual controls grouped by causal family rather than one undifferentiated two-column
  slider list: response, contact, network, membership, starting population and noise.
- Let the main ribbon dominate. Distance and role plots are secondary instruments.
- Keep ghost runs visible and make “new seed” feel like loading another specimen, not clearing
  the whole experiment.

### The original pair

Represent the dyad as two large group tokens connected through a central response mechanism.
The exact chart, gauges and arrival clock remain, but they should read as one instrument panel.
Rivalry, dominance and mixed mode become three physical routing switches above it. The
mathematics stays untouched.

## Controls and states

### Buttons

- Minimum 44 × 44 px; target 48 px on touch screens.
- Use a physical hover/pressed model, not only a background tint.
- Primary Run/Pause uses yellow; selected theory/module uses its mechanism accent.
- Disabled controls remain readable and state why they are unavailable.
- Text labels remain visible; icons support them rather than replace them.

### Sliders

- Use a 10–12 px track and a 24–28 px thumb.
- Show the value in a mono readout attached to the thumb or at the right edge.
- Fill the travelled portion of the track.
- Where a threshold has meaning, mark it explicitly. Do not invent red “danger” zones for
  parameters that have no categorical boundary.
- Support arrow keys and show a strong yellow/ink focus ring.

### Status and feedback

- Use `running`, `paused`, `reached`, `ruptured` and `settled` as visible machine states.
- A running state may use a slow pulse in the play indicator, never in the data marks.
- Copy-link feedback should be a short inline state change, not a toast that obscures a plot.
- Keep reset separate from run and require no confirmation because the experiment is already
  reproducible through its URL and seed.

## Motion

Motion should explain the mechanism. Decorative motion must never obscure a changing value.

| Event | Motion | Purpose |
|---|---|---|
| Theory chosen | The neutral curve duplicates into three tracks over 500–700 ms | Makes equifinality spatial |
| Run starts | Endpoint token picks up speed smoothly; play control depresses | Connects cause and response |
| Tie rewires | Old thread retracts, new thread draws in over 180–240 ms | Makes sorting visible |
| Member exits | Token shrinks toward a side door; ringed newcomer pops in without bounce | Makes composition change visible |
| Intervention | Yellow bolt drops onto the timeline, then the three plots continue | Makes timing causal |
| Rupture | Motion stops at the boundary; one restrained 120 ms panel jolt | Communicates a limit without celebration |
| New seed | Ghost of the old run stays while the live marks reset | Supports comparison |

Use three timing tokens: about 120 ms for press feedback, 220 ms for component state changes and
600 ms for narrative reveals. The simulation itself keeps its meaningful model timing.

Under `prefers-reduced-motion`, jump to the next meaningful state, retain the playhead and use a
brief non-moving highlight. All continuous animation must remain pausable.

## Responsive behaviour

### Wide screens: 1024 px and above

- Maximum shell around 1180 px.
- Two-column hero.
- Three mechanism cards remain side by side.
- Laboratory uses the sticky 4/8 control-and-instrument split.

### Tablets: 700–1023 px

- Single-column hero.
- Three mechanism cards may use a 2 + 1 grid only if the third retains the same visual weight;
  otherwise stack all three.
- Laboratory controls sit below the main plot in two grouped columns.

### Phones: below 700 px

- 16 px minimum body text and 16 px page gutter.
- No three-column mini-charts. Stack full-width plots with shared controls.
- Keep a sticky bottom experiment bar with Run/Pause, Reset and current cycle.
- Collapse advanced parameter families, not the story.
- Keep long labels above controls; never squeeze them beside tiny values.
- Respect safe-area insets and test at 320, 360, 390 and 430 px widths.

## Accessibility and model honesty

- Target WCAG 2.2 AA contrast for all text and interactive states.
- Encode groups with colour, shape, line style and text.
- Give every canvas an adjacent live textual summary. Throttle announcements during animation
  and announce only meaningful milestones.
- Ensure every control is keyboard reachable in a sensible sequence.
- Keep visible focus states at least 2 px thick and offset from the component border.
- Never auto-start motion before the user has seen the first question.
- Preserve equal chart scales, fitted-scenario disclosures, arbitrary-unit notes and the
  political-example disclaimer.
- Do not use “success” styling merely because distance increased or a run reached rupture.
- Do not gamify the outcome with points, streaks, winners or rewards.

## Do / do not

| Do | Do not |
|---|---|
| Make mechanisms feel physical | Turn the model into a cartoon |
| Use bold colour as semantic signal | Scatter accents across every paragraph |
| Let the people replay carry the reveal | Lead with a dense numerical table |
| Keep exact values beside plain-language verdicts | Replace numbers with vibes |
| Use thick, tactile controls | Recreate a generic SaaS settings panel |
| Make shared ground a positive visible quantity | Treat empty space as shared ground |
| Keep the first mystery neutral | Leak the answer through group colours or icons |
| Make rupture feel consequential | Celebrate it with confetti or a victory state |
| Keep research one tap away | Make citations compete with the main instruction |

## Implementation sequence

The visual redesign should not alter the model. Each phase can ship independently.

### Phase 1: the unmistakable break

1. Introduce the new colour, type, radius, spacing and depth tokens in `styles.css`.
2. Widen the shell and rebuild the hero/act bays responsively.
3. Restyle the full/simple register switch, buttons, segmented controls, tables, details and
   sliders with accessible states.
4. Switch all chart canvases to the dark plot surface and raise label/line sizes.
5. Verify both copy registers before treating the new shell as complete.

This phase alone should remove the Claude/editorial resemblance.

### Phase 2: narrative exhibit

1. Add the SCHISMO lockup and decorative split-and-tether motif.
2. Add theory-ticket and mechanism-card pictograms as inline or local SVG.
3. Stage the Act 1 unzipping reveal.
4. Elevate the people replay and common-ground comparison on `main`.
5. Turn remedies into the intervention bench with explicit outcome stamps.

### Phase 3: control room

1. Recompose the laboratory into control deck and instrument area.
2. Group sliders by causal family and indicate what each preset changed.
3. Add the sticky mobile experiment bar.
4. Unify the dyad chart, gauges and arrival clock as one instrument.

### Phase 4: polish and proof

1. Add explanatory motion and its reduced-motion equivalents.
2. Add canvas text summaries and milestone announcements.
3. Test keyboard, colour-vision, zoom, 320 px width and touch behaviour.
4. Verify every comparison still uses honest shared scales.
5. Run the existing model and research tests; visual work must not weaken the invariants in
   `CLAUDE.md`.

## Definition of done

The direction is working when:

- a five-second glance says “interactive simulator”, not “AI-written essay”;
- the first theory choice is reachable without scrolling on a common phone;
- the same line / different cause argument is clearer before any numerical table is opened;
- Group A, Group B, common ground, intervention and rupture remain distinguishable in colour,
  greyscale and common colour-vision simulations;
- a new user can start, pause, rerun and change one mechanism without reading the field guide;
- an expert can still find every parameter, seed, exact measure and research caveat;
- the full and simple registers feel like two explanations of the same machine, preserve the
  user's current state when switched and both work from a shareable URL;
- no functional text is smaller than 13 px and ordinary reading text is at least 16 px;
- the app remains dependency-free at runtime, responsive and fully keyboard operable; and
- the model outputs and existing automated tests are unchanged.
