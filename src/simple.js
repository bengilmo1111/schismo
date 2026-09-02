// The simple register. A second set of words for the same page, aimed at a child.
//
// It is an overlay, not a rewrite: nothing here changes what the model does, and every claim
// it makes has to survive the same tests as the ordinary copy. The rule it follows is that a
// simpler explanation may drop detail but may not become untrue — so the caveat about this
// being a pretend world is in here too, in words a nine-year-old can read.
//
// `test/simple.test.js` checks the sentences stay short and the jargon stays out.

export const SIMPLE_UI = {
  // The real word stays on the full version. A reader who cannot decode the title yet should
  // not have to get past it to start.
  pageTitle: 'The splitting game',
  introA:
    'Sometimes two people keep answering each other back. He does something, so she does ' +
    'something, so he does something bigger. Two friends. Two teams. Two countries. Nobody ' +
    'plans it. But bit by bit they end up far apart.',
  introB:
    'This page is a game about that. It starts with a question. You will probably get it ' +
    'wrong, and that is the best bit.',
  act1h: '1 · What made them split up?',
  act1cap:
    'This line shows two groups getting further apart, year after year. That is all it shows. ' +
    'The numbers on the side do not mean anything on their own.',
  act1ask: 'Have a guess. What do you think happened?',
  labLocked: 'Have a guess above, and the rest of the page opens up.',
  revealNote:
    'All three of these were set up on purpose to draw the same line. That is not a trick, it ' +
    'is the point. If three different stories make the same line, then the line cannot tell ' +
    'you which one really happened.',
  act2h: '2 · Now look at the people',
  act2lede:
    'The line squashed 240 people down into one dot a year. Here are the same three stories ' +
    'with the people put back in. Watch what is different in each one.',
  act2hint:
    'Red dots live up top. Blue dots live below. Each dot is a person. The faint threads are ' +
    'people who still talk to someone on the other side.',
  panelSummary: 'Show me the numbers',
  act3h: '3 · Can you fix it?',
  act3lede:
    'Now try the same fix on all three at once. Watch how a fix that works on one of them ' +
    'does nothing at all to the others.',
  act3when: 'Try the fix in year',
  footA:
    'This is a pretend world made of dots. It is not real people, and it does not tell you ' +
    'what really happened anywhere. It only shows you how something like this could happen.',
  footB:
    'The big idea is this. Two things can look exactly the same from far away and be totally ' +
    'different up close. And if you do not know why something broke, you will probably try to ' +
    'fix the wrong bit.'
};

/** The three stories, in the simple register. Keys must match ARMS in population.js. */
export const SIMPLE_ARMS = {
  reciprocal: {
    name: 'They pushed each other away',
    verdict: 'Everybody moved.',
    blurb: 'Nobody left and nobody new turned up. Both groups just walked to their own side, ' +
      'together, like two crowds backing away from each other.'
  },
  sorting: {
    name: 'They stopped playing together',
    verdict: 'They stopped talking.',
    blurb: 'Look at the threads across the middle. They vanish. The two sides still share ' +
      'loads of space — they just stopped crossing it.'
  },
  exit: {
    name: 'The ones in the middle left',
    verdict: 'Nobody changed their mind.',
    blurb: 'The people in the middle went home. New people turned up who were already near ' +
      'the edges. Nobody talked anybody into anything.'
  }
};

/** The fixes, in the simple register. Keys must match INTERVENTIONS in population.js. */
export const SIMPLE_INTERVENTIONS = {
  answer: { name: 'Stop answering back', note: 'One side decides not to hit back.' },
  contact: { name: 'Just mix them up', note: 'Put everyone together again and change nothing else.' },
  structured: { name: 'Mix them up kindly', note: 'Put everyone together, and make it a nice place to be.' },
  moderates: { name: 'Ask the middle to stay', note: 'Shut the door so nobody else can leave.' },
  restraint: { name: 'Tell everyone to calm down', note: 'Pull every single person back toward the middle.' }
};

/** Sentences that have to be built out of live numbers. */
export const SIMPLE_TEXT = {
  revealRight: (armName, otherA, otherB) =>
    `<b>You got it!</b> And that is the problem. This line really did come from ` +
    `“${armName.toLowerCase()}”. But “${otherA.toLowerCase()}” draws the same line, and so ` +
    `does “${otherB.toLowerCase()}”. Being right here was luck, not looking.`,
  revealWrong: (guess, truth) =>
    `<b>Not really wrong.</b> This line came from “${truth.toLowerCase()}”. But ` +
    `“${guess.toLowerCase()}” draws exactly the same line, and so does the third one. ` +
    `Have a look.`,
  ground: (start, rec, exit, sort) =>
    `<b>How much space do they still share?</b> All three began sharing ${start} of their ` +
    `space. Ninety years later, look what happened. Pushed each other away: <b>${rec}</b> ` +
    `left. The middle left: <b>${exit}</b>. Only stopped talking: <b>${sort}</b>. That last ` +
    `one is almost exactly what they started with. Same line. Very different endings.`,
  worked: name =>
    `It fixed “${name.toLowerCase()}” and did nothing to the other two. That is why guessing ` +
    `wrong matters: you can spend all your effort on the wrong repair.`,
  backfired: name =>
    `It made “${name.toLowerCase()}” <b>worse</b>. Pushing people together when they already ` +
    `do not like each other can make them dig in harder.`,
  nothing:
    'Almost nothing. Once people have gone home, shutting the door keeps the rest in but does ' +
    'not bring anybody back. Try moving the year slider left and see how much more it helps.',
  everything:
    'It worked on all three — by pulling every single person back to the middle. That is not ' +
    'really fixing anything. It is just telling everyone to be quiet.'
};

/** Sections that are hidden while the simple register is on. */
export const SIMPLE_HIDES = ['lab'];

