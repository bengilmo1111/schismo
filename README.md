# Schismogenesis

A laboratory for Gregory Bateson's schismogenesis: the process by which two parties, each
reacting to the other, progressively drive each other's behaviour to extremes.

The app's argument is that **you cannot read the mechanism off the curve.** It opens by showing
one line — two groups drifting apart over thirty election cycles — and asking what caused it.
Whatever you answer, the reveal is that three quite different mechanisms produce that same line:
the two sides pushing each other apart, the two sides ceasing to mix, or the moderates leaving
and being replaced. The rest of the app is about what *would* have told them apart, why it
matters, and what happens when you drive the mechanisms yourself.

No build step, no dependencies. Open it, or serve it and open it.

```bash
npm run dev     # serves on :5173
npm test        # 50 tests over the pure models and the copy
```

`index.html` loads ES modules, so `file://` will not work — use the dev server or any
static host. Deploys to Vercel or Pages as-is with no configuration.

## Research base

The current app deliberately implements one small, analytically tractable slice of a much
larger research field. The repository now includes:

- [the full schismogenesis research field guide](docs/research/schismogenesis-field-guide.md),
  covering Bateson, related concepts, empirical evidence, formal models, cases, stabilizers,
  measurement, causal diagnosis, and model limitations;
- [the complete source register](docs/research/complete-source-register.md), containing all
  141 distinct external sources used in the guide, each with its full visible URL;
