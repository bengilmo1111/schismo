# Working on this repo

Read `README.md` first — the model section is the spec. If a change contradicts the maths
described there, update the README in the same commit or don't make the change.

## Ground rules

- **No build step and no dependencies.** Plain ES modules, plain CSS. If you reach for a
  bundler or a framework, stop and say why first; this app is one canvas and a dozen sliders.
- **`src/model.js` stays pure.** No DOM, no `requestAnimationFrame`, no bare `Math.random` —
  randomness comes in through the injected `rng` argument. This is what keeps the model
  testable, and every claim in the README is pinned by a test that relies on it.
- **`src/chart.js` and `src/plot.js` own no logic.** They read state and draw. Colours come
  from CSS variables via `getComputedStyle`, so the palette lives in `styles.css` only.
  Thresholds and ranges arrive as arguments; neither file imports a model constant.
  `chart.js` is the dyad recorder; `plot.js` is the population curves, ribbon and scatter.
- **`src/app.js` and `src/lab.js` are wiring.** `app.js` drives the dyad, `lab.js` the four
  acts and the population laboratory. Any real behaviour that appears here belongs in a model.
- **Two models, on purpose.** `src/model.js` is the exactly solvable dyad; `src/population.js`
  is the N-agent laboratory and `src/measures.js` scores it. They are joined by a test, not by
  a shared abstraction: N=2 with nothing but reciprocal response must reproduce `transition()`.
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

### The population model

- **N=2 with reciprocal response only reproduces `transition()` step for step.** The dyad is
  the population model's special case, not a separate story. If that test breaks, one of the
  two models has drifted.
- **The decomposition is a decomposition, not an attribution.** With nobody leaving,
  composition is *exactly* zero; with nobody changing their mind, influence is *exactly* zero.
  Small-but-nonzero means a bug.
- **Homophily plus assimilation does not diverge** (§13.2). If a change makes it diverge, the
  change is wrong, not the guide.
- **Repulsion acts across the boundary only** (§10.1(4)). Letting it act inside a group
  inflates within-group spread and exaggerates extremism, which §13.2 warns about explicitly.
- **The complementary module never moves the trait centroid** (§10.1(3)). Roles have their own
  two dimensions; if the opinion axis moves, they have been collapsed back onto it.
- **The three demo arms match on centroid distance and separate on the panel.** Both halves are
  asserted. Retuning one arm means re-checking both — a curve fit that loses the mechanism's
  fingerprint is a worse config even when the fit is better.
- **Common ground must separate all three arms, and must never head Act 1.** It is the reveal's
  headline precisely because it gives the puzzle away; if a retune makes the arms agree on it,
  the panel has lost its best row.
- **Each arm's one-line verdict is asserted against the measures.** The copy under a crowd panel
  is a claim about the model. If you reword it, move the test with it.

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

## Research documents

`docs/research/schismogenesis-field-guide.md` is the broad research and design space; it is not
a description of mechanisms already implemented by the app. Keep that distinction explicit.
`docs/research/complete-source-register.md` must contain every distinct external URL cited by
the guide, with the complete URL visible as its own link text. `test/research.test.js` enforces
that correspondence. Update the register and run the tests whenever research links change.

## Research documents and honesty

The app now cites the field guide by section. Those references are load-bearing claims: if you
change a mechanism, check the section still says what the copy says it says. Two standing rules
come from §13.3 — never present a stylised scenario as a prediction about real people, and
remember that a fixed "polarised" threshold encodes somebody's preferred centre.

Act 1 is fitted, and says so. The three arms were tuned to produce the same curve; that
disclosure is not optional decoration, it is what keeps the demonstration honest.

## Next, roughly in order

1. **Memory of past exchanges.** Right now each party reacts only to the other's current
   level. Reacting to a moving average introduces lag, and lag introduces oscillation, which
   is a different and more realistic failure mode than monotone runaway. It also takes the
   model out of 2×2 territory, so `transition` grows or gains a companion.
2. **Phase portrait.** A second view plotting `a` against `b` with the trajectory drawn on
   it makes the fixed points and the fork visible in a way the time series doesn't. The fixed
   point and the dominant eigenvector are already computed in `analysis` — draw them.
3. **More than two groups.** The population model still hard-codes two labels and no
   reclassification, which is exactly the "binary bias" §13.1 warns about. Group membership is
   already mutable in the state; letting labels change would add §2.1's fifth process.
4. **False polarization** (§17.7). A private/public split plus meta-perception bias is the
   cheapest remaining module and a strong one: perceived distance exceeding private distance,
   and then becoming self-fulfilling. `G_false` in §18.2 is the measure.
5. **The modules left on the shelf.** Resource rivalry, institutional lock-in (§17.11–17.13),
   movement–countermovement and radical flanks (§17.2–17.3), the security dilemma. Each is a
   §18 row with a stated critical comparison; add one at a time, as §18 instructs.
6. **Calibrate one reading against real data** (§19, §20). Deliberately not done. §12.3 warns
   that aggregate series leave many parameter sets observationally equivalent, so this means
   reporting ranges rather than a fit, and would need labelling as a much stronger claim than
   anything the app currently makes. Do not half-do it.

Items 1–2 and 4 are self-contained. Item 3 changes the model's shape; do it on a branch and
keep the demo arms matching. Item 6 is as much an editorial decision as a technical one.
