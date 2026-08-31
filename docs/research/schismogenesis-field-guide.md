# Schismogenesis

## A research field guide to how similar people, communities, organizations, and countries become different

**Research dossier — 31 August 2026**

This dossier maps the concept of schismogenesis from Gregory Bateson's original anthropology through social psychology, cultural evolution, network science, organizational sociology, political science, international relations, economics, and adjacent biological and mathematical analogies. It emphasizes mechanisms, empirical support, causal alternatives, measurement, and unresolved questions. It is a wide-field research map rather than a claim that every cited literature uses Bateson's term.

**Navigation:** [core concept](#1-the-core-batesonian-concept) · [mechanism atlas](#3-a-mechanism-atlas) · [scales and cases](#4-how-the-mechanisms-translate-across-scales) · [formal models](#7-computational-and-formal-model-families) · [manipulable parameters](#10-manipulable-parameters-for-a-general-simulation) · [measurement](#11-what-to-measure) · [causal diagnostics](#12-causal-diagnostics-identifying-the-mechanism-behind-a-trajectory) · [extended concepts](#17-further-related-concepts-and-mechanisms) · [mechanism modules](#18-mechanism-modules-for-controlled-simulation-experiments) · [calibration data](#19-data-sources-for-calibration-and-historical-comparison) · [parameter estimation](#20-estimating-and-validating-parameters) · [reading maps](#15-annotated-reading-map) · [complete source register](complete-source-register.md)

---

## Executive synthesis

Schismogenesis is the production of difference through cumulative interaction. Its distinctive claim is not merely that two actors or groups end up far apart. It is that each side's behavior changes the conditions to which the other responds, so the relationship itself becomes an engine of differentiation.

The strongest synthesis across the research is:

1. **There are two canonical feedback forms.** In *symmetrical schismogenesis*, like elicits more of the same: boast answers boast, hostility answers hostility, armament answers armament. In *complementary schismogenesis*, different behaviors mutually intensify: dominance elicits submission, demand elicits withdrawal, protection elicits dependency. Complementarity can produce extreme hierarchy even when nobody moves toward an opposite ideological pole.

2. **Interaction is necessary for the strict concept.** Two isolated populations can diverge through drift, different environments, selection, or shocks. That is divergence, but not strict Batesonian schismogenesis. Broad contemporary uses sometimes stretch the word to deliberate contrast, boundary formation, or path-dependent divergence.

3. **Similarity can be the fuel, not the antidote.** Similar actors compete for the same status, voters, resources, customers, territory, or moral legitimacy. Their closeness makes comparison easy and differentiation valuable. Rivals may become *more alike in tactics* while becoming *more opposed in identity*.

4. **Small differences become durable when several feedbacks align.** A tiny initial asymmetry can be amplified by interpersonal response, selective association, identity signaling, norm enforcement, economic returns, institutional investment, and historical lock-in. No single mechanism needs to do all the work.

5. **Sorting and influence must be separated.** A community can appear to radicalize because members changed one another, because moderates left, because extremists joined, or because categories were redrawn. Aggregate divergence does not identify the micro-process.

6. **Networks convert local rules into macrostructure.** Homophily, bounded confidence, tie deletion, and subgroup clustering can turn modest local preferences into segregated cultural regions. But homophily plus ordinary averaging is not, by itself, enough to generate true opinion polarization; models need an additional mechanism such as biased assimilation, repulsion, multidimensional alignment, or strategic rewiring.

7. **Identity is multidimensional.** Reinforcing cleavages—party, religion, class, geography, ethnicity, media, and lifestyle all aligned—make two camps coherent. Cross-cutting identities create bridges and competing loyalties. Groups can converge on one dimension while diverging on another.

8. **Institutions remember.** Laws, routines, infrastructures, skills, constituencies, and sunk costs carry early differences forward. This can make divergence persist after the original antagonism disappears. Path dependence is therefore a persistence mechanism, not necessarily the initiating mechanism.

9. **Competition can cause both imitation and differentiation.** Firms imitate legitimate practices yet seek distinctive positions; species converge on efficient forms yet separate into niches; parties converge toward median voters yet may outbid one another at the flanks. Which force wins depends on the payoff landscape and audience.

10. **Stability is an active achievement.** Negative feedback, cross-cutting ties, dual identities, fair procedures, costly escalation, role-reversal rituals, common goals, and distinguishable defensive signals can restrain escalation. Contact generally reduces prejudice on average, but unstructured or threatening exposure can backfire.

11. **Polarization is not one number.** Spread, bimodality, subgroup separation, network segregation, hostility, identity alignment, hierarchy, and institutional distance are different outcomes. A rigorous account measures several and tracks them through time.

12. **The evidence is uneven.** Many component mechanisms have substantial evidence. Direct research explicitly testing “schismogenesis” is relatively sparse and often interpretive. Agent-based models show that proposed mechanisms *can* generate divergence; they do not establish that those mechanisms caused a historical case.

13. **Perceptions of perceptions can become causal.** Actors often overestimate outgroup extremity, hostility, or willingness to use violence. Public conformity can make private moderates look radical, and the false picture can then produce real defensive escalation.

14. **Many loops are fields, not dyads.** Movements and countermovements respond through states, media, audiences, donors, regulators, and internal factions. A two-camp model can conceal the actor that supplies rewards, repression, or credible arbitration.

15. **Calibration is possible but never automatic.** Cross-national surveys, party-position data, conflict events, arms data, cultural/linguistic databases, firm filings, patent records, and network aggregates can constrain parameters. Most identify only part of the mechanism and must be combined with longitudinal or quasi-experimental evidence.

The shortest useful formula is:

> **Divergence grows when reciprocal amplification, selective association, and self-reinforcement exceed mixing, cross-cutting dependence, and other damping forces.**

That formula is a synthesis, not a law. Power, institutions, material resources, geography, and shocks determine who can respond, how strongly, and with what consequences.

---

## 1. The core Batesonian concept

### 1.1 Origin and scope

Gregory Bateson introduced the term in [“Culture Contact and Schismogenesis” (1935)](https://doi.org/10.2307/2789408) and developed it in [*Naven* (1936; revised with a 1958 epilogue)](https://www.degruyter.com/document/doi/10.1515/9781503621138/html). The Greek roots roughly mean “division-making” or “creation of a split.” Bateson's concern was dynamic: how patterned interactions progressively differentiate conduct, ethos, and groups.

In the 1935 culture-contact paper, Bateson rejected a simple choice between total fusion and total hostility. Contact could yield assimilation/fusion, elimination of one side, or a continuing differentiated equilibrium. Schismogenesis named the cumulative differentiation that could destabilize that equilibrium.

A useful strict definition is:

> A recurrent interaction in which A's patterned response changes B, B's response changes A, and the resulting loop progressively intensifies a difference in behavior, role, affect, identity, or organization.

The concept is **relational**. “Aggressive,” “submissive,” “traditional,” or “innovative” are not adequate explanations by themselves. The question is what each pattern elicits from the other and how the next round differs from the last.

### 1.2 Symmetrical schismogenesis

In the symmetrical form, the parties respond in the same behavioral register:

- boasting ↔ boasting;
- competitive display ↔ competitive display;
- accusation ↔ counter-accusation;
- tariff ↔ retaliatory tariff;
- military preparation ↔ counter-preparation;
- prestige spending ↔ prestige spending;
- ideological purification ↔ ideological purification.

The relation is “symmetrical” because the response rule is matched, not because the parties remain equal. Small advantages may compound until one side dominates, one withdraws, or the system ruptures. An arms race is the clearest formal analogue.

### 1.3 Complementary schismogenesis

In the complementary form, different patterns fit together and intensify one another:

- dominance ↔ submission;
- demand ↔ withdrawal;
- exhibitionism ↔ spectatorship;
- caretaking ↔ dependency;
- surveillance ↔ concealment;
- professional control ↔ amateur resistance;
- centralization ↔ peripheral evasion.

The sides need not become hostile or separate. They may become more tightly interdependent while their roles grow more unequal and rigid. This matters because a one-dimensional “left–right” measure misses much of complementary schismogenesis.

Modern interpersonal research makes this pattern concrete. Studies of [interpersonal complementarity](https://pmc.ncbi.nlm.nih.gov/articles/PMC11233140/) find that dominance tends to invite submission, while warmth more often invites warmth. Relationship research documents self-reinforcing [demand–withdraw cycles](https://pmc.ncbi.nlm.nih.gov/articles/PMC3218801/) and longitudinal work documents reciprocal [coercive processes between caregivers and children](https://pmc.ncbi.nlm.nih.gov/articles/PMC4183745/). These literatures do not always use Bateson's vocabulary, but they instantiate his relational logic.

### 1.4 *Naven*, role contrast, and restraint

*Naven* examined an Iatmul ritual in New Guinea in which certain kin celebrated a person's first culturally significant achievement through conspicuous and sometimes cross-gendered performances. Bateson read ordinary Iatmul gender ethos as strongly differentiated and potentially cumulative. The ritual temporarily inverted or exaggerated roles, redistributed attention, and linked otherwise opposed patterns.

The key theoretical point is not that ritual automatically resolves conflict. It is that a society can contain **counter-circuits**: one pattern of relation can interrupt, compensate for, or regulate another. Later reinterpretation of the rite, including Eric Silverman's [*Masculinity, Motherhood, and Mockery*](https://doi.org/10.3998/mpub.11443), emphasizes symbolic, affective, gendered, and historical layers that resist reducing *naven* to a single control mechanism.

### 1.5 Cybernetics: positive and negative feedback

Bateson's later cybernetic language clarified the idea:

- **Positive feedback** amplifies deviation: the next response makes the previous difference larger.
- **Negative feedback** counters deviation: costs, sanctions, exhaustion, ritual, reciprocity, or institutional restraints pull the relation back toward a viable range.
- **Runaway** occurs when amplification outruns restraint.
- **Plateau or dynamic equilibrium** occurs when amplification saturates or counter-feedback activates.

“Positive” and “negative” here describe the sign of feedback, not whether an outcome is desirable.

Bateson also contrasted Iatmul cumulative intensity with a stylized account of Balinese social life as avoiding climax and value-maximizing contests. Simon Simonse's reconstruction of this line of thought describes a “plateau” dynamic in which community-level norms restrain escalating competition and notes that Bateson briefly considered *zygogenesis* as a name for integrative or convergent processes without developing it into a comparable theory. See [Simonse, “Mimesis, Schismogenesis and Catastrophe Theory”](https://www.academia.edu/26599097/Mimesis_Schismogenesis_and_Catastrophe_Theory).

### 1.6 Three contemporary meanings

The literature now uses the term in at least three ways:

| Use | Defining feature | Example | Risk |
|---|---|---|---|
| **Strict interactional** | Reciprocal responses progressively differentiate the parties | boast–boast; dominance–submission | Can be too dyadic for institutions and networks |
| **Cybernetic/systemic** | Multiple positive-feedback circuits generate runaway differentiation | rivalry plus sorting plus institutional reinforcement | Causal mechanisms can become underspecified |
| **Macro-historical/deliberate** | A people or institution defines itself against a salient alternative | “we organize this way because they organize that way” | Intentional contrast may be inferred after the fact |

Bjørn Thomassen argues that the concept deserves revival across the social sciences while acknowledging its relative neglect; see [“Schismogenesis and schismogenetic processes: Gregory Bateson reconsidered”](https://forskning.ruc.dk/en/publications/schismogenesis-and-schismogenetic-processes-gregory-bateson-recon/). David Graeber and David Wengrow use the broad, often deliberate version in [*The Dawn of Everything*](https://theanarchistlibrary.org/library/david-graeber-and-david-wengrow-the-dawn-of-everything), proposing that neighboring societies sometimes construct institutions in conscious opposition to one another. It is a provocative comparative hypothesis, not a settled causal finding; critics question case selection, inference, and the breadth of the historical claims.

### 1.7 A compact formalization

A Richardson-style linear system captures the simplest symmetrical loop:

\[
\frac{dx}{dt}=\alpha y-\beta x+g_x, \qquad
\frac{dy}{dt}=\gamma x-\delta y+g_y
\]

Here $x$ and $y$ are intensities of each side's behavior; $\alpha$ and $\gamma$ are responsiveness to the other; $\beta$ and $\delta$ are fatigue, cost, or restraint; and $g_x,g_y$ are grievances or external drives. In this simple system, cross-amplification defeats damping when $\alpha\gamma>\beta\delta$, producing an unstable direction.

For complementary schismogenesis, $x$ and $y$ represent *different* behaviors—such as dominance and submission—not opposite signs on a shared opinion scale. The same mathematics can therefore describe widening role differentiation without symmetric ideological polarization.

Real systems require nonlinearities, thresholds, saturation, stochastic shocks, changing networks, asymmetric power, multiple groups, and multiple dimensions. The value of the equation is conceptual: it separates **responsiveness**, **damping**, and **exogenous drive**.

---

## 2. What must not be collapsed into one phenomenon

Many processes produce a picture of two distant clusters. They are not causally interchangeable.

| Phenomenon | Observable signature | Does it require reciprocal differentiation? |
|---|---|---|
| **Divergence** | Average distance between trajectories grows | No; different environments or random drift suffice |
| **Differentiation** | Roles, practices, or niches become specialized | No; it may be cooperative and stable |
| **Polarization** | Opinions/identities concentrate toward separated positions or camps | No; sorting or elite cues can produce it |
| **Affective polarization** | Dislike and distrust between camps increase | No; policy views may remain stable |
| **Segregation** | Ties become concentrated within groups | No; mild local preferences can generate it |
| **Fragmentation** | One field becomes several weakly connected clusters | No; clusters need not be opposed |
| **Fission or schism** | An organization/community formally splits | No; administrative or succession disputes may cause it |
| **Hierarchy/inequality** | Roles, power, or resources become more unequal | Often complementary rather than polar |
| **Conflict escalation** | Costs, hostility, or coercion increase | No; enemies may converge tactically or culturally |
| **Ethnogenesis** | A new named collective identity and boundary emerge | No; state classification or migration may initiate it |
| **Path dependence** | Early differences persist because reversal becomes costly | No; it explains reinforcement/persistence more than origin |
| **Lock-in** | One of several alternatives becomes difficult to leave | No; network returns or sunk costs suffice |
| **Hybridization/creolization** | Contact generates novel mixed forms | Usually the opposite of binary differentiation |
| **Assimilation/convergence** | Between-group distance falls | Can coexist with divergence on another dimension |

Three distinctions are especially important:

### 2.1 Influence, selection, and exit

- **Influence:** members change their attitudes or behavior in response to interaction.
- **Selection:** people join groups that already fit them.
- **Exit:** moderates or dissenters leave, changing the remaining average without anyone changing their mind.
- **Replacement:** cohorts with different traits enter and older cohorts disappear.
- **Reclassification:** a boundary or label changes, moving the same people into apparently different groups.

A valid causal study tries to separate these processes with longitudinal individual and network data.

### 2.2 Distance, hostility, and structure

Two groups can be:

- far apart in policy but personally tolerant;
- close in policy but intensely hostile;
- network-segregated but culturally similar;
- culturally different yet economically interdependent;
- unequal in power without being ideologically opposed.

The political science distinction between ideological and [affective polarization](https://pcl.sites.stanford.edu/sites/g/files/sbiybj22066/files/media/file/iyengar-ar-origins.pdf) is one instance of this broader principle.

### 2.3 Deliberate contrast, emergent difference, and adaptation

- **Deliberate contrast:** actors choose a marker because an outgroup uses the opposite marker.
- **Emergent difference:** local rules produce a macro-pattern nobody intended.
- **Adaptive differentiation:** different traits improve performance in different niches.
- **Drift:** chance transmission accumulates without a directional advantage.

Historical narratives frequently mix all four. They should be modeled and tested separately.

---

## 3. A mechanism atlas

### 3.1 Reciprocal interaction and escalation

| Mechanism | Micro-level rule | Typical macro-result | Research anchor |
|---|---|---|---|
| **Symmetrical escalation** | Answer an increase with an increase in the same register | Arms races, retaliatory spirals, competitive excess | Bateson; [Richardson arms-race models](https://link.springer.com/chapter/10.1007/978-3-030-31589-4_3) |
| **Complementary escalation** | One role elicits more of its counterpart | Rigid hierarchy, demand–withdraw, dependency/control | Bateson; [interpersonal complementarity](https://pmc.ncbi.nlm.nih.gov/articles/PMC11233140/) |
| **Reciprocal coercion** | Aversive behavior succeeds briefly, reinforcing both parties' coercion | Escalating family conflict | [Patterson-derived longitudinal evidence](https://pmc.ncbi.nlm.nih.gov/articles/PMC4183745/) |
| **Mimetic rivalry** | Desire and status competition focus rivals on the same object | Tactical convergence plus hostile opposition; possible scapegoating | [Critical introduction to mimetic theory](https://www.ssrc.org/publications/reciprocity-and-rivalry-a-critical-introduction-to-mimetic-scapegoat-theory/) |
| **Security dilemma** | Defensive preparation by A reduces B's perceived security | Counter-armament even among status-quo actors | [Jervis 1978](https://www.cambridge.org/core/journals/world-politics/article/cooperation-under-the-security-dilemma/C8907431CCEFEFE762BFCA32F091C526) |
| **Red Queen dynamics** | Improvement by one actor raises the performance required of rivals | Persistent escalation with no durable relative gain | [Competitive-action evidence](https://www.researchgate.net/publication/255643349_The_Red_Queen_Effect_Competitive_Actions_And_Firm_Performance) |
| **Ethnic/ideological outbidding** | Leaders compete for the same identity constituency by taking purer positions | Intra-camp radicalization and shrinking compromise space | [Zuber & Szöcsik](https://d-nb.info/1209879301/34); [review](https://www.tandfonline.com/doi/abs/10.1080/13537113.2020.1809897) |

These loops are often driven by *within-side* competition as well as between-side conflict. A leader who compromises may lose status to a harder-line rival. Ottar Brox's study of Norwegian predator policy is an explicit example: competition for leadership within protectionist and sheep-farming camps helped push compromise off the agenda; see [“Schismogenesis in the Wilderness”](https://www.tandfonline.com/doi/full/10.1080/00141840050198045).

### 3.2 Identity, comparison, and distinctiveness

| Mechanism | Core claim | Divergence route | Research anchor |
|---|---|---|---|
| **Social identity / self-categorization** | Part of the self is defined through group membership and comparative context | Ingroup prototypes and positive distinctiveness shift relative to an outgroup | [Tajfel & Turner](https://www.demenzemedicinagenerale.net/images/mens-sana/Tajfel_e_Turner__Social_Identity_Theory.pdf) |
| **Optimal distinctiveness** | People seek both inclusion and differentiation | Groups or niches form where belonging and uniqueness are jointly satisfied | [Brewer 1991](https://journals.sagepub.com/doi/10.1177/0146167291175001) |
| **Reactive distinctiveness** | Threatened similarity increases efforts to differentiate | Previously neutral markers become identity signals | [Jetten et al. meta-analytic integration](https://www.researchgate.net/publication/8557468_Intergroup_Distinctiveness_and_Differentiation_A_Meta-Analytic_Integration) |
| **Identity signaling / anti-conformity** | People adopt or abandon tastes partly because of who else uses them | Cultural markers separate identity groups | [Berger & Heath 2008](https://pubmed.ncbi.nlm.nih.gov/18729697/) |
| **Psychological reactance** | Perceived threats to freedom motivate resistance | Pressure to conform can produce movement in the opposite direction | [Review](https://pmc.ncbi.nlm.nih.gov/articles/PMC4675534/) |
| **Communication divergence** | Speakers accentuate linguistic differences to signal identity | Dialects, accents, styles, and vocabularies become boundary markers | [Communication Accommodation Theory review](https://www.sciencedirect.com/science/article/abs/pii/S0388000123000360) |
| **Oppositional identity** | A stigmatized or subordinate group may reject traits coded as dominant-group traits | Norms and aspirations acquire inverted group meaning | [Dynamic model](https://www.sciencedirect.com/science/article/abs/pii/S0014292111000493); empirical claims remain contested |

Minimal-group experiments show that even arbitrary categorization can generate ingroup favoritism. They do **not** show that full-scale hostility, durable institutions, or historical divergence follows automatically. Material interests, leaders, narratives, and boundary enforcement determine whether a fleeting categorization becomes consequential.

### 3.3 Boundary making

Fredrik Barth's [*Ethnic Groups and Boundaries*](https://dn790006.ca.archive.org/0/items/EthnicGroupsAndBoundaries_201801/Ethnic%20Groups%20and%20Boundaries.pdf) shifted attention from a group's inventory of cultural traits to the boundary that organizes membership and interaction. Cultural content can change while a boundary persists.

Andreas Wimmer's [boundary-making framework](https://www.journals.uchicago.edu/doi/10.1086/522803) adds strategy and field conditions. Actors can:

- expand or fuse categories;
- contract or split them;
- change the hierarchy or meaning of a boundary;
- reposition themselves within it;
- cross it individually;
- blur its cultural markers while leaving institutional inequality intact.

Michèle Lamont and Virág Molnár distinguish [symbolic boundaries from social boundaries](https://www.annualreviews.org/content/journals/10.1146/annurev.soc.28.110601.141107). Symbolic boundaries are conceptual distinctions; they become social boundaries when broadly recognized and translated into durable association, exclusion, or unequal access. This distinction explains why loud cultural contrast does not always create structural separation—and why subtle classifications sometimes do.

Boundary hardening typically involves several operations:

1. naming and categorization;
2. visible markers and stereotyped prototypes;
3. rules for membership and exit;
4. sanctions for deviance or “betrayal”;
5. restricted marriage, hiring, trade, media, or association;
6. stories that reinterpret ambiguous events as proof of difference;
7. institutions that allocate resources by category.

Religious sect formation is a useful domain: schism may begin as a dispute over authority or doctrine, but boundary work, exclusive practices, and costs of membership subsequently make the new identity real. Congregational research emphasizes the difference between symbolic and social exclusion; see [“The Social and Symbolic Boundaries of Congregations”](https://ijrr.web.baylor.edu/sites/g/files/ecbvkj2171/files/2026-03/ijrr01006.pdf).

### 3.4 Group discussion, identity alignment, and moralization

**Group polarization.** After like-minded discussion, group members often move toward a more extreme version of their initial tendency. Two classic mechanisms are persuasive arguments—members hear new reasons supporting the shared direction—and social comparison—members adjust toward a valued group prototype. Contemporary experiments continue to find context-dependent [group-polarization effects](https://pmc.ncbi.nlm.nih.gov/articles/PMC6732819/).

**Social sorting.** When previously cross-cutting identities line up, disagreement becomes socially total. Party, religion, place, education, race, lifestyle, and media choice begin predicting one another. The result can be high affective polarization even without equivalent growth in policy extremity; see this [review of identity alignment and affective polarization](https://www.sciencedirect.com/science/article/pii/S0261379421000573).

**Political sectarianism.** Finkel and colleagues describe a combination of othering, aversion, and moralization that turns political opponents into existentially alien and morally defective groups; see [“Political sectarianism in America”](https://pcl.sites.stanford.edu/sites/g/files/sbiybj22066/files/media/file/finkel-science-political.pdf).

**Sacred values.** Once a position becomes morally non-negotiable, material inducements can be interpreted as insult or corruption and may intensify resistance. Research on [sacred values and intergroup conflict](https://pubmed.ncbi.nlm.nih.gov/25708077/) supports treating moralization as a change in the kind of utility at stake, not just a stronger ordinary preference.

**Identity fusion.** Fusion describes a felt oneness between personal and group identity associated with extreme pro-group orientations. A [meta-analysis covering 90 studies, 55 reports, and 36,880 participants](https://blogs.uned.es/idenfusion/wp-content/uploads/sites/553/2024/09/Varmann-et-al.-2023_How-identity-fusion.pdf) finds robust associations, while leaving causality and contextual direction open.

Ingroup attachment and outgroup hostility should not be treated as a single axis. Recent work on [parochial altruism](https://www.sciencedirect.com/science/article/abs/pii/S1090513823000582) emphasizes that “ingroup love” and “outgroup hate” can vary independently.

### 3.5 Social influence, homophily, and network coevolution

Several network processes interact:

- **Homophily:** similar actors are more likely to connect.
- **Social influence:** connected actors become more similar.
- **Bounded confidence:** influence occurs only below a distance threshold.
- **Biased assimilation:** the same evidence is interpreted in a way that protects prior commitments.
- **Negative influence/repulsion:** sufficiently dissimilar actors move further apart.
- **Rewiring:** actors drop dissimilar contacts and seek similar ones.
- **Complex contagion:** adoption requires reinforcement from several contacts.
- **Structural balance:** friends of friends and enemies of enemies reorganize signed ties into camps.

These mechanisms are often conflated because they all increase assortativity.

The classic [Axelrod model of cultural dissemination](https://journals.sagepub.com/doi/10.1177/0022002797041002001) combines local interaction, homophily, and influence. Neighbors converge, yet the population can freeze into multiple cultural regions. It is a landmark demonstration that local convergence can coexist with global diversity.

But ordinary repeated averaging is not enough for true polarization. Dandekar, Goel, and Lee show that a DeGroot-style influence process converges even with arbitrary homophily; adding biased assimilation permits consensus, persistent disagreement, or polarization depending on parameters. See [“Biased assimilation, homophily, and the dynamics of polarization”](https://www.pnas.org/doi/10.1073/pnas.1217220110).

Bounded-confidence models such as Deffuant–Weisbuch and Hegselmann–Krause generate consensus or multiple opinion clusters depending on confidence thresholds; see this [formal review](https://arxiv.org/html/0707.1762v2). Models with negative influence can generate bipolarization, but results are sensitive to the repulsion rule and its empirical plausibility; see [Flache & Macy 2011](https://www.tandfonline.com/doi/full/10.1080/0022250X.2010.532261) and a [critical review of social-influence models](https://www.jasss.org/20/4/2.html).

In adaptive-network models, opinions and ties coevolve. [Holme and Newman](https://link.aps.org/doi/10.1103/PhysRevE.74.056108) show a transition between consensus and fragmented communities when social influence competes with rewiring. This is especially relevant to schismogenesis because the interaction structure is no longer a passive container; the conflict changes who can influence whom.

Structural-balance theory adds signed relationships. Under strong assumptions, a balanced complete network resolves into one friendly bloc or two internally friendly, mutually hostile blocs. A continuous dynamical treatment is given by [Marvel et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC3033300/). Real networks are incomplete, weighted, multiplex, and often settle into more than two communities, so the theorem is a benchmark rather than a descriptive law.

### 3.6 Exposure, echo chambers, and the backfire problem

The simple story—algorithms isolate people, therefore opposing exposure will depolarize them—is not supported as a universal rule.

- In a field experiment, following opposing political voices on Twitter increased polarization for some participants, showing that exposure under identity-threatening conditions can backfire; see [Bail et al. 2018](https://www.pnas.org/doi/10.1073/pnas.1804840115).
- In a large 2020 Facebook experiment, reducing like-minded content by roughly one third changed what people saw but did not measurably change eight preregistered attitudinal outcomes; see [Guess et al. 2023](https://www.nature.com/articles/s41586-023-06297-w).
- A broad [Reuters Institute literature review](https://reutersinstitute.politics.ox.ac.uk/echo-chambers-filter-bubbles-and-polarisation-literature-review) finds heterogeneous effects and warns against treating selective exposure, echo chambers, and polarization as interchangeable.

The general lesson is that **contact is filtered through identity, status, source credibility, norms, and task structure**. Exposure may inform, normalize, threaten, humiliate, or provide new ammunition.

### 3.7 Cultural transmission, drift, and group-level differentiation

Cultural-evolution research supplies mechanisms that do not require explicit hostility:

- **Conformist transmission:** disproportionately copying the local majority reduces within-group variation and can preserve between-group differences.
- **Prestige and success bias:** copying high-status or apparently successful models can create cascades and local attractors.
- **Punishment and norm enforcement:** sanctions stabilize local conventions and increase the cost of crossing boundaries.
- **Cultural drift:** random copying and transmission error cause arbitrary divergence, especially in small or isolated populations.
- **Migration/mixing:** usually reduces between-group variance, unless migrants are segregated, selectively assimilated, or trigger reactive differentiation.
- **Cultural group selection:** differential persistence, imitation, growth, or replacement of groups can favor group-level packages, provided meaningful between-group variation is maintained.

[Henrich's model of conformist transmission](https://www.sciencedirect.com/science/article/abs/pii/S109051389800018X) shows how conformity can help maintain group differences. [Creanza, Kolodny, and Feldman's review](https://pmc.ncbi.nlm.nih.gov/articles/PMC5544263/) surveys cultural evolutionary mechanisms. Neutral models of [cultural drift](https://www.sciencedirect.com/science/article/abs/pii/S1090513808000810) are important null models: not every divergent fashion, name, ritual, or convention was selected for its function or chosen against an outgroup.

Claims about cultural group selection remain theoretically and empirically contested in scope. The framework is most useful when the relevant group boundary, transmission process, between-group competition, and differential reproduction or imitation can be specified rather than assumed.

### 3.8 Segmentary opposition and ethnogenesis

Segmentary systems demonstrate that the relevant “us” is scale-dependent. Local lineages may oppose one another but fuse when confronting a higher-level rival. The same actor can therefore participate in fission at one level and integration at another. Fredrik Barth's classic study of Swat political organization is one reference point: [“Segmentary Opposition and the Theory of Games”](https://www.jstor.org/stable/2844433).

This yields a vital multilevel principle:

> A common enemy can suppress an internal schism by moving the boundary upward, without removing the underlying capacity for differentiation.

Ethnogenesis is the formation or reformation of a shared identity and boundary. It may emerge endogenously through mobilization, exogenously through state classification or colonial administration, or through both. See this [geographical review of ethnogenesis](https://compass.onlinelibrary.wiley.com/doi/10.1111/gec3.12668). Schismogenesis can be one route to ethnogenesis, but the concepts are not synonymous.

### 3.9 Tightness, threat, and norm enforcement

Cultural tightness–looseness describes variation in the strength of norms and tolerance for deviance. Ecological and historical threat often correlates with tighter norms, although causality is multilevel and context-dependent. A broad cross-cultural analysis is available in [Jackson et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC7423486/).

Threat can have opposite effects:

- increase within-group conformity and between-group contrast;
- elevate leaders who promise control;
- make ambiguous acts look hostile;
- raise sanctions for internal dissent;
- or generate superordinate solidarity across an existing divide.

Whether threat integrates or fragments depends on which boundary becomes salient, whether responsibility is attributed internally or externally, and whether institutions distribute risk fairly.

### 3.10 Path dependence, increasing returns, and cumulative advantage

Path dependence explains why small, contingent early differences can become difficult to reverse. A Pólya-urn process is the canonical image: an early draw slightly increases the probability of the same outcome on the next draw, and repeated reinforcement magnifies chance.

Paul Pierson identifies political sources of increasing returns including collective-action costs, institutional density, power asymmetry, and actors' time horizons; see [“Increasing Returns, Path Dependence, and the Study of Politics”](https://www.critical-juncture.net/uploads/2/1/9/9/21997192/pierson_increasing_returns.pdf). Related mechanisms include:

- learning effects and accumulated expertise;
- coordination benefits from using the same standard;
- adaptive expectations;
- sunk investments and switching costs;
- legal precedents and bureaucratic routines;
- policy feedback that creates constituencies for continuation;
- cumulative advantage or the Matthew effect;
- agglomeration and regional cumulative causation.

A review of cumulative advantage is available in [DiPrete and Eirich](https://pmc.ncbi.nlm.nih.gov/articles/PMC4659671/). Myrdal's circular and cumulative causation addresses how initial regional advantage attracts investment, skill, and demand while “backwash” removes them from lagging regions; a modern reconstruction is [Berger 2008](https://postkeynesian.net/media/working-papers/PKWP1105.pdf).

Path dependence is often overused. “History matters” is not enough. A strong claim identifies the reinforcing mechanism, the plausible alternative paths at an early stage, the event or sequence that selected one, and the growing cost of reversal. Critical-juncture research adds attention to periods when structural constraints temporarily loosen; see [Capoccia and Kelemen](https://www.critical-juncture.net/uploads/2/1/9/9/21997192/capoccia_and_keleman_the_study_of_critical_junctures.pdf).

### 3.11 Institutions and complementary systems

Institutions rarely change one at a time. Education, finance, labor relations, corporate governance, welfare, law, and innovation can become mutually complementary. Once a cluster forms, a reform copied from elsewhere may function differently or trigger compensating change.

Jens Beckert's [“Institutional Isomorphism Revisited”](https://pure.mpg.de/rest/items/item_1232069_5/component/file_1837298/content) argues that mechanisms commonly associated with homogenization can also produce divergence because organizations translate models within different power structures and institutional environments. Hall and Soskice's [*Varieties of Capitalism*](https://hall.scholars.harvard.edu/publications/varieties-capitalism-institutional-foundations-comparative-advantage) emphasizes institutional complementarities that reinforce distinct national systems and comparative advantages.

Institutions can therefore:

- damp interaction by defining rights and procedures;
- amplify it by rewarding hard-line or exclusionary strategies;
- preserve a difference after attitudes change;
- translate the same external shock into different trajectories;
- create feedback between beliefs, capabilities, and material payoffs.

### 3.12 Competition, niches, and strategic differentiation

Competition has at least three possible effects:

1. **Imitation:** copy a successful or legitimate rival.
2. **Escalation:** match and exceed the rival on a shared dimension.
3. **Niche differentiation:** avoid direct comparison by serving a different audience or specializing.

Organizational ecology's resource-partitioning theory predicts that concentration in a market center can open space for specialist forms; see [Carroll and Swaminathan on specialist organizations](https://www.journals.uchicago.edu/doi/10.1086/320821). Strategic-balance research similarly treats firms as balancing legitimacy from similarity against reduced competition from difference. Deephouse's [“To Be Different, or to Be the Same?”](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2269232) is a central reference.

The biological analogue is **character displacement**: competition between ecologically similar species can favor greater trait separation where they coexist. The evidence and conditions are reviewed in [Pfennig and Pfennig](https://pmc.ncbi.nlm.nih.gov/articles/PMC3279117/). It is an illuminating analogy for niche differentiation, not direct evidence about human organizations.

### 3.13 Randomness and symmetry breaking

Similar initial conditions do not imply identical trajectories when a system has multiple stable states. Tiny perturbations, sampling error, or sequence effects can select different equilibria; later reinforcement makes the outcome look inevitable.

Relevant formalisms include:

- spontaneous symmetry breaking;
- pitchfork and cusp bifurcations;
- hysteresis, where reversing the original cause does not immediately reverse the state;
- stochastic path dependence and Pólya urns;
- founder effects and drift;
- coordination games with multiple equilibria.

Simonse uses catastrophe theory to interpret sudden transitions after long latent accumulation in schismogenetic conflict. This should be treated as a mathematical analogy and hypothesis generator. A discontinuous curve fitted to a crisis does not, by itself, reveal the social mechanism.

The founder effect is likewise a biological concept: a small splinter population carries an unrepresentative sample of the parent population, after which drift acts strongly. The [US National Human Genome Research Institute](https://www.genome.gov/genetics-glossary/Founder-Effect) gives the standard genetic definition. Cultural founders can have analogous influence through recruitment, rules, stories, and governance, but the inheritance system is different and far more reflexive.

---

## 4. How the mechanisms translate across scales

### 4.1 People, dyads, and families

At the interpersonal scale, the other party is directly observable and reciprocal effects can often be measured. The most relevant literatures are:

- interpersonal complementarity;
- demand–withdraw and pursue–distance cycles;
- reciprocal coercion;
- emotional contagion and affective synchrony;
- reactance;
- social comparison and identity signaling;
- attribution spirals, in which each side reads its own action as defensive and the other's as dispositional;
- self-fulfilling prophecy and expectancy confirmation.

An important asymmetry appears here. The powerful party has greater capacity to define the interaction, but the less powerful party's adaptation can then be used as evidence that the hierarchy is natural. For example, surveillance induces concealment; concealment is interpreted as proof that surveillance is needed. This is a complementary loop with an epistemic component.

Demand–withdraw research shows why a role pattern can persist even when both participants dislike it. A demand intended to restore engagement makes withdrawal more attractive; withdrawal makes demand more urgent. The local payoff of each move reproduces the globally unwanted relation. A longitudinal study of couples emphasizes that [demand–withdraw is associated with relationship dissatisfaction and can be self-perpetuating](https://pmc.ncbi.nlm.nih.gov/articles/PMC8004543/).

The dyadic scale also exposes a measurement warning: observed complementarity may reflect stable personality selection—dominant people choosing submissive partners—rather than interactional change. Repeated observations before and after relationship formation are needed to distinguish selection from reciprocal shaping.

### 4.2 Communities, movements, and religions

Communities add membership, collective memory, norm enforcement, leaders, and institutions. Typical sequences include:

1. a dispute or external comparison makes a category salient;
2. entrepreneurs name the difference and select symbolic markers;
3. members sort, dissenters exit, and interaction becomes more internal;
4. group discussion shifts prototypes and acceptable speech;
5. sanctions raise the cost of ambiguity or dual loyalty;
6. institutions—schools, rituals, associations, media—transmit the distinction;
7. material and social networks reorganize around the boundary;
8. later members inherit a world in which the difference appears primordial.

This sequence is not inevitable. Communities also hybridize, maintain layered identities, or alternate between opposition and alliance. Segmentary opposition means yesterday's rival may become today's ally against a more distant group.

Fission itself can select for difference. When a movement splits, founders on each side may be unusually committed; moderates may avoid both successor groups; each organization then needs a defensible identity and constituency. Doctrine, ritual, dress, language, and governance can diverge after the formal split even if the initial dispute was narrow.

### 4.3 Organizations and companies

Organizations face simultaneous pressures to look legitimate and to look distinctive. Several routes to divergence recur:

- **Founder imprinting:** early hires, routines, capital constraints, and founding stories persist.
- **Spinout inheritance:** a new firm inherits routines from a parent but defines itself against the parent's perceived failures.
- **Professionalization:** specialized staff gain authority, eliciting resistance from volunteers, craftspeople, or legacy members.
- **Faultlines:** several attributes align—age, tenure, function, geography, status—making subgroups easy to activate.
- **Strategic differentiation:** a firm chooses a niche, brand, technology, or business model that reduces direct competition.
- **Institutional complementarity:** one choice changes the payoff of later choices, creating coherent but divergent bundles.
- **Red Queen competition:** rivals continually raise speed, feature count, marketing, litigation, or acquisition activity.
- **Resource partitioning:** generalists crowd a market center, allowing specialists to flourish at the edges.

Lau and Murnighan's organizational-faultline framework explains how aligned demographic and functional attributes can split teams; see [“Demographic Diversity and Faultlines”](https://www.jstor.org/stable/259377). Cross-cutting members can weaken this process. Evidence on [“crisscrossing actors”](https://pubsonline.informs.org/doi/10.1287/orsc.1120.0767) suggests that people who bridge subgroup categories can reduce faultline effects, although their ability to do so depends on status and trust.

Institutional isomorphism is the counterforce: organizations imitate successful or legitimate peers, respond to professional standards, and comply with common regulation. The empirical question is therefore not “imitation or differentiation?” but **which dimensions are standardized and which become competitive identity markers**. Smartphone firms may converge on form factor and supply chain while diverging on ecosystem, privacy narrative, or pricing. Universities may converge on rankings and audit systems while departments develop opposed local cultures.

### 4.4 Regions and countries

Countries and regions contain all the preceding mechanisms plus sovereignty, coercive capacity, territorial borders, macroeconomic feedback, and international strategic interaction.

Major pathways include:

- **Security dilemmas and arms races:** defensive measures have threatening external effects.
- **National identity construction:** elites and publics define the nation against neighbors, empires, minorities, or an imagined past.
- **Ethnic outbidding:** parties compete for credibility as the authentic defender of a group.
- **Institutional complementarities:** labor, finance, education, welfare, and corporate governance coevolve into distinct packages.
- **Policy feedback:** programs create constituencies, capabilities, expectations, and fiscal commitments that reshape future politics.
- **Critical junctures:** wars, crises, transitions, and constitutional moments open alternative paths.
- **Cumulative causation:** capital, skills, infrastructure, and population flow toward an early winner and away from a lagging region.
- **Legal and administrative classification:** censuses, borders, language policy, and citizenship law make categories more consequential.
- **External alliances and sanctions:** outside actors alter within-group incentives and harden camps.

Jervis's security-dilemma analysis gives two important moderators: cooperation is easier when defense has an advantage over offense and when defensive preparations are distinguishable from offensive ones. This is a precise example of a general schismogenetic principle: **ambiguity about intent strengthens reciprocal amplification**.

National divergence is particularly vulnerable to false starting-point claims. Two countries that looked similar on a few indicators may have differed in state capacity, land tenure, coalition structure, colonial inheritance, geography, or exposure to trade. A credible account establishes similarity on the latent mechanisms that matter, not merely on a historical snapshot.

---

## 5. Research that explicitly applies schismogenesis

Direct empirical use of Bateson's term is much smaller than the surrounding literatures. The following studies are especially useful because they show what researchers have actually done with the concept.

### 5.1 Organizational cultures

Meta Gorup and Dan Podjed studied a Slovenian birdwatching association and Vrije Universiteit Amsterdam in [“Deconstructing divisions: Cultural schismogeneses as sources of creativity in organizations”](https://doi.org/10.1080/14759551.2015.1075539).

Their cases identified divisions such as:

- professional staff versus volunteer amateurs;
- older versus younger generations;
- established organizational ideals versus managerial or bureaucratic change.

Professional growth reinforced volunteer opposition, while generational divisions did not map perfectly onto professional status. Cross-cutting alliances—including younger members reconnecting with older ones—could disrupt a simple binary. The authors' most important contribution is to show that schismogenesis can be **generative**: tension stimulated adaptation, criticism, and new organizational forms rather than only destruction.

Evidence level: comparative qualitative/ethnographic interpretation in two non-profits. It demonstrates plausibility and process texture, not population-level causal generality.

### 5.2 Alaska salmon fisheries

Hannah Harrison and Philip Loring's [“Larger Than Life: The Emergent Nature of Conflict in Alaska's Upper Cook Inlet Salmon Fisheries”](https://journals.sagepub.com/doi/10.1177/2158244014555112) treats conflict as an emergent system. Commercial, sport, personal-use, and subsistence interests interacted with governance arrangements, uncertainty, rights claims, and equity disputes. Participants sometimes appeared to respond less to one another's current proposals than to an accumulated object called “the conflict.”

This captures second-order schismogenesis: past interaction changes narratives and institutions; those products then structure later interaction. The conflict acquires memory and apparent autonomy.

Evidence level: qualitative and interpretive, strong on historical sequence and participant meaning, limited for estimating causal weights.

### 5.3 Predator reintroduction in Norway

Ottar Brox's [“Schismogenesis in the Wilderness”](https://www.tandfonline.com/doi/full/10.1080/00141840050198045) analyzes antagonism between predator protectionists and sheep farmers. A notable mechanism is intra-camp status competition: aspiring representatives gain authority by demonstrating firmness, which makes compromise costly and causes each side to encounter a more uncompromising opponent in the next round.

This shows why the relevant unit is not two homogeneous blocs. Each camp contains its own selection environment for leaders and claims.

Evidence level: interpretive case analysis; valuable for mechanism discovery.

### 5.4 Raptor–grouse management conflict

David Hodgson and colleagues use the concept in analyzing conflict over raptors and grouse management. Their account emphasizes discourse that feeds upon itself: each side's arguments intensify the interpretive frame of the other. An accessible author postprint is available [here](https://nora.nerc.ac.uk/id/eprint/520258/1/N520258PP.pdf).

Evidence level: qualitative conflict analysis; useful for discursive feedback and conservation governance.

### 5.5 Political polarization

Recent systems-oriented applications frame political polarization as linked positive-feedback loops among identity, media selection, elite incentives, and moralized threat. One explicit Batesonian treatment is [Thompson 2025](https://www.mdpi.com/2673-9461/5/3/17). It is a conceptual synthesis rather than decisive empirical validation, but it demonstrates the contemporary cybernetic use of the term.

### 5.6 Overall judgment on the direct literature

The direct literature contributes:

- a relational vocabulary;
- attention to escalation sequences;
- a way to connect dyadic interaction with organizational and institutional memory;
- recognition that opposition can produce creativity and coherence as well as rupture;
- a search for counter-circuits and control.

Its recurrent limitations are:

- post hoc identification of a feedback loop;
- little standardized measurement;
- difficulty separating reciprocal influence from selection and external shocks;
- small numbers of interpretive cases;
- unclear transition from two-party interaction to multi-actor fields;
- occasional neglect of power and material constraints.

The best research strategy is therefore to use schismogenesis as an **organizing hypothesis**, then borrow operational measures and identification strategies from the adjacent literatures.

---

## 6. A comparative case bank

The table separates direct applications from close analogues and formal illustrations. “Mechanism shown” does not mean a case proves that mechanism exclusively.

| Domain/case | Type | Mechanism shown | Main caution |
|---|---|---|---|
| Iatmul gender ethos and *naven* | Original direct case | Complementary role differentiation plus ritual counter-circuit | Bateson's interpretation is historically situated and later reworked |
| Bateson's Bali contrast | Original comparative interpretation | Plateau, avoidance of cumulative climax | Broad cultural characterization; not a controlled comparison |
| DOPPS birdwatching association | Direct application | Professional–volunteer and generational feedback; creative schism | One interpretive organizational case |
| Vrije Universiteit Amsterdam | Direct application | Bureaucratic/professional and generational cultural divisions | One interpretive organizational case |
| Upper Cook Inlet salmon conflict | Direct application | Conflict becomes institutionally and narratively self-reinforcing | Causal components not quantitatively isolated |
| Norwegian predator conflict | Direct application | Within-camp leadership competition hardens between-camp positions | Generalizability uncertain |
| Raptor–grouse dispute | Direct application | Reciprocal discourse and governance conflict | Qualitative inference |
| Couple demand–withdraw | Close empirical analogue | Complementary escalation | Selection and gender/power context matter |
| Parent–child coercive cycle | Close empirical analogue | Short-term reinforcement reproduces aversive exchange | Family-specific mechanisms may not scale directly |
| Interstate arms race | Close formal/historical analogue | Symmetrical action–reaction under fear and grievance | External threats and domestic politics also matter |
| Political party sorting | Close empirical analogue | Identity alignment, elite cues, affective polarization | Policy extremity and hostility can move separately |
| Ethnic outbidding | Close theoretical/empirical analogue | Within-group electoral competition rewards harder claims | Review literature finds outcomes are conditional, not inevitable |
| Religious sect formation | Close historical analogue | Schism, founder selection, boundary work, costly membership | Doctrinal, organizational, and material causes vary |
| Dialect/style divergence | Close empirical analogue | Communication used to mark valued identity difference | Accommodation and convergence are equally important |
| Rival firms in a Red Queen race | Close empirical analogue | Each action raises rivals' action rate and speed | Performance effects vary by industry and action type |
| Specialist niches after market concentration | Close ecological analogue | Central crowding opens differentiated peripheral forms | Niche choice need not involve antagonism |
| Regional rich–poor divergence | Close macro analogue | Capital/skill flows and policy feedback compound initial advantage | Geography and external markets may initiate the gap |
| Schelling segregation | Generative model | Mild local preferences produce strong macro-segregation | Segregation is not necessarily hostility or polarization |
| Axelrod cultural regions | Generative model | Local similarity and influence create global cultural plurality | Outcome is sensitive to noise, network, and feature assumptions |
| Adaptive opinion network | Generative model | Influence changes opinions while disagreement rewires ties | Formal possibility, not historical identification |
| Biological character displacement | Biological analogue | Similar competitors diverge traits in sympatry | Human symbols and institutions are reflexive, not genetic traits |
| Reinforcement in speciation | Biological analogue | Costs of hybridization select stronger reproductive isolation | Social intermarriage and boundary choice follow different inheritance rules |

Two case-selection rules follow:

1. **Negative and convergent cases are essential.** Studying only successful splits makes every prior disagreement look schismogenetic.
2. **Matched starts require trajectory data.** A convincing “similar-to-different” comparison documents pre-divergence similarity, the timing of the first deviation, reciprocal responses, boundary changes, and alternative explanations.

---

## 7. Computational and formal model families

These models are conceptual laboratories. Each isolates a candidate mechanism. Their chief value is to reveal sufficient conditions, threshold effects, and unexpected interactions; their chief danger is mistaking an elegant output pattern for causal evidence.

| Model family | Minimal rule | Typical outcomes | What it isolates | Key source |
|---|---|---|---|---|
| **Richardson arms race** | Each side reacts to the other's level, with fatigue and grievance | Equilibrium, escalation, collapse | Symmetrical cross-amplification versus damping | [Overview](https://link.springer.com/chapter/10.1007/978-3-030-31589-4_3) |
| **DeGroot averaging** | Agents repeatedly average neighbors' beliefs | Usually consensus or persistent disagreement under structural conditions | Pure assimilative influence | Discussed/tested by [Dandekar et al.](https://www.pnas.org/doi/10.1073/pnas.1217220110) |
| **Biased assimilation** | Evidence is processed in a prior-protective direction | Consensus, disagreement, or polarization | Motivated interpretation plus homophily | [Dandekar et al. 2013](https://pubmed.ncbi.nlm.nih.gov/23536293/) |
| **Bounded confidence** | Average only with sufficiently similar agents | Consensus or several clusters | Tolerance/interaction thresholds | [Review](https://arxiv.org/html/0707.1762v2) |
| **Assimilation–contrast/repulsion** | Near agents attract; distant agents repel | Bipolarization or extremes | Reactive differentiation | [Flache & Macy 2011](https://www.tandfonline.com/doi/full/10.1080/0022250X.2010.532261) |
| **Axelrod cultural dissemination** | Interaction probability rises with similarity; interaction increases similarity on one feature | Local convergence, global cultural regions | Homophily plus multidimensional influence | [Axelrod 1997](https://journals.sagepub.com/doi/10.1177/0022002797041002001) |
| **Adaptive/co-evolving networks** | Agents either influence one another or rewire away | Consensus–fragmentation phase transition | Endogenous interaction structure | [Holme & Newman 2006](https://arxiv.org/abs/physics/0603023) |
| **Schelling segregation** | Move when too few neighbors are similar | High spatial segregation from modest preferences | Local choice and unintended macrostructure | [Schelling's original models](https://www.stat.berkeley.edu/~aldous/157/Papers/Schelling_Seg_Models.pdf) |
| **Threshold/cascade models** | Adopt when enough contacts have adopted | No cascade, local cascade, or sudden mass shift | Critical mass and sequence sensitivity | [Granovetter 1978](https://pdodds.w3.uvm.edu/files/papers/others/1978/granovetter1978a.pdf) |
| **Structural balance** | Adjust signed ties to reduce inconsistent friend/enemy triads | One cohesive group or two antagonistic camps under strong assumptions | Coalition formation from triadic consistency | [Marvel et al. 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3033300/) |
| **Pólya urn / increasing returns** | Each outcome raises its own future probability | Path-dependent lock-in; divergent replicates | Chance amplified by reinforcement | [Pierson 2000](https://www.critical-juncture.net/uploads/2/1/9/9/21997192/pierson_increasing_returns.pdf) |
| **Coordination/evolutionary games** | Payoff depends on matching local conventions or strategies | Multiple stable conventions, lock-in, boundary equilibria | Frequency dependence and convention selection | General evolutionary-game framework |
| **Niche/resource-competition models** | Similar actors compete more intensely for the same resource | Specialization, displacement, exclusion | Strategic or adaptive differentiation | [Character displacement review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3279117/) |
| **Cultural transmission models** | Copy parents/peers with conformist, prestige, payoff, or random bias | Homogenization, stable group variation, drift | Inheritance rules and population structure | [Cultural evolution review](https://pmc.ncbi.nlm.nih.gov/articles/PMC5544263/) |
| **Catastrophe/bifurcation models** | Continuous pressure crosses a stability threshold | Sudden jump and hysteresis | Nonlinear transition, not its substantive cause | [Simonse](https://www.academia.edu/26599097/Mimesis_Schismogenesis_and_Catastrophe_Theory) |
| **Ising/sociophysical models** | Binary choices align locally under noise or fields | Consensus, domains, spontaneous symmetry breaking | Collective ordering and criticality | A recent [symmetry-breaking review/model](https://www.mdpi.com/2073-8994/17/11/1866) |

### 7.1 What a model result actually establishes

A model can show:

- that a micro-rule is sufficient to generate an outcome under specified assumptions;
- that an outcome changes discontinuously near a threshold;
- that two mechanisms interact non-additively;
- that intuitive policy effects can reverse in some region of parameter space;
- that identical aggregate outcomes can arise from different micro-processes.

It does not by itself show:

- that people follow the rule;
- that estimated parameter values fall in the relevant region;
- that the network, payoffs, or time scale are realistic;
- that a historical case was generated by that mechanism;
- that another model would not fit the same pattern.

### 7.2 Robustness questions for every model

1. Does divergence survive different initial distributions?
2. Does it survive noise, mutation, and random cross-group contact?
3. What happens with more than two groups?
4. What happens with multidimensional identity and correlated issues?
5. Are network ties fixed, selected, or coevolving?
6. Can agents enter, exit, migrate, reproduce, merge, or split?
7. Is influence symmetric, or does power/status weight it?
8. Are actors myopic, strategic, learning, or institutionally constrained?
9. Is the outcome transient, metastable, or absorbing?
10. Can the same macro-output be reproduced by a rival mechanism?

---

## 8. Stabilizers, reversals, and convergent processes

Schismogenesis is not destiny. The most useful countervailing concepts are not generic “moderation” but mechanisms that change the feedback architecture.

### 8.1 Damping and saturation

- costs of escalation rise;
- attention, money, personnel, or time become scarce;
- actors habituate or become fatigued;
- legal ceilings and budget constraints limit response;
- gains from further differentiation diminish;
- feedback arrives slowly enough for reassessment;
- clear signals reduce uncertainty about intent.

The Richardson formulation makes damping explicit. Jervis's offense–defense distinction similarly shows how technical and institutional arrangements can make a defensive act less threatening and weaken the action–reaction loop.

### 8.2 Cross-cutting identities and ties

When group memberships overlap imperfectly, each person has reasons not to treat one cleavage as total. A union member may share religion with an employer, a conservative may share profession with a progressive, and a border resident may have kin on both sides.

**Social identity complexity** measures whether people see their multiple ingroups as largely overlapping or distinct and cross-cutting. Greater complexity is associated with more tolerant intergroup attitudes; see [Roccas and Brewer 2002](https://pubmed.ncbi.nlm.nih.gov/15657457/). Political-cleavage research similarly distinguishes reinforcing from cross-cutting dimensions; see [Selway's measurement framework](https://www.cambridge.org/core/journals/political-analysis/article/measurement-of-crosscutting-cleavages-and-other-multidimensional-cleavage-structures/F8F8F4C3193BEABBD322C8DDD824B3C6).

Bridgers are not automatically effective. They may be mistrusted as disloyal, lack status, or become overloaded. Their effect depends on whether institutions protect brokerage and whether both groups recognize their membership.

### 8.3 Common and dual identities

The common-ingroup-identity model proposes that recategorizing “us” and “them” within a larger “we” can reduce bias. A **dual identity** often preserves subgroup recognition while adding a superordinate identity, avoiding the threat that distinctiveness will be erased. The book-length framework is [Gaertner and Dovidio, *Reducing Intergroup Bias*](https://www.taylorfrancis.com/books/mono/10.4324/9781315804576/reducing-intergroup-bias-samuel-gaertner-john-dovidio).

Superordinate identity can fail when:

- one group effectively defines the supposed common identity;
- inequality is hidden rather than addressed;
- subgroup history or autonomy is denied;
- leaders gain more from maintaining the divide;
- a new common identity is constructed against a third group, merely relocating hostility.

### 8.4 Intergroup contact and cooperation

Pettigrew and Tropp's major [meta-analysis of 515 studies and 713 independent samples](https://ideas.wharton.upenn.edu/wp-content/uploads/2018/07/Pettigrew-Tropp.pdf) found that intergroup contact generally reduces prejudice, with stronger and more reliable effects under conditions such as equal status, common goals, cooperation, and institutional support. Later reviews support a modest average association while emphasizing heterogeneity; see [Pettigrew et al. 2011](https://www.lindatropp.com/media/pages/lab/academic-publications/7e6250b2a4-1758138683/pettigrew-t-f-tropp-l-r-wagner-u-christ-o-2011.pdf).

Contact is not simply exposure. Competitive, humiliating, involuntary, or stereotype-confirming encounters may intensify difference. Cross-partisan conversation research finds effects are conditional on the structure and tone of interaction; see [this field-experimental review and study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9217089/).

### 8.5 Fair procedures and enforceable rules

Institutions can interrupt recursive retaliation by:

- providing neutral adjudication;
- making commitments verifiable;
- separating defensive from offensive action;
- protecting minority rights and dissent;
- distributing losses transparently;
- creating repeated forums with enforceable turn-taking;
- preventing within-camp extremists from monopolizing representation;
- preserving cross-boundary mobility and association.

Procedural fairness is not cosmetic. When one side lacks security or voice, calls for harmony may stabilize complementary domination rather than reduce schismogenesis.

### 8.6 Ritual, alternation, and role reversal

Rituals can:

- expose role dependence;
- permit controlled inversion;
- redistribute honor;
- transform direct rivalry into stylized performance;
- renew a superordinate order;
- create predictable transitions between competitive and cooperative phases.

The *naven* interpretation belongs here. But ritual can also harden boundaries, rehearse grievance, or humiliate an outgroup. Its effect depends on participation, meaning, power, and what happens afterward.

### 8.7 Mixing, mobility, and permeability

Migration and cross-group ties often reduce cultural distance, but several counter-effects are possible:

- migrants cluster and reproduce separate institutions;
- receiving groups engage in reactive distinctiveness;
- highly assimilated members are accused of betrayal;
- selective exit leaves origin groups more homogeneous;
- boundary policing increases as permeability threatens identity.

Permeability therefore changes both **contact** and the **value of distinction**.

### 8.8 Integrative processes that deserve equal attention

The neglected counterpart to schismogenesis includes:

- convergence and accommodation;
- hybridization and creolization;
- coalition formation;
- standardization and institutional isomorphism;
- common fate and superordinate goals;
- cross-cutting affiliation;
- mutual dependence and complementarity without escalation;
- cultural borrowing and translation;
- federalism, power-sharing, and layered sovereignty;
- fission followed by later federation.

A complete theory explains not only why similar actors diverge, but why many highly interactive rivals remain similar, why some differences plateau, and why some splits later reverse.

---

## 9. Conditions that make divergence more or less likely

The following are high-value moderators across domains.

| Condition | Tends to amplify divergence when… | Tends to damp divergence when… |
|---|---|---|
| **Interaction frequency** | Encounters are competitive, ambiguous, and remembered | Encounters are cooperative, structured, and corrective |
| **Similarity/proximity** | Actors compete for the same niche or status | Similarity supports empathy and easy coordination |
| **Identity salience** | Disagreement is interpreted as group threat | Multiple identities remain available |
| **Boundary visibility** | Markers make sorting and sanctioning cheap | Ambiguity permits brokerage and hybrid roles |
| **Network topology** | Dense ingroups and sparse bridges reinforce local norms | Trusted cross-cutting ties carry credible information |
| **Power asymmetry** | The stronger actor can impose categories and costs | Rights and countervailing institutions constrain domination |
| **Mobility/exit** | Moderates leave and camps purify | Exit threat disciplines leaders; cross-boundary movement stays legitimate |
| **Resource competition** | The same scarce resource is rival and indivisible | Niches, compensation, or joint gains are available |
| **Leadership selection** | Hard-liners gain status within camps | Leaders are rewarded for cross-group delivery |
| **Moralization** | Positions become sacred and compromise signals betrayal | Principles support fair procedure and restraint |
| **Threat/shock** | Blame targets an outgroup and uncertainty is high | Common fate creates a credible larger “we” |
| **Institutional returns** | Early choices create constituencies and switching costs | Institutions preserve reversibility and experimentation |
| **Population size** | Small founder groups drift, enforce norms, and select intensely | Larger, diverse populations retain variants and bridges |
| **Time horizon** | Actors discount future retaliation or race for a first-mover advantage | Repeated interaction and reputation reward restraint |
| **Signal clarity** | Defensive and offensive acts look alike | Intent, capability, and compliance are verifiable |
| **Dimensional alignment** | Issues and identities all sort into the same camps | Cross-cutting issues create shifting coalitions |

None of these has a fixed sign. High interaction, external threat, mobility, and similarity are all capable of either integration or division depending on the relation's structure.

---

## 10. Manipulable parameters for a general simulation

The parameters below are scale-independent. “Actor” can mean a person, household, faction, community, company, region, or country. “Trait” can mean an opinion, behavior, ritual, product strategy, institution, policy, dialect feature, or resource allocation.

### 10.1 Design principles for parameterization

1. **Keep causes separate from outcomes.** Do not use a single “polarization” slider. Manipulate contact, response, sorting, identity, resources, and institutions; then measure polarization.
2. **Separate initiation, amplification, and persistence.** A shock may start a difference, reciprocal response amplify it, and switching costs preserve it.
3. **Represent complementary roles on separate dimensions.** Dominance and submission are not merely +1 and −1 on one opinion axis.
4. **Distinguish within-group and between-group rules.** Conformity may be high inside groups while repulsion operates only across a salient boundary.
5. **Let networks coevolve.** If ties cannot form, strengthen, weaken, or break, sorting and exit are artificially excluded.
6. **Include power and resources.** Equal influence is a strong substantive assumption, not a neutral default.
7. **Make randomness visible and repeatable.** A seed and replicate count are scientific controls; otherwise chance amplification will look like a deterministic effect.
8. **Measure several kinds of difference.** Opinions, affect, roles, networks, resources, and institutions can move in different directions.

### 10.2 Generic actor and system state

A flexible actor $i$ can carry:

- a trait vector $\mathbf{x}_i$: opinions, practices, strategies, or institutions;
- a role vector $\mathbf{q}_i$: dominance, submission, demand, withdrawal, care, dependence, and so on;
- identity memberships $\mathbf{g}_i$, allowing several overlapping groups rather than one label;
- affect/trust toward actor or group $j$, $a_{ij}$;
- resources $r_i$, status $s_i$, and power $p_i$;
- thresholds for confidence, threat, adoption, exit, and sanctioning;
- memory and beliefs about others' intentions;
- network ties $w_{ij}$, which may be directed, weighted, and signed.

Group- or system-level state can include norms, boundaries, institutions, shared narratives, resource pools, media channels, and environmental conditions.

One generic response skeleton is:

\[
\mathbf{u}_i(t+1)=\operatorname{sat}\!\left[
\mathbf{u}_i(t)
+G_{ji}\mathbf{R}_{ji}\mathbf{u}_j(t-\tau)
-\mathbf{\Lambda}_i\mathbf{u}_i(t)
+\mathbf{I}_i(t)
+\boldsymbol{\xi}_i(t)
\right]
\]

where:

- $G_{ji}$ is cross-response gain;
- $\mathbf{R}_{ji}$ is a response matrix;
- $\tau$ is delay;
- $\mathbf{\Lambda}_i$ is damping;
- $\mathbf{I}_i$ contains institutional, payoff, and identity effects;
- $\boldsymbol{\xi}_i$ is innovation, error, or noise;
- `sat` imposes limits or nonlinear saturation.

For **symmetrical schismogenesis**, the response matrix strongly maps a behavior onto the same behavior: hostility triggers hostility. For **complementary schismogenesis**, off-diagonal entries dominate: demand triggers withdrawal; surveillance triggers concealment. This matrix is the cleanest control for moving between Bateson's two modes.

### 10.3 The 20-control experimental core

These controls are sufficient for a rich first research model. Normalizing most continuous controls to ([0,1]) makes comparison easy, but the underlying model should document the transformation into probabilities, rates, or gains.

| Control | Type / suggested range | What it changes | Usually higher means… |
|---|---|---|---|
| **Initial similarity** | (0–1) | Starting distance between actors/groups | More similar starting centroids |
| **Initial heterogeneity** | (0–1) | Variation inside each starting population | More latent diversity and possible subgroups |
| **Group overlap** | (0–1) | Degree to which identities cross-cut rather than align | More bridges and competing loyalties |
| **Response mode** | categorical or matrix | Symmetric, complementary, mixed, or neutral coupling | A change in the *kind* of divergence |
| **Reciprocal gain** | (0–2+) | Strength of response to the other's prior behavior | Faster amplification; runaway above damping thresholds |
| **Damping/restraint** | (0–2+) | Fatigue, costs, self-regulation, legal limits | Faster return toward a viable range |
| **Saturation** | positive cap / curve | Maximum intensity and diminishing returns | Earlier plateau when saturation is stronger |
| **Interaction rate** | probability per step | Frequency of potentially influential encounters | Faster dynamics; direction depends on encounter quality |
| **Homophily** | (0–1) | Preference for similar partners | More assortative contact and local clustering |
| **Rewiring/exit rate** | probability per step | Speed of dropping dissimilar ties or leaving groups | Faster sorting and purification |
| **Assimilation strength** | (0–1) | Movement toward an interaction partner | More local convergence |
| **Confidence radius** | (0–2) on a ([-1,1]) trait | Maximum distance permitting assimilation | Larger influence neighborhoods and fewer clusters |
| **Repulsion/reactance** | (0–1) | Movement away from distant or threatening others | Greater between-group distance and extremes |
| **Identity salience** | (0–1) | Weight of group meaning in perception and choice | More group-conditioned response |
| **Boundary hardness** | (0–1) | Visibility, membership cost, sanctions, and impermeability | Stronger sorting and slower mixing |
| **Resource rivalry** | (0–1) | Zero-sumness, scarcity, and niche overlap | More incentive to outcompete or differentiate |
| **Power asymmetry** | (0–1), plus direction | Unequal ability to influence, punish, classify, or absorb cost | More complementary hierarchy and asymmetric adaptation |
| **Path reinforcement** | (0–1) | Increasing returns, sunk costs, and policy feedback | Greater lock-in and sensitivity to early events |
| **Institutional damping** | (0–1) | Fair adjudication, rights, verification, and enforcement | Less retaliation when trusted and even-handed |
| **Shock/threat intensity** | magnitude, duration, attribution | Exogenous crisis, common threat, resource shock, scandal | Integration or division depending on who is blamed |

Always expose a **random seed**, **number of replicates**, **population size**, **time horizon**, and **step size** as experiment controls even if they are not presented as substantive social parameters.

### 10.4 Initial conditions and population structure

| Parameter | Suggested form | Interpretation |
|---|---|---|
| `population_size` | integer | Number of actors; affects drift, network density, and computational scale |
| `group_count` | integer, including emergent | Number of initial labels or polities; do not force two camps |
| `trait_dimensions` | integer (K) | Number of opinion, cultural, strategy, or institution dimensions |
| `role_dimensions` | integer (L) | Separate complementary behaviors such as demand/withdraw |
| `initial_centroid_distance` | vector or scalar | Starting between-group difference on each dimension |
| `within_group_variance` | covariance matrix | Initial heterogeneity and correlations within groups |
| `issue_correlation` | covariance matrix | Whether positions already align into ideological packages |
| `identity_overlap_matrix` | group-by-group matrix | Multiple membership and cross-cutting cleavage structure |
| `initial_resource_distribution` | distribution / Gini | Material inequality and capacity to absorb conflict costs |
| `initial_power_distribution` | distribution | Influence, coercion, agenda control, and classification power |
| `initial_network_topology` | spatial, random, small-world, scale-free, block, empirical | Opportunity structure for interaction |
| `initial_assortativity` | (-1) to (1) | Starting network segregation by trait or identity |
| `founder_sample_size` | integer | How strongly a splinter group's founders can imprint it |
| `environmental_similarity` | (0–1) or spatial field | Whether actors face the same constraints and opportunities |

The covariance controls are crucial. Two populations can have identical means but different latent coalitions. A shock may align those dimensions and produce rapid apparent “creation” of camps that were structurally possible from the start.

### 10.5 Interaction and response parameters

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `encounter_rate` | probability or Poisson rate | How often actors interact |
| `within_between_contact_ratio` | nonnegative ratio | Relative exposure within and across a boundary |
| `tie_influence_weight` | edge weight | How much a contact matters |
| `status_influence_exponent` | (0+) | Disproportionate influence of high-status actors |
| `cross_response_gain` | directed matrix | How strongly each actor/group responds to another |
| `response_mode_matrix` | dimension-to-dimension matrix | Same-kind versus complementary elicitation |
| `response_delay` | time steps | Lag between action and response; can cause oscillation or overshoot |
| `memory_length` | steps or decay half-life | How much interaction history affects current interpretation |
| `grievance_accumulation` | (0–1) | Persistence and compounding of unresolved harms |
| `forgiveness_decay` | (0–1) per step | Rate at which grievance loses weight |
| `reciprocity_bias` | signed | Tendency to match cooperation/hostility rather than act independently |
| `misattribution_bias` | (0–1) | Treating one's action as defensive and the other's as dispositional |
| `intent_ambiguity` | (0–1) | Difficulty distinguishing threat from defense or error |
| `loss_aversion` | (1+) | Extra weight assigned to losses, humiliation, and status decline |
| `saturation_shape` | logistic, tanh, hard cap | Whether escalation plateaus smoothly or abruptly |
| `fatigue_rate` | (0–1) | Endogenous decline in willingness/capacity to continue |
| `habituation_rate` | (0–1) | Reduced response to repeated signals |
| `strategic_depth` | myopic to forward-looking | Whether actors anticipate later rounds |

The directed matrices allow asymmetric cases. A powerful state may barely respond to a small neighbor, while the neighbor responds intensely. A manager's demand may produce strong employee withdrawal, while employee withdrawal produces only a modest further managerial demand.

### 10.6 Influence, cognition, and communication

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `assimilation_rate` | (0–1) | Movement toward credible or similar others |
| `confidence_radius` | distance threshold | Bounded confidence |
| `contrast_threshold` | distance threshold | Point beyond which influence becomes repulsive |
| `repulsion_rate` | (0–1) | Movement away after contrast/threat |
| `biased_assimilation` | (0–1) | Prior-consistent interpretation of the same evidence |
| `confirmation_search` | (0–1) | Preference for congenial information |
| `source_credibility_bias` | mapping by identity/status | Different weights for ingroup, outgroup, expert, or leader sources |
| `evidence_noise` | variance | Ambiguity and error in observed events |
| `false_information_rate` | probability | Supply of inaccurate claims |
| `correction_strength` | (0–1) | Effect of verified correction, conditional on source |
| `public_private_gap` | distribution | Preference falsification and conformity without private change |
| `communication_divergence` | (0–1) | Deliberate accentuation of linguistic or stylistic difference |
| `message_extremity_reward` | (0–1) | Attention/status payoff for stronger claims |
| `algorithmic_amplification` | content-to-reach function | Selective amplification by engagement or relevance systems |
| `common_knowledge_threshold` | count/proportion | How many signals are needed before coordinated change |

Private belief, public expression, and observed behavior should be separate state variables if norm pressure matters. Otherwise apparent consensus and sudden cascades cannot be represented cleanly.

### 10.7 Identity and boundary parameters

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `identity_salience` | (0–1), context-dependent | Weight of group identity in a decision |
| `ingroup_identification` | individual distribution | Emotional/central importance of membership |
| `identity_fusion` | (0–1) | Perceived oneness of personal and group selves |
| `optimal_distinctiveness_target` | desired similarity interval | Preferred balance of belonging and uniqueness |
| `distinctiveness_threat` | function of outgroup similarity | Reactive differentiation when groups seem too alike |
| `prototype_strength` | (0–1) | Pull toward the perceived exemplary group member |
| `prototype_mobility` | (0–1) | How quickly the group prototype shifts after interaction or elite cues |
| `outgroup_aversion` | (0–1) | Negative affect independent of policy distance |
| `moralization_rate` | (0–1) | Conversion of preferences into moral obligations |
| `sacred_value_weight` | (0–1) or discontinuity | Resistance to material trade-offs |
| `marker_visibility` | (0–1) | Ease of recognizing category membership |
| `boundary_permeability` | (0–1) | Ease of crossing or holding dual membership |
| `entry_cost` / `exit_cost` | nonnegative | Cost of joining or leaving a group |
| `deviance_sanction` | nonnegative | Punishment for violating group norms |
| `betrayal_penalty` | nonnegative | Special cost of compromise or cross-boundary cooperation |
| `category_reclassification_rate` | probability | Frequency at which labels/boundaries are redrawn |
| `superordinate_identity_strength` | (0–1) | Weight of a larger shared category |
| `social_identity_complexity` | (0–1) | Recognition that one's ingroups do not fully overlap |

Identity salience should change with context. A workplace category may dominate during a wage dispute and recede during a citywide emergency. Fixing it permanently bakes the outcome into the starting assumptions.

### 10.8 Network and mobility parameters

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `homophily_strength` | (0–1) | Preference for similar partners |
| `heterophily_bonus` | (0–1) | Preference or institutional reward for cross-boundary ties |
| `tie_formation_rate` | probability | Network growth |
| `tie_decay_rate` | probability / half-life | Relationship loss without active maintenance |
| `rewire_on_distance` | (0–1) | Replacement of dissimilar contacts |
| `negative_tie_formation` | probability | Creation of explicit adversarial relationships |
| `triadic_balance_pressure` | (0–1) | Pressure to align with friends' friends and against enemies' friends |
| `network_centralization` | structural control | Concentration of communication/influence in hubs |
| `bridge_density` | structural control | Number of cross-cutting ties |
| `bridge_trust` | (0–1) | Credibility of information carried by bridges |
| `broker_protection` | (0–1) | Institutional protection from accusations of disloyalty |
| `spatial_mobility` | rate/distance | Movement across neighborhoods or territories |
| `group_migration_rate` | probability | Transfer between communities/organizations/countries |
| `selective_exit_slope` | function of mismatch | How strongly dissent predicts departure |
| `interaction_capacity` | degree/time budget | Limit on number and strength of ties |

Homophily can enter at three different points: opportunity to meet, decision to form a tie, and decision to retain it. Combining them in one parameter hides distinct interventions and causal claims.

### 10.9 Culture and norm transmission parameters

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `conformist_bias` | (0–1+) | Disproportionate copying of the local majority |
| `prestige_bias` | (0–1) | Copying high-status models |
| `success_bias` | (0–1) | Copying apparently high-payoff behavior |
| `vertical_transmission` | share | Parent/predecessor-to-successor transmission |
| `horizontal_transmission` | share | Peer-to-peer transmission |
| `oblique_transmission` | share | Elder/institution-to-non-descendant transmission |
| `innovation_rate` | probability | Creation of new variants |
| `copying_error` | probability/variance | Cultural mutation or misunderstanding |
| `norm_tightness` | (0–1) | Clarity and strength of norms |
| `sanction_probability` | probability | Likelihood that deviance is punished |
| `sanction_severity` | nonnegative | Cost imposed when punishment occurs |
| `ritual_frequency` | rate | Rehearsal, inversion, or renewal of categories |
| `ritual_effect_matrix` | state transformation | Whether ritual integrates, differentiates, or reverses roles |
| `institutional_memory` | half-life | Persistence of norms and narratives beyond members |
| `cultural_drift_strength` | variance, size-dependent | Random change independent of advantage |

To model drift faithfully, its impact should usually scale with effective population size and transmission bottlenecks rather than act as identical additive noise everywhere.

### 10.10 Resources, competition, power, and institutions

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `resource_scarcity` | (0–1) | Demand relative to supply |
| `resource_overlap` | (0–1) | Extent to which actors need the same resource/audience |
| `resource_divisibility` | (0–1) | Ease of sharing or compensating |
| `zero_sum_perception` | (0–1) | Belief that one side's gain is the other's loss |
| `objective_interdependence` | signed | Joint gains or mutual vulnerability |
| `status_rivalry` | (0–1) | Payoff from relative rather than absolute standing |
| `niche_differentiation_payoff` | function of distance | Benefit from occupying a distinct strategy/culture |
| `imitation_payoff` | function of legitimacy/success | Benefit from matching accepted practice |
| `increasing_returns` | (0–1+) | Extra future payoff created by current adoption |
| `switching_cost` | nonnegative | Cost of abandoning accumulated path |
| `sunk_investment_rate` | nonnegative | Speed at which choices become embodied in assets/skills |
| `redistribution_rate` | (0–1) | Transfer that changes material asymmetry |
| `coercive_capacity` | actor/group distribution | Ability to impose behavior or absorb retaliation |
| `agenda_control` | distribution | Ability to select issues and categories under discussion |
| `leader_outbidding_pressure` | (0–1) | Within-camp reward for purer or harder positions |
| `elite_cue_strength` | (0–1) | Weight of leader signals on followers |
| `procedural_fairness` | (0–1) | Perceived neutrality and voice in decision processes |
| `third_party_enforcement` | (0–1) | Reliability of arbitration and commitment enforcement |
| `rights_protection` | (0–1) | Constraint on exclusion and domination |
| `institutional_plasticity` | (0–1) | Ease of revising rules before lock-in |
| `policy_feedback_strength` | (0–1) | Degree to which policy creates supportive constituencies/capacity |
| `offense_defense_balance` | signed | Relative advantage of taking versus holding |
| `signal_distinguishability` | (0–1) | Ability to tell defensive from offensive action |
| `autonomy_federalism` | (0–1) | Capacity for distinct practices within a shared order |

Resource scarcity and zero-sum perception should be separate. Actors can fight over an objectively divisible resource because it has become a sacred status marker, or cooperate under real scarcity because institutions make distribution credible.

### 10.11 Demography, succession, and organizational turnover

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `birth_entry_rate` | rate | Addition of new actors |
| `death_exit_rate` | rate | Removal of actors |
| `cohort_replacement_rate` | rate | Speed at which generational change alters composition |
| `recruitment_selectivity` | function of fit | Whether groups attract representative or extreme entrants |
| `socialization_strength` | (0–1) | Change after joining |
| `assortative_pairing` | (0–1) | Similar actors partner, hire, ally, or reproduce together |
| `succession_contest_intensity` | (0–1) | Leadership competition during transition |
| `spinout_rate` | probability | Formation of splinter organizations |
| `merger_federation_rate` | probability | Reintegration or coalition formation |
| `inheritance_fidelity` | (0–1) | Accuracy with which successor actors copy institutions/culture |

This block is what lets a simulation distinguish genuine conversion from population replacement. It also permits founder effects, generational coalitions, succession schisms, and later merger.

### 10.12 Shocks and environmental parameters

| Parameter | Suggested form | Mechanism represented |
|---|---|---|
| `shock_type` | categorical/vector | War, recession, technology, disaster, scandal, migration, disease, discovery |
| `shock_magnitude` | nonnegative | Immediate displacement of state or resources |
| `shock_duration` | steps | Acute versus chronic pressure |
| `shock_scope` | local to global | Which actors are affected |
| `shock_correlation` | (-1) to (1) | Whether groups gain/lose together or oppositely |
| `blame_attribution` | distribution by group | Who is held responsible |
| `common_fate_salience` | (0–1) | Extent to which the shock activates a shared identity |
| `environmental_gradient` | spatial/vector field | Different local adaptation pressures |
| `resource_regeneration` | rate | Whether scarcity is temporary or cumulative |
| `shock_foreseeability` | (0–1) | Ability to prepare and coordinate |

A threat does not have a fixed “polarizing” effect. Threat plus outgroup blame can harden an existing cleavage; threat plus correlated loss and credible shared institutions can integrate.

### 10.13 Parameters that initiate, amplify, preserve, or reverse

| Function in the trajectory | Typical parameters |
|---|---|
| **Initiators** | random seed, founder sample, environmental gradient, shock, leadership succession, resource change, first-mover action |
| **Amplifiers** | reciprocal gain, repulsion, biased assimilation, identity salience, outbidding, grievance accumulation, triadic balance |
| **Sorters** | homophily, rewiring, selective exit, recruitment selectivity, assortative pairing, boundary visibility |
| **Preservers** | conformity, sanctions, institutional memory, increasing returns, switching costs, policy feedback, inheritance fidelity |
| **Dampers** | fatigue, saturation, fair adjudication, distinguishable intent, rights, bridge trust, cross-cutting identity |
| **Reversers** | institutional reform, superordinate identity, restorative contact, resource settlement, merger/federation, counternorm diffusion |
| **Noise/exploration** | innovation, copying error, cultural drift, random contact, experimentation |

This functional grouping prevents a common modeling error: using one coefficient to make a trajectory start, accelerate, and remain locked in.

### 10.14 High-value parameter interactions

Single-parameter sweeps will miss much of the phenomenon. The following interactions are theoretically central:

1. **Reciprocal gain × damping.** Their ratio determines whether response dies out, plateaus, oscillates, or runs away.
2. **Homophily × assimilation.** Often creates internally homogeneous islands, but not necessarily opposite poles.
3. **Homophily × biased assimilation or repulsion.** Much more capable of creating genuine polarization.
4. **Identity salience × distinctiveness threat.** Similarity to an outgroup becomes a reason to move away.
5. **Moralization × leader outbidding.** Compromise becomes both personally wrong and electorally costly.
6. **Resource overlap × scarcity × indivisibility.** Similar competitors have the strongest incentive to escalate or find niches.
7. **Power asymmetry × complementary response.** Domination–submission or surveillance–concealment becomes self-reinforcing.
8. **Path reinforcement × switching cost.** Produces hysteresis: removing the original stimulus does not restore the start.
9. **Cross-cutting identity × broker protection.** Bridges matter only if brokers remain credible and safe.
10. **Threat × blame attribution × common fate.** The same shock can split or integrate.
11. **Contact rate × encounter quality.** More interaction may reconcile, habituate, arm, or humiliate.
12. **Migration × boundary hardness.** Movement can mix populations or provoke stronger boundary policing.
13. **Noise × norm tightness.** Noise can unlock conventions, but strong sanctions may extinguish variants before they spread.
14. **Response delay × gain.** Long delay can generate overshoot and oscillatory retaliation.
15. **Issue correlation × elite cues.** Separate disagreements can become one aligned cleavage.

### 10.15 Scale translation table

| Generic element | Person/couple | Community | Company | Country |
|---|---|---|---|---|
| Actor | individual | member, faction, congregation | employee, team, firm | citizen, party, state |
| Trait | attitude/behavior | norm, ritual, identity marker | routine, product, culture, strategy | policy, institution, national narrative |
| Tie | relationship/message | kinship, association, media | reporting, trade, alliance, rivalry | diplomacy, trade, alliance, border |
| Resource | attention, care, status | land, honor, membership | capital, talent, customers | territory, security, tax base, technology |
| Boundary | role/relationship label | membership and symbolic markers | organizational/legal identity | citizenship, border, national category |
| Institution | household rule/therapy | council, clergy, association | governance, HR, regulation | constitution, bureaucracy, treaty |
| Typical delay | seconds to months | days to generations | quarters to decades | years to centuries |
| Exit | end contact/relationship | migrate, apostatize, form sect | resign, spin out, divest | emigrate, secede, realign |
| Symmetric loop | insult–insult | factional purity race | feature or price race | arms or tariff race |
| Complementary loop | demand–withdraw | patron–client dependency | control–workaround | intervention–resistance |

The same parameter name can be retained across scales, but its unit, feasible range, and empirical calibration must change.

### 10.16 Experimental controls and reproducibility

Every run or batch should record:

- random seed and pseudorandom generator;
- model version and complete parameter set;
- initial-state generator or empirical snapshot;
- time-step unit and event ordering;
- number of actors, groups, dimensions, and edges;
- intervention timing;
- termination rule;
- replicate count;
- output sampling interval;
- whether results show one trajectory, an ensemble mean, distribution, or confidence interval.

Event ordering matters. “Influence, then rewire” is not always equivalent to “rewire, then influence.” A synchronous update may generate artifacts that disappear with asynchronous encounters. These are substantive assumptions and should be manipulable or at least documented.

---

## 11. What to measure

James Bramson and colleagues distinguish nine meanings commonly hidden inside the word polarization, including spread, dispersion, coverage, regionalization, community clustering, and group divergence; see [“Disambiguation of social polarization concepts and measures”](https://inferenceproject.yale.edu/sites/default/files/688938.pdf). A simulation should therefore report an outcome profile, not a single score.

### 11.1 Distributional measures

| Measure | Captures | Important limitation |
|---|---|---|
| Mean/centroid distance | Average separation between named groups | Depends on prior labels; hides internal diversity |
| Variance/dispersion | Overall spread | A broad unimodal distribution can equal a two-peak distribution |
| Bimodality coefficient / dip test | Evidence of two modes | Two camps are not guaranteed; sample-size sensitive |
| Cluster count and separation | Number and distinctness of emergent regions | Algorithm and distance metric matter |
| Within/between variance ratio | Whether variation is organized by group | Requires meaningful group definition |
| Tail/extremity share | Fraction near boundaries of an opinion scale | Scale endpoints may be arbitrary |
| Esteban–Ray polarization | Group mass combined with intergroup alienation | Requires choices about group identification and distance |
| Entropy/diversity | Variety of states or practices | High diversity can mean healthy pluralism or fragmentation |
| Cultural $F_{ST}$ | Between-group variance relative to total cultural variance | Sensitive to traits, group boundaries, and transmission assumptions |

The identity–alienation approach to polarization is formalized by Esteban and Ray and extended in [Duclos, Esteban, and Ray](https://pages.nyu.edu/debraj/Papers/DuclosEstebanRayEctrica.pdf). A cultural analogue of population differentiation is developed by Muthukrishna and colleagues in work on [Cultural $F_{ST}$](https://journals.sagepub.com/doi/10.1177/0956797620916782). Cultural distance can promote some group-level outcomes and impede others, so it is not intrinsically good or bad; see [this evolutionary-human-sciences analysis](https://www.cambridge.org/core/journals/evolutionary-human-sciences/article/why-cultural-distance-can-promote-or-impede-groupbeneficial-outcomes/E832069C5D6B6B07A7ABC77AAD76606E).

### 11.2 Network measures

| Measure | Captures | Important limitation |
|---|---|---|
| Assortativity | Tendency for similar labels/traits to connect | Can hide isolated minorities or multiple clusters |
| Modularity | Strength of community partition | High modularity is common even without antagonism |
| Cross-group edge share | Exposure or structural bridging | Tie count ignores trust and influence weight |
| Conductance/cut ratio | Ease of flow across a partition | Depends on selected partition |
| Signed balance/frustration | Consistency of friend–enemy structure | Requires meaningful negative ties |
| Reciprocity | Mutuality of directed ties/actions | Matching contact is not matching valence |
| Centralization | Concentration of attention or control | A central broker can integrate or manipulate |
| Brokerage and betweenness | Dependence on boundary spanners | Does not show whether brokers are trusted |
| Echo-chamber index | Joint concentration of similar content and ties | Definitions vary; selective exposure is not attitude change |
| Multiplex overlap | Alignment of friendship, trade, media, kinship, alliance | Data-intensive but crucial for cleavage reinforcement |

A [review of network polarization measures](https://arxiv.org/html/2207.13799v5) documents the variety of available metrics and their different assumptions. Modularity should never be reported alone as “polarization.”

### 11.3 Affect, identity, and boundary measures

- ingroup warmth and outgroup warmth measured separately;
- trust, fear, contempt, perceived threat, and willingness to cooperate;
- social distance: willingness to live, work, trade, marry, ally, or share governance;
- identity salience and centrality;
- identity overlap and social identity complexity;
- stereotype content and perceived within-group homogeneity;
- moralization and sacred-value status;
- acceptability of compromise and perceived betrayal;
- marker visibility and classification accuracy;
- boundary permeability, entry, exit, intermarriage, and dual membership;
- sanction frequency and severity for cross-boundary conduct.

Affective polarization must be decomposed into ingroup attachment and outgroup aversion. A single “feeling thermometer gap” cannot tell which changed.

### 11.4 Role, power, and material measures

Complementary schismogenesis requires outputs beyond opinion distance:

- dominance/submission, demand/withdrawal, control/evasion, care/dependency intensities;
- decision authority and agenda control;
- resource shares, wealth/income, market share, territory, capacity, and security;
- exposure to costs and ability to impose them;
- inequality indices and mobility between positions;
- dependence asymmetry and outside options;
- sanctioning and coercive events;
- rate of institutional rule changes favoring one role;
- welfare, productivity, creativity, and loss—not only difference.

The last point matters. Schismogenesis can generate innovation and strong internal coordination, or it can destroy joint value. Difference is not a welfare measure.

### 11.5 Cultural and institutional measures

- distance between trait vectors, repertoires, product portfolios, or policy bundles;
- vocabulary, dialect, style, symbol, ritual, and narrative divergence;
- norm agreement within and across groups;
- legal and policy distance;
- institutional complementarity and bundle coherence;
- standard adoption and interoperability;
- switching costs and sunk investment;
- rate of innovation, borrowing, translation, and hybridization;
- survival of variants across cohort replacement;
- organizational fissions, mergers, alliances, and federation.

### 11.6 Temporal and dynamical measures

| Measure | Question answered |
|---|---|
| Divergence velocity $dD/dt$ | How quickly is distance growing? |
| Acceleration $d^2D/dt^2$ | Is feedback strengthening or saturating? |
| Cross-lag response | Does A's change predict B's next change and vice versa? |
| Autocorrelation/memory | How persistent is each actor's state? |
| Time to threshold | How long until rupture, segregation, or a stable cluster appears? |
| Early-warning indicators | Do variance and recovery time increase near a transition? |
| Hysteresis width | How far must a control reverse before the old state returns? |
| Path sensitivity | How much do outcomes vary across seeds with identical parameters? |
| Metastable duration | How long does an apparently stable arrangement persist? |
| Recovery time | How quickly does the system return after a perturbation? |
| Event reciprocity | How often does an action elicit a matched/counterpart action within a lag window? |
| State-switch count | Does the system settle, oscillate, or repeatedly reorganize? |

### 11.7 A recommended output panel

At minimum, record:

1. group centroid distance;
2. within-group heterogeneity;
3. cluster count and bimodality;
4. network assortativity and cross-boundary tie share;
5. ingroup attachment and outgroup aversion separately;
6. role asymmetry and resource/power inequality;
7. boundary permeability and exit/entry flows;
8. institutional/cultural bundle distance;
9. total welfare or joint value and its distribution;
10. divergence velocity, time to rupture, and seed-to-seed variance.

This panel can distinguish polarized hostility, peaceful pluralism, hierarchical complementarity, fragmented diversity, and simple inequality.

---

## 12. Causal diagnostics: identifying the mechanism behind a trajectory

### 12.1 Observable signatures

| Candidate mechanism | Signature to look for | Evidence that would weaken it |
|---|---|---|
| **Symmetrical schismogenesis** | Lagged matched escalation in both directions; response weakens when one side is experimentally damped | Parallel change driven by a common external cause with little cross-lag effect |
| **Complementary schismogenesis** | A's behavior predicts growth in a different B behavior, which predicts more of A's original behavior | Stable role selection with no within-relationship change |
| **Homophilous selection** | Ties form among already-similar actors before attitudes converge | Attitudes change while the network remains fixed/random |
| **Social influence** | Individuals move toward contacts after tie formation, controlling prior similarity | Only membership turnover changes group averages |
| **Selective exit** | Mismatch predicts leaving; stayers change little | Same composition with substantial individual change |
| **Reactive differentiation** | Outgroup similarity or pressure precedes movement away on visible identity dimensions | Divergence occurs on invisible dimensions without comparison/contact |
| **Group polarization** | Like-minded discussion precedes within-person extremity shifts | Extremity predates discussion and only composition changes |
| **Boundary work** | Naming, markers, sanctions, and access discontinuities precede structural separation | Group labels remain irrelevant to interaction and resources |
| **Cultural drift** | Different replicate outcomes, stronger divergence in small isolated groups, no consistent payoff direction | Repeated convergence on the same adaptive trait under similar environments |
| **Conformist transmission** | Disproportionate adoption of local majorities and reduced within-group variance | Copying is linear or driven by prestige/payoff alone |
| **Path dependence** | Early contingency, self-reinforcing returns, rising switching cost, hysteresis | Outcome follows current payoffs quickly and reversibly |
| **Niche adaptation** | Trait distance improves performance by reducing resource overlap | Difference persists without distinct payoffs or environments |
| **Outbidding** | Within-camp leadership competition precedes harder public positions | Followers radicalize first and leaders moderate or lag |
| **Security dilemma** | Both sides report defensive motives; capabilities are ambiguous; unilateral restraint changes the other's threat response | One side has expansionist aims independent of the other's action |
| **External shock** | Synchronized change tracks exposure to a common event rather than interaction | Divergence begins before the shock or varies with reciprocal contact |
| **Power-imposed differentiation** | Classification, rules, or resource asymmetry from the stronger actor create role divergence | Difference emerges equally without institutional coercion |

### 12.2 Strong research designs

- **Longitudinal individual panels:** observe the same actors before and after interaction, membership, and exit.
- **Dynamic network panels:** model tie creation/dissolution and trait change together to separate selection from influence.
- **Relational event analysis:** estimate whether one type of action raises the near-term hazard of a matched or complementary response.
- **Cross-lagged and vector-autoregressive models:** test directional response while respecting time ordering; avoid interpreting them as automatic proof of causality.
- **Natural experiments and discontinuities:** exploit shocks, border rules, communication outages, reforms, or randomized exposure.
- **Factorial experiments:** vary identity salience, resource rivalry, signal ambiguity, and contact structure independently.
- **Matched comparative history:** pair similar starts with divergent outcomes and include convergent/negative cases.
- **Process tracing:** test whether the predicted sequence—action, interpretation, response, boundary hardening, institutionalization—actually occurred.
- **Text and discourse time series:** measure vocabulary, moralization, outgroup reference, and narrative response while validating automated measures against human interpretation.
- **Ensemble agent-based modeling:** compare rival micro-rules against the same empirical targets, not just one successful visual pattern.

### 12.3 Minimum data for calibration

A serious empirical calibration needs, where possible:

- repeated actor-level traits and public/private expressions;
- time-stamped interactions and their valence/type;
- network ties and membership changes;
- group labels and overlapping identities;
- leader messages and media exposure;
- resources, power, sanctions, and institutional decisions;
- exogenous shocks and environmental differences;
- entry, exit, migration, succession, and cohort replacement;
- several outcome dimensions, not only a polarization index.

When only aggregate time series exist, many parameter combinations will be observationally equivalent. Report parameter ranges or posterior distributions rather than pretending to identify a unique setting.

### 12.4 Validation standards for simulation research

1. **Micro-validity:** interaction rules resemble observed behavior.
2. **Input validity:** networks, populations, shocks, and parameter ranges match the target domain.
3. **Process validity:** the simulated sequence resembles the historical or experimental sequence, not only the endpoint.
4. **Output validity:** several independent statistics are reproduced.
5. **Cross-validation:** calibration and evaluation use different cases or periods.
6. **Robustness:** findings survive update order, network alternatives, noise, and plausible parameter uncertainty.
7. **Mechanism comparison:** rival models are tested against the same targets.
8. **Counterfactual discipline:** interventions operate through explicit mechanisms and state uncertainty.
9. **Replicability:** code, seed, parameter sets, and initial conditions reconstruct each result.
10. **Face validity with affected experts:** domain specialists and participants can identify missing institutions, meanings, or asymmetries without being treated as final arbiters of causality.

---

## 13. Criticisms, limits, and failure modes

### 13.1 Limits of schismogenesis as a research concept

**Sparse cumulative testing.** Despite its longevity and influence, schismogenesis has not developed into a large standardized empirical program. Thomassen's reconsideration and later case applications partly respond to this neglect.

**Elastic definition.** The word is used for reciprocal behavioral escalation, cultural differentiation, formal organizational schism, civilizational contrast, and almost any positive feedback. If every divergence is schismogenesis, the concept loses explanatory force.

**Dyad-to-system slippage.** Bateson's two-party examples are intuitively clear. A company, nation, or civilization contains many factions, networks, institutions, and external actors. Aggregating them into A and B can conceal the actual response paths.

**Power under-specification.** “Mutual” interaction can sound equal even when one party controls law, land, media, capital, or violence. Complementary schismogenesis is especially likely to naturalize an imposed hierarchy unless coercion and outside options are explicit.

**Functionalism and teleology.** Interpreting a ritual or institution as “controlling” schismogenesis can imply that it exists for system stability without evidence about origin, intention, conflict, or historical change.

**Cultural essentialism.** Describing an entire people as competitive, restrained, individualist, or holistic can flatten internal difference and reproduce an observer's categories. Bateson's Iatmul/Bali contrasts are generative theory, not timeless population parameters.

**Binary bias.** Real systems often contain several camps, nested categories, brokers, ambivalent members, and shifting coalitions. Binary visualization can manufacture the very opposition under study.

**Outcome bias.** Once a dramatic split occurs, earlier ambiguous events are re-read as steps toward it. Negative cases and counterfactual paths are needed to resist hindsight.

**Equifinality.** Reciprocal influence, drift, external adaptation, sorting, elite manipulation, and institutional inheritance can create similar endpoints. The pattern is not the mechanism.

**Endogenous measurement.** Group boundaries and dimensions of difference change during the process. A fixed index can miss reclassification or mistakenly treat a new label as a new population.

### 13.2 Limits of adjacent theories and models

**Homophily is not sufficient.** With purely assimilative averaging, homophily can sustain disagreement but does not automatically produce movement toward opposite extremes. The response rule matters.

**Negative influence is disputed.** Repulsion is plausible under threat and distinctiveness motives, but models that make every distant opinion push actors away can exaggerate extremism.

**Contact effects are heterogeneous.** Average prejudice reduction does not justify indiscriminate opposing exposure. Status, task, source, voluntariness, and institutional support change the sign.

**Agent-based generative sufficiency is weak evidence.** Many rule sets can reproduce clusters. Visual resemblance should not substitute for calibration, mechanism comparison, and out-of-sample prediction.

**Path dependence can become a just-so story.** Persistence alone does not prove increasing returns, critical juncture, or lock-in. Reversibility and the actual reinforcement process must be examined.

**Biological analogies can mislead.** Human actors interpret categories, redesign institutions, anticipate models, migrate strategically, and contest goals. Character displacement, reinforcement, and founder effects offer formal inspiration, not genetic explanations of culture.

**Macro-historical intentionality is hard to infer.** Claims that one society deliberately organized itself against another require evidence of knowledge, comparison, choice, and transmission—not merely contrasting institutions.

### 13.3 Ethical and political risks

- Labeling a group “polarized” or “extreme” may encode the modeler's preferred center.
- Simulated categories can reify fluid or imposed identities.
- Historical calibration can expose sensitive affiliation or communication data.
- A persuasive divergence model could be used to optimize manipulation, outbidding, surveillance, or destabilization.
- “Depolarization” can mean suppressing legitimate dissent or stabilizing an unjust hierarchy.
- Equal-treatment assumptions can hide asymmetric harm and responsibility.
- Stylized country or ethnic scenarios can be mistaken for predictions about real populations.
- Interactive counterfactuals need uncertainty, mechanism disclosure, and clear separation between exploration and forecast.

The normatively relevant outputs are not only distance and stability, but freedom, fairness, harm, voice, welfare, and the distribution of power.

---

## 14. Open research questions

1. When does symmetrical rivalry transform into complementary hierarchy, and when does the reverse occur?
2. Which combinations of local convergence and outgroup differentiation create durable global polarization?
3. When do similar competitors imitate one another, escalate on a shared dimension, or move into different niches?
4. How do several partially overlapping identities produce two camps, many clusters, or shifting coalitions?
5. Which bridge actors remain credible across groups, and when are they punished as traitors?
6. How do power asymmetries change reciprocal response coefficients and apparent “voluntary” complementarity?
7. What institutional designs preserve legitimate difference while stopping retaliatory escalation?
8. How do public expression, private belief, and behavior diverge under norm pressure?
9. How should models represent moralization and sacred values without simply imposing infinite utility weights?
10. When does external threat create common fate, and when does it intensify scapegoating?
11. How do migration and boundary permeability generate nonlinear reactions rather than simple mixing?
12. What early-warning indicators distinguish a reversible surge from a transition into a locked-in regime?
13. How much observed divergence is cohort replacement versus within-person or within-organization change?
14. Can models recover the historical mechanism from multiple outcomes rather than merely reconstruct an endpoint?
15. How does algorithmic selection interact with pre-existing identity, elite strategy, and offline institutions?
16. When does conflict create useful innovation or autonomy, and when does it destroy joint capacity?
17. What is the proper unit of analysis when people, organizations, and states coevolve at different time scales?
18. Can a general theory explain fusion, hybridization, plateau, fission, and runaway within one parameter space?

---

## 15. Annotated reading map

### 15.1 Start here: the core

1. **Gregory Bateson (1935), [“Culture Contact and Schismogenesis”](https://doi.org/10.2307/2789408).** The original short formulation: culture contact, cumulative differentiation, and possible outcomes.
2. **Gregory Bateson (1936/1958), [*Naven*](https://www.degruyter.com/document/doi/10.1515/9781503621138/html).** The main ethnographic and theoretical development, including control of schismogenesis and the cybernetic epilogue.
3. **Bjørn Thomassen (2010), [“Schismogenesis and schismogenetic processes”](https://forskning.ruc.dk/en/publications/schismogenesis-and-schismogenetic-processes-gregory-bateson-recon/).** The most useful compact reconsideration and disciplinary bridge.
4. **Simon Simonse, [“Mimesis, Schismogenesis and Catastrophe Theory”](https://www.academia.edu/26599097/Mimesis_Schismogenesis_and_Catastrophe_Theory).** Connects Bateson, Girard, Bali, negative feedback, and nonlinear transition; also voices important criticisms.
5. **Eric Kline Silverman (2001), [*Masculinity, Motherhood, and Mockery*](https://doi.org/10.3998/mpub.11443).** Later symbolic and psychoanalytic reinterpretation of Iatmul *naven*.
6. **Meta Gorup and Dan Podjed (2015), [“Deconstructing divisions”](https://doi.org/10.1080/14759551.2015.1075539).** Direct organizational application showing creative as well as destructive division.
7. **Hannah Harrison and Philip Loring (2014), [“Larger Than Life”](https://journals.sagepub.com/doi/10.1177/2158244014555112).** Direct application to an emergent natural-resource conflict.
8. **Ottar Brox (2000), [“Schismogenesis in the Wilderness”](https://www.tandfonline.com/doi/full/10.1080/00141840050198045).** Intra-camp leadership competition and hardening in a predator-management conflict.
9. **David Hodgson et al. (2018), [raptor–grouse conflict postprint](https://nora.nerc.ac.uk/id/eprint/520258/1/N520258PP.pdf).** Discursive positive feedback in conservation conflict.
10. **David Graeber and David Wengrow (2021), [*The Dawn of Everything*](https://theanarchistlibrary.org/library/david-graeber-and-david-wengrow-the-dawn-of-everything).** Ambitious macro-historical extension toward deliberate institutional differentiation; read with critical scrutiny.

### 15.2 Identity, distinctiveness, and boundaries

11. **Henri Tajfel and John Turner, [social identity theory chapter](https://www.demenzemedicinagenerale.net/images/mens-sana/Tajfel_e_Turner__Social_Identity_Theory.pdf).** Comparative identity, categorization, and positive distinctiveness.
12. **Marilynn Brewer (1991), [“The Social Self”](https://journals.sagepub.com/doi/10.1177/0146167291175001).** Optimal distinctiveness between inclusion and differentiation.
13. **Jonah Berger and Chip Heath (2008), [“Who Drives Divergence?”](https://pubmed.ncbi.nlm.nih.gov/18729697/).** Identity signaling and abandonment of tastes adopted by undesired groups.
14. **Fredrik Barth, ed. (1969), [*Ethnic Groups and Boundaries*](https://dn790006.ca.archive.org/0/items/EthnicGroupsAndBoundaries_201801/Ethnic%20Groups%20and%20Boundaries.pdf).** Boundary persistence rather than fixed cultural content.
15. **Andreas Wimmer (2008), [“The Making and Unmaking of Ethnic Boundaries”](https://www.journals.uchicago.edu/doi/10.1086/522803).** Strategic boundary change under institutions, power, and networks.
16. **Michèle Lamont and Virág Molnár (2002), [“The Study of Boundaries in the Social Sciences”](https://www.annualreviews.org/content/journals/10.1146/annurev.soc.28.110601.141107).** Symbolic versus social boundaries across fields.
17. **Howard Giles and colleagues, [Communication Accommodation Theory review](https://www.sciencedirect.com/science/article/abs/pii/S0388000123000360).** Convergence and divergence in language and interaction.
18. **Sharon Brehm–inspired reactance research, [modern review](https://pmc.ncbi.nlm.nih.gov/articles/PMC4675534/).** Resistance to threatened freedom as a route to contrast.
19. **Sonia Roccas and Marilynn Brewer (2002), [“Social Identity Complexity”](https://pubmed.ncbi.nlm.nih.gov/15657457/).** How overlapping identities create or reduce categorical totalization.
20. **Varmann et al. (2023), [identity-fusion meta-analysis](https://blogs.uned.es/idenfusion/wp-content/uploads/sites/553/2024/09/Varmann-et-al.-2023_How-identity-fusion.pdf).** Quantitative synthesis linking fusion with extreme pro-group orientation.

### 15.3 Polarization, moralization, and contact

21. **Shanto Iyengar et al., [review of affective polarization](https://pcl.sites.stanford.edu/sites/g/files/sbiybj22066/files/media/file/iyengar-ar-origins.pdf).** Distinguishes dislike of partisans from issue extremity.
22. **Shanto Iyengar and Sean Westwood (2015), [“Fear and Loathing across Party Lines”](https://www.jstor.org/stable/24583091).** Behavioral evidence of partisan affect and discrimination.
23. **Eli Finkel et al. (2020), [“Political sectarianism in America”](https://pcl.sites.stanford.edu/sites/g/files/sbiybj22066/files/media/file/finkel-science-political.pdf).** Othering, aversion, and moralization as a syndrome.
24. **A group-polarization experiment/review, [Myers-style mechanisms in contemporary evidence](https://pmc.ncbi.nlm.nih.gov/articles/PMC6732819/).** Persuasive arguments and social comparison after discussion.
25. **Jeremy Ginges and colleagues, [sacred values and conflict](https://pubmed.ncbi.nlm.nih.gov/25708077/).** Why ordinary material trade-offs can backfire after moralization.
26. **Christopher Bail et al. (2018), [opposing-view Twitter experiment](https://www.pnas.org/doi/10.1073/pnas.1804840115).** A prominent warning that exposure can polarize under some conditions.
27. **Andrew Guess et al. (2023), [Facebook like-minded-content experiment](https://www.nature.com/articles/s41586-023-06297-w).** Large exposure change with little measured attitudinal change.
28. **Thomas Pettigrew and Linda Tropp (2006), [intergroup contact meta-analysis](https://ideas.wharton.upenn.edu/wp-content/uploads/2018/07/Pettigrew-Tropp.pdf).** Best quantitative entry to the generally prejudice-reducing but heterogeneous contact literature.
29. **Samuel Gaertner and John Dovidio, [*Reducing Intergroup Bias*](https://www.taylorfrancis.com/books/mono/10.4324/9781315804576/reducing-intergroup-bias-samuel-gaertner-john-dovidio).** Common and dual ingroup identity.
30. **Reuters Institute, [echo chambers, filter bubbles, and polarization review](https://reutersinstitute.politics.ox.ac.uk/echo-chambers-filter-bubbles-and-polarisation-literature-review).** Clear synthesis and terminological caution.

### 15.4 Culture, networks, and formal models

31. **Robert Axelrod (1997), [“The Dissemination of Culture”](https://journals.sagepub.com/doi/10.1177/0022002797041002001).** Local convergence producing global cultural regions.
32. **Pranav Dandekar, Ashish Goel, and David Lee (2013), [“Biased assimilation, homophily, and the dynamics of polarization”](https://www.pnas.org/doi/10.1073/pnas.1217220110).** Essential proof that homophily plus averaging is insufficient and biased assimilation changes the result.
33. **Rainer Hegselmann / Ulrich Krause and Deffuant traditions, [bounded-confidence review](https://arxiv.org/html/0707.1762v2).** Confidence thresholds and cluster formation.
34. **Andreas Flache and Michael Macy (2011), [“Small Worlds and Cultural Polarization”](https://www.tandfonline.com/doi/full/10.1080/0022250X.2010.532261).** Assimilation plus negative influence in networks.
35. **Petter Holme and Mark Newman (2006), [coevolution of networks and opinions](https://arxiv.org/abs/physics/0603023).** Rewiring–influence transition between consensus and fragmentation.
36. **Thomas Schelling (1971), [“Dynamic Models of Segregation”](https://www.stat.berkeley.edu/~aldous/157/Papers/Schelling_Seg_Models.pdf).** Macro-segregation emerging from local preferences.
37. **Mark Granovetter (1978), [“Threshold Models of Collective Behavior”](https://pdodds.w3.uvm.edu/files/papers/others/1978/granovetter1978a.pdf).** Small differences in threshold distributions create radically different cascades.
38. **Seth Marvel et al. (2011), [continuous structural-balance dynamics](https://pmc.ncbi.nlm.nih.gov/articles/PMC3033300/).** Formal route from signed relations to antagonistic camps.
39. **Joseph Henrich (1998), [conformist transmission and between-group differences](https://www.sciencedirect.com/science/article/abs/pii/S109051389800018X).** Cultural mechanism for local homogeneity and group variation.
40. **Nicole Creanza, Oren Kolodny, and Marcus Feldman (2017), [cultural evolutionary theory review](https://pmc.ncbi.nlm.nih.gov/articles/PMC5544263/).** Broad, accessible survey of cultural inheritance and evolution.

### 15.5 Institutions, organizations, and countries

41. **Paul Pierson (2000), [“Increasing Returns, Path Dependence, and the Study of Politics”](https://www.critical-juncture.net/uploads/2/1/9/9/21997192/pierson_increasing_returns.pdf).** Reinforcement, timing, sequence, and political lock-in.
42. **Giovanni Capoccia and R. Daniel Kelemen (2007), [“The Study of Critical Junctures”](https://www.critical-juncture.net/uploads/2/1/9/9/21997192/capoccia_and_keleman_the_study_of_critical_junctures.pdf).** How periods of expanded choice initiate institutional paths.
43. **David Deephouse (1999), [“To Be Different, or to Be the Same?”](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2269232).** Strategic balance between legitimacy and competition.
44. **Jens Beckert (2010), [“Institutional Isomorphism Revisited”](https://pure.mpg.de/rest/items/item_1232069_5/component/file_1837298/content).** Why diffusion mechanisms can produce convergence or divergence.
45. **Peter Hall and David Soskice, eds. (2001), [*Varieties of Capitalism*](https://hall.scholars.harvard.edu/publications/varieties-capitalism-institutional-foundations-comparative-advantage).** Reinforcing institutional complementarities across national economies.
46. **Dora Lau and Keith Murnighan (1998), [“Demographic Diversity and Faultlines”](https://www.jstor.org/stable/259377).** Aligned attributes and latent organizational subgroup splits.
47. **Matthew Derfus et al. (2008), [“The Red Queen Effect”](https://www.researchgate.net/publication/255643349_The_Red_Queen_Effect_Competitive_Actions_And_Firm_Performance).** Competitive action–response evidence across firms.
48. **Glenn Carroll and Anand Swaminathan (2000), [resource partitioning and specialist organizations](https://www.journals.uchicago.edu/doi/10.1086/320821).** Differentiated niches in concentrated markets.
49. **Robert Jervis (1978), [“Cooperation under the Security Dilemma”](https://www.cambridge.org/core/journals/world-politics/article/cooperation-under-the-security-dilemma/C8907431CCEFEFE762BFCA32F091C526).** Defensive action, mutual insecurity, and conditions that damp the spiral.
50. **Barry Posen, [“The Security Dilemma and Ethnic Conflict”](https://ssp.mit.edu/publications/1997/the-security-dilemma-and-ethnic-conflict).** Extends strategic uncertainty to emerging groups after political collapse.

### 15.6 Measurement and biological/mathematical analogies

51. **James Bramson et al. (2016), [polarization concepts and measures](https://inferenceproject.yale.edu/sites/default/files/688938.pdf).** Essential protection against single-metric thinking.
52. **Joan Esteban and Debraj Ray tradition, [Duclos–Esteban–Ray measure](https://pages.nyu.edu/debraj/Papers/DuclosEstebanRayEctrica.pdf).** Identity mass and alienation rather than variance alone.
53. **Michael Muthukrishna et al. (2020), [Cultural $F_{ST}$](https://journals.sagepub.com/doi/10.1177/0956797620916782).** Quantifies cultural differentiation within and between groups.
54. **Matthew DiPrete and Gregory Eirich (2006), [cumulative advantage review](https://pmc.ncbi.nlm.nih.gov/articles/PMC4659671/).** General treatment of compounding advantage and inequality.
55. **David Pfennig and Karin Pfennig (2012), [character-displacement review](https://pmc.ncbi.nlm.nih.gov/articles/PMC3279117/).** Biological differentiation under competition, with clear conditions and evidence.
56. **Reinforcement literature, [review of reproductive isolation](https://academic.oup.com/cz/article/62/2/145/1745931).** Costs of hybridization strengthening boundaries; analogy only for social use.
57. **Red Queen biology, [coevolutionary review](https://pmc.ncbi.nlm.nih.gov/articles/PMC4240979/).** Reciprocal adaptation and escalation in host–parasite systems.
58. **US National Human Genome Research Institute, [founder effect](https://www.genome.gov/genetics-glossary/Founder-Effect).** Clear baseline for the biological concept before making cultural analogies.

---

## 16. Bottom line

Schismogenesis is most powerful as a question:

> **What does each side's last move make more likely on the other side, and what makes that response persist into the next round?**

To explain how similar actors become different, that question must be combined with four others:

1. Who interacts with whom, and who leaves?
2. Which differences become identities and enforceable boundaries?
3. Which material and institutional returns compound early choices?
4. Which shocks, counter-circuits, and cross-cutting ties redirect the path?

The resulting research program is not a single polarization model. It is a family of models in which recursive response, network selection, cultural transmission, power, competition, institutions, and chance can be varied separately and then recombined. That separation is what makes simulated divergence interpretable rather than merely dramatic.

---

## 17. Further related concepts and mechanisms

This section extends the first map into several literatures that are especially close to schismogenesis but often use different language.

### 17.1 Reciprocal radicalization and cumulative extremism

The literature on **reciprocal radicalization** or **cumulative extremism** asks whether opposing radical organizations feed one another's recruitment, narratives, and tactics. An attack, provocation, or media claim by one side becomes evidence for the other's worldview; that response then validates the first side.

The strongest conceptual lesson is that at least three outcomes must be separated:

1. **organizational mobilization:** membership, donations, attention, or activist activity grows;
2. **ideological radicalization:** attitudes or goals move toward less compromising positions;
3. **tactical escalation:** actors become more willing to use disruption or violence.

These outcomes can move independently. One side may strategically exploit the other's action without its members becoming more ideologically extreme. A useful overview from the University of Oslo's Center for Research on Extremism is [Busher and colleagues on reciprocal radicalization](https://www.sv.uio.no/c-rex/english/news-and-events/right-now/2018/reciprocal-radicalisation.html). A case study of far-right response to Islamist violence found strategic use of adversary events and narratives but cautioned against assuming a simple automatic cycle; see [“Reciprocal Radicalisation as a Strategic Choice?”](https://radicalisationresearch.org/research/mcgarry-reciprocal-radicalisation-strategic-national-action/). Broader reviews of online radicalization also stress that evidence is more heterogeneous than the popular “rabbit hole” story suggests; see [Marwick, Clancy, and Furl](https://citap.pubpub.org/pub/jq7l6jny).

Simulation additions:

- `adversary_event_salience`: how visible the other side's acts are;
- `narrative_confirmation_gain`: how much an adversary act raises confidence in an existing story;
- `recruitment_response_gain`: recruitment caused by adversary action;
- `tactical_imitation`: probability of copying the adversary's method;
- `tactical_counterinnovation`: probability of inventing an asymmetric response;
- `radicalization_state`: separate belief, identity, and willingness-to-act dimensions;
- `within_camp_competition`: leadership or purity rivalry inside each side;
- `state_response`: repression, accommodation, surveillance, or neutrality as a third actor;
- `audience_attention`: media/public reward for dramatic events.

The state and wider audience must be explicit. A two-group model misses how policing, news attention, courts, donors, and bystanders reshape the payoff of every move.

### 17.2 Movements and countermovements

Social-movement research treats opposition as an evolving political field rather than a pair of private attitudes. A movement can create the issues, identities, organizations, and threats that enable a countermovement. The countermovement then changes the first movement's tactics, framing, coalitions, and access to institutions.

Meyer and Staggenborg's foundational [“Movements, Countermovements, and the Structure of Political Opportunity”](https://doi.org/10.1086/230869) emphasizes ongoing interaction through a shared political environment. Important mechanisms include:

- tactical adaptation and imitation;
- framing contests over the meaning of events;
- venue shopping across courts, elections, workplaces, markets, and streets;
- state repression or certification;
- countermobilization created by a movement's apparent success;
- shifts in allies, resources, and public attention;
- organizational competition within each side.

This literature corrects a Batesonian weakness: the interaction is at least triangular—movement, countermovement, and authority—and usually includes a fourth actor, the public or media audience.

### 17.3 Radical flanks

A radical faction can alter how audiences evaluate a more moderate faction pursuing related goals. The effect is not fixed:

- **positive radical-flank effect:** moderates look reasonable by contrast, or authorities concede to them to undercut radicals;
- **negative radical-flank effect:** the entire movement is stigmatized, repressed, or associated with violence;
- **mobilization effect:** radicals draw attention and committed participants;
- **demobilization effect:** repression or fear reduces participation.

Experiments find that radical flanks can increase support for moderates under some conditions; see [Simpson, Willer, and Feinberg 2022](https://academic.oup.com/pnasnexus/article/1/3/pgac110/6633666). A systematic review finds positive effects are frequent but negative effects are also common, especially around violence; see [Chamberlain 2025](https://link.springer.com/article/10.1007/s42087-025-00485-y). The appropriate parameters are therefore conditional, not a universal “radicalism helps” coefficient:

- `flank_distance_from_moderates`;
- `flank_tactic_violence`;
- `moderate_flank_distinguishability`;
- `audience_cause_sympathy`;
- `state_repression_discrimination`: whether authorities distinguish factions;
- `contrast_benefit` and `stigma_spillover` as separate effects.

### 17.4 Realistic, symbolic, and distinctiveness threats

Intergroup threat theory separates several perceived threats:

- **realistic threat:** resources, physical security, power, jobs, territory;
- **symbolic threat:** values, religion, language, norms, worldview;
- **intergroup anxiety:** uncertainty or fear about interaction;
- **negative stereotypes:** expectations that the other group is dangerous or untrustworthy;
- **group-esteem threat:** damage to collective status or moral worth;
- **distinctiveness threat:** fear that the group's uniqueness will disappear.

A major [meta-analysis by Riek, Mania, and Gaertner](https://pubmed.ncbi.nlm.nih.gov/17201592/) links these threats to negative outgroup attitudes. The categories improve on one `threat_intensity` slider because they imply different responses. Realistic scarcity may be eased by division or compensation; symbolic threat may intensify when compromise looks like identity erasure; distinctiveness threat can make increasing similarity provoke divergence.

Muzafer Sherif's Robbers Cave studies are the classic realistic-conflict illustration: competition generated hostility and cooperative superordinate goals reduced it. The studies were historically influential but involved a narrow sample, strong experimenter intervention, ethical problems, and possible confirmation bias. Treat them as mechanism-generating evidence, not a universal law.

### 17.5 Competitive victimhood

Groups in protracted conflict often compete over who has suffered more, whose suffering is recognized, and whose violence is justified as defensive. **Competitive victimhood** can:

- protect moral identity;
- demand exclusive empathy or restitution;
- minimize harms committed by the ingroup;
- make acknowledgment of the other side feel like status loss;
- turn reconciliation into a contest over narrative priority.

Young and Sullivan's [review](https://www.sciencedirect.com/science/article/abs/pii/S2352250X16300288) finds the construct across intractable conflict, structural inequality, and relations among minority groups. A Kosovo study found that inclusive victim consciousness and acknowledgment could reduce competitive victimhood; see [Andrighetto et al.](https://boa.unimib.it/retrieve/handle/10281/26364/148543/j.1467-9221.2012.00887.x.pdf).

Useful controls:

- `collective_victim_memory` and its decay;
- `harm_acknowledgment_rate`;
- `victimhood_status_reward`;
- `moral_defensiveness`;
- `comparative_suffering_bias`;
- `shared_victim_category_strength`;
- `perpetrator_acknowledgment_cost`;
- separate objective harm histories from perceived/remembered harm.

### 17.6 Reactive devaluation and naïve realism

**Reactive devaluation** means that a proposal loses value because it is attributed to an adversary. Identical content can be evaluated differently depending on its alleged source. The classic conflict-resolution account is [Ross on reactive devaluation](https://law.stanford.edu/index.php?webauth-document=child-page%2F370999%2Fdoc%2Fslspublic%2FReactive+Devaluation.pdf); an experiment found that an identical peace proposal was valued differently when labeled Israeli or Palestinian in origin, [Maoz et al. 2002](https://journals.sagepub.com/doi/10.1177/0022002702046004003).

**Naïve realism** adds a three-part belief: I see the world objectively; reasonable informed people should agree; disagreement therefore implies ignorance, bias, or bad faith. Combined with reactive devaluation, every concession from the other side can look like a trap, while every rejection confirms their unreasonableness.

Simulation additions:

- `source_label_weight` versus `proposal_content_weight`;
- `reactive_devaluation_strength`;
- `assumed_self_objectivity`;
- `disagreement_bad_faith_attribution`;
- `anonymous_proposal_probability`;
- `trusted_mediator_credibility`;
- `concession_suspicion`: how much an unexpected concession raises inferred hidden cost.

This mechanism can generate stalled negotiation without increasing underlying policy distance. It should therefore affect acceptance, trust, and inferred intent separately from private preference.

### 17.7 False polarization, meta-perceptions, and pluralistic ignorance

Actors respond not only to what others believe, but to what they *think* others believe and what they think others think about them.

- **False polarization:** perceived between-group distance exceeds actual distance.
- **Negative meta-perception:** a group overestimates how negatively the outgroup views it.
- **Pluralistic ignorance:** members misperceive their own group's private norm, often because public behavior is strategic or conformist.
- **False consensus:** people overestimate how widely others share their own view.

[Fernbach and Van Boven's review](https://www.philipfernbach.com/s/Fernbach-Van-Boven-False-Polarization-dc7k.pdf) explains how exaggerated perceived difference can inhibit compromise and then produce real divergence. Moore-Berg and colleagues show that [exaggerated partisan meta-perceptions predict hostility](https://www.pnas.org/doi/10.1073/pnas.2001263117). Mernyk and colleagues found large overestimation of out-party support for violence and reductions after correction in their studies, [PNAS 2022](https://www.pnas.org/doi/10.1073/pnas.2116851119).

The correction literature is not uniformly positive. Other preregistered work finds that correcting beliefs about opponents does not robustly reduce undemocratic attitudes or violence support; see [Druckman et al. 2023](https://www.pnas.org/doi/10.1073/pnas.2308938120) and [Dias et al. 2024](https://academic.oup.com/pnasnexus/article/3/8/pgae304/7730165). Belief accuracy, affect, and behavior are distinct outcomes.

Minimum state expansion:

- `private_position[i]`;
- `public_position[i]`;
- `belief_about_group_mean[i,g]`;
- `belief_about_outgroup_view_of_us[i,g]`;
- `perceived_outgroup_violence[i,g]`;
- `norm_conformity_pressure`;
- `preference_falsification_cost`;
- `metaperception_error_variance` and systematic bias;
- `correction_reach`, `correction_credibility`, and `correction_decay`.

A simulator that stores only one “opinion” per actor cannot represent false polarization.

### 17.8 Hostile-media perception

Strong partisans can interpret the same balanced coverage as biased against their side. A meta-analysis reviews this [hostile-media effect](https://doi.org/10.1080/08824096.2011.565280). This is schismogenetic when perceived bias drives selection into friendlier sources, encourages leaders to attack neutral institutions, and causes neutral coverage to lose cross-group credibility.

Relevant parameters:

- `media_reach` and perceived reach;
- `source_group_label`;
- `content_balance`;
- `hostile_media_bias` by identity strength;
- `friendly_source_selection`;
- `institutional_trust`;
- `shared_source_fraction`;
- `elite_attack_on_referee` and its effect on source trust.

### 17.9 Fission–fusion dynamics

Fission is not always permanent schism. Many social systems repeatedly divide into subgroups and recombine. A modern framework treats **fission–fusion dynamics** as a continuous property of complex adaptive systems rather than a label for one type of society; see [Madsen and de Silva 2024](https://royalsocietypublishing.org/rstb/article/379/1909/20230175/42833/Societies-with-fission-fusion-dynamics-as-complex).

This adds several controls absent from fixed-group models:

- `subgroup_formation_rate` and `subgroup_dissolution_rate`;
- `temporary_fission_threshold` versus `permanent_fission_threshold`;
- `fusion_opportunity_rate`;
- `subgroup_size_cost_curve`;
- `resource_patchiness` and travel cost;
- `cross_subgroup_memory`;
- `identity_persistence_during_separation`;
- `coalition_recombination_flexibility`;
- `seasonality`.

Temporary separation can reduce conflict by lowering interaction pressure, or increase divergence by allowing local norms to drift. The sign depends on memory, mixing, and boundary persistence.

### 17.10 Language convergence, divergence, and vitality

Language is an unusually observable identity marker. Communication Accommodation Theory distinguishes:

- convergence toward an interlocutor;
- maintenance of one's style;
- divergence away from an interlocutor;
- over-accommodation that can feel patronizing or identity-threatening.

Long-term contact can produce dialect leveling, koineization, bilingual borrowing, language shift, or deliberate maintenance. A recent [review of accommodation and language contact](https://journals.sagepub.com/doi/10.1177/00238309241246200) and an [Annual Review article on migration and dialect contact](https://www.annualreviews.org/doi/pdf/10.1146/annurev-linguistics-011516-034108) show why mobility is not a simple homogenizer.

**Ethnolinguistic vitality** describes a language group's ability to persist through status, demographics, institutional support, cohesion, and intergenerational transmission; see this [review](https://www.tandfonline.com/doi/full/10.1080/01434632.2010.541913). Public signs and institutional visibility can signal relative status; see [Landry and Bourhis on linguistic landscape](https://journals.sagepub.com/doi/10.1177/0261927X970161002).

Useful parameters:

- `short_term_accommodation`;
- `identity_divergence_in_speech`;
- `feature_salience`: visibility of accent/lexicon/grammar;
- `prestige_of_variety`;
- `speaker_population` and age structure;
- `intergenerational_transmission`;
- `institutional_language_support`;
- `bilingualism_rate`;
- `mobility_and_contact`;
- `language_shift_cost`;
- `public_sign_visibility`;
- `dialect_leveling_rate`;
- `innovation_diffusion_rate`.

### 17.11 Gradual institutional divergence

Institutional systems can diverge without dramatic constitutional breaks. Historical institutionalism distinguishes several gradual modes:

- **displacement:** old rules are replaced by alternatives;
- **layering:** new rules are added alongside old ones and change their operation;
- **drift:** formal rules stay fixed while the environment changes their effect;
- **conversion:** actors redirect old rules to new purposes;
- **exhaustion:** an institution undermines the conditions needed for its reproduction.

Mahoney and Thelen's framework is summarized in [Gerschewski's review of institutional-change explanations](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/781D6F3867B4A20CBDED2CF9E2AF643B/S0003055420000751a.pdf/explanations-of-institutional-change-reflecting-on-a-missing-diagonal.pdf). These mechanisms are ideal for a country/company simulator because two systems can retain the same formal rule and nevertheless diverge through drift or conversion.

Simulation additions:

- `rule_form` and `rule_effect` as separate state;
- `environment_rule_mismatch`;
- `layer_addition_rate`;
- `old_new_rule_weight`;
- `conversion_discretion`;
- `enforcement_gap`;
- `institutional_exhaustion_rate`;
- `veto_capacity`;
- `change_agent_type` and power;
- `compliance_rate` rather than assuming rules execute automatically.

### 17.12 Policy feedback and reactive sequences

Policy is both an outcome and an input. It redistributes resources, defines membership, teaches citizens what government is, creates organizations, and changes participation. A quantitative review of policy effects on mass publics is [Larsen 2019](https://erikgahner.dk/pub/2019review.pdf). A 2026 systematic review of 183 articles warns that many studies invoke “policy feedback” without actually completing the feedback loop from policy to politics back to policy; see [Shin 2026](https://onlinelibrary.wiley.com/doi/10.1111/ropr.70095).

Policy feedback may be:

- **self-reinforcing:** creates beneficiaries and capacity that defend expansion;
- **self-undermining:** generates costs, contradictions, or opponents that weaken it;
- **mixed:** different constituencies receive opposite resource and interpretive signals.

James Mahoney distinguishes self-reinforcing paths from **reactive sequences**, in which each event is a reaction to the previous event and may transform or reverse it; see [“Path Dependence in Historical Sociology”](https://www.jstor.org/stable/3108585). Reactive sequences are especially close to schismogenesis, but the chain need not reproduce the same pattern each round.

Parameters:

- `policy_resource_effect` by group;
- `policy_interpretive_effect` by group;
- `beneficiary_organization_rate`;
- `countermobilization_rate`;
- `implementation_visibility`;
- `administrative_burden`;
- `feedback_to_next_policy`;
- `self_undermining_cost_growth`;
- `reaction_chain_transition_matrix`.

### 17.13 Organizational imprinting, spinouts, and reimprinting

Organizations formed in similar industries can diverge because founding conditions create durable imprints. Marquis and Tilcsik's [multilevel review of imprinting](https://www.hbs.edu/ris/Publication%20Files/13-061_fa850975-750a-49b2-a6b6-f1008ce21502.pdf) distinguishes imprinting from generic path dependence: a sensitive period stamps characteristics that persist even after the environment changes.

Employee spinouts complicate the story. New firms inherit routines, knowledge, networks, and personnel from parent firms, but may form precisely because founders reject a parent decision. The spinout therefore begins similar and intentionally differentiates. A [review of employee spinouts](https://onlinelibrary.wiley.com/doi/10.1111/joes.12540) documents inherited strategies and capabilities.

Additional controls:

- `founding_sensitive_period_length`;
- `environmental_imprint_strength`;
- `founder_value_imprint`;
- `member_carrier_retention`;
- `parent_routine_inheritance`;
- `parent_rejection_strength`;
- `reimprinting_rate` during later crises;
- `imprint_environment_fit`;
- `employee_mobility_network`;
- `spinout_market_overlap`.

---

## 18. Mechanism modules for controlled simulation experiments

The following are deliberately sparse “laboratory modules.” They are not empirical presets. Start with only the listed mechanisms active, establish the outcome, then add one module at a time. This prevents a visually impressive but causally opaque all-mechanisms model.

| Module | Active controls | Characteristic output | Critical comparison |
|---|---|---|---|
| **Pure drift/founder** | small founder sample, copying error, isolation, no payoff difference | Different runs select different arbitrary traits | Increase population/mixing; divergence should weaken |
| **Symmetrical Bateson** | same-dimension cross-response gain, delay, damping, saturation | matched escalation, plateau, oscillation, or runaway | Turn off one cross-response direction |
| **Complementary Bateson** | off-diagonal response matrix, power asymmetry, role payoffs | dominance–submission or demand–withdrawal intensifies | Hold composition fixed and test cross-lag role effects |
| **Homophily plus assimilation** | tie preference, local averaging, optional rewiring | internally similar clusters; not necessarily extremes | Compare with a fixed random network |
| **Bounded confidence** | assimilation, confidence radius | one or several stable opinion clusters | Sweep threshold; look for cluster transitions |
| **Reactive distinctiveness** | outgroup comparison, distinctiveness threat, repulsion on identity markers | difference grows specifically on visible identity dimensions | Remove group labels while keeping content identical |
| **False polarization** | private/public split, norm pressure, meta-perception bias | perceived distance exceeds private distance; may become self-fulfilling | Provide credible norm information without changing payoffs |
| **Movement–countermovement** | framing, tactical adaptation, state response, public attention | alternating mobilization and venue shifts | Remove/neutralize state certification or repression |
| **Radical flank** | moderate/radical factions, contrast benefit, stigma spillover | moderate support can rise or fall | Vary faction distinguishability and violence |
| **Resource conflict** | scarcity, overlap, indivisibility, zero-sum perception | hostility/escalation around shared resource | Hold scarcity fixed and change divisibility/compensation |
| **Niche differentiation** | competition increasing with similarity, benefit from distance | specialization reduces direct rivalry | Remove performance benefit of distance |
| **Security dilemma** | ambiguous intent, offense–defense balance, fear, armament response | mutual arming despite defensive preferences | Make defensive action distinguishable |
| **Institutional lock-in** | increasing returns, switching cost, policy feedback, institutional memory | early random differences persist; hysteresis | Reverse original payoff and measure delayed switching |
| **Gradual institutional divergence** | layering, drift, conversion, enforcement discretion | same formal rule produces different effects | Track rule text and rule effect separately |
| **Fission–fusion** | temporary subgrouping, resource patchiness, fusion opportunities | repeated split/recombine; local norm drift | Change separation duration and cross-subgroup memory |
| **Language divergence** | accommodation, identity signaling, prestige, intergenerational transmission | local convergence or deliberate marker separation | Remove audience/group-label salience |
| **Organizational spinout** | inherited routines, parent rejection, founder imprint, market overlap | high initial similarity followed by selective divergence | Compare spinout with de novo entrant |
| **Contact/cooperation** | cross-group ties, equal status, common goal, institutional support | reduced hostility or common identity | Replace cooperation with competitive exposure |

### 18.1 Normalized control convention

For exploratory use, a transparent normalized convention is:

- `0.00`: mechanism absent;
- `0.25`: weak;
- `0.50`: moderate;
- `0.75`: strong;
- `1.00`: near the modeled maximum.

This is a user-control convention, not a claim that psychological or political quantities are naturally linear. Internally, map controls to appropriate functions:

- probabilities through a bounded logistic transform;
- gains through nonnegative or signed coefficients;
- durations through log-scaled time;
- thresholds in the same units as trait distance;
- heavy-tailed power/resources through explicit distributions;
- categorical institutional rules through discrete transitions.

### 18.2 Derived control ratios

These composites are useful diagnostics. They are not validated universal indices.

**Runaway ratio**

$$
R_{run}=\frac{\text{effective reciprocal gain}}{\text{effective damping}}
$$

Values above the relevant stability threshold indicate amplification, but the threshold depends on response matrices, delays, and nonlinearities.

**Sorting pressure**

$$
R_{sort}=\frac{\text{homophily}\times\text{rewiring}\times\text{boundary hardness}}
{\text{cross-group contact}\times\text{bridge retention}+\epsilon}
$$

**Lock-in pressure**

$$
R_{lock}=\text{increasing returns}\times\text{switching cost}\times\text{institutional memory}
$$

**False-polarization gap**

$$
G_{false}=D_{perceived}-D_{private}
$$

**Cleavage alignment**

Use the leading eigenvalue, average absolute correlation, or mutual information among identity and issue dimensions. High alignment means multiple differences reinforce the same camps.

**Boundary reproduction balance**

$$
B_{rep}=\text{conformity}+\text{sanctions}+\text{inheritance}
-\text{permeability}-\text{mixing}-\text{hybridization}
$$

These quantities help explain why the same change has different effects across regimes. Increasing contact may be too small to matter when sorting and sanctions dominate; reducing a shock may not reverse a highly locked-in institution.

### 18.3 Factorial experiments worth running

1. reciprocal gain × damping × response delay;
2. homophily × assimilation × repulsion;
3. identity salience × distinctiveness threat × group-label visibility;
4. private–public gap × norm pressure × correction credibility;
5. scarcity × divisibility × zero-sum perception;
6. power asymmetry × complementary response × exit options;
7. outbidding × audience attention × faction distinguishability;
8. increasing returns × switching costs × shock reversal;
9. cross-cutting identities × bridge protection × boundary sanctions;
10. temporary fission duration × memory × fusion opportunity;
11. language prestige × mobility × institutional support;
12. state repression × movement tactics × public sympathy.

For each experiment, run many seeds and report the full outcome distribution. Near thresholds, the variance across runs is often the substantive result.

---

## 19. Data sources for calibration and historical comparison

The sources below can ground initial states, parameter ranges, or outcome validation. Coverage and access conditions change; the descriptions reflect the official sources available as of August 2026.

### 19.1 People, values, parties, and institutions

| Source | Unit/coverage | Useful for | Cautions |
|---|---|---|---|
| [World Values Survey Wave 7](https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp) | Repeated cross-national individual survey; final Wave 7 release covers 66 countries/territories, 2017–2022 | Values, trust, identity, religion, attitudes toward institutions/outgroups | Repeated cross-sections are not individual trajectories; item equivalence and country sampling matter |
| [European Social Survey](https://www.europeansocialsurvey.org/data-portal) | Repeated high-quality European population surveys | Social/political trust, identity, immigration attitudes, media, values | Geographic scope; rotating modules; harmonization does not erase context |
| [Comparative Study of Electoral Systems](https://cses.org/data-download/cses-module-5-2016-2021/) | Post-election surveys plus macro/institutional data; Module 5 covers 2016–2021 | Voters, parties, elites, outgroups, national identity, populist attitudes | Election context; different national fieldwork organizations |
| [Manifesto Project](https://manifesto-project.wzb.eu/) | Party manifestos and coded positions across countries/elections; current site release 2025a | Party trajectory, issue salience, textual/ideological distance, outbidding | Registration required for download; coding and manifesto genre introduce measurement error |
| [Chapel Hill Expert Survey](https://www.chesdata.eu/ches-europe/) | European party positions over repeated waves, with a 1999–2024 trend file | Party-system distance, issue alignment, salience, leadership position | Expert estimates, not voter beliefs or behavior; uncertainty should be retained |
| [V-Dem v16](https://www.v-dem.net/data/the-v-dem-dataset/) | Country-year institutional indicators and democracy indices | Institutional divergence, polarization of political society, civil society, media, repression | Many indicators are latent estimates from experts; use uncertainty intervals and codebook |

Good combinations:

- **citizen–party divergence:** WVS/ESS/CSES individuals + Manifesto or CHES parties;
- **identity sorting:** survey party identity + religion/class/place/education correlations;
- **policy feedback:** survey attitudes before/after policy + V-Dem/institutional variables;
- **party outbidding:** party text/CHES positions + election results + leader changes.

### 19.2 Conflict, security, and international interaction

| Source | Unit/coverage | Useful for | Cautions |
|---|---|---|---|
| [UCDP Download Center](https://ucdp.uu.se/downloads/) | State-based, non-state, one-sided, dyadic, and georeferenced conflict; v26.1 reaches 2025 | Conflict onset/escalation, actor dyads, fatalities, geography, peace processes | Fatal-event threshold and coding rules; violence is not all conflict; reporting varies |
| [SIPRI Military Expenditure](https://www.sipri.org/databases/milex) | Country-year military spending, 1949–2025 in the 2026 release | Arms-race levels, burden, response lags, damping/capacity | Spending is not capability or intent; accounting comparability varies |
| [SIPRI Arms Transfers](https://www.sipri.org/databases/armstransfers) | Major conventional arms transfers since 1950 | Alliance/support networks, capability shocks, external reinforcement | Excludes many small arms and domestic production; transfer-trend indicator is not market price |
| [GDELT](https://www.gdeltproject.org/data.html) | Machine-coded global news events and mentions; historical coverage from 1979, GDELT 2.0 updated frequently | Diplomatic action–reaction, protest/counterprotest, media tone, event visibility | News and machine-coding bias; duplicate/ambiguous events; coverage volume changes over time |
| [Media Cloud](https://www.mediacloud.org/) | Searchable global digital-news archive and source directory | Framing, vocabulary, narrative divergence, issue attention, hyperlink/source networks | Not a complete census of media; source coverage and extraction change; respect content access terms |

For security dilemmas, join dyadic SIPRI spending/transfer data to diplomatic events and alliances, then estimate whether A's change predicts B's subsequent change after shared shocks. Do not infer defensive intent from spending alone.

### 19.3 Networks, communities, and segregation

| Source | Unit/coverage | Useful for | Cautions |
|---|---|---|---|
| [Social Capital Atlas](https://www.socialcapital.org/) | Privacy-protected aggregates derived from 21 billion Facebook friendship links across US places/schools/colleges | Economic connectedness, cross-class ties, cohesion, civic engagement | Platform users and inferred ties are not the full population; aggregate data cannot identify individual influence |
| [Opportunity Insights data repository](https://opportunityinsights.org/paper/social-capital-i-measurement-and-associations-with-economic-mobility/) | Place-level social capital and mobility research files | Bridging, economic segregation, community opportunity | US-focused; causal direction between networks and mobility is complex |
| [GH Archive](https://www.gharchive.org/) | Public GitHub event stream, available hourly and in BigQuery | Open-source project fission, forks, contributor migration, coordination, rivalry | Only public GitHub behavior; bots and platform rule changes; a fork is not necessarily a social schism |

Community models need longitudinal tie formation and dissolution. Aggregate cross-sectional connectedness can calibrate topology, but not assimilation, repulsion, or rewiring rates by itself.

### 19.4 Culture, language, and long-run history

| Source | Unit/coverage | Useful for | Cautions |
|---|---|---|---|
| [D-PLACE](https://d-place.org/) | Cultural, linguistic, environmental, and geographic data for more than 2,000 documented cultural groups | Cultural distance, ecology, ancestry, neighboring groups, comparative trait packages | Historical ethnographic coding; societies are not independent observations; dates and colonial contexts vary |
| [Glottolog](https://glottolog.org/) | Catalogue/classification of languages, families, and dialects with stable identifiers; downloadable releases | Linguistic ancestry, geographic proximity, lineage-aware comparison | Classification reflects available scholarship and uncertainty; not a time series of language change |
| [WALS Online](https://wals.info/download) | Structural language features; finished dataset served as v2020.4 under CC BY | Cross-language trait distance, geography, typological clusters | Sparse/nonrandom feature coverage; it does not measure current speakers' identity or attitudes |
| [Seshat Global History Databank](https://seshat-db.com/) | Long-run coded social and political organization of historical polities | Institutional trajectories, hierarchy, warfare, religion, polity scale | Coverage/coding uncertainty; download license includes restrictions—verify the current terms before use |

Comparative cultural analysis must control for **Galton's problem**: similarity may come from common ancestry or diffusion rather than independent adaptation. D-PLACE's linkage to linguistic phylogenies and ecology helps, but does not solve causal identification automatically.

### 19.5 Companies, technologies, and knowledge communities

| Source | Unit/coverage | Useful for | Cautions |
|---|---|---|---|
| [SEC EDGAR APIs and bulk files](https://www.sec.gov/search-filings/edgar-application-programming-interfaces) | US public-company filings, submissions, and XBRL company facts; bulk files rebuilt nightly | Strategy language, risk narratives, financial/resource trajectories, mergers/spinouts | Public US filers only; filings are strategic/legal documents; obey SEC fair-access rules |
| [USPTO PatentsView / Open Data Portal](https://www.uspto.gov/ip-policy/economic-research/patentsview) | Disambiguated patents, inventors, organizations, and locations; migrated to USPTO ODP in 2026 | Technological distance, inventor mobility, spinout inheritance, innovation niches | Patent propensity differs by industry; assignee disambiguation is imperfect; patents are not all innovation |
| [OpenAlex](https://help.openalex.org/access/snapshot/) | Open scholarly knowledge graph with works, authors, institutions, topics, and citations; downloadable snapshot | Research-field divergence, institutional specialization, collaboration networks | Coverage/deduplication and topic models evolve; citations are not pure influence |
| [GH Archive](https://www.gharchive.org/) | Public software-development events | Forks, collaboration, contributor movement, project differentiation | Platform-specific selection and bot activity |

A company/organization calibration can combine:

- EDGAR for financial and strategic-language state;
- PatentsView for technology vectors and employee/inventor mobility;
- OpenAlex for research collaboration and knowledge specialization;
- GH Archive for open-source activity;
- industry demand and regulatory shocks from external sources.

### 19.6 Dataset-to-parameter mapping

| Parameter | Empirical estimate or proxy |
|---|---|
| `cross_response_gain` | Directed cross-lag coefficient in dyadic actions, spending, rhetoric, or tactics |
| `damping` | Decay after a unilateral change; fatigue/cost response; return speed after shock |
| `homophily` | Effect of prior similarity on tie formation, controlling opportunity |
| `assimilation_rate` | Within-actor movement toward contacts after tie formation |
| `rewiring_rate` | Hazard of tie dissolution/replacement as a function of distance |
| `identity_salience` | Change in behavior when category cues are experimentally/contextually activated |
| `boundary_hardness` | Discontinuity in ties, marriage, migration, hiring, trade, or sanctions across labels |
| `false_polarization_gap` | Perceived group difference minus measured private group difference |
| `outbidding_pressure` | Leader position change following within-camp challenger pressure |
| `policy_feedback` | Effect of policy exposure on later participation, identity, organization, and policy support |
| `institutional_drift` | Change in policy effect with stable formal rule under changing environment |
| `path_reinforcement` | Adoption/survival dependence on cumulative prior adoption, controlling current payoff |
| `switching_cost` | Reduced transition hazard as tenure/investment rises |
| `cultural_drift` | Between-replicate/lineage variance not explained by payoff or environment, scaled by effective population |
| `language_vitality` | Status, speaker demography, institutional support, and intergenerational transmission |
| `founder_imprint` | Persistence of founding-cohort/environment traits after later conditions change |

---

## 20. Estimating and validating parameters

### 20.1 Four calibration levels

1. **Exploratory normalization.** Parameters are transparent 0–1 controls used to map qualitative regimes. Do not call the output a forecast.
2. **Literature-informed ranges.** Experimental effects, observed transition rates, and prior studies constrain plausible values.
3. **Case calibration.** Parameters are chosen to reproduce several empirical targets from one case and time period.
4. **Hierarchical/multicase estimation.** Shared parameter distributions and case-specific deviations are estimated jointly, then evaluated out of sample.

The first level is valuable for causal learning if clearly labeled. False precision is worse than an explicit exploratory model.

### 20.2 Estimation methods

- **Direct likelihood estimation:** possible when micro-transition probabilities are observed and the model is tractable.
- **Relational event models:** estimate how past actions change the hazard of specific next actions.
- **Stochastic actor-oriented/network models:** jointly estimate selection and influence in network panels.
- **Vector autoregression/state-space models:** estimate reciprocal time-series response and hidden states.
- **Survival/event-history models:** estimate tie dissolution, exit, fission, adoption, and switching.
- **Difference-in-differences/event studies:** estimate policy or shock effects when assumptions are plausible.
- **Synthetic method of moments/indirect inference:** match simulated and empirical summary statistics.
- **Approximate Bayesian computation:** infer parameter distributions when simulation is possible but the likelihood is intractable.
- **Particle filters/sequential Monte Carlo:** update hidden-state estimates as new events arrive.
- **Machine-learning emulators:** approximate expensive simulation outputs, with careful validation and uncertainty.

### 20.3 Identifiability problems

Many parameters trade off:

- high contact with low influence can resemble low contact with high influence;
- strong homophily can resemble rapid rewiring;
- assimilation within segregated networks can resemble conformity within fixed groups;
- founder effects can resemble strong early institutional feedback;
- biased assimilation can resemble source selection;
- complementary influence can resemble stable role-based selection;
- a common shock can imitate reciprocal response.

Resolve this with richer outputs and interventions, not only better optimization. Tie histories distinguish selection from influence; private/public measures distinguish conformity from belief change; unilateral shocks identify response direction; composition data distinguish conversion from exit.

### 20.4 Global sensitivity analysis

Local one-at-a-time sliders are inadequate near nonlinear thresholds. Use:

- Morris screening to identify influential parameters cheaply;
- Sobol indices for main and interaction effects;
- Latin hypercube or quasi-random sampling of parameter space;
- phase diagrams for two or three central controls;
- scenario discovery to find parameter regions producing rupture, plateau, pluralism, or convergence;
- robustness analysis across model structures, not only parameter values.

Report both the probability of an outcome and the diversity of paths leading to it.

### 20.5 Calibration targets should be overdetermined

A candidate model should match several independent features:

- distribution shape and group means;
- network assortativity and bridge structure;
- lagged action–response patterns;
- exit and recruitment flows;
- affect and meta-perception gaps;
- resource/power trajectories;
- institutional or cultural sequence;
- response to a known shock or intervention.

Matching only final polarization is underdetermined. A model that matches the endpoint but gets the path, network, turnover, and response lag wrong is not a good mechanism model.

---

## 21. Additional annotated sources

59. **Donatella della Porta (2012), [“Relational Dynamics and Processes of Radicalization”](https://mobilization.kglmeridian.com/view/journals/maiq/17/1/article-p7.xml).** A relational, process-oriented account connecting movements, states, and counteractors.
60. **Joel Busher and colleagues, [reciprocal-radicalization framework](https://www.sv.uio.no/c-rex/english/news-and-events/right-now/2018/reciprocal-radicalisation.html).** Separates possible outcomes and cautions against assuming direct automatic co-radicalization.
61. **David Meyer and Suzanne Staggenborg (1996), [movement–countermovement dynamics](https://doi.org/10.1086/230869).** Political opportunity and reciprocal movement development.
62. **Brent Simpson, Robb Willer, and Matthew Feinberg (2022), [radical-flank experiments](https://academic.oup.com/pnasnexus/article/1/3/pgac110/6633666).** Evidence that a radical flank can raise support for moderates by contrast under some conditions.
63. **Blake Riek, Eric Mania, and Samuel Gaertner (2006), [intergroup-threat meta-analysis](https://pubmed.ncbi.nlm.nih.gov/17201592/).** Integrates realistic, symbolic, anxiety, stereotype, esteem, and distinctiveness threats.
64. **Isaac Young and Daniel Sullivan (2016), [competitive-victimhood review](https://www.sciencedirect.com/science/article/abs/pii/S2352250X16300288).** Victimhood competition across conflict and inequality contexts.
65. **Lee Ross and collaborators, [reactive devaluation in negotiation](https://law.stanford.edu/index.php?webauth-document=child-page%2F370999%2Fdoc%2Fslspublic%2FReactive+Devaluation.pdf).** Source-based discounting as a barrier to settlement.
66. **Ifat Maoz et al. (2002), [Israeli/Palestinian proposal experiment](https://journals.sagepub.com/doi/10.1177/0022002702046004003).** Identical proposal, different alleged source, different evaluation.
67. **Philip Fernbach and Leaf Van Boven (2022), [false-polarization review](https://www.philipfernbach.com/s/Fernbach-Van-Boven-False-Polarization-dc7k.pdf).** Perceived distance, negative meta-perceptions, and possible correction.
68. **Samantha Moore-Berg et al. (2020), [exaggerated meta-perceptions and hostility](https://www.pnas.org/doi/10.1073/pnas.2001263117).** Shows how beliefs about the outgroup's view of one's group relate to conflict.
69. **Joaquin Mernyk et al. (2022), [correction of violent meta-perceptions](https://www.pnas.org/doi/10.1073/pnas.2116851119).** Promising experiments, best read alongside mixed later correction results.
70. **Daniel Miller (2023), [a century of pluralistic-ignorance research](https://www.frontiersin.org/journals/social-psychology/articles/10.3389/frsps.2023.1260896/full).** Broad conceptual and empirical review of misperceived group norms.
71. **Anastasia Madsen and Shermin de Silva (2024), [fission–fusion as a complex adaptive system](https://royalsocietypublishing.org/rstb/article/379/1909/20230175/42833/Societies-with-fission-fusion-dynamics-as-complex).** Scale-dependent subgroup dynamics rather than fixed groups.
72. **Barbara Gili Fivela (2024), [accommodation and language contact](https://journals.sagepub.com/doi/10.1177/00238309241246200).** Links short-term accommodation to long-run language-contact outcomes.
73. **Kutlay Yağmur (2011), [ethnolinguistic-vitality review](https://www.tandfonline.com/doi/full/10.1080/01434632.2010.541913).** Status, demographics, institutions, and identity in language persistence.
74. **Johannes Gerschewski (2021), [institutional-change explanations](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/781D6F3867B4A20CBDED2CF9E2AF643B/S0003055420000751a.pdf/explanations-of-institutional-change-reflecting-on-a-missing-diagonal.pdf).** Clear treatment of displacement, layering, drift, conversion, and exhaustion.
75. **James Mahoney (2000), [“Path Dependence in Historical Sociology”](https://www.jstor.org/stable/3108585).** Distinguishes self-reinforcing sequences from reactive chains.
76. **Erik Gahner Larsen (2019), [policy-feedback quantitative review](https://erikgahner.dk/pub/2019review.pdf).** Estimates the mass-public evidence and exposes design limitations.
77. **Christopher Marquis and András Tilcsik (2013), [imprinting review](https://www.hbs.edu/ris/Publication%20Files/13-061_fa850975-750a-49b2-a6b6-f1008ce21502.pdf).** Sensitive periods and persistence across individual, organizational, and field levels.
78. **Kirby et al. (2016), [D-PLACE](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0158391).** Cultural comparison linked to linguistic ancestry, geography, and environment.
79. **Raj Chetty et al. (2022), [Social Capital Atlas research](https://pmc.ncbi.nlm.nih.gov/articles/PMC9352590/).** Large-scale aggregate network measures and economic connectedness.
80. **Jason Priem, Heather Piwowar, and Richard Orr (2022), [OpenAlex](https://arxiv.org/abs/2205.01833).** Open knowledge graph useful for institutional and disciplinary divergence.
