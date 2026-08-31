# Schismogenesis

A two-party feedback simulator for Gregory Bateson's schismogenesis: the process by which
two parties, each reacting to the other, progressively drive each other's behaviour to extremes.

Two parties are drawn as pens on a chart recorder. You set how strongly each reads the other,
how far each insists on going beyond the other, and how much restraint pulls both back. The
app names which of Bateson's cases you are watching as it runs.

No build step, no dependencies. Open it, or serve it and open it.

```bash
npm run dev     # serves on :5173
npm test        # 10 tests over the pure model
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
symmetrical weight `ws`, complementary weight `wc`, responsiveness `g`, margin `m`,
restraint `r`:

```
a' = a + ws·ga·(m − d) + wc·ga·( d) − r·a + noise
b' = b + ws·gb·(m + d) + wc·gb·(−d) − r·b + noise
```

The useful part is what this does to the two collective quantities. For equal `g`:

| quantity | recurrence | behaviour |
|---|---|---|
| `sum = a + b` — how far the pair has escalated | `sum' = sum(1 − r) + 2·ws·g·m` | settles at `2·ws·g·m / r`; runs away only when `r = 0` |
| `dif = a − b` — how far their roles have differentiated | `dif' = dif(1 + 2g(wc − ws) − r)` | runs away when `2g(wc − ws) > r` |

So the symmetrical term drives the *level* and is level-limited by any restraint at all,
while the complementary term drives the *difference* and needs restraint to beat the coupling.
Mixing the two subtracts `ws` from `wc` in the second row, which is the formal version of
Bateson's argument that the patterns can check each other. Both recurrences are asserted
directly in the test suite.

Magnitudes are clamped at `CAP = 60`, which is read as rupture: the point where one party can
no longer answer the other. The chart marks it with a dashed line.

## Layout

```
index.html        markup and control ids
styles.css        chart-recorder palette; colours are CSS variables read by chart.js
src/model.js      pure simulation — step, analysis, diagnose, presets. No DOM.
src/chart.js      canvas renderer. Reads state, draws pixels, owns no logic.
src/app.js        wiring: controls to params, clock, readouts.
test/model.test.js
```

## Reading

- Bateson, *Naven* (1936), especially the epilogue on schismogenesis.
- Bateson, *Steps to an Ecology of Mind* (1972), "Culture Contact and Schismogenesis".
- Watzlawick, Beavin & Jackson, *Pragmatics of Human Communication* (1967) — the same
  dynamics as symmetrical and complementary interaction in couples.
