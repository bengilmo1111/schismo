# Schismogenesis

A two-party feedback simulator for Gregory Bateson's schismogenesis: the process by which
two parties, each reacting to the other, progressively drive each other's behaviour to extremes.

Two parties are drawn as pens on a chart recorder. You set how strongly each reads the other,
how far each insists on going beyond the other, and how much restraint pulls each back. You
seed the difference they start from. The app names which of Bateson's cases you are watching,
and tells you how many exchanges it will take before the two are opposites.

No build step, no dependencies. Open it, or serve it and open it.

```bash
npm run dev     # serves on :5173
npm test        # 27 tests over the pure model
```

`index.html` loads ES modules, so `file://` will not work — use the dev server or any
static host. Deploys to Vercel or Pages as-is with no configuration.

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

## Layout

```
index.html        markup and control ids
styles.css        chart-recorder palette; colours are CSS variables read by chart.js
src/model.js      pure simulation — step, the transition matrix, arrival, readings, presets
src/chart.js      canvas renderer. Reads state, draws pixels, owns no logic.
src/app.js        wiring: controls to params, clock, readouts, URL fragment.
test/model.test.js
```

## Reading

- Bateson, *Naven* (1936), especially the epilogue on schismogenesis.
- Bateson, *Steps to an Ecology of Mind* (1972), "Culture Contact and Schismogenesis".
- Watzlawick, Beavin & Jackson, *Pragmatics of Human Communication* (1967) — the same
  dynamics as symmetrical and complementary interaction in couples.
- Richardson, *Arms and Insecurity* (1960) — the arms-race case as a pair of linear
  differential equations, which is very nearly the `mode: 'sym'` half of this model.
