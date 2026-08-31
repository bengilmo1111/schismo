# Working on this repo

Read `README.md` first — the model section is the spec. If a change contradicts the maths
described there, update the README in the same commit or don't make the change.

## Ground rules

- **No build step and no dependencies.** Plain ES modules, plain CSS. If you reach for a
  bundler or a framework, stop and say why first; this app is one canvas and eight sliders.
- **`src/model.js` stays pure.** No DOM, no `requestAnimationFrame`, no bare `Math.random` —
  randomness comes in through the injected `rng` argument. This is what keeps the model
  testable, and every claim in the README is pinned by a test that relies on it.
- **`src/chart.js` owns no logic.** It reads state and draws. Colours come from CSS variables
  via `getComputedStyle`, so the palette lives in `styles.css` only.
- **`src/app.js` is wiring.** Any real behaviour that appears here belongs in the model.
- Run `npm test` before saying a change works. Add a test for any new dynamic; a new mode or
  coupling term without a corresponding stability assertion is incomplete.

## Invariants worth protecting

- Complementary dynamics are level-neutral: they move `a − b`, never `a + b`.
- Symmetrical dynamics with any `r > 0` settle at `2·ws·g·m / r`.
- `analysis(params).difRate` must exactly predict one step's change in `a − b` with noise off.
- Rupture fires once per crossing and clamps at `CAP`.
- The simulation is deterministic when `n = 0`.

## Voice

The copy explains a real idea to someone who may not know it, in plain sentences. Keep it
that way: no all-caps labels, no exclamation marks, no "unleash the power of". The diagnosis
line is the app's main teaching surface — it should name what is happening and why, and it
should be honest that the model is a caricature of Bateson, not a measurement of anything.

## Next, roughly in order

1. **Shareable runs.** Encode params and mode in the URL hash so a configuration can be sent
   to someone. Parse on load, update on change (debounced), no history spam.
2. **Seeded noise.** Expose a seed in the UI and pass a seeded PRNG into `step`, so a
   surprising run can be reproduced and linked.
3. **Asymmetric restraint.** Split `r` into `ra` and `rb`. One party exercising restraint
   alone is the interesting case — it should show the restrained party losing ground in
   rivalry mode, which the current single `r` can't express.
4. **A third party.** Generalise state to N parties with a coupling matrix. This is where
   the model gets genuinely new behaviour — coalitions, two-against-one — and where the
   scalar `dif` readout needs replacing with pairwise gaps.
5. **Memory of past exchanges.** Right now each party reacts only to the other's current
   level. Reacting to a moving average introduces lag, and lag introduces oscillation, which
   is a different and more realistic failure mode than monotone runaway.
6. **Phase portrait.** A second view plotting `a` against `b` with the trajectory drawn on
   it makes the fixed points and the fork visible in a way the time series doesn't.

Items 1–3 are small and self-contained. Item 4 is a rewrite of the model's shape; do it on a
branch and keep the two-party presets working.
