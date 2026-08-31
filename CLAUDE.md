# Working on this repo

Read `README.md` first — the model section is the spec. If a change contradicts the maths
described there, update the README in the same commit or don't make the change.

## Ground rules

- **No build step and no dependencies.** Plain ES modules, plain CSS. If you reach for a
  bundler or a framework, stop and say why first; this app is one canvas and a dozen sliders.
- **`src/model.js` stays pure.** No DOM, no `requestAnimationFrame`, no bare `Math.random` —
  randomness comes in through the injected `rng` argument. This is what keeps the model
  testable, and every claim in the README is pinned by a test that relies on it.
- **`src/chart.js` owns no logic.** It reads state and draws. Colours come from CSS variables
  via `getComputedStyle`, so the palette lives in `styles.css` only. Thresholds arrive as
  arguments; the chart never imports a model constant.
- **`src/app.js` is wiring.** Any real behaviour that appears here belongs in the model.
- **Slider bounds live in `PARAM_RANGES`.** `app.js` applies them to the inputs and
  `decodeParams` clamps to them, so the UI and a hostile URL cannot disagree. Don't put
  `min`/`max` back into the markup.
- Run `npm test` before saying a change works. Add a test for any new dynamic; a new mode or
  coupling term without a corresponding stability assertion is incomplete.

## Invariants worth protecting

- `transition(params)` is *exactly* what `step` does to `sum` and `dif` with the noise off and
  below the cap. This is the load-bearing invariant: `analysis`, `arrival`, `project` and
  every readout are derived from it, so if it drifts, everything the app says is wrong.
- Complementary dynamics are level-neutral **when the parties are alike**. Unequal
  responsiveness breaks that on purpose — the off-diagonal is a feature, not a bug.
- Symmetrical dynamics with any `r > 0` settle at `2·ws·g·m / r`.
- `arrival(params)` must name the exact exchange the noiseless simulation crosses on.
- A quantity that is running away reports no settling point; a quantity that is not still
  reports one, even when the other is diverging.
- Rupture fires once per crossing and clamps at `CAP`.
- The simulation is deterministic when `n = 0`, and reproducible from `seed` when it isn't.
- `encodeParams`/`decodeParams` round-trip, and `decodeParams` never returns a value outside
  `PARAM_RANGES` or an unknown `mode`/`reading`.

## Voice

The copy explains a real idea to someone who may not know it, in plain sentences. Keep it
that way: no all-caps labels, no exclamation marks, no "unleash the power of". The diagnosis
line and the arrival clock are the app's teaching surfaces — they should name what is
happening and why, and they should be honest that the model is a caricature of Bateson, not a
measurement of anything.

This goes double for the political reading. It is there because the mechanism genuinely fits
and because it is the version most people will recognise, not to make a point about a party.
Keep the presets symmetric in construction, keep the claims about the model rather than about
the world, and keep the disclaimer in the footer.

## Next, roughly in order

1. **Memory of past exchanges.** Right now each party reacts only to the other's current
   level. Reacting to a moving average introduces lag, and lag introduces oscillation, which
   is a different and more realistic failure mode than monotone runaway. It also takes the
   model out of 2×2 territory, so `transition` grows or gains a companion.
2. **Phase portrait.** A second view plotting `a` against `b` with the trajectory drawn on
   it makes the fixed points and the fork visible in a way the time series doesn't. The fixed
   point and the dominant eigenvector are already computed in `analysis` — draw them.
3. **A third party.** Generalise state to N parties with a coupling matrix. This is where
   the model gets genuinely new behaviour — coalitions, two-against-one — and where the
   scalar `dif` readout needs replacing with pairwise gaps.
4. **Calibrate one reading against real data.** The political reading is deliberately
   uncalibrated. Fitting `m` and `r` to a published polarisation series would be a much
   stronger claim, and would need to be labelled as one; do not half-do it.

Items 1–2 are self-contained. Item 3 is a rewrite of the model's shape; do it on a branch and
keep the two-party presets working. Item 4 is as much an editorial decision as a technical one.