- a [20-control experimental core](docs/research/schismogenesis-field-guide.md#103-the-20-control-experimental-core)
  and the larger [manipulable parameter catalogue](docs/research/schismogenesis-field-guide.md#10-manipulable-parameters-for-a-general-simulation);
- [18 composable mechanism modules](docs/research/schismogenesis-field-guide.md#18-mechanism-modules-for-controlled-simulation-experiments),
  from pure drift and Batesonian feedback to false polarization, security dilemmas,
  institutional lock-in, linguistic divergence, spinouts, and cooperative contact; and
- [calibration datasets](docs/research/schismogenesis-field-guide.md#19-data-sources-for-calibration-and-historical-comparison)
  plus [estimation and validation guidance](docs/research/schismogenesis-field-guide.md#20-estimating-and-validating-parameters).

Those documents are a design space, not a claim that every listed mechanism already exists in
the app. Any expansion should preserve that distinction and expose causal controls rather than
adding a single undifferentiated “polarization” slider.

## The four acts

1. **What made this happen?** One curve, three plain-language answers, and a reveal that all
   three produce it. The answer locks once given — being able to click all three until one
   said "you were right" made the reveal's own copy false. Acts 2 to 4 stay closed until you
   answer, so nobody scrolls past the question straight into a wall of sliders. The three runs share a starting population and were *fitted* to the same
   curve; nothing makes them coincide on their own, and the app says so. This is §13.1's
   equifinality — "the pattern is not the mechanism" — made concrete.
2. **What would have told them apart.** The same three runs replayed **with the people left
   in** — 240 dots, banded by group, with the ties that still cross the boundary drawn
   underneath and newcomers ringed. The three mechanisms are obvious here and invisible in a
   centroid line: everyone slides; nobody moves much but the threads vanish; nobody moves at
   all but people wink out and are replaced. Underneath it, **common ground** — the share of
   range the two still have in common — and then the full §11.7 panel, folded away.
3. **Now try to stop it.** The same remedy applied to all three runs at a cycle you choose.
   The measured effects are below, and they are the reason the diagnosis matters.
Every act has a second set of words. **Explain it simply** (top of the page, or `?simple=1`)
swaps the whole page into a register aimed at a child: shorter sentences, plainer names for the
three stories, no section references, larger type, and the laboratory folded away. It is an
overlay rather than a rewrite — the full wording is restored on the way back, and the model,
the numbers and the charts are identical in both. `src/simple.js` holds every word of it and
`test/simple.test.js` keeps it honest: sentences under 24 words, a banned jargon list, no
overclaiming, and the caveat that this is a pretend world has to survive into the simple
register too, because §13.3 applies whoever is reading.

4. **The laboratory.** Every module on its own controls, on §18.1's normalised convention, with
   a distribution ribbon, a role scatter, ghost traces from earlier seeds, and the original
   dyad kept intact as the exactly solvable case.

## The two patterns

**Symmetrical schismogenesis (called *rivalry* in the UI).** Each answers the other in kind
and tries to go one better: boasting meets boasting, armament meets armament. The pair climbs
together and the gap between them stays small.

**Complementary schismogenesis (*dominance*).** Each response calls out its opposite:
assertion draws deference, which invites more assertion; nurturing draws helplessness, which
invites more nurturing. The pair forks into hardened roles.

Bateson's claim in *Naven* (1936) is that both are runaway processes that end in breakdown
unless something checks them — restraint, or the two patterns played against each other.
The third mode runs both at once so you can see them fight.

## The model

State is two scalars, `a` and `b`, each party's intensity of behaviour. With `d = a - b`,
symmetrical weight `ws`, complementary weight `wc`, responsivenesses `ga`, `gb`, margin `m`,
restraints `ra`, `rb`:

```
a' = a + ws·ga·(m − d) + wc·ga·( d) − ra·a + noise
b' = b + ws·gb·(m + d) + wc·gb·(−d) − rb·b + noise
```

The useful part is what this does to the two collective quantities:

- `sum = a + b` — how far the pair has escalated
- `dif = a − b` — how far their roles have differentiated

Writing `g = (ga+gb)/2`, `gd = (ga−gb)/2`, `r = (ra+rb)/2`, `rd = (ra−rb)/2`, `k = wc − ws`,
the step above is *exactly* a 2×2 affine map on those two quantities:

```
sum' = (1 − r)·sum  +  (2·gd·k − rd)·dif  +  2·ws·g·m
dif' =     (−rd)·sum  +  (1 + 2·g·k − r)·dif  +  2·ws·gd·m
```

`transition()` returns those six numbers and a test asserts they reproduce `step` to
floating-point tolerance over the whole parameter space. Everything the app claims about a
run — where it settles, whether it runs away, how many exchanges until it does — is read off
this map rather than guessed from a simulation.

### What the map says

**When the parties are alike** (`ga = gb`, `ra = rb`) the off-diagonal vanishes and the two
quantities are independent, which is the textbook case:

| quantity | recurrence | behaviour |
|---|---|---|
| `sum` | `sum' = sum(1 − r) + 2·ws·g·m` | settles at `2·ws·g·m / r`; runs away only when `r = 0` |
| `dif` | `dif' = dif(1 + 2g(wc − ws) − r)` | runs away when `2g(wc − ws) > r` |

So the symmetrical term drives the *level* and is level-limited by any restraint at all,
while the complementary term drives the *difference* and needs restraint to beat the coupling.
Mixing the two subtracts `ws` from `wc` in the second row, which is the formal version of
Bateson's argument that the patterns can check each other.

**When the parties are unlike**, the off-diagonal is what carries the interesting behaviour.
Unequal restraint (`rd ≠ 0`) couples the two quantities in both directions: a shared climb
leaks into a role gap, so the party with the weaker brake ends up further out than the other
without anybody intending it. Unequal responsiveness (`gd ≠ 0`) feeds the gap back into the
level, so a complementary fork drags the level with it instead of staying level-neutral.

Whether anything runs away is the spectral radius of the matrix; *which* quantity runs away is
which components its dominant eigenvector touches. That is how a pair can climb without
forking, or fork without climbing, or do both.

### Arrival, and what a seed is worth

`arrival()` iterates the map with the noise off and returns the exchange on which each
quantity first reaches `POLARIZED = 12`. Because it is the same map the simulation runs, the
prediction and the run agree exactly — a test asserts it.

That gives the app its main question: **how long until the two are opposites, and how much
does starting closer together buy you?** In an exponential runaway the answer to the second
part is `ln(10)/ln(rate)` exchanges per factor of ten — a *constant*. Starting a hundred times
closer costs the runaway twice that and no more. The seed sets the clock; the coupling settles
the outcome. In a rivalry the level is driven by the margin rather than by the seed, and
starting closer buys nearly nothing at all.

Magnitudes are clamped at `CAP = 60`, which is read as rupture: the point where one party can
no longer answer the other. The chart marks both thresholds with dashed rules.

## Readings

A *reading* is a vocabulary, not a model change: the same two numbers, named for the situation
you are looking at, plus which quantity growing counts as becoming opposites.

- **default** — `a` and `b` are intensities of behaviour. Opposites means the role gap.
- **politics** — `a` and `b` are each party's distance from the centre, so the distance
  *between* the parties is their **sum**. The chart draws B below the centre line, because the
  two leave it in opposite directions.
- **couple** — Watzlawick's pursuer and distancer.

The political reading is the one worth arguing about. It makes left–right polarisation a
**symmetrical** process: the two sides are not doing opposite things, they are doing the same
thing in opposite directions, each answering the other's move with a slightly larger one. What
the model then insists on is that no amount of anger makes the process run away by itself.
Raising responsiveness or the margin only raises where it settles, because the level settles at
`2·ws·g·m / r` for **any** `r > 0`. Only restraint falling towards zero changes the fate. The
three political presets are built to make that comparison directly: the same two parties,
equally responsive and no angrier, differing only in their brakes.

Two things this is not. It is not fitted to DW-NOMINATE or any other series — the clock is
calibrated so one exchange reads as one election cycle, and nothing more. And it is not a
finding about any country: it is what this caricature does, offered as a way to think about the
mechanism rather than as evidence about the world.

## Sharing and reproducing

Every control is in the URL fragment; `encodeParams` omits anything left at its default and
`decodeParams` clamps everything it reads back into range. Noise comes from a seeded PRNG
exposed in the UI, so a surprising run can be linked and re-run exactly.

## The population model

`src/population.js` holds N agents, each with a trait `x`, **two separate role dimensions**
(§10.1(3) — dominance and submission are not ±1 on one opinion axis), a mutable group label,
and coevolving ties (§10.1(5), without which sorting and exit cannot be represented at all).
Controls are normalised to [0,1] on §18.1's convention; `gains()` is the documented mapping
onto actual rates, gains and radii. `src/measures.js` scores a run.

The dyad is not a separate story. **With one agent per group and nothing but reciprocal
response, the population model reproduces `transition()` step for step** — matching the other
side's *intensity*, meaning their distance from the centre, makes the centroid distance obey
the dyad's `sum` recurrence exactly. A test asserts it, so the two models cannot drift apart.

### Two figures worth knowing about

**Common ground** is the overlapping coefficient between the two groups' distributions: 1 means
indistinguishable, 0 means nothing shared. It is the only figure in the app that needs no
units, and unlike a fixed "polarised" threshold it encodes nobody's preferred centre (§13.3).

It is deliberately *not* the headline of Act 1, because it cannot be. The three arms are fitted
to match on centroid distance, and they do not match on this at all:

| | at the start | after ninety cycles |
|---|---|---|
| They pushed each other apart | 58% | **0%** |
| The moderates left | 58% | **6%** |
| They stopped mixing | 58% | **57%** |

Putting it up front would give the puzzle away in one glance. It belongs to the reveal, where
it carries the sharpest fact in the app: under sorting the two averages move as far apart as in
the other two runs while the shared ground does not shrink at all. The same curve, and three
quite different costs.

## The measure that does the work

Movement in the group centroids splits, exactly, into

- **influence** — how far today's members have moved from the traits they entered with;
- **composition** — how far the entry traits of today's members sit from the original centroid.

That is §2.1 turned into a number. With nobody leaving, composition is exactly zero; with
nobody changing their mind, influence is exactly zero. Both are asserted, and "small" would be
a bug rather than a rounding artefact.

### What the model refuses to do

Some results are there because the guide says they should be, and are pinned so they stay:

- **Homophily plus assimilation does not pull groups apart** (§13.2, "homophily is not
  sufficient"). Sorting only diverges once reactance is added at the boundary.
- **Repulsion acts across the boundary only** (§10.1(4)). Letting it act inside a group
  inflates within-group spread and exaggerates extremism — §13.2 warns about exactly this, and
  an earlier draft of this model did it.
- **The complementary module never moves the trait centroid.** Roles fork on their own axes.

## Which remedy works

Interventions are scheduled control changes, so what they do is a property of the model rather
than of the copy. Applied at cycle 40, measured at cycle 90, averaged over six seeds:

| intervention | reciprocal | sorting | exit |
|---|---|---|---|
| Stop answering each other | **−95%** | 0% | 0% |
| Open contact | −0% | **+15%** | +2% |
| Structured contact | −0% | **−93%** | +2% |
| Keep the moderates | 0% | 0% | −5% |
| Blanket restraint | −68% | −100% | −100% |

Four things fall out of that table, none of them put there by hand:

1. **The targeted remedies are specific.** Each fixes one mechanism and does nothing
   measurable to the others. Misreading the curve wastes the intervention entirely.
2. **Contact can backfire.** Unstructured mixing makes sorting *worse*; the same contact with
   the threat removed nearly cures it. §8.4 and §13.2 both warn that contact effects are
   heterogeneous, and this is that warning as a number.
3. **Exit is close to irreversible.** Closing the door at cycle 40 recovers 5%; closing it at
   cycle 3 recovers about a quarter. Nobody who already left comes back, so composition damage
   does not undo.
4. **The one remedy that works everywhere works by suppression.** Blanket restraint flattens
   every mechanism because it pulls everyone toward the middle regardless of what is happening.
   §13.3 is pointed about this: "depolarization can mean suppressing legitimate dissent."

## Layout

```
index.html        markup and control ids
styles.css        chart-recorder palette; colours are CSS variables read by chart.js
src/model.js      the dyad: step, the transition matrix, arrival, readings, presets
src/population.js the N-agent laboratory: modules, interventions, the demo arms
src/measures.js   the output panel, including the influence/composition decomposition
src/chart.js      the dyad's chart recorder. Reads state, draws pixels, owns no logic.
src/plot.js       population curves, distribution ribbon, role scatter. Also no logic.
src/app.js        wiring for the dyad
src/simple.js     every word of the simple register, and nothing else
src/lab.js        wiring for the four acts, the laboratory, and the register switch
test/model.test.js, test/population.test.js, test/simple.test.js, test/research.test.js
```

## Foundational reading

- Gregory Bateson, *Naven: A Survey of the Problems Suggested by a Composite Picture of the
  Culture of a New Guinea Tribe Drawn from Three Points of View* (1936; revised 1958),
  especially the epilogue on schismogenesis:
  [https://www.degruyter.com/document/doi/10.1515/9781503621138/html](https://www.degruyter.com/document/doi/10.1515/9781503621138/html)
- Gregory Bateson, *Steps to an Ecology of Mind: Collected Essays in Anthropology, Psychiatry,
  Evolution, and Epistemology* (1972), especially “Culture Contact and Schismogenesis”:
  [https://press.uchicago.edu/ucp/books/book/chicago/S/bo3620295.html](https://press.uchicago.edu/ucp/books/book/chicago/S/bo3620295.html)
- Paul Watzlawick, Janet Beavin Bavelas, and Don D. Jackson, *Pragmatics of Human Communication:
  A Study of Interactional Patterns, Pathologies, and Paradoxes* (1967), which develops related
  symmetrical and complementary interaction dynamics in couples:
  [https://wwnorton.com/books/9780393710595](https://wwnorton.com/books/9780393710595)
- Lewis Fry Richardson, *Arms and Insecurity: A Mathematical Study of the Causes and Origins of
  War* (1960), the arms-race case as coupled linear differential equations and a close relative
  of this model's `mode: 'sym'`:
  [https://archive.org/details/armsinsecurity0000lewi](https://archive.org/details/armsinsecurity0000lewi)
