/* ==========================================================
   ECOSYSTEM DETECTIVE — script.js
   Three playable cases. All case content lives in CASES below;
   the engine underneath reads it, so new cases are mostly data.
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. GAME DATA
   ---------------------------------------------------------- */

// Stamp roles a player can give each piece of evidence.
const ROLES = {
  main:    { label: "Main cause",   short: "Main cause" },
  contrib: { label: "Contributing", short: "Contributing" },
  result:  { label: "Result",       short: "Result" },
  ruled:   { label: "Ruled out",    short: "Ruled out" },
};

const GLOSSARY = [
  ["Ecosystem", "All the living things in an area plus the non-living things around them, and how they interact."],
  ["Biotic factor", "A living part of an ecosystem: plants, animals, fungi, bacteria."],
  ["Abiotic factor", "A non-living part of an ecosystem: water, temperature, sunlight, soil, salt, oxygen."],
  ["Producer", "An organism that makes its own food from sunlight (plants, algae)."],
  ["Consumer", "An organism that gets energy by eating other organisms."],
  ["Predator / prey", "A predator hunts and eats other animals. Prey are the animals it eats."],
  ["Parasite", "An organism that lives on or in a host and feeds on it, harming it."],
  ["Food web", "All the feeding connections in an ecosystem. A change to one species can ripple through the whole web."],
  ["Population", "All the members of one species living in one area."],
  ["Invasive species", "A species brought to a new place, often by people, that spreads and harms the ecosystem. It often has no natural predators there."],
  ["Bioindicator", "A species whose health tells us about the health of the environment. Mayfly nymphs only live in clean water."],
  ["Biodiversity", "The variety of species in an area. More variety usually makes an ecosystem better able to survive a disaster."],
  ["Main cause", "The change that set the whole chain of events in motion."],
  ["Contributing factor", "Something that made the problem worse or helped it happen, but did not start it by itself."],
  ["Result", "Something that changed because of the cause. Results can cause more results!"],
  ["Ruled out", "A factor the evidence shows is not responsible. Tip: something that did not change cannot explain a change."],
  ["Decomposer", "An organism, like bacteria or fungi, that breaks down dead things. Decomposers use oxygen as they work."],
  ["Nutrient", "Something living things need to grow. Phosphorus is a nutrient for plants and algae."],
  ["Acid rain", "Rain made acidic by pollution like sulphur dioxide. It can harm lakes, fish and forests far from where the pollution started."],
  ["Pollinator", "An animal, like a bee, that carries pollen between flowers so plants can make fruit and seeds."],
  ["Habitat", "The place where an organism lives and finds food, water and shelter."],
  ["Stewardship", "Taking care of the environment so it stays healthy for the future."],
];

const CASES = [
  /* ===================== CASE 001 ===================== */
  {
    id: "c1",
    num: "001",
    title: "The Silent Creek",
    where: "Highland Creek, Scarborough (Toronto)",
    skill: "Abiotic factors",
    unlockCode: null,
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "Highland Creek, Scarborough, Toronto",
      Ecosystem: "Urban creek and ravine",
      Reported: "Spring 2025, by volunteer stream monitors",
      Concern: "Aquatic insects disappearing",
    },
    brief: [
      "Every spring, volunteers wade into Highland Creek with kick-nets and count the tiny insects living under the rocks.",
      "This year the nets came up almost empty. Mayfly and stonefly nymphs, which used to be everywhere, are down 70% compared with 2010.",
      "These nymphs only survive in clean water, so scientists use them as a warning sign. Something in this creek has changed. Find out what.",
    ],
    start: ["e1", "e2"],
    evidence: {
      e1: {
        icon: "🐛", title: "Mayfly & stonefly nymphs ↓ 70%",
        detail: "Spring kick-net counts, compared with 2010. Nymphs live under rocks and need clean water.",
        year: "2010–2025", yearNum: 2024, node: "Nymphs ↓",
        accept: ["result"],
        why: "This is the change you're explaining. It's a result, not a cause.",
      },
      e2: {
        icon: "🏙️", title: "Paved surfaces ↑",
        detail: "Roads, parking lots and roofs in the creek's watershed are up about a third since 1990. Rain and snowmelt now rush off pavement straight into the creek.",
        year: "1990–2015", yearNum: 1990, node: "More pavement",
        accept: ["contrib"],
        why: "More pavement means more surfaces that get salted and faster runoff into the creek. It helps the problem happen, but pavement alone didn't harm the nymphs.",
      },
      e3: {
        icon: "🧪", title: "Chloride (salt) in water ↑ 4×",
        detail: "Winter and spring chloride readings are about four times higher than in 2005, often above Canada's safe limit for aquatic life.",
        year: "2005–2025", yearNum: 2005, node: "Salt in creek water ↑",
        accept: ["result", "contrib"],
        mainHint: "Good catch: salty water is the abiotic factor that changed. But salt doesn't appear in a creek by itself. Where did it come from?",
        why: "Salty water is an abiotic change. It's a result of road salt, and it's what directly harms the nymphs.",
      },
      e4: {
        icon: "🧂", title: "Road salt use ↑",
        detail: "City records: tonnes of road salt spread in the watershed each winter have risen sharply since the 1990s. The expressway and big parking lots drain into the creek.",
        year: "1995–2025", yearNum: 1995, node: "Road salt use ↑",
        accept: ["main"], key: true,
        why: "Road salt is the human activity that started the chain. Meltwater carries it into the creek.",
      },
      e5: {
        icon: "🌡️", title: "Water temperature: no change",
        detail: "Summer water temperatures are about the same as in 2010.",
        year: "2010–2025", yearNum: 2012, node: "Water temperature",
        accept: ["ruled"],
        why: "Temperature didn't change, so it can't explain a change in the nymphs.",
        notCause: "Water temperature hasn't changed since 2010. Something that stayed the same can't explain why the nymphs disappeared.",
      },
      e6: {
        icon: "💧", title: "Dissolved oxygen: healthy",
        detail: "Oxygen in the water stays high enough for nymphs all year.",
        year: "2025", yearNum: 2025, node: "Oxygen level",
        accept: ["ruled"],
        why: "Oxygen is normal, so lack of oxygen isn't the problem.",
        notCause: "The oxygen probe shows healthy levels all year. Nymphs aren't running out of oxygen.",
      },
      e7: {
        icon: "🐟", title: "Small insect-eating fish ↓ 40%",
        detail: "Fewer blacknose dace and darters. These small fish eat nymphs.",
        year: "2020–2025", yearNum: 2022, node: "Small fish ↓",
        accept: ["result"],
        why: "With fewer nymphs to eat, the small fish lost a food source. A result of a result!",
      },
      e8: {
        icon: "🐦", title: "Kingfishers & herons: same as always",
        detail: "The park naturalist says fish-eating birds haven't increased. There are no new predators.",
        year: "2025", yearNum: 2025, node: "Fish-eating birds",
        accept: ["ruled"],
        why: "Predators didn't change, so predation doesn't explain the decline.",
        notCause: "The naturalist says there are no new predators here. Predation hasn't changed.",
      },
    },
    tests: [
      { id: "t1", name: "Water chemistry kit", cost: 2, reveals: "e3", desc: "Measure what's dissolved in the creek water.",
        readout: "CHEMISTRY KIT // HIGHLAND CREEK\nCHLORIDE: HIGH. WINTER PEAKS 4X HIGHER THAN 2005.\nWARNING: ABOVE AQUATIC LIFE GUIDELINE." },
      { id: "t2", name: "City winter maintenance records", cost: 1, reveals: "e4", desc: "Check what the city spreads on roads in winter.",
        readout: "CITY RECORDS // ROADS & PARKING\nROAD SALT APPLIED PER WINTER: RISING SINCE 1990s.\nDRAINAGE: STORM SEWERS EMPTY INTO CREEK." },
      { id: "t3", name: "Thermometer log", cost: 1, reveals: "e5", desc: "Compare water temperatures over 15 years.",
        readout: "TEMP LOG // 2010–2025\nSUMMER AVERAGE: NO SIGNIFICANT CHANGE." },
      { id: "t4", name: "Oxygen probe", cost: 1, reveals: "e6", desc: "Test how much oxygen is in the water.",
        readout: "DISSOLVED OXYGEN // ALL SEASONS\nLEVELS: HEALTHY." },
      { id: "t5", name: "Fish survey", cost: 2, reveals: "e7", desc: "Count the fish living in the creek.",
        readout: "FISH SURVEY // 2020–2025\nDACE & DARTERS (INSECT EATERS): DOWN 40%." },
      { id: "t6", name: "Interview the park naturalist", cost: 1, reveals: "e8", desc: "Ask someone who walks this ravine every day.",
        readout: "INTERVIEW // PARK NATURALIST\n\"SAME KINGFISHERS, SAME HERONS AS ALWAYS.\nNOTHING NEW HUNTING HERE.\"" },
    ],
    mustBe: [],
    // The chain of events. Box 1 is filled in automatically with the
    // confirmed main cause. Each later box has a sentence that links it
    // to the box before it, with three choices (one correct).
    chain: [
      { id: "e4" },
      { id: "e3",
        before: "When snow melts, it", after: "the road salt into the creek, so the water gets saltier.",
        options: [
          { text: "washes", ok: true },
          { text: "freezes", hint: "Freezing wouldn't move the salt anywhere. How does salt on the road end up in the creek?" },
          { text: "blocks", hint: "If meltwater blocked the salt, the creek wouldn't get saltier. Check your chemistry readout." },
        ] },
      { id: "e1",
        before: "The salty water", after: "the mayfly and stonefly nymphs.",
        options: [
          { text: "harms", ok: true },
          { text: "feeds", hint: "Nymphs don't eat salt. The chemistry kit said the salt is above the safe limit for aquatic life." },
          { text: "warms", hint: "The water temperature didn't change. You ruled that out!" },
        ] },
    ],
    real: {
      headline: "What really happened",
      paragraphs: [
        "This case is based on real monitoring of Toronto's urban creeks. In winter and spring, salt from roads and parking lots washes into creeks like Highland Creek, and chloride levels can spike well above Canada's guideline for protecting aquatic life.",
        "Sensitive insects like mayfly and stonefly nymphs are among the first to disappear, which is why scientists use them as bioindicators. Ontario now runs training like the Smart About Salt program, which teaches plow crews and property managers to use only as much salt as they need.",
      ],
      note: "Case details and numbers are fictionalized for the game. The science is real.",
    },
    specimens: [
      { icon: "🐛", name: "Mayfly nymph", fact: "Lives under creek rocks for up to two years. The winged adult lives only about a day." },
      { icon: "🪰", name: "Stonefly nymph", fact: "Needs cold, clean water with lots of oxygen. Finding one means the stream is healthy." },
      { icon: "🐟", name: "Blacknose dace", fact: "A small minnow found in Toronto creeks. It eats aquatic insects like nymphs." },
    ],
    vocab: ["Abiotic factor", "Bioindicator", "Human impact", "Food web", "Consumer"],
    nextCode: "SALTY-CREEK",
  },

  /* ===================== CASE 002 ===================== */
  {
    id: "c2",
    num: "002",
    title: "The Ravine Mystery",
    where: "A ravine forest in Toronto",
    skill: "Invasive species",
    unlockCode: "SALTY-CREEK",
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "Ravine forest, Toronto",
      Ecosystem: "Deciduous forest",
      Reported: "Summer 2012, by City of Toronto forestry staff",
      Concern: "Trees dying fast",
    },
    brief: [
      "Toronto's ravines are some of the city's last big forests. This summer, residents walking their dogs noticed something wrong: trees with thin, bare crowns and bark peeling off in strips.",
      "City foresters say it isn't every tree. Almost all the ash trees are dying, while the maples and oaks right beside them look fine.",
      "Why would one kind of tree die while its neighbours stay healthy? Find the culprit before the rest of the ravine changes for good.",
    ],
    start: ["f1", "f2"],
    evidence: {
      f1: {
        icon: "🌳", title: "Ash trees dying: 9 in 10",
        detail: "Thin crowns, split bark, dead branches. Only the ash trees are affected.",
        year: "2009–2015", yearNum: 2010, node: "Ash trees die",
        accept: ["result"],
        why: "This is the change you're explaining. It's a result.",
      },
      f2: {
        icon: "☀️", title: "Dry summer (2012)",
        detail: "2012 was a very dry summer. But maples and oaks growing in the same soil are healthy.",
        year: "2012", yearNum: 2012, node: "Dry summer",
        accept: ["ruled", "contrib"],
        why: "If drought were the cause, the maples and oaks would be suffering too. At most it stressed the ash a little more.",
        notCause: "The maples and oaks lived through the same dry summer and they're fine. Drought can't explain why only the ash trees are dying.",
      },
      f3: {
        icon: "🪲", title: "Emerald ash borer found",
        detail: "S-shaped tunnels under the ash bark and small D-shaped exit holes. The culprit is a metallic green beetle from Asia, first found in Ontario in 2002. Its larvae only eat ash, and it has no natural predators here.",
        year: "2007", yearNum: 2007, node: "Emerald ash borer arrives",
        accept: ["main"], key: true,
        why: "An invasive species with no natural predators. Its larvae eat the layer under the bark that carries water and food through the tree.",
      },
      f4: {
        icon: "🪵", title: "Firewood moved from infested areas",
        detail: "Campers and homeowners hauled firewood from southwestern Ontario, where the beetle was already spreading. Larvae can hide inside the wood.",
        year: "2003–2008", yearNum: 2003, node: "Firewood moved",
        accept: ["contrib"],
        why: "People moving firewood helped the beetle spread much faster than it could fly.",
      },
      f5: {
        icon: "🌱", title: "Soil nutrients & pH: normal",
        detail: "The soil tests the same under healthy maples and dying ash.",
        year: "2012", yearNum: 2012, node: "Soil quality",
        accept: ["ruled"],
        why: "The soil is normal and the same under every tree.",
        notCause: "The soil under the dying ash trees tests exactly the same as under the healthy maples.",
      },
      f6: {
        icon: "🛣️", title: "Road salt? Not here",
        detail: "Mapping shows many dying ashes are deep in the ravine, far from any road.",
        year: "2012", yearNum: 2012, node: "Road salt",
        accept: ["ruled"],
        why: "Trees far from roads are dying too, so road salt isn't the cause.",
        notCause: "Ash trees far from any road are dying just as fast. Road salt can't reach them.",
      },
      f7: {
        icon: "🐦", title: "Woodpeckers ↑",
        detail: "Bird surveys count more woodpeckers. They're drilling into ash bark to eat the larvae.",
        year: "2010–2014", yearNum: 2011, node: "Woodpeckers ↑",
        accept: ["result"],
        why: "A surprise result: some species benefit. Woodpeckers found a new food supply.",
      },
      f8: {
        icon: "🌤️", title: "More sunlight; invasive plants spreading",
        detail: "Gaps in the canopy let sunlight reach the forest floor. Invasive buckthorn and garlic mustard are filling the gaps fast.",
        year: "2013–2015", yearNum: 2014, node: "Sunlight ↑, invasive plants spread",
        accept: ["result"],
        why: "Losing one tree species changed an abiotic factor (sunlight), which helped other invasive species move in.",
      },
    },
    tests: [
      { id: "t1", name: "Peel back the bark", cost: 2, reveals: "f3", desc: "Look under the bark of a dying ash.",
        readout: "BARK INSPECTION // ASH #114\nS-SHAPED TUNNELS UNDER BARK. D-SHAPED EXIT HOLES.\nSPECIMEN ID: AGRILUS PLANIPENNIS (EMERALD ASH BORER)." },
      { id: "t2", name: "Firewood permits & campsite logs", cost: 1, reveals: "f4", desc: "Track where firewood in the area came from.",
        readout: "FIREWOOD RECORDS // 2003–2008\nWOOD BROUGHT IN FROM SW ONTARIO.\nNOTE: BEETLE ALREADY PRESENT AT SOURCE." },
      { id: "t3", name: "Soil test", cost: 1, reveals: "f5", desc: "Test nutrients and pH under different trees.",
        readout: "SOIL TEST // 6 SITES\nNUTRIENTS: NORMAL. PH: NORMAL.\nNO DIFFERENCE BETWEEN ASH AND MAPLE SITES." },
      { id: "t4", name: "Map the dying trees", cost: 1, reveals: "f6", desc: "Plot where the sick trees are.",
        readout: "GPS MAP // DYING ASH\nFOUND THROUGHOUT RAVINE, INCLUDING FAR FROM ROADS." },
      { id: "t5", name: "Bird survey", cost: 2, reveals: "f7", desc: "Count the birds using the ravine.",
        readout: "BIRD SURVEY // 2010–2014\nWOODPECKERS: UP. FEEDING ON LARVAE IN ASH BARK." },
      { id: "t6", name: "Forest floor survey", cost: 1, reveals: "f8", desc: "Check what's growing on the ground.",
        readout: "GROUND SURVEY // CANOPY GAPS\nSUNLIGHT AT GROUND LEVEL: UP.\nBUCKTHORN + GARLIC MUSTARD SPREADING." },
    ],
    mustBe: [],
    chain: [
      { id: "f3" },
      { id: "f1",
        before: "Emerald ash borer larvae", after: "the layer under the bark, so the ash trees die.",
        options: [
          { text: "eat through", ok: true },
          { text: "protect", hint: "If the beetles protected the trees, the trees wouldn't be dying. What was under the bark?" },
          { text: "pollinate", hint: "Ash borers aren't pollinators. Think about the S-shaped tunnels under the bark." },
        ] },
      { id: "f8",
        before: "Dead ash trees leave gaps in the canopy, which let", after: "reach the forest floor. Invasive plants spread into the gaps.",
        options: [
          { text: "more sunlight", ok: true },
          { text: "less sunlight", hint: "Fewer leaves overhead means more light gets through, not less." },
          { text: "more road salt", hint: "The dying trees are far from roads. You ruled road salt out!" },
        ] },
    ],
    real: {
      headline: "What really happened",
      paragraphs: [
        "Emerald ash borer was first found in Toronto in 2007. Over the next decade it killed most of the city's ash trees, and ash had been one of the most common trees on Toronto streets and in its ravines.",
        "The City treated some of its most valuable ash trees with TreeAzin, an insecticide developed in Canada, and the federal government restricted moving firewood out of infested areas. Toronto has replanted with many different species, so one pest can never wipe out so much of the forest at once. That's biodiversity at work.",
      ],
      note: "Case details are fictionalized for the game. The science and the history are real.",
    },
    specimens: [
      { icon: "🪲", name: "Emerald ash borer", fact: "A metallic green beetle about 1 cm long. Its larvae tunnel under ash bark." },
      { icon: "🌳", name: "White ash", fact: "Once one of Toronto's most common trees. Its wood is used for hockey sticks and baseball bats." },
      { icon: "🐦", name: "Downy woodpecker", fact: "Canada's smallest woodpecker. It drills into bark to eat ash borer larvae." },
    ],
    vocab: ["Invasive species", "Biotic factor", "Biodiversity", "Abiotic factor (sunlight)", "Human impact"],
    nextCode: "GREEN-BORER",
  },

  /* ===================== CASE 003 ===================== */
  {
    id: "c3",
    num: "003",
    title: "The Empty Nets",
    where: "Lake Superior, off Port Arthur & Fort William (Thunder Bay)",
    skill: "Food webs + multiple causes",
    unlockCode: "GREEN-BORER",
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "Lake Superior, off Port Arthur & Fort William (today's Thunder Bay)",
      Ecosystem: "Great Lake, cold open water",
      Reported: "1955, by commercial fishers",
      Concern: "Lake trout catches collapsing",
    },
    brief: [
      "It's 1955. For generations, fishers from Port Arthur, Fort William, and Fort William First Nation have pulled lake trout from Lake Superior. Lake trout is the top predator in the lake, and the whole fishing economy depends on it.",
      "Now the nets are coming up nearly empty. Catches have dropped more than 80% in ten years. Some trout that do get caught have strange round wounds.",
      "The fishers want answers. Be careful: big lakes are complicated, and this case may have more than one cause.",
    ],
    start: ["g1", "g2", "g5"],
    evidence: {
      g1: {
        icon: "🎣", title: "Lake trout catch ↓ 80%+",
        detail: "Commercial catches from Port Arthur and Fort William boats crashed between 1945 and 1955.",
        year: "1945–1955", yearNum: 1950, node: "Lake trout ↓",
        accept: ["result"],
        why: "This is the change you're explaining. It's a result.",
      },
      g2: {
        icon: "🌡️", title: "Lake temperature: no major change",
        detail: "Lake Superior is as cold as ever. Water temperature records show no big change.",
        year: "1940–1955", yearNum: 1940, node: "Water temperature",
        accept: ["ruled"],
        why: "The lake stayed cold, so temperature doesn't explain the crash.",
        notCause: "Lake Superior is as cold as it's always been. A factor that didn't change can't explain the crash.",
      },
      g5: {
        icon: "⛵", title: "More boats & bigger nets",
        detail: "Fishing logbooks: more boats and more nets through the 1940s. Fishers took more trout every year.",
        year: "1940–1950", yearNum: 1942, node: "Heavy fishing",
        accept: ["contrib"],
        why: "Heavy fishing made the trout population weaker and less able to recover. It was a contributing factor, but trout had survived fishing for decades.",
        notCause: "The logbooks show heavy fishing took lots of trout. A big lake can lose fish to more than one cause at once. Is this really ruled out?",
        mainNote: "Heavy fishing hurt the trout, but people had fished Superior for decades without a crash like this. What new thing showed up in the 1940s?",
      },
      g3: {
        icon: "🩸", title: "Sea lamprey found on trout",
        detail: "An eel-like parasite clamps onto fish with a round, sucker-shaped mouth full of teeth and feeds on their blood and body fluids. Most trout it attacks die. It is not native to the upper Great Lakes.",
        year: "1946–1955", yearNum: 1946, node: "Sea lamprey invade",
        accept: ["main"], key: true,
        why: "An invasive parasite with no natural controls in Lake Superior. Each lamprey can kill many kilograms of fish.",
      },
      g4: {
        icon: "🚢", title: "Welland Canal opens a path",
        detail: "Ship canals let boats, and lampreys, get around Niagara Falls. Lamprey spread lake by lake and reached Lake Superior by the 1940s.",
        year: "1920s–1940s", yearNum: 1925, node: "Canal lets lamprey in",
        accept: ["contrib"],
        why: "The canal is how the invader got here, a human-made pathway. It helped the cause happen.",
      },
      g6: {
        icon: "💧", title: "Water quality: clean & cold",
        detail: "Samples from the fishing grounds show clean, cold water with plenty of oxygen.",
        year: "1955", yearNum: 1955, node: "Water quality",
        accept: ["ruled"],
        why: "The water is clean, so pollution isn't the cause here.",
        notCause: "Water samples from the fishing grounds are clean and full of oxygen. Pollution doesn't fit the evidence.",
      },
      g7: {
        icon: "🐟", title: "Rainbow smelt ↑",
        detail: "Small prey fish called rainbow smelt (also non-native) are booming. With fewer lake trout, fewer of them are being eaten.",
        year: "1950–1960", yearNum: 1953, node: "Rainbow smelt ↑",
        accept: ["result"],
        why: "Removing a top predator lets its prey population grow. That's a change rippling down the food web.",
      },
      g8: {
        icon: "🦆", title: "Gulls & loons: same as always",
        detail: "Fishers say fish-eating birds are about as common as ever.",
        year: "1955", yearNum: 1955, node: "Fish-eating birds",
        accept: ["ruled"],
        why: "Bird predators didn't increase, so they don't explain the crash.",
        notCause: "The fishers say gulls and loons are as common as ever. Birds aren't new predators here.",
      },
    },
    tests: [
      { id: "t1", name: "Examine the catch", cost: 1, reveals: "g3", desc: "Look closely at the round wounds on the trout.",
        readout: "SPECIMEN EXAM // LAKE TROUT\nROUND WOUNDS, RASPED SKIN. ATTACHED: EEL-LIKE PARASITE.\nID: PETROMYZON MARINUS (SEA LAMPREY). NON-NATIVE." },
      { id: "t2", name: "Shipping history", cost: 1, reveals: "g4", desc: "Research how ships move between the Great Lakes.",
        readout: "ARCHIVE // GREAT LAKES SHIPPING\nWELLAND CANAL BYPASSES NIAGARA FALLS.\nLAMPREY RECORDED: ERIE > HURON > MICHIGAN > SUPERIOR." },
      { id: "t3", name: "Water samples", cost: 2, reveals: "g6", desc: "Test water quality on the fishing grounds.",
        readout: "WATER SAMPLE // FISHING GROUNDS\nCLEAR. COLD. OXYGEN: HIGH. NO POLLUTION DETECTED." },
      { id: "t4", name: "Prey fish survey", cost: 2, reveals: "g7", desc: "Count the small fish that lake trout eat.",
        readout: "PREY FISH NETS // 1950–1955\nRAINBOW SMELT: STRONGLY INCREASING." },
      { id: "t5", name: "Ask the fishers about birds", cost: 1, reveals: "g8", desc: "Have fish-eating birds become more common?",
        readout: "INTERVIEW // FISHING CREW\n\"GULLS AND LOONS, SAME AS ALWAYS.\"" },
    ],
    mustBe: ["g5"],
    chain: [
      { id: "g3" },
      { id: "g1",
        before: "Sea lampreys", after: "lake trout, and most of the trout they attack die.",
        options: [
          { text: "feed on", ok: true },
          { text: "are eaten by", hint: "Look at the round wounds on the catch. Who is attacking whom?" },
          { text: "compete with", hint: "Lampreys aren't after the trout's food. They're after the trout. Look at the wounds." },
        ] },
      { id: "g7",
        before: "With fewer lake trout hunting them, the rainbow smelt population", after: ".",
        options: [
          { text: "grows", ok: true },
          { text: "shrinks", hint: "Lake trout eat smelt. When a predator disappears, more of its prey survive." },
          { text: "stays the same", hint: "The prey fish survey showed a big change. Which way did it go?" },
        ] },
    ],
    real: {
      headline: "What really happened",
      paragraphs: [
        "Sea lamprey spread from Lake Ontario into the upper Great Lakes through the Welland Canal. Together with heavy fishing, they caused lake trout to collapse across the upper lakes in the 1940s and 1950s, and Lake Superior's fishing towns were hit hard.",
        "Canada and the United States formed the Great Lakes Fishery Commission in 1955. Scientists tested thousands of chemicals before finding one, called TFM, that kills lamprey larvae in streams but spares most other fish. With lamprey control, fishing limits and restocking, Lake Superior's lake trout made one of the biggest comebacks in Great Lakes history. Lamprey control still goes on every year, run in Canada from Sault Ste. Marie.",
        "Fun fact: Port Arthur and Fort William joined together in 1970 to become the city of Thunder Bay.",
      ],
      note: "Case numbers are simplified for the game. The history and the science are real.",
    },
    specimens: [
      { icon: "🩸", name: "Sea lamprey", fact: "Not a true eel. It has no jaws, just a round sucking mouth lined with teeth." },
      { icon: "🐟", name: "Lake trout", fact: "Can live more than 40 years in Lake Superior's cold, deep water." },
      { icon: "🐠", name: "Rainbow smelt", fact: "A small silver fish that smells like fresh-cut cucumber when it's caught." },
    ],
    vocab: ["Invasive species", "Parasite", "Food web", "Predator / prey", "Multiple causes", "Population"],
    nextCode: "EMPTY-NETS",
  },

  /* ===================== CASE 004 ===================== */
  {
    id: "c4",
    num: "004",
    title: "The Clear Blue Lakes",
    where: "Killarney, southwest of Sudbury",
    skill: "Recommend a plan",
    unlockCode: "EMPTY-NETS",
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "Killarney Provincial Park, about 50 km southwest of Sudbury",
      Ecosystem: "Rocky lakes in the Canadian Shield",
      Reported: "1978, by park rangers",
      Concern: "Fish gone from lakes that look perfectly clean",
    },
    brief: [
      "Killarney's lakes have never looked so beautiful. The water is so clear you can see the bottom 20 metres down.",
      "But the rangers' nets come up empty. Lake trout, which were common here ten years ago, are gone from lake after lake.",
      "How can a lake look this clean and have no fish? Something you can't see is wrong with the water. Find it, then tell the government how to fix it.",
    ],
    start: ["s1", "s2"],
    evidence: {
      s1: {
        icon: "🐟", title: "Lake trout gone from many lakes",
        detail: "Rangers' test nets in George Lake and nearby lakes catch no lake trout. Ten years ago they were common.",
        year: "1965–1978", yearNum: 1977, node: "Lake trout disappear",
        accept: ["result"],
        why: "This is the change you're explaining. It's a result.",
      },
      s2: {
        icon: "🌡️", title: "Water temperature: no change",
        detail: "Summer water temperatures are the same as they were in the 1960s.",
        year: "1960s–1978", yearNum: 1962, node: "Water temperature",
        accept: ["ruled"],
        why: "Temperature didn't change, so it can't explain the missing fish.",
        notCause: "The lakes are the same temperature as always. Something that didn't change can't explain why the trout disappeared.",
      },
      s3: {
        icon: "🧪", title: "Lake water acidic: pH 4.5",
        detail: "Healthy lake water is about pH 6.5 to 7. These lakes test near pH 4.5, about as acidic as tomato juice.",
        year: "1978", yearNum: 1975, node: "Lake water more acidic",
        accept: ["result", "contrib"],
        mainHint: "Good catch: acidic water is the abiotic factor that changed. But acid doesn't appear in a lake by itself. Where did it come from?",
        why: "Acidic water is an abiotic change. It's a result of acid rain, and it's what directly harms the trout.",
      },
      s4: {
        icon: "🏭", title: "Sulphur dioxide from Sudbury smelters",
        detail: "Nickel and copper smelters near Sudbury release more than 2 million tonnes of sulphur dioxide gas a year. It mixes with water in the clouds and falls as acid rain.",
        year: "1950s–1970s", yearNum: 1955, node: "Smelter smoke (sulphur dioxide)",
        accept: ["main"], key: true,
        why: "Smelter smoke is the human activity that started the chain. It comes back down as acid rain.",
      },
      s5: {
        icon: "🗼", title: "The Superstack is built (1972)",
        detail: "To clean up Sudbury's own air, the smelter built a 381-metre smokestack, one of the tallest in the world. Now the smoke rises higher and travels farther before it comes down.",
        year: "1972", yearNum: 1972, node: "Superstack built",
        accept: ["contrib"],
        why: "The Superstack didn't make the pollution, but it spread it to lakes much farther away.",
      },
      s6: {
        icon: "🪨", title: "Hard white rock, thin soil",
        detail: "Killarney's lakes sit on quartzite and granite with very little soil. Limestone can neutralize acid, but this rock can't.",
        year: "Always", yearNum: 1900, node: "Rock can't neutralize acid",
        accept: ["contrib"],
        why: "The rock didn't cause the acid, but it couldn't protect the lakes from it. Lakes on limestone suffered much less.",
      },
      s7: {
        icon: "🎣", title: "Fishing: light and unchanged",
        detail: "Park records show few anglers on these lakes, the same as in the 1960s.",
        year: "1960s–1978", yearNum: 1966, node: "Fishing",
        accept: ["ruled"],
        why: "Fishing stayed light and didn't change, so it can't explain the crash.",
        notCause: "Park records show fishing stayed light the whole time. Something that didn't change can't explain why the trout vanished.",
      },
      s8: {
        icon: "🦐", title: "Crayfish, snails and plankton ↓",
        detail: "The water is crystal clear because the tiny plankton that used to cloud it are gone, along with crayfish and snails.",
        year: "1970s", yearNum: 1976, node: "Plankton & crayfish disappear",
        accept: ["result"],
        why: "A surprise: the clear water is a warning sign. Acid killed the tiny living things that normally make lake water a little cloudy.",
      },
    },
    tests: [
      { id: "t1", name: "Water pH test", cost: 1, reveals: "s3", desc: "Measure how acidic the lake water is.",
        readout: "PH TEST // GEORGE LAKE\nRESULT: PH 4.5 (HEALTHY LAKE: 6.5-7)\nWARNING: WATER IS ACIDIC." },
      { id: "t2", name: "Air quality records", cost: 2, reveals: "s4", desc: "Check what's in the air and rain over Killarney.",
        readout: "AIR + RAIN RECORDS // NORTHEASTERN ONTARIO\nSOURCE: SUDBURY NICKEL SMELTERS\nSULPHUR DIOXIDE: OVER 2 MILLION TONNES PER YEAR." },
      { id: "t3", name: "Smokestack records", cost: 1, reveals: "s5", desc: "Look into the smelter's new smokestack.",
        readout: "ENGINEERING FILE // SUPERSTACK\nHEIGHT: 381 M. COMPLETED: 1972.\nPURPOSE: CARRY SMOKE AWAY FROM SUDBURY." },
      { id: "t4", name: "Rock and soil survey", cost: 1, reveals: "s6", desc: "Find out what the lakes are sitting on.",
        readout: "GEOLOGY SURVEY // KILLARNEY\nBEDROCK: QUARTZITE + GRANITE. SOIL: THIN.\nACID NEUTRALIZING POWER: VERY LOW." },
      { id: "t5", name: "Fishing records", cost: 1, reveals: "s7", desc: "Check how many people fish these lakes.",
        readout: "PARK RECORDS // ANGLERS\nFISHING PRESSURE: LIGHT.\nNO CHANGE SINCE THE 1960s." },
      { id: "t6", name: "Plankton & crayfish survey", cost: 2, reveals: "s8", desc: "Count the tiny living things in the water.",
        readout: "PLANKTON + INVERTEBRATE SURVEY\nPLANKTON: VERY LOW. CRAYFISH: NONE FOUND.\nSNAILS: NONE FOUND." },
    ],
    mustBe: [],
    chain: [
      { id: "s4" },
      { id: "s3",
        before: "The sulphur dioxide falls back down as acid rain, which makes the lake water", after: ".",
        options: [
          { text: "more acidic", ok: true },
          { text: "colder", hint: "The water temperature didn't change. You ruled that out! Check your pH test." },
          { text: "saltier", hint: "There's no salt in this case. What did the pH test show?" },
        ] },
      { id: "s1",
        before: "Acidic water", after: "trout eggs and the small animals young trout eat.",
        options: [
          { text: "kills", ok: true },
          { text: "feeds", hint: "If the water fed the trout, there would be more of them, not none. What does acid do to living things?" },
          { text: "warms", hint: "The water temperature didn't change. Think about what acid does to eggs and tiny animals." },
        ] },
    ],
    solution: {
      question: "The government asks for your advice. What should be done to bring the fish back?",
      options: [
        { text: "Cut the sulphur dioxide coming out of the smelters", ok: true,
          epilogue: "The smelters start capturing sulphur and turning it into sulphuric acid they can sell, and Ontario sets strict limits. Sulphur dioxide drops by about 90% over the next 25 years. Slowly the lakes become less acidic. Plankton and crayfish return, and lake trout are restocked. Many of Killarney's lakes recover." },
        { text: "Build an even taller smokestack",
          epilogue: "That's what Sudbury tried with the Superstack in 1972! The air in Sudbury got cleaner, but the same pollution came down as acid rain on lakes even farther away. A taller stack moves the problem. It doesn't solve it." },
        { text: "Restock the lakes with young lake trout",
          epilogue: "Thousands of young trout are released. By next spring, almost all of them are dead. The water is still acidic, so they can't survive. Nothing was done about the cause." },
      ],
    },
    real: {
      headline: "What really happened",
      paragraphs: [
        "For decades, Sudbury's smelters released about a quarter of all the sulphur dioxide in Canada. Acid rain damaged about 7,000 lakes in the region, and Killarney's lakes, sitting on rock that can't neutralize acid, were among the hardest hit.",
        "In the 1980s and 1990s, Ontario forced big cuts in emissions, and the smelters learned to capture the sulphur instead of releasing it. Sudbury also began a famous regreening program, planting millions of trees on its blackened hills. Many of Killarney's lakes have recovered, and fish have returned. Scientists around the world study Sudbury as proof that damaged ecosystems can heal.",
      ],
      note: "Case details are simplified for the game. The history and the science are real.",
    },
    specimens: [
      { icon: "🦞", name: "Crayfish", fact: "Needs calcium to build its shell. In acidic water, calcium is hard to get." },
      { icon: "🦆", name: "Common loon", fact: "The bird on the loonie! Loons need lakes full of small fish to feed their chicks." },
      { icon: "🌳", name: "White birch", fact: "One of the first trees to grow back on Sudbury's bare, blackened hills." },
    ],
    vocab: ["Abiotic factor", "Acid rain", "Human impact", "Stewardship", "Food web"],
    nextCode: "SUPER-STACK",
  },

  /* ===================== CASE 005 ===================== */
  {
    id: "c5",
    num: "005",
    title: "Green Water",
    where: "Lake Erie, off Kingsville and Pelee Island",
    skill: "Decomposers",
    unlockCode: "SUPER-STACK",
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "Western Lake Erie, off Kingsville and Pelee Island",
      Ecosystem: "Great Lake, warm shallow water",
      Reported: "August 2014, by beach inspectors and fishers",
      Concern: "Lake turning green; fish dying in deep water",
    },
    brief: [
      "It's August 2014. The water off Kingsville looks like pea soup. A thick green scum covers the surface, beaches are closed, and the lake smells bad.",
      "Out in the deeper water, fishers are pulling up dead fish. Across the lake, the city of Toledo has told its residents not to drink their tap water.",
      "Lake Erie is the warmest and shallowest of the Great Lakes, and it's full of life. What is turning it green?",
    ],
    start: ["l1", "l7"],
    evidence: {
      l1: {
        icon: "🟢", title: "Thick green algae bloom",
        detail: "A huge bloom of algae covers the western end of the lake. Beaches are closed and the water smells bad.",
        year: "Summer 2014", yearNum: 2014.6, node: "Algae bloom",
        accept: ["result"],
        why: "The bloom is the change you're explaining. It's a result, and it causes more results.",
      },
      l7: {
        icon: "🚤", title: "Boat traffic: same as usual",
        detail: "Marina records show about the same number of boats on the lake as other summers.",
        year: "2010–2014", yearNum: 2010, node: "Boat traffic",
        accept: ["ruled"],
        why: "Boat traffic didn't change, so it can't explain the bloom.",
        notCause: "There are the same number of boats as other summers. Something that didn't change can't explain the green water.",
      },
      l3: {
        icon: "🚜", title: "Phosphorus washing off farm fields",
        detail: "Water samples from rivers that flow into the lake are full of phosphorus, a plant nutrient in fertilizer and manure. It washes off farm fields into the rivers, then into the lake.",
        year: "1995–2014", yearNum: 2000, node: "Fertilizer runoff (phosphorus)",
        accept: ["main"], key: true,
        why: "Fertilizer runoff is the human activity that started the chain. Phosphorus is food for algae.",
      },
      l4: {
        icon: "🌧️", title: "Big spring rainstorms",
        detail: "Spring 2014 had heavy rainstorms. Big storms wash much more soil and fertilizer off fields than gentle rain does.",
        year: "Spring 2014", yearNum: 2014.3, node: "Heavy rainstorms",
        accept: ["contrib"],
        why: "The storms didn't make the fertilizer, but they washed a lot more of it into the lake at once.",
      },
      l5: {
        icon: "💧", title: "Deep water oxygen ↓ (dead zone)",
        detail: "By late summer, the water near the lake bottom has almost no oxygen. Fish and insects that live there must leave or die.",
        year: "Late summer 2014", yearNum: 2014.8, node: "Oxygen ↓ in deep water",
        accept: ["result"],
        why: "The dead zone is a result of the bloom. When the algae die, decomposers use up the oxygen.",
      },
      l6: {
        icon: "🦠", title: "Toxins in the drinking water",
        detail: "The bloom is made of cyanobacteria (blue-green algae). Some kinds make toxins. Toledo and Pelee Island told people not to drink their tap water.",
        year: "August 2014", yearNum: 2014.65, node: "Toxins in drinking water",
        accept: ["result"],
        why: "The toxins are a result of the bloom, and a dangerous one for people and pets.",
      },
      l8: {
        icon: "🚽", title: "City sewage: phosphorus cut since the 1970s",
        detail: "Since the 1970s, cities around Lake Erie have removed most of the phosphorus from their treated sewage. Their releases are much lower than in the past.",
        year: "1972–2014", yearNum: 1972, node: "City sewage",
        accept: ["ruled", "contrib"],
        why: "Sewage used to be a big source of phosphorus, but cities cut it decades ago. Today it's only a small part of the problem.",
        notCause: "Cities cut the phosphorus in their sewage back in the 1970s, and the lake got better afterwards. Something that went down can't explain why the blooms came back.",
      },
    },
    tests: [
      { id: "t1", name: "Trace the river water", cost: 2, reveals: "l3", desc: "Test the rivers that flow into the lake.",
        readout: "RIVER SAMPLES // MAUMEE + THAMES RIVERS\nPHOSPHORUS: HIGH, ESPECIALLY AFTER STORMS.\nSOURCE: FARM FERTILIZER + MANURE." },
      { id: "t2", name: "Weather records", cost: 1, reveals: "l4", desc: "Check the spring rainfall.",
        readout: "WEATHER RECORDS // SPRING 2014\nSEVERAL HEAVY RAINSTORMS.\nRIVERS RAN HIGH AND MUDDY." },
      { id: "t3", name: "Deep water oxygen probe", cost: 1, reveals: "l5", desc: "Measure the oxygen near the lake bottom.",
        readout: "OXYGEN PROBE // LAKE BOTTOM\nDISSOLVED OXYGEN: NEARLY ZERO.\nSTATUS: DEAD ZONE." },
      { id: "t4", name: "Microscope check", cost: 1, reveals: "l6", desc: "Look at the green water under a microscope.",
        readout: "MICROSCOPE // BLOOM SAMPLE\nORGANISM: CYANOBACTERIA (BLUE-GREEN ALGAE)\nTOXINS DETECTED." },
      { id: "t5", name: "Sewage plant records", cost: 1, reveals: "l8", desc: "Check what cities release into the lake.",
        readout: "SEWAGE PLANT RECORDS // LAKE ERIE CITIES\nPHOSPHORUS REMOVAL SINCE THE 1970s.\nRELEASES: LOW." },
    ],
    mustBe: [],
    chain: [
      { id: "l3" },
      { id: "l1",
        before: "Rain washes phosphorus from farm fields into the lake, where it", after: "the algae, and they multiply.",
        options: [
          { text: "feeds", ok: true },
          { text: "poisons", hint: "If phosphorus poisoned the algae, there would be less algae, not a huge bloom. Phosphorus is in fertilizer. What does fertilizer do?" },
          { text: "cools", hint: "Phosphorus is a nutrient, not a temperature. What does fertilizer do for plants?" },
        ] },
      { id: "l5",
        before: "When the algae die and sink, decomposers like bacteria break them down and", after: "the oxygen in the deep water.",
        options: [
          { text: "use up", ok: true },
          { text: "add more", hint: "The oxygen probe found almost no oxygen near the bottom. Decomposers breathe oxygen just like animals do." },
          { text: "freeze", hint: "It's late summer, and the lake is warm. Decomposers need oxygen to break things down. What happens to it?" },
        ] },
    ],
    solution: {
      question: "Ontario and its neighbours ask for your advice. How should they fix Lake Erie?",
      options: [
        { text: "Keep fertilizer on the fields: use less, plant cover crops, and leave strips of plants along streams", ok: true,
          epilogue: "In 2016, Canada and the United States agreed to cut the phosphorus going into Lake Erie by 40%. Farmers who use the right amount of fertilizer, plant cover crops in winter, and keep plant strips along streams lose much less phosphorus. It's a slow fix: blooms still happen, but the lake has a real chance to heal." },
        { text: "Spray a chemical on the lake to kill the algae",
          epilogue: "The bloom dies. Then the dead algae sink and decompose, and the decomposers use up even more oxygen. Toxins spill into the water. Next spring, rain washes in more fertilizer and the bloom comes right back." },
        { text: "Close all the beaches every summer",
          epilogue: "People stay safe, but nothing changes in the lake. Fertilizer keeps washing in, and the bloom grows back every summer. Closing beaches protects people, but it doesn't fix the cause." },
      ],
    },
    real: {
      headline: "What really happened",
      paragraphs: [
        "In the 1960s, Lake Erie was called a \"dead lake\" because of phosphorus from sewage and laundry detergent. Canada and the U.S. signed the Great Lakes Water Quality Agreement in 1972, cities cut their phosphorus, and the lake recovered.",
        "Starting in the mid-1990s, the blooms came back. This time most of the phosphorus came from farm fertilizer and manure. In August 2014, a toxic bloom forced Toledo, Ohio to tell hundreds of thousands of people not to drink their tap water for two days, and Pelee Island in Ontario had the same problem. In 2016, Canada and the U.S. set a goal to cut phosphorus going into the lake by 40%.",
      ],
      note: "Case details are simplified for the game. The history and the science are real.",
    },
    specimens: [
      { icon: "🐟", name: "Yellow perch", fact: "A favourite Lake Erie fish. Perch have to flee when the deep water loses its oxygen." },
      { icon: "🦠", name: "Cyanobacteria", fact: "Among the oldest living things on Earth. They make oxygen, but too many cause big trouble." },
      { icon: "🪰", name: "Burrowing mayfly", fact: "Lake Erie's mayfly hatches are so huge they show up on weather radar." },
    ],
    vocab: ["Decomposer", "Nutrient", "Abiotic factor (oxygen)", "Human impact", "Stewardship"],
    nextCode: "ALGAE-BLOOM",
  },

  /* ===================== CASE 006 ===================== */
  {
    id: "c6",
    num: "006",
    title: "The Silent Orchard",
    where: "An apple orchard in Norfolk County",
    skill: "Pollinators + multiple causes",
    unlockCode: "ALGAE-BLOOM",
    budget: 5,
    minNeeded: 3,
    facts: {
      Location: "An apple orchard near Simcoe, Norfolk County",
      Ecosystem: "Farmland and orchard",
      Reported: "Spring 2013, by a local beekeeper",
      Concern: "Bees dying; orchard blossoms going unpollinated",
    },
    brief: [
      "It's May 2013. The apple trees in this Norfolk County orchard are in full bloom, but the orchard is strangely quiet. There's almost no buzzing.",
      "The beekeeper who keeps hives here is finding piles of dead bees outside them every morning. Wild bumblebees are hard to find too.",
      "No bees means no pollination, and no pollination means no apples. Find out what's killing the bees. Careful: there may be more than one thing going on.",
    ],
    start: ["o1", "o2"],
    evidence: {
      o1: {
        icon: "🐝", title: "Bees dying in spring",
        detail: "Piles of dead honey bees outside the hives every morning in May. Wild bumblebees are scarce too.",
        year: "May 2013", yearNum: 2013.4, node: "Bees die",
        accept: ["result"],
        why: "This is the change you're explaining. It's a result, and it causes another result.",
      },
      o2: {
        icon: "❄️", title: "Hives healthy after winter",
        detail: "The beekeeper checked every hive in March. They came through the winter strong. The bees started dying in May.",
        year: "March 2013", yearNum: 2013.2, node: "Winter weather",
        accept: ["ruled"],
        why: "The bees were healthy after winter, so the cold didn't kill them.",
        notCause: "The hives were strong at the end of winter. Whatever killed the bees happened in May.",
      },
      o3: {
        icon: "🔬", title: "Varroa mites: low",
        detail: "Varroa mites are tiny parasites that can wipe out a hive. The mite counts in these hives are low.",
        year: "May 2013", yearNum: 2013.38, node: "Varroa mites",
        accept: ["ruled"],
        why: "Mites can kill hives, but there are very few here.",
        notCause: "The mite counts are low. Mites aren't what's killing these bees.",
      },
      o4: {
        icon: "🧪", title: "Insecticide found on the dead bees",
        detail: "A lab tests the dead bees and finds neonicotinoids, a type of insecticide that is very toxic to bees.",
        year: "May 2013", yearNum: 2013.42, node: "Insecticide on dead bees",
        accept: ["result", "contrib"],
        mainHint: "Good catch: the bees were poisoned. But the insecticide didn't appear by itself. Where did it come from?",
        why: "The insecticide on the bees is evidence of how they died. It's a result of something nearby.",
      },
      o5: {
        icon: "🌽", title: "Corn planted with coated seed",
        detail: "In early May, the farm next door planted corn seed coated with neonicotinoid insecticide. The planting machine blows dust off the seeds, and it drifts onto nearby flowers.",
        year: "Early May 2013", yearNum: 2013.35, node: "Insecticide dust from planting",
        accept: ["main"], key: true,
        why: "The dust from planting coated seed is the human action that started the chain. Bees picked it up from the flowers.",
      },
      o6: {
        icon: "🌼", title: "Hedgerows and wildflowers removed",
        detail: "Over 20 years, the hedgerows and wild meadows around the orchard were cleared for bigger fields. Wild bees lost places to nest and flowers to feed on.",
        year: "1990s–2013", yearNum: 1995, node: "Wildflowers & hedgerows lost",
        accept: ["contrib"],
        why: "Losing habitat weakened the bees long before the dust arrived. Two causes working together hit the bees harder than either alone.",
        notCause: "Wild bees need flowers and nesting spots, and most of them were cleared. That didn't kill the bees this spring, but it made things worse. Is it really ruled out?",
      },
      o7: {
        icon: "🍎", title: "Apple harvest ↓",
        detail: "In the fall, the orchard grows far fewer apples than normal. Many blossoms were never pollinated.",
        year: "Fall 2013", yearNum: 2013.75, node: "Fewer apples",
        accept: ["result"],
        why: "Fewer pollinators means fewer apples. A change in the ecosystem reached all the way to people's food.",
      },
      o8: {
        icon: "🌡️", title: "Spring weather: normal, no frost",
        detail: "Weather records show a normal spring with no late frost on the blossoms.",
        year: "Spring 2013", yearNum: 2013.3, node: "Spring weather",
        accept: ["ruled"],
        why: "There was no frost, so weather didn't damage the blossoms.",
        notCause: "The spring was normal with no frost. Weather didn't harm the bees or the blossoms.",
      },
    },
    tests: [
      { id: "t1", name: "Lab test on dead bees", cost: 2, reveals: "o4", desc: "Send dead bees to a lab to find out what killed them.",
        readout: "LAB REPORT // DEAD BEE SAMPLES\nINSECTICIDE DETECTED: NEONICOTINOID.\nVERY TOXIC TO BEES." },
      { id: "t2", name: "Talk to the farmer next door", cost: 1, reveals: "o5", desc: "Ask what's been happening on the neighbouring field.",
        readout: "INTERVIEW // NEIGHBOURING FARMER\n\"PLANTED CORN IN EARLY MAY.\nTHE SEED COMES COATED WITH INSECTICIDE.\"" },
      { id: "t3", name: "Check for varroa mites", cost: 1, reveals: "o3", desc: "Count the parasites in the hives.",
        readout: "HIVE INSPECTION // VARROA MITES\nMITE COUNT: LOW IN ALL HIVES." },
      { id: "t4", name: "Compare old maps", cost: 1, reveals: "o6", desc: "See how the land around the orchard has changed.",
        readout: "MAP COMPARISON // 1990 VS 2013\nHEDGEROWS: MOSTLY REMOVED.\nWILD MEADOWS: CONVERTED TO FIELDS." },
      { id: "t5", name: "Count the apples", cost: 1, reveals: "o7", desc: "Check the orchard's harvest in the fall.",
        readout: "HARVEST COUNT // FALL 2013\nAPPLES: WELL BELOW NORMAL.\nMANY BLOSSOMS NEVER POLLINATED." },
      { id: "t6", name: "Weather records", cost: 1, reveals: "o8", desc: "Check for frost or strange spring weather.",
        readout: "WEATHER RECORDS // SPRING 2013\nNORMAL TEMPERATURES. NO LATE FROST." },
    ],
    mustBe: ["o6"],
    chain: [
      { id: "o5" },
      { id: "o1",
        before: "Insecticide dust from the coated seed drifts onto flowers and", after: "the bees that visit them.",
        options: [
          { text: "poisons", ok: true },
          { text: "feeds", hint: "Insecticide is made to kill insects. Bees are insects." },
          { text: "warms", hint: "The weather was normal. What does insecticide do to insects?" },
        ] },
      { id: "o7",
        before: "With fewer bees to carry pollen from blossom to blossom, the orchard grows", after: "apples.",
        options: [
          { text: "fewer", ok: true },
          { text: "more", hint: "Apple blossoms need pollen carried to them to become apples. Fewer bees means fewer pollinated blossoms." },
          { text: "bigger", hint: "The harvest count showed a big change in the number of apples. Which way did it go?" },
        ] },
    ],
    solution: {
      question: "The township asks for your advice. What should be done to protect the bees?",
      options: [
        { text: "Only use coated seed when there's a real pest problem, and plant wildflower strips for bees", ok: true,
          epilogue: "Ontario became the first place in North America to limit neonicotinoid-coated seed: starting in 2015, farmers had to show they had a pest problem before using it. Wildflower strips give wild bees food and places to nest. Fewer bees die at planting time, and the orchard hums again." },
        { text: "Rent extra honey bee hives every spring",
          epilogue: "The orchard gets pollinated this year. But the rented bees die at planting time too, and the wild bees keep disappearing. You've paid to cover up the problem, not fix it." },
        { text: "Spray the orchard with insecticide to protect the trees",
          epilogue: "Insecticide kills bees too! Even more bees die, along with ladybugs and other helpful insects. Next year there are even fewer apples." },
      ],
    },
    real: {
      headline: "What really happened",
      paragraphs: [
        "In 2012 and 2013, beekeepers in Ontario's corn-growing regions reported huge numbers of dead bees at planting time. Health Canada found that about 70% of the dead bees it tested had neonicotinoid insecticide on them, and that dust from planting coated seed was a main way bees were exposed.",
        "In 2015, Ontario became the first place in North America to restrict neonicotinoid-coated corn and soybean seed. Scientists say bees face several threats at once: pesticides, habitat loss, parasites and disease. Ontario has more than 400 kinds of native bees, and many of them need wild flowers and undisturbed ground to survive.",
      ],
      note: "The orchard is made up for the game. The history and the science are real.",
    },
    specimens: [
      { icon: "🐝", name: "Honey bee", fact: "Not native to Canada! Brought from Europe in the 1600s. One hive can hold 50,000 bees." },
      { icon: "🐝", name: "Bumblebee", fact: "Can fly on cold, cloudy days when other bees stay home. It buzzes to shake pollen loose." },
      { icon: "🪺", name: "Mason bee", fact: "A native bee that nests alone in hollow stems. Excellent at pollinating apple blossoms." },
    ],
    vocab: ["Pollinator", "Multiple causes", "Habitat loss", "Human impact", "Stewardship"],
    nextCode: null,
  },

];

/* ===================== TEACHER DEMO =====================
   Shown only when someone types the teacher password as their
   agent name. Big text and "Ask the class" prompts for a smartboard. */
const TEACHER_PASSWORD = "LADYBUGS";   // change the teacher password here

const DEMO_CASE = {
  id: "demo",
  demo: true,
  num: "000",
  title: "The Ladybug Mystery",
  where: "Our school garden",
  skill: "Classroom demo for the smartboard",
  budget: 4,
  minNeeded: 2,
  facts: {
    Location: "Our school garden",
    Ecosystem: "Vegetable garden",
    Reported: "This September, by the Eco Club",
    Concern: "Bean plants covered in aphids",
  },
  brief: [
    "The Eco Club planted beans in the school garden this spring. Now the plants are wilting, and every leaf is covered in tiny green insects called aphids.",
    "Last year there were only a few aphids. This year there are hundreds on every plant.",
    "What changed in the garden? Let's investigate together.",
  ],
  teacherTip: "Teacher tip: try making a wrong accusation on purpose, so the class sees what the Chief's feedback looks like.",
  start: ["d1", "d2"],
  evidence: {
    d1: {
      icon: "🌱", title: "Aphids ↑ on the bean plants",
      detail: "The Eco Club counted hundreds of aphids on every bean plant. Last year there were only a few.",
      year: "Sept 2026", yearNum: 2026.8, node: "Aphids ↑",
      accept: ["result"],
      why: "This is the problem you're explaining. It's a result.",
    },
    d2: {
      icon: "💧", title: "Watering: same as last year",
      detail: "The Eco Club waters the garden twice a week, just like last year.",
      year: "2025–2026", yearNum: 2025, node: "Watering",
      accept: ["ruled"],
      why: "The watering didn't change, so it can't explain the aphids.",
      notCause: "The garden got the same water as last year. Something that didn't change can't explain why the aphids took over.",
    },
    d3: {
      icon: "🧴", title: "Bug spray used in June",
      detail: "The caretaker sprayed the garden with an insecticide in June to get rid of ants. It kills most insects it touches.",
      year: "June 2026", yearNum: 2026.4, node: "Bug spray used",
      accept: ["main"], key: true,
      why: "The spray is the human action that started the chain. It killed helpful insects along with the ants.",
    },
    d4: {
      icon: "🐞", title: "Ladybugs ↓ 90%",
      detail: "Last year the class counted 40 ladybugs in the garden. This year they found 4. Ladybugs eat aphids.",
      year: "Summer 2026", yearNum: 2026.6, node: "Ladybugs ↓",
      accept: ["result"],
      why: "The ladybugs died because of the spray. That makes them a result, and their loss caused the next result.",
    },
    d5: {
      icon: "🌼", title: "No flower border this year",
      detail: "Last year marigolds and dill grew around the beans. This year the border wasn't planted. Ladybugs use flowers for shelter and extra food.",
      year: "Spring 2026", yearNum: 2026.3, node: "No flower border",
      accept: ["contrib"],
      why: "Fewer flowers meant fewer places for ladybugs to live, which made things worse. But flowers alone didn't wipe the ladybugs out.",
    },
  },
  tests: [
    { id: "t1", name: "Interview the caretaker", cost: 1, reveals: "d3", desc: "Ask if anything was done to the garden this year.",
      readout: "INTERVIEW // SCHOOL CARETAKER\n\"I SPRAYED FOR ANTS BACK IN JUNE.\nKILLS PRETTY MUCH ANY BUG IT TOUCHES.\"" },
    { id: "t2", name: "Ladybug count", cost: 1, reveals: "d4", desc: "Count the ladybugs in the garden.",
      readout: "INSECT COUNT // SCHOOL GARDEN\nLADYBUGS LAST YEAR: 40\nLADYBUGS THIS YEAR: 4" },
    { id: "t3", name: "Compare garden photos", cost: 1, reveals: "d5", desc: "Look at photos of the garden from last year.",
      readout: "PHOTO COMPARISON // 2025 VS 2026\n2025: MARIGOLD + DILL BORDER AROUND BEANS.\n2026: NO BORDER PLANTED." },
  ],
  mustBe: [],
  chain: [
    { id: "d3" },
    { id: "d4",
      before: "The bug spray", after: "the ladybugs living in the garden.",
      options: [
        { text: "kills", ok: true },
        { text: "feeds", hint: "Bug spray isn't food. The caretaker said it kills most insects it touches." },
        { text: "attracts", hint: "If the spray attracted ladybugs, there would be more of them, not fewer." },
      ] },
    { id: "d1",
      before: "With fewer ladybugs eating them, the aphid population", after: ".",
      options: [
        { text: "grows", ok: true },
        { text: "shrinks", hint: "Ladybugs are predators that eat aphids. When the predators disappear, what happens to their prey?" },
        { text: "stays the same", hint: "The Eco Club saw a huge change in the aphids. Which way did it go?" },
      ] },
  ],
  prompts: {
    brief: "What do we already know? What are some things that could make aphids suddenly take over a garden?",
    board: [
      "We have 4 Field Points. Which test should we run first, and why?",
      "What did that test tell us? Is this clue a cause, or a result of the problem?",
      "Can we rule anything out? How do we know?",
      "Let's stamp every clue. Which one started everything? That's our suspect.",
    ],
    theory: {
      node: "What happened because of the clue in the last box? Which clue comes next?",
      link: "Read the sentence out loud with each word. Which one makes it true?",
      done: "Read our chain from start to finish. Does every step make sense?",
    },
    solved: "Who was harmed by the spray, and who benefited? How could the garden get rid of ants without hurting the ladybugs?",
  },
  real: {
    headline: "The science behind it",
    paragraphs: [
      "Ladybugs (also called lady beetles) are predators, and aphids are one of their favourite foods. A single ladybug can eat thousands of aphids in its lifetime.",
      "Many insecticides kill helpful insects along with pests. When the predators disappear, the prey population can explode. That's why many gardeners plant flowers to attract ladybugs and avoid spraying.",
    ],
    note: "This demo case is made up for the classroom. The science is real.",
  },
  vocab: ["Predator / prey", "Food web", "Human impact", "Population"],
  nextCode: null,
};

/* ----------------------------------------------------------
   2. STATE + STORAGE
   ---------------------------------------------------------- */

// Saves only for this browser tab. On a shared class set of
// Chromebooks, the next student always starts fresh. Agent codes
// carry progress from one day to the next.
const STORE_KEY = "ecosystem-detective-session";

function blankProgress() {
  return { name: null, teacher: false, unlocked: ["c1"], best: {} };
}
function loadProgress() {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (raw) return { ...blankProgress(), ...JSON.parse(raw) };
  } catch (e) { /* storage blocked; play without saving */ }
  return blankProgress();
}
function saveProgress() {
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state.progress)); } catch (e) { /* ignore */ }
}

const state = {
  screen: "title",
  progress: loadProgress(),
  sound: true,
  run: null,           // the case currently being played
  codeMsg: "",
  loginMsg: "",
  debriefStep: 0,
  hqTab: "dispatch",   // which headquarters tab is showing
  mapView: "all",      // "all" or "south"
  pinSel: null,        // map pin the player tapped
  specFilter: "all",
};

function newRun(caseId) {
  const c = getCase(caseId);
  return {
    caseId,
    fp: c.budget,
    revealed: [...c.start],
    testsDone: [],
    stamps: {},
    accused: false,     // true once the main cause is confirmed
    step: 1,            // which chain box the player is filling (box 0 is the cause)
    phase: "node",      // "node" = pick a clue, "link" = finish the sentence, "done"
    picked: [],         // the sentence choice made for each link
    orders: c.chain.map((s) => (s.options ? shuffle(s.options.map((_, i) => i)) : null)),
    slips: 0,           // wrong picks while building the chain (no penalty)
    flash: null,        // last wrong pick, so it can wobble and show a hint
    wrong: 0,
    funding: 0,
    hints: 0,           // times the player called the Chief
    plan: null,         // index of the plan picked in the "recommend a plan" step
    planWrong: [],      // plans already tried that didn't work
    term: { text: "FIELD TERMINAL READY.\nCHOOSE A FIELD TEST TO GATHER EVIDENCE.", count: 9999 },
    result: null,
  };
}

function getCase(id) { return id === DEMO_CASE.id ? DEMO_CASE : CASES.find((c) => c.id === id); }

// A case's specimen cards count as collected once it's closed, or once
// a later case is unlocked (which means it was closed on an earlier day).
function caseCollected(c) {
  const i = CASES.indexOf(c);
  if (state.progress.best[c.id]) return true;
  return CASES.slice(i + 1).some((n) => state.progress.unlocked.includes(n.id));
}
function specimenCount() {
  let have = 0, total = 0;
  CASES.forEach((c) => { total += c.specimens.length; if (caseCollected(c)) have += c.specimens.length; });
  return { have, total };
}

function askClass(c, where) {
  if (!c.prompts || !state.run) return "";
  let p = c.prompts[where];
  if (Array.isArray(p)) p = p[Math.min(state.run.testsDone.length, p.length - 1)];
  else if (p && typeof p === "object") p = p[state.run.phase];
  if (!p) return "";
  return `<div class="ask-class"><span class="ask-label">Ask the class</span><p>${esc(p)}</p></div>`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ----------------------------------------------------------
   3. SOUND (tiny Web Audio blips, no files needed)
   ---------------------------------------------------------- */

let audioCtx = null;
function tone(freq, dur = 0.08, type = "square", vol = 0.05, when = 0) {
  if (!state.sound) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime + when;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch (e) { /* audio unavailable */ }
}
const sfx = {
  click: () => tone(660, 0.04),
  type: () => tone(1200 + Math.random() * 300, 0.015, "square", 0.015),
  stamp: () => { tone(90, 0.12, "triangle", 0.2); tone(60, 0.1, "sine", 0.15, 0.02); },
  reveal: () => { tone(520, 0.06); tone(780, 0.08, "square", 0.05, 0.07); },
  fail: () => { tone(300, 0.15, "sawtooth", 0.05); tone(200, 0.25, "sawtooth", 0.05, 0.16); },
  win: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.14, "square", 0.05, i * 0.12)),
};

/* ----------------------------------------------------------
   4. HELPERS
   ---------------------------------------------------------- */

const $app = document.getElementById("app");
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

function currentCase() { return state.run ? getCase(state.run.caseId) : null; }

/* ----------------------------------------------------------
   ARTWORK
   Pictures live in an images/ folder next to index.html, as .jpg.
   If a picture isn't there yet, the game quietly falls back to the
   emoji (specimen cards) or shows no portrait (the Chief).
   ---------------------------------------------------------- */

const IMG_DIR = "images/";
const CHIEF_IMG = {
  neutral: "chief.jpg",          // briefing memos
  phone: "chief-phone.jpg",      // "Call the Chief" hints
  pleased: "chief-pleased.jpg",  // suspect confirmed
  stern: "chief-stern.jpg",      // accusation rejected
};
const LOCKED_CARD_IMG = "spec-locked.jpg";
const missingImages = new Set();   // pictures we already know aren't there

function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

// spec-c1-mayfly-nymph.jpg, spec-c4-common-loon.jpg, ...
function specImgFile(c, s) { return s.img || `spec-${c.id}-${slug(s.name)}.jpg`; }

function artImg(file, cls) {
  const src = IMG_DIR + file;
  if (missingImages.has(src)) return "";
  return `<img class="${cls}" src="${esc(src)}" alt="" data-fallback>`;
}

// The emoji sits underneath; the picture covers it once it loads.
function specArt(c, s) {
  return `<div class="spec-art"><span class="spec-icon" aria-hidden="true">${s.icon}</span>${artImg(specImgFile(c, s), "spec-img")}</div>`;
}
function lockedArt() {
  return `<div class="spec-art"><span class="spec-icon" aria-hidden="true">?</span>${artImg(LOCKED_CARD_IMG, "spec-img")}</div>`;
}
// No whitespace inside, so an empty frame hides itself with :empty.
function chiefFace(pose, size = "") {
  return `<div class="chief-portrait ${size}">${artImg(CHIEF_IMG[pose], "chief-img")}</div>`;
}

// When a picture is missing, remove it so the fallback shows.
document.addEventListener("error", (ev) => {
  const t = ev.target;
  if (t && t.tagName === "IMG" && t.hasAttribute("data-fallback")) {
    missingImages.add(t.getAttribute("src"));
    const frame = t.closest(".chief-portrait");
    t.remove();
    if (frame) frame.classList.add("is-empty");
  }
}, true);

function updateTopbar() {
  const meter = document.getElementById("fp-meter");
  const pips = document.getElementById("fp-pips");
  const inCase = state.run && ["board", "theory"].includes(state.screen);
  meter.hidden = !inCase;
  if (inCase) {
    const c = currentCase();
    const total = c.budget + state.run.funding * 2;
    let html = "";
    for (let i = 0; i < total; i++) html += `<span class="pip ${i < state.run.fp ? "on" : ""}"></span>`;
    pips.innerHTML = html;
    pips.setAttribute("aria-label", `${state.run.fp} of ${total} field points left`);
  }
  const chip = document.getElementById("agent-chip");
  const signedIn = !!state.progress.name;
  chip.hidden = !signedIn;
  chip.textContent = signedIn ? `Agent ${state.progress.name}` : "";
  document.getElementById("howto-btn").hidden = !signedIn || state.progress.teacher;
  const sb = document.getElementById("sound-btn");
  sb.textContent = `Sound: ${state.sound ? "On" : "Off"}`;
  sb.setAttribute("aria-pressed", String(state.sound));
}

/* ----------------------------------------------------------
   READ-ALOUD (uses the Chromebook's built-in voice, no internet)
   Any element with data-read gets read when its speaker button
   is pressed. Buttons and [data-noread] parts are skipped.
   ---------------------------------------------------------- */

const canSpeak = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
let speakingBtn = null;

const SPEAKER_ICON = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>`;

function sayBtn(label = "Read this aloud") {
  if (!canSpeak) return "";
  return `<button class="say-btn" type="button" data-action="speak" aria-label="${esc(label)}" aria-pressed="false" title="Read aloud">${SPEAKER_ICON}</button>`;
}

function pickVoice() {
  const vs = window.speechSynthesis.getVoices();
  return vs.find((v) => v.lang === "en-CA") || vs.find((v) => /^en[-_]US/.test(v.lang)) || vs.find((v) => /^en/.test(v.lang)) || null;
}

function cleanForSpeech(t) {
  return t
    .replace(/…/g, ".")
    .replace(/(\d)\s*[–-]\s*(\d)/g, "$1 to $2")
    .replace(/(\d)[xX]\b/g, "$1 times")
    .replace(/↑/g, " went up ")
    .replace(/↓/g, " went down ")
    .replace(/→/g, ", which leads to ")
    .replace(/×/g, " times ")
    .replace(/_{3,}/g, " blank ")
    .replace(/\/\//g, ", ")
    .replace(/\bFP\b/g, "field points")
    .replace(/#0*(\d+)/g, "number $1")
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/([.?!:])\s*\.\s*/g, "$1 ")
    .replace(/\s+/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .trim();
}

function stopSpeaking() {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  if (speakingBtn) {
    speakingBtn.classList.remove("speaking");
    speakingBtn.setAttribute("aria-pressed", "false");
  }
  speakingBtn = null;
}

function speakText(text, btn) {
  if (!canSpeak || !text) return;
  const same = btn && speakingBtn === btn;
  stopSpeaking();
  if (same) return;              // pressing again stops it
  const u = new SpeechSynthesisUtterance(cleanForSpeech(text));
  const v = pickVoice();
  if (v) u.voice = v;
  u.lang = v ? v.lang : "en-CA";
  u.rate = 0.92;
  const done = () => {
    if (btn && speakingBtn === btn) {
      btn.classList.remove("speaking");
      btn.setAttribute("aria-pressed", "false");
      speakingBtn = null;
    }
  };
  u.onend = done;
  u.onerror = done;
  if (btn) {
    speakingBtn = btn;
    btn.classList.add("speaking");
    btn.setAttribute("aria-pressed", "true");
  }
  window.speechSynthesis.speak(u);
}

// Visible text of the nearest [data-read] box, minus buttons and stamps.
function readableText(btn) {
  const box = btn.closest("[data-read]");
  if (!box) return "";
  // Terminal text is ALL CAPS; lowercase it so voices don't spell words out.
  if (box.dataset.read === "terminal") return state.run ? state.run.term.text.toLowerCase() : "";
  const clone = box.cloneNode(true);
  clone.querySelectorAll(".say-btn, .btn, [data-noread], .ev-icon, .p-icon, .spec-icon, .eyebrow, .from").forEach((n) => n.remove());
  const holder = document.createElement("div");
  holder.style.cssText = "position:absolute;left:-9999px;top:0;width:600px;";
  holder.appendChild(clone);
  document.body.appendChild(holder);
  const text = clone.innerText;
  holder.remove();
  return text;
}

function go(screen) {
  stopSpeaking();
  // The old screen names now live as tabs inside headquarters.
  if (screen === "cases") { state.hqTab = "files"; screen = "hq"; }
  if (screen === "report") { state.hqTab = "report"; screen = "hq"; }
  state.screen = screen;
  render();
  window.scrollTo({ top: 0 });
  $app.focus({ preventScroll: true });
}

/* ----------------------------------------------------------
   5. SCREENS
   ---------------------------------------------------------- */

function render() {
  if (!state.progress.name && state.screen !== "title") state.screen = "title";
  const caseScreens = ["brief", "board", "theory", "solved"];
  const demoOn = !!(state.run && currentCase() && currentCase().demo && caseScreens.includes(state.screen));
  document.documentElement.classList.toggle("presenter", demoOn);
  const fn = { title: renderTitle, debrief: renderDebrief, hq: renderHQ, cases: () => { state.hqTab = "files"; state.screen = "hq"; return renderHQ(); }, report: () => { state.hqTab = "report"; state.screen = "hq"; return renderHQ(); }, brief: renderBrief, board: renderBoard, theory: renderTheory, solved: renderSolved }[state.screen];
  $app.innerHTML = fn();
  updateTopbar();
  if (state.screen === "board") resumeTyping();
}

const DEBRIEF = [
  { head: "Welcome to the Bureau",
    body: (n) => [`Welcome, Agent ${n}. Something is going wrong in Ontario's ecosystems, and nobody knows why.`, "The Bureau needs detectives who can think like scientists. That's you."] },
  { head: "Step 1: Investigate",
    body: () => ["Each case gives you a few Field Points. Spend them on field tests to uncover clues.", "You can't run every test, so think before you click. Which test will tell you the most?"] },
  { head: "Step 2: Stamp every clue",
    body: () => ["Every clue gets one stamp: Main cause, Contributing, Result, or Ruled out.", "Then accuse your suspect. Be careful: a wrong accusation costs points."] },
  { head: "Step 3: Prove it",
    body: () => ["Build the chain of events from your suspect to the problem, one step at a time.", "When you close a case, write down your agent code. It's how you pick up where you left off next class."] },
];

function renderTitle() {
  const p = state.progress;
  const side = p.name
    ? `<div class="login-box">
         <p class="typed">Agent on duty: <strong>${esc(p.teacher ? "Teacher" : p.name)}</strong></p>
         <div class="row">
           <button class="btn btn-primary" type="button" data-action="hq-tab" data-tab="dispatch">Continue to headquarters</button>
           <button class="btn btn-small" type="button" data-action="switch-agent">Switch agent</button>
         </div>
       </div>`
    : `<form class="login-box" id="login-form" autocomplete="off">
         <label for="agent-name" class="typed">Agent name</label>
         <input id="agent-name" name="agent-name" maxlength="20" spellcheck="false" placeholder="Your first name">
         <p class="login-help">First name only.</p>
         <button class="btn btn-primary" type="submit">Report for duty</button>
         <p class="code-msg" role="status">${esc(state.loginMsg)}</p>
       </form>`;
  return `
  <section class="folder">
    <div class="folder-tab">Agent sign-in</div>
    <div class="title-screen">
      <div>
        <p class="eyebrow">Ontario Ecology Bureau</p>
        <h1>Ecosystem Detective</h1>
        <p class="lede">Something has gone wrong in an Ontario ecosystem. Gather evidence, rule out the suspects, and trace the chain of events back to the real cause.</p>
      </div>
      ${side}
    </div>
  </section>`;
}

function renderDebrief() {
  const i = state.debriefStep;
  const d = DEBRIEF[i];
  const last = i === DEBRIEF.length - 1;
  return `
  <section class="folder">
    <div class="folder-tab">Briefing from the Chief</div>
    <div class="debrief">
      <p class="eyebrow">Memo ${i + 1} of ${DEBRIEF.length}</p>
      <div class="memo debrief-memo" data-read>
        <div class="chief-row">
          ${chiefFace("neutral")}
          <div class="chief-text">
            <div class="say-row"><h2>${esc(d.head)}</h2>${sayBtn("Read this memo aloud")}</div>
            ${d.body(esc(state.progress.name)).map((t) => `<p>${t}</p>`).join("")}
            <p class="sig">— The Chief</p>
          </div>
        </div>
      </div>
      <div class="row">
        ${i > 0 ? `<button class="btn btn-small" type="button" data-action="debrief-back">← Back</button>` : ""}
        <span class="spacer"></span>
        ${last ? "" : `<button class="btn btn-small" type="button" data-action="debrief-done">Skip</button>`}
        <button class="btn btn-primary" type="button" data-action="${last ? "debrief-done" : "debrief-next"}">${last ? "Open the case files →" : "Next →"}</button>
      </div>
    </div>
  </section>`;
}

/* ----------------------------------------------------------
   ONTARIO MAP
   A stylized map with simplified coastlines (not survey-accurate).
   Every point is [latitude, longitude]. To add a case pin, add the
   case's id and location to CASE_PINS.
   ---------------------------------------------------------- */

const CASE_PINS = {
  c1: { at: [43.82, -79.12], place: "Highland Creek, Scarborough", year: "2025", teaser: "Creek insects are vanishing." },
  c2: { at: [43.66, -79.50], place: "A Toronto ravine", year: "2012", teaser: "Ash trees are dying. Maples are fine." },
  c3: { at: [47.95, -88.55], place: "Lake Superior, off Port Arthur", year: "1955", teaser: "The fishing nets come up empty." },
  c4: { at: [46.03, -81.30], place: "Killarney, near Sudbury", year: "1978", teaser: "The lakes look perfect, but the fish are gone." },
  c5: { at: [41.86, -82.70], place: "Lake Erie, off Pelee Island", year: "2014", teaser: "The lake is turning green." },
  c6: { at: [42.84, -80.30], place: "Norfolk County", year: "2013", teaser: "An orchard in bloom has gone silent." },
};
// Future cases, shown as "classified" pins.
const CLASSIFIED_PINS = [
  { at: [49.60, -94.60], place: "Lake of the Woods, near Kenora" },
  { at: [45.60, -78.40], place: "Algonquin Park" },
  { at: [54.60, -83.60], place: "Hudson Bay Lowlands" },
];

const MAP_K = 40, MAP_LON0 = -95.6, MAP_LAT1 = 57.4, MAP_COS = 0.656;
const MAP_VIEW = { x: 0, y: 0, w: 562, h: 632 };
const INSET_VIEW = { x: 322, y: 496, w: 158, h: 130 };   // southern Ontario close-up

function proj(p) {
  return [+((p[1] - MAP_LON0) * MAP_COS * MAP_K).toFixed(1), +((MAP_LAT1 - p[0]) * MAP_K).toFixed(1)];
}
function pathOf(pts) { return "M" + pts.map((p) => proj(p).join(",")).join("L") + "Z"; }
function inView(p, v) {
  const [x, y] = proj(p);
  return x >= v.x && x <= v.x + v.w && y >= v.y && y <= v.y + v.h;
}

const ONTARIO_SHAPE = [
  [56.86,-88.98],[56.4,-88.0],[56.02,-87.6],[55.6,-86.0],[55.3,-85.0],[55.2,-83.9],[55.15,-82.3],[54.5,-82.2],
  [53.8,-82.2],[52.95,-82.3],[52.3,-81.7],[51.7,-80.6],[51.3,-80.5],[51.45,-79.52],
  [47.6,-79.52],[47.0,-79.35],[46.65,-79.1],[46.32,-78.7],[46.2,-77.9],[45.9,-77.3],[45.6,-76.7],[45.48,-76.2],
  [45.42,-75.7],[45.55,-75.0],[45.48,-74.5],[45.3,-74.38],[45.0,-74.67],
  [44.85,-75.2],[44.6,-75.68],[44.35,-76.0],[44.22,-76.5],
  [44.05,-76.85],[43.88,-77.05],[43.98,-77.6],[43.97,-78.2],[43.87,-78.85],[43.75,-79.2],[43.63,-79.4],
  [43.55,-79.6],[43.3,-79.8],[43.2,-79.6],[43.25,-79.2],[43.26,-79.05],
  [43.1,-79.05],[42.9,-78.92],
  [42.87,-79.25],[42.8,-79.6],[42.82,-80.0],[42.7,-80.25],[42.55,-80.05],[42.58,-80.4],[42.65,-80.7],
  [42.65,-81.2],[42.4,-81.8],[42.25,-82.1],[42.05,-82.4],[41.92,-82.5],[42.03,-82.6],[42.03,-82.75],[42.1,-83.05],
  [42.3,-83.05],[42.33,-82.9],[42.35,-82.5],[42.6,-82.5],[42.8,-82.47],[42.98,-82.42],
  [43.35,-81.75],[43.75,-81.72],[44.18,-81.65],[44.5,-81.37],[44.9,-81.4],[45.25,-81.65],[44.95,-81.25],
  [44.75,-81.05],[44.58,-80.93],[44.65,-80.6],[44.5,-80.2],[44.55,-80.0],[44.78,-79.93],[44.85,-79.8],
  [45.35,-80.05],[45.8,-80.6],[45.97,-81.4],[46.05,-81.8],[46.2,-82.4],[46.17,-83.0],[46.25,-83.6],[46.4,-84.0],[46.5,-84.35],
  [46.8,-84.6],[47.3,-84.7],[47.98,-84.85],[48.2,-85.7],[48.73,-86.4],[48.8,-87.2],[49.0,-88.0],[48.75,-88.5],
  [48.45,-89.0],[48.38,-89.25],[48.0,-89.58],
  [48.1,-90.0],[48.25,-91.0],[48.15,-92.0],[48.6,-93.3],[48.7,-94.6],[49.35,-95.15],[52.83,-95.15],
];

const WATER_SHAPES = [
  // Hudson Bay + James Bay
  [[51.45,-79.52],[52.6,-78.9],[54.5,-79.6],[56.0,-76.8],[58.0,-76.5],[58.0,-94.0],[57.6,-92.5],[57.1,-90.5],[56.86,-88.98],
   [56.4,-88.0],[56.02,-87.6],[55.6,-86.0],[55.3,-85.0],[55.2,-83.9],[55.15,-82.3],[54.5,-82.2],[53.8,-82.2],
   [52.95,-82.3],[52.3,-81.7],[51.7,-80.6],[51.3,-80.5]],
  // Lake Superior
  [[46.5,-84.35],[46.8,-84.6],[47.3,-84.7],[47.98,-84.85],[48.2,-85.7],[48.73,-86.4],[48.8,-87.2],[49.0,-88.0],
   [48.75,-88.5],[48.45,-89.0],[48.38,-89.25],[48.0,-89.58],[47.75,-90.3],[47.3,-91.2],[46.75,-92.1],[46.7,-91.4],
   [46.6,-90.6],[46.55,-89.9],[46.8,-88.5],[47.45,-87.9],[46.95,-88.0],[46.5,-87.4],[46.4,-86.5],[46.65,-85.9],
   [46.75,-85.0],[46.45,-84.6]],
  // Lake Michigan
  [[45.8,-84.75],[45.9,-85.5],[45.6,-86.6],[45.4,-87.4],[45.0,-87.6],[44.0,-87.7],[43.0,-87.9],[42.0,-87.65],
   [41.6,-87.4],[41.65,-86.9],[42.1,-86.4],[43.0,-86.25],[44.0,-86.4],[44.8,-85.8],[45.2,-85.35]],
  // Lake Huron + Georgian Bay
  [[42.98,-82.42],[43.35,-81.75],[43.75,-81.72],[44.18,-81.65],[44.5,-81.37],[44.9,-81.4],[45.25,-81.65],
   [44.95,-81.25],[44.75,-81.05],[44.58,-80.93],[44.65,-80.6],[44.5,-80.2],[44.55,-80.0],[44.78,-79.93],
   [44.85,-79.8],[45.35,-80.05],[45.8,-80.6],[45.97,-81.4],[46.05,-81.8],[46.2,-82.4],[46.17,-83.0],
   [46.25,-83.6],[46.4,-84.0],[46.0,-84.0],[45.85,-84.5],[45.6,-84.2],[45.05,-83.4],[44.3,-83.45],
   [43.6,-83.9],[44.05,-83.3],[44.05,-82.95],[43.4,-82.55]],
  // Lake St. Clair
  [[42.35,-82.5],[42.6,-82.5],[42.62,-82.75],[42.45,-82.95],[42.33,-82.9]],
  // Lake Erie
  [[42.1,-83.05],[42.03,-82.75],[42.03,-82.6],[41.92,-82.5],[42.05,-82.4],[42.25,-82.1],[42.4,-81.8],
   [42.65,-81.2],[42.65,-80.7],[42.58,-80.4],[42.55,-80.05],[42.7,-80.25],[42.82,-80.0],[42.8,-79.6],
   [42.87,-79.25],[42.9,-78.92],[42.88,-78.88],[42.48,-79.33],[42.13,-80.08],[41.5,-81.7],[41.45,-82.7],
   [41.7,-83.45],[41.9,-83.35],[42.05,-83.15]],
  // Lake Ontario
  [[43.26,-79.05],[43.25,-79.2],[43.2,-79.6],[43.3,-79.8],[43.55,-79.6],[43.63,-79.4],[43.75,-79.2],
   [43.87,-78.85],[43.97,-78.2],[43.98,-77.6],[43.88,-77.05],[44.05,-76.85],[44.22,-76.5],[44.13,-76.33],
   [43.46,-76.5],[43.26,-77.6],[43.37,-78.6]],
];
const MANITOULIN = [[45.9,-83.2],[46.05,-82.5],[45.98,-81.8],[45.75,-81.65],[45.62,-82.2],[45.7,-82.9]];
// Inland lakes: [lat, lon, radius in latitude, radius in longitude]
const INLAND_LAKES = [
  [49.8, -88.45, 0.3, 0.32],    // Lake Nipigon
  [44.42, -79.38, 0.13, 0.17],  // Lake Simcoe
  [46.25, -79.85, 0.08, 0.3],   // Lake Nipissing
  [49.35, -94.8, 0.25, 0.35],   // Lake of the Woods
];

const MAP_LABELS = [
  // [lat, lon, text, kind]
  [50.8, -87.2, "ONTARIO", "region"],
  [56.9, -84.6, "Hudson Bay", "water"],
  [53.2, -80.5, "James Bay", "water-sm"],
  [47.55, -87.6, "Lake Superior", "water"],
  [45.1, -82.55, "Lake Huron", "water-sm"],
  [43.4, -87.0, "Lake Michigan", "water-sm"],
  [49.4, -83.6, "Boreal forest", "zone"],
  [53.9, -86.2, "Hudson Bay Lowlands", "zone"],
];
const INSET_LABELS = [
  [44.3, -82.25, "Lake Huron", "water"],
  [42.25, -81.0, "Lake Erie", "water"],
  [43.6, -78.1, "Lake Ontario", "water"],
  [44.62, -80.55, "Georgian Bay", "water-sm"],
  [42.68, -82.05, "Carolinian zone", "zone"],
];
const CITIES = [
  // [lat, lon, name, show on main map, show on close-up, label side]
  [48.38, -89.25, "Thunder Bay", true, false, "left"],
  [46.49, -80.99, "Sudbury", true, false, "below"],
  [45.42, -75.70, "Ottawa", true, false, "left"],
  [43.65, -79.38, "Toronto", false, true, "right"],
  [43.25, -79.87, "Hamilton", false, true, "right"],
  [42.98, -81.25, "London", false, true, "right"],
  [42.30, -83.03, "Windsor", false, true, "right"],
];

function mapShapes() {
  const water = WATER_SHAPES.map((s) => `<path class="m-water" d="${pathOf(s)}"/>`).join("");
  const lakes = INLAND_LAKES.map(([lat, lon, rLat, rLon]) => {
    const [cx, cy] = proj([lat, lon]);
    return `<ellipse class="m-water" cx="${cx}" cy="${cy}" rx="${(rLon * MAP_COS * MAP_K).toFixed(1)}" ry="${(rLat * MAP_K).toFixed(1)}"/>`;
  }).join("");
  return `
    <rect class="m-other" x="-50" y="-50" width="700" height="750"/>
    <path class="m-land" d="${pathOf(ONTARIO_SHAPE)}"/>
    ${water}${lakes}
    <path class="m-land" d="${pathOf(MANITOULIN)}"/>`;
}

function mapText(labels, scale) {
  const sizes = { region: 26, water: 13, "water-sm": 10.5, zone: 11 };
  return labels.map(([lat, lon, text, kind]) => {
    const [x, y] = proj([lat, lon]);
    return `<text class="m-label t-${kind}" x="${x}" y="${y}" font-size="${(sizes[kind] * scale).toFixed(2)}" text-anchor="middle">${esc(text)}</text>`;
  }).join("");
}

function cityMarks(which, scale) {
  return CITIES.filter((c) => (which === "main" ? c[3] : c[4])).map(([lat, lon, name, , , side]) => {
    const [x, y] = proj([lat, lon]);
    const left = side === "left";
    const dx = (left ? -5 : 5) * scale;
    const dy = (left || side === "below" ? 13 : -4) * scale;
    return `<circle class="m-city" cx="${x}" cy="${y}" r="${(3 * scale).toFixed(2)}"/>
      <text class="m-label t-city" x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" font-size="${(10 * scale).toFixed(2)}" text-anchor="${left ? "end" : "start"}">${esc(name)}</text>`;
  }).join("");
}

function pinState(c) {
  const p = state.progress;
  if (p.best[c.id]) return "closed";
  if (p.unlocked.includes(c.id)) return "open";
  return "locked";
}

const RANK_ORDER = ["Rookie Agent", "Field Agent", "Senior Detective", "Chief Ecologist"];
function bestRank() {
  let best = -1;
  Object.values(state.progress.best).forEach((b) => { best = Math.max(best, RANK_ORDER.indexOf(b.rank)); });
  return best >= 0 ? RANK_ORDER[best] : "Trainee";
}
function closedCount() { return CASES.filter((c) => state.progress.best[c.id]).length; }
function nextOpenCase() { return CASES.find((c) => pinState(c) === "open"); }

/* ---------- Map monitor (Dispatch tab) ---------- */

function mapPins(view) {
  const pct = (pt) => {
    const [x, y] = proj(pt);
    return `left:${(((x - view.x) / view.w) * 100).toFixed(2)}%;top:${(((y - view.y) / view.h) * 100).toFixed(2)}%`;
  };
  const sel = state.pinSel;
  const casePins = CASES.filter((c) => {
    const pin = CASE_PINS[c.id];
    if (!pin || !inView(pin.at, view)) return false;
    return view === INSET_VIEW || !inView(pin.at, INSET_VIEW);
  }).map((c) => {
    const st = pinState(c);
    const label = `Case ${c.num}: ${CASE_PINS[c.id].place}`;
    return `<button class="pin pin-${st} ${sel === c.id ? "is-selected" : ""}" type="button" style="${pct(CASE_PINS[c.id].at)}"
      data-action="pin" data-id="${c.id}" aria-label="${esc(label)}" aria-pressed="${sel === c.id}">
      <span class="pin-head">${st === "closed" ? "✓" : Number(c.num)}</span></button>`;
  }).join("");
  const secret = view === MAP_VIEW ? CLASSIFIED_PINS.map((cp, i) =>
    `<button class="pin pin-classified ${sel === "x" + i ? "is-selected" : ""}" type="button" style="${pct(cp.at)}"
      data-action="pin" data-id="x${i}" aria-label="Classified file: ${esc(cp.place)}" aria-pressed="${sel === "x" + i}">
      <span class="pin-head">?</span></button>`).join("") : "";
  return casePins + secret;
}

function southCaseCount() {
  return CASES.filter((c) => CASE_PINS[c.id] && inView(CASE_PINS[c.id].at, INSET_VIEW)).length;
}

function renderMapMonitor() {
  const south = state.mapView === "south";
  const v = south ? INSET_VIEW : MAP_VIEW;
  const scale = south ? (INSET_VIEW.w / MAP_VIEW.w) * 1.25 : 1;
  const iv = INSET_VIEW;
  const insetBtn = south ? "" : (() => {
    const l = ((iv.x - v.x) / v.w) * 100, t = ((iv.y - v.y) / v.h) * 100;
    return `<button class="inset-hotspot" type="button" data-action="map-view" data-view="south"
      style="left:${l.toFixed(2)}%;top:${t.toFixed(2)}%;width:${((iv.w / v.w) * 100).toFixed(2)}%;height:${((iv.h / v.h) * 100).toFixed(2)}%"
      aria-label="Zoom in on southern Ontario"><span>${southCaseCount()} cases · zoom in</span></button>`;
  })();
  return `
    <div class="monitor-head">
      <span class="console-label">Field map</span>
      <div class="seg" role="group" aria-label="Map view">
        <button type="button" data-action="map-view" data-view="all" aria-pressed="${!south}">All Ontario</button>
        <button type="button" data-action="map-view" data-view="south" aria-pressed="${south}">Southern Ontario</button>
      </div>
    </div>
    <div class="map-stage" style="aspect-ratio:${v.w} / ${v.h}">
      <svg class="map-svg" viewBox="${v.x} ${v.y} ${v.w} ${v.h}" role="img" aria-label="${south ? "Map of southern Ontario" : "Map of Ontario"} with case locations">
        ${mapShapes()}
        ${south ? "" : `<rect class="m-inset-box" x="${iv.x}" y="${iv.y}" width="${iv.w}" height="${iv.h}"/>`}
        ${mapText(south ? INSET_LABELS : MAP_LABELS, scale)}
        ${cityMarks(south ? "inset" : "main", scale)}
      </svg>
      ${insetBtn}
      ${mapPins(v)}
    </div>
    <div class="map-legend" aria-hidden="true">
      <span><i class="pin-dot pin-open"></i>Open</span>
      <span><i class="pin-dot pin-closed"></i>Closed</span>
      <span><i class="pin-dot pin-locked"></i>Locked</span>
      <span><i class="pin-dot pin-classified"></i>Classified</span>
      <span class="map-note">Simplified map, not to exact scale.</span>
    </div>`;
}

function renderLocationPanel() {
  const sel = state.pinSel;
  if (!sel) {
    return `<span class="console-label">Location file</span>
      <p class="readout dim">Tap a pin on the map to see where a case happened.</p>`;
  }
  if (sel.startsWith("x")) {
    const cp = CLASSIFIED_PINS[Number(sel.slice(1))];
    return `<span class="console-label">Location file</span>
      <p class="readout"><b>CLASSIFIED</b></p>
      <p class="readout">${esc(cp.place)}</p>
      <p class="readout dim">A future case. The Bureau isn't saying anything yet.</p>`;
  }
  const c = getCase(sel);
  const pin = CASE_PINS[c.id];
  const st = pinState(c);
  const best = state.progress.best[c.id];
  const status = st === "closed" ? `CLOSED · ${best.rank.toUpperCase()}` : st === "open" ? "OPEN" : "LOCKED";
  return `<span class="console-label">Location file</span>
    <p class="readout"><b>CASE ${c.num}</b> <span class="status-tag st-${st}">${status}</span></p>
    <p class="readout">${st === "locked" ? "Title classified" : esc(c.title)}</p>
    <p class="readout dim">${esc(pin.place)} · ${esc(pin.year)}</p>
    ${st === "locked" ? `<p class="readout dim">Close the case before it to unlock this file.</p>` : `<p class="readout dim">${esc(pin.teaser)}</p>`}`;
}

function renderAlertPanel() {
  const n = nextOpenCase();
  if (!n) {
    return `<span class="console-label">Incoming alert</span>
      <p class="readout"><b>ALL CLEAR</b></p>
      <p class="readout dim">Every open case is closed. Outstanding work, Agent.</p>`;
  }
  const pin = CASE_PINS[n.id];
  return `<span class="console-label alert-label">Incoming alert</span>
    <p class="readout"><b>PRIORITY // CASE ${n.num}</b></p>
    <p class="readout">${esc(pin.place.toUpperCase())} // ${esc(pin.year)}</p>
    <p class="readout dim">"${esc(pin.teaser)}"</p>
    <button class="btn btn-console" type="button" data-action="hq-tab" data-tab="files">Go to case files →</button>
    ${closedCount() === 0 && !state.progress.teacher ? `<p class="readout dim code-hint">Have an agent code from last class? Enter it in Case Files.</p>` : ""}`;
}

function renderAgentPanel() {
  const p = state.progress;
  const sc = specimenCount();
  return `<span class="console-label">Agent ID</span>
    <div class="agent-id">
      <div class="agent-photo" aria-hidden="true">${esc((p.teacher ? "T" : p.name || "?").charAt(0))}</div>
      <div>
        <p class="agent-name">Agent ${esc(p.teacher ? "Teacher" : p.name)}</p>
        <p class="readout dim">Rank: ${esc(bestRank())}</p>
      </div>
    </div>
    <dl class="agent-stats">
      <div><dt>Cases closed</dt><dd>${closedCount()} / ${CASES.length}</dd></div>
      <div><dt>Specimens</dt><dd>${sc.have} / ${sc.total}</dd></div>
    </dl>`;
}

const WIRE_FACTS = [
  "Ontario has more than 250,000 lakes.",
  "Lake Superior holds about 10% of all the fresh surface water on Earth.",
  "Polar bears live in Ontario, along the Hudson Bay coast.",
  "Ontario has more than 400 kinds of native bees.",
  "Lake Erie is the shallowest Great Lake, so it warms up fastest in summer.",
  "Mayfly nymphs only survive in clean water, so scientists use them to test streams.",
  "Toronto has one of the largest urban ravine systems in the world.",
  "The Carolinian zone covers a tiny corner of Canada but holds more kinds of plants and animals than any other part of the country.",
  "Sudbury has planted millions of trees on hills that were once bare and black.",
  "A single ladybug can eat thousands of aphids in its lifetime.",
  "Algonquin Park is famous for its wolves. Visitors can join a public wolf howl.",
];

function renderWire() {
  const p = state.progress;
  const news = CASES.filter((c) => p.best[c.id]).map((c) => `CASE ${c.num} CLOSED BY AGENT ${(p.teacher ? "TEACHER" : p.name).toUpperCase()}`);
  const items = [...news, ...WIRE_FACTS].map((t) => `<span class="wire-item">${esc(t)}</span>`).join("");
  return `
    <div class="wire" aria-label="Bureau wire">
      <span class="wire-tag">Bureau wire</span>
      <div class="wire-window"><div class="wire-track">${items}${items}</div></div>
    </div>`;
}

function renderDispatch() {
  return `
    <div class="dispatch">
      <section class="console-panel monitor" id="map-monitor">${renderMapMonitor()}</section>
      <div class="dispatch-side">
        <section class="console-panel">${renderAgentPanel()}</section>
        <section class="console-panel" id="loc-panel" aria-live="polite">${renderLocationPanel()}</section>
        <section class="console-panel alert-panel">${renderAlertPanel()}</section>
      </div>
    </div>
    ${renderWire()}`;
}

/* ---------- Case Files tab ---------- */

function caseCard(c) {
  const st = c.demo ? "open" : pinState(c);
  const best = state.progress.best[c.id];
  const pin = CASE_PINS[c.id];
  return `
    <button class="case-card folder-card ${c.demo ? "demo-card" : ""} ${st === "locked" ? "is-locked" : ""}" type="button" data-action="open-case" data-id="${c.id}" ${st === "locked" ? "disabled" : ""}>
      <span class="folder-card-tab">CASE #${c.num}</span>
      <h3>${st === "locked" ? "Classified" : esc(c.title)}</h3>
      <span class="case-where">${esc(c.where)}${pin ? ` · ${esc(pin.year)}` : ""}</span>
      <span class="case-skill">${c.demo ? esc(c.skill) : `Skill: ${esc(c.skill)}`}</span>
      ${best ? `<span class="solved-badge">Closed · ${esc(best.rank)}</span>` : ""}
      ${st === "locked" ? `<span class="case-lock"><span>Locked</span></span>` : ""}
    </button>`;
}

function renderFilesTab() {
  const p = state.progress;
  const cards = (p.teacher ? [DEMO_CASE, ...CASES] : CASES).map(caseCard).join("");
  return `
    <div class="drawer">
      <div class="drawer-head">
        <span class="console-label">Case files drawer</span>
        <p class="readout dim">${p.teacher ? "Teacher mode: every case is open, plus the classroom demo." : "Close a case to earn the agent code for the next one."}</p>
      </div>
      <div class="case-list">${cards}</div>
      <form class="code-form" id="code-form">
        <label for="code-input">Have an agent code from last class?</label>
        <input id="code-input" name="code" autocomplete="off" spellcheck="false" maxlength="20" placeholder="Type your code">
        <button class="btn btn-small btn-console" type="submit">Unlock</button>
        <span class="code-msg" role="status">${esc(state.codeMsg)}</span>
      </form>
    </div>`;
}

/* ---------- Specimen Cards tab ---------- */

function renderSpecimensTab() {
  const sc = specimenCount();
  const f = state.specFilter || "all";
  const chips = [["all", "All cases"], ...CASES.map((c) => [c.id, `Case ${c.num}`])].map(([id, label]) =>
    `<button type="button" data-action="spec-filter" data-id="${id}" aria-pressed="${f === id}">${esc(label)}</button>`).join("");
  let n = 0;
  const cards = CASES.map((c) => {
    const got = caseCollected(c);
    return c.specimens.map((s) => {
      n += 1;
      if (f !== "all" && f !== c.id) return "";
      const no = String(n).padStart(2, "0");
      return got
        ? `<article class="spec-card">
            <div class="spec-top"><span>No. ${no}</span><span>Case ${c.num}</span></div>
            ${specArt(c, s)}
            <h3 class="spec-name">${esc(s.name)}</h3>
            <p class="spec-fact">${esc(s.fact)}</p>
            <p class="spec-where">${esc(CASE_PINS[c.id] ? CASE_PINS[c.id].place : c.where)}</p>
          </article>`
        : `<article class="spec-card spec-locked">
            <div class="spec-top"><span>No. ${no}</span><span>Case ${c.num}</span></div>
            ${lockedArt()}
            <h3 class="spec-name">Not yet collected</h3>
            <p class="spec-fact">Close Case ${c.num} to collect this card.</p>
          </article>`;
    }).join("");
  }).join("");
  return `
    <div class="album">
      <div class="album-head">
        <span class="console-label">Specimen collection</span>
        <span class="album-count">${sc.have} / ${sc.total} collected</span>
      </div>
      <div class="seg seg-wrap" role="group" aria-label="Filter by case">${chips}</div>
      <div class="album-page">${cards}</div>
    </div>`;
}

/* ---------- Agent Report tab ---------- */

function renderReportTab() {
  const p = state.progress;
  const sc = specimenCount();
  const today = new Date().toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const closed = CASES.filter((c) => p.best[c.id]);
  const body = closed.length
    ? closed.map((c) => {
        const b = p.best[c.id];
        return `
        <div class="report-case">
          <div class="report-case-head">
            <span class="case-num">CASE #${c.num}</span>
            <h3>${esc(c.title)}</h3>
            <span class="report-rank">${esc(b.rank)} · ${b.score}/100</span>
          </div>
          <p class="eyebrow">Chain of events</p>
          <ol class="recap">${(b.sentences || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
          ${b.plan ? `<p class="plan-line"><strong>Plan:</strong> ${esc(b.plan)}</p>` : ""}
        </div>`;
      }).join("")
    : `<p class="report-empty">No cases closed yet this class. Close a case and it will appear here.</p>`;
  return `
    <div class="report-sheet">
      <div class="report-head">
        <div>
          <p class="eyebrow">Ontario Ecology Bureau · Field report</p>
          <h1>Agent ${esc(p.teacher ? "Teacher" : p.name)}</h1>
          <p class="report-date">${esc(today)}</p>
        </div>
        <div class="report-stats">
          <span><b>${closed.length}</b> of ${CASES.length} cases closed</span>
          <span><b>${sc.have}</b> of ${sc.total} specimens</span>
        </div>
      </div>
      <div class="report-list">${body}</div>
      <p class="report-howto">To hand this in, take a screenshot: press <kbd>Ctrl</kbd> + <kbd>Show windows</kbd> (the key with the stacked rectangles), then upload it where your teacher asks.</p>
    </div>`;
}

/* ---------- Headquarters shell ---------- */

const HQ_TABS = [
  ["dispatch", "Dispatch"],
  ["files", "Case Files"],
  ["specimens", "Specimen Cards"],
  ["report", "Agent Report"],
];

function renderHQ() {
  const tab = state.hqTab || "dispatch";
  const tabs = HQ_TABS.map(([id, label]) =>
    `<button class="hq-tab" type="button" role="tab" id="tab-${id}" aria-selected="${tab === id}" aria-controls="hq-panel" data-action="hq-tab" data-tab="${id}">${esc(label)}</button>`).join("");
  const body = { dispatch: renderDispatch, files: renderFilesTab, specimens: renderSpecimensTab, report: renderReportTab }[tab]();
  return `
  <section class="hq">
    <div class="hq-bar">
      <span class="hq-title">Bureau HQ</span>
      <nav class="hq-tabs" role="tablist" aria-label="Headquarters">${tabs}</nav>
    </div>
    <div class="hq-body hq-${tab}" id="hq-panel" role="tabpanel" aria-labelledby="tab-${tab}">${body}</div>
  </section>`;
}

function renderBrief() {
  const c = currentCase();
  const facts = Object.entries(c.facts).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
  return `
  <section class="folder">
    <div class="folder-tab">Case #${c.num} · Briefing</div>
    <div class="brief">
      <div data-read>
        <div class="brief-head">
          <p class="eyebrow">Case #${c.num}</p>
          <div class="say-row"><h1>${esc(c.title)}</h1>${sayBtn("Read the briefing aloud")}</div>
        </div>
        <div class="brief-body">${c.brief.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <div data-noread>
          ${askClass(c, "brief")}
          ${c.teacherTip ? `<p class="teacher-tip">${esc(c.teacherTip)}</p>` : ""}
        </div>
        <div class="row" style="margin-top:20px">
          <button class="btn btn-primary" type="button" data-action="start-board">Start investigating</button>
          <button class="btn" type="button" data-action="cases">Back to case files</button>
        </div>
      </div>
      <aside>
        <div class="case-facts"><dl>${facts}</dl></div>
        <div class="case-facts how-to">
          <strong>How to solve a case</strong>
          <ol>
            <li>Spend Field Points on tests to uncover evidence.</li>
            <li>Stamp every clue: main cause, contributing, result, or ruled out.</li>
            <li>Build the chain of events from cause to effect.</li>
            <li>File your report. Wrong theories cost points.</li>
          </ol>
        </div>
      </aside>
    </div>
  </section>`;
}

function stampButtons(id, current) {
  return Object.entries(ROLES).map(([key, r]) =>
    `<button class="stamp-btn" type="button" data-action="stamp" data-id="${id}" data-role="${key}" aria-pressed="${current === key}"><span>${r.short}</span></button>`
  ).join("");
}

function renderBoard() {
  const c = currentCase();
  const run = state.run;
  const cheapestLeft = Math.min(...c.tests.filter((t) => !run.testsDone.includes(t.id)).map((t) => t.cost), Infinity);
  const testsLeft = c.tests.some((t) => !run.testsDone.includes(t.id));

  const tests = c.tests.map((t) => {
    const done = run.testsDone.includes(t.id);
    const afford = run.fp >= t.cost;
    return `
      <button class="test-btn ${done ? "done" : ""}" type="button" data-action="test" data-id="${t.id}" ${done || !afford ? "disabled" : ""}>
        <span class="test-name">${esc(t.name)}</span>
        <span class="test-cost">${done ? "DONE" : `${t.cost} FP`}</span>
        <span class="test-desc">${esc(t.desc)}</span>
      </button>`;
  }).join("");

  const funding = testsLeft && run.fp < cheapestLeft
    ? `<div class="funding">
         <span>Out of Field Points? The Chief can send emergency funding, but it will cost you on your case score.</span>
         <button class="btn btn-small" type="button" data-action="funding">Request +2 FP (−10 points)</button>
       </div>` : "";

  const cards = run.revealed.map((id) => {
    const e = c.evidence[id];
    const s = run.stamps[id];
    return `
      <article class="ev-card ${s ? "has-stamp" : ""} ${id === run.justRevealed ? "is-new" : ""}" aria-label="${esc(e.title)}" data-read>
        ${s ? `<span class="stamp-mark ${s}" data-noread>${ROLES[s].short}</span>` : ""}
        <div class="ev-top">
          <span class="ev-icon" aria-hidden="true">${e.icon}</span>
          <div>
            <div class="ev-title">${esc(e.title)}</div>
            <div class="ev-year">${esc(e.year)}</div>
          </div>
        </div>
        <p class="ev-detail">${esc(e.detail)}</p>
        <div class="ev-say">${sayBtn(`Read this clue aloud: ${e.title}`)}</div>
        <div class="stamps" role="group" aria-label="Stamp this clue" data-noread>${stampButtons(id, s)}</div>
      </article>`;
  }).join("");

  const timeline = [...run.revealed]
    .sort((a, b) => c.evidence[a].yearNum - c.evidence[b].yearNum)
    .map((id) => `<li><span class="tl-year">${esc(c.evidence[id].year)}</span>${esc(c.evidence[id].node)}</li>`)
    .join("");

  const unstamped = run.revealed.filter((id) => !run.stamps[id]).length;
  const hasMain = Object.values(run.stamps).includes("main");
  let status;
  if (unstamped > 0) status = `${unstamped} clue${unstamped > 1 ? "s" : ""} still need${unstamped > 1 ? "" : "s"} a stamp.`;
  else if (run.accused) status = "Suspect confirmed. Head back to finish your chain of events.";
  else if (!hasMain) status = "Stamp one clue as the main cause. That's your suspect.";
  else status = "Every clue is stamped. Ready to name your suspect.";
  const suspectId = Object.keys(run.stamps).find((k) => run.stamps[k] === "main");

  const t = run.term;
  return `
  <section class="folder">
    <div class="folder-tab">Case #${c.num} · ${esc(c.title)}</div>
    <div class="board">
      <aside>
        <div class="panel-title">Field tests <small>${run.fp} FP left</small></div>
        <div class="tests">${tests}</div>
        ${funding}
      </aside>
      <div style="min-width:0">
        <div class="terminal-wrap" data-read="terminal">
          <div class="terminal" aria-live="polite"><span id="term-text">${esc(t.text.slice(0, t.count))}</span><span class="cursor"></span></div>
          ${sayBtn("Read the test result aloud")}
        </div>
        ${askClass(c, "board")}
        <div class="panel-title">Evidence board <small>${run.revealed.length} clues</small></div>
        <div class="legend">
          <span class="l-main"><b>Main cause</b>: started the chain</span>
          <span class="l-contrib"><b>Contributing</b>: helped it happen</span>
          <span class="l-result"><b>Result</b>: changed because of the cause</span>
          <span class="l-ruled"><b>Ruled out</b>: evidence says no</span>
        </div>
        <div class="evidence-grid">${cards}</div>
        <div class="timeline-wrap">
          <div class="panel-title">Timeline <small>What happened first?</small></div>
          <div class="timeline"><ol>${timeline}</ol></div>
        </div>
      </div>
    </div>
    <div class="board-foot">
      <p class="status-line" role="status">${esc(status)}</p>
      <span class="spacer"></span>
      ${run.accused ? "" : `<button class="btn btn-small btn-hint" type="button" data-action="hint">Call the Chief <small>(hint, −5)</small></button>`}
      ${run.accused
        ? `<button class="btn btn-primary" type="button" data-action="to-theory" ${unstamped === 0 ? "" : "disabled"}>Back to the chain →</button>`
        : `<button class="btn btn-primary" type="button" data-action="accuse" ${unstamped === 0 && hasMain ? "" : "disabled"}>${hasMain ? `Accuse: ${esc(c.evidence[suspectId].node)}` : "Name your suspect"} →</button>`}
    </div>
  </section>`;
}

// The finished sentence for chain box i (i >= 1).
function chainSentence(c, i, word) {
  const s = c.chain[i];
  const after = s.after === "." ? "." : " " + s.after;
  return `${s.before} ${word}${after}`;
}

function nodeFeedback(c, prevId, pickedId) {
  const e = c.evidence[pickedId];
  const prev = c.evidence[prevId].node;
  const at = c.chain.findIndex((s) => s.id === pickedId);
  if (at > state.run.step) {
    return `"${e.node}" is part of the chain, but it happens later. What did "${prev}" change first?`;
  }
  if (e.accept[0] === "ruled") {
    return e.notCause || `The evidence ruled out "${e.node}", so it can't be part of the chain.`;
  }
  if (e.accept[0] === "contrib") {
    return `"${e.node}" is a contributing factor. It helped the problem happen, but it isn't the next step after "${prev}". What did "${prev}" change directly?`;
  }
  return `"${e.node}" is a real change, but it's on a side branch of this story. What else changed because of "${prev}"?`;
}

function renderTheory() {
  const c = currentCase();
  const run = state.run;
  const n = c.chain.length;
  const flash = run.flash;

  // Skeleton: [box] → [box] → [box]
  const parts = [];
  c.chain.forEach((s, i) => {
    if (i > 0) {
      const solved = i < run.step;
      const active = i === run.step && run.phase === "link";
      parts.push(`
        <div class="sk-arrow ${solved ? "solved" : ""} ${active ? "active" : ""}" aria-hidden="true">
          <span class="sk-word">${solved ? esc(c.chain[i].options[run.picked[i]].text) : active ? "?" : ""}</span>
          <span class="sk-head">→</span>
        </div>`);
    }
    const filled = i < run.step || (i === run.step && run.phase === "link");
    const active = i === run.step && run.phase === "node";
    const e = c.evidence[s.id];
    parts.push(`
      <div class="sk-box ${filled ? "filled" : ""} ${active ? "active" : ""}">
        <span class="sk-num">${i === 0 ? "Cause" : `Step ${i}`}</span>
        <span class="sk-label">${filled ? `<span class="p-icon" aria-hidden="true">${e.icon}</span>${esc(e.node)}` : active ? "?" : "&nbsp;"}</span>
      </div>`);
  });

  let panel = "";
  const fb = flash ? `<p class="feedback" role="alert">${esc(flash.msg)}</p>` : "";

  if (run.phase === "node") {
    const prevId = c.chain[run.step - 1].id;
    const needed = c.chain[run.step].id;
    const used = c.chain.slice(0, run.step).map((s) => s.id);
    const pool = run.revealed.filter((id) => !used.includes(id));
    const ordered = [
      ...pool.filter((id) => run.stamps[id] !== "ruled"),
      ...pool.filter((id) => run.stamps[id] === "ruled"),
    ];
    const buttons = ordered.map((id) => {
      const e = c.evidence[id];
      const ruled = run.stamps[id] === "ruled";
      const wrong = flash && flash.id === id;
      return `<button class="piece piece-node ${ruled ? "is-ruled" : ""} ${wrong ? "shake is-wrong" : ""}" type="button" data-action="pick-node" data-id="${id}">
        <span class="p-icon" aria-hidden="true">${e.icon}</span>${esc(e.node)}${ruled ? ` <small>(you ruled this out)</small>` : ""}</button>`;
    }).join("");
    const missing = run.revealed.includes(needed) ? "" : `
      <div class="missing">
        <span>You're missing a clue for this step. Go back and run another field test.</span>
        <button class="btn btn-small" type="button" data-action="start-board">← Back to evidence</button>
      </div>`;
    panel = `
      <p class="prompt">What happened because of <strong>${esc(c.evidence[prevId].node)}</strong>?</p>
      <div class="pool">${buttons}</div>
      ${fb}${missing}`;
  } else if (run.phase === "link") {
    const s = c.chain[run.step];
    const opts = run.orders[run.step].map((oi) => {
      const o = s.options[oi];
      const wrong = flash && flash.opt === oi;
      return `<button class="piece piece-word ${wrong ? "shake is-wrong" : ""}" type="button" data-action="pick-link" data-opt="${oi}">${esc(o.text)}</button>`;
    }).join("");
    panel = `
      <p class="prompt">Finish the sentence that links these two clues.</p>
      <p class="sentence">${esc(s.before)} <span class="blank">______</span>${s.after === "." ? "." : " " + esc(s.after)}</p>
      <div class="pool">${opts}</div>
      ${fb}`;
  } else {
    const sentences = c.chain.slice(1).map((_, k) => `<li>${esc(chainSentence(c, k + 1, c.chain[k + 1].options[run.picked[k + 1]].text))}</li>`).join("");
    const sol = c.solution;
    if (sol && run.plan === null) {
      const wrong = run.planWrong || [];
      const plans = sol.options.map((o, i) =>
        `<button class="piece plan-option ${wrong.includes(i) ? "is-tried" : ""}" type="button" data-action="pick-plan" data-opt="${i}" ${wrong.includes(i) ? "disabled" : ""}>${esc(o.text)}${wrong.includes(i) ? " <small>(didn't work)</small>" : ""}</button>`
      ).join("");
      panel = `
      <p class="prompt"><strong>Chain complete.</strong></p>
      <ol class="recap">${sentences}</ol>
      <div class="plan-block">
        <p class="eyebrow">New detective tool: recommend a plan</p>
        <p class="prompt">${esc(sol.question)}</p>
        <p class="plan-tip">Think about your chain of events. A good plan fixes the cause, not just the result.</p>
        <div class="plan-list">${plans}</div>
      </div>`;
    } else {
      panel = `
      <p class="prompt"><strong>Chain complete.</strong> Here's your case report:</p>
      <ol class="recap">${sentences}</ol>
      ${sol ? `<p class="plan-line"><strong>Your plan:</strong> ${esc(sol.options[run.plan].text)}</p>` : ""}
      <div class="row"><button class="btn btn-primary" type="button" data-action="file-report">File case report</button></div>`;
    }
  }

  return `
  <section class="folder">
    <div class="folder-tab">Case #${c.num} · Chain of events</div>
    <div class="theory-intro">
      <h2>Prove it: build the chain of events</h2>
      <p>Your suspect is confirmed. Now show how it caused the problem, one step at a time. Each box takes a clue, and each arrow takes the word that links them.</p>
    </div>
    <div class="skeleton-wrap"><div class="skeleton" aria-label="Chain of events, ${n} boxes">${parts.join("")}</div></div>
    ${askClass(c, "theory")}
    <div class="active-panel" aria-live="polite" data-read>${sayBtn("Read this step aloud")}${panel}</div>
    <div class="theory-foot">
      <button class="btn btn-small" type="button" data-action="start-board">← Back to evidence</button>
      <span class="spacer"></span>
      ${run.phase === "done" ? "" : `<button class="btn btn-small btn-hint" type="button" data-action="hint">Call the Chief <small>(hint, −5)</small></button>`}
    </div>
  </section>`;
}

function renderSolved() {
  const c = currentCase();
  const r = state.run.result;
  const best = state.progress.best[c.id];
  const review = state.run.revealed.map((id) => {
    const e = c.evidence[id];
    const s = state.run.stamps[id];
    const ok = e.accept.includes(s);
    return `
      <div class="review-item">
        <strong>${e.icon} ${esc(e.title)}</strong>
        <span class="verdict ${ok ? "right" : "wrong"}">You said: ${ROLES[s].short} ${ok ? "✓" : `✗ (best answer: ${ROLES[e.accept[0]].short})`}</span>
        <span>${esc(e.why)}</span>
      </div>`;
  }).join("");

  const next = c.demo ? null : CASES[CASES.indexOf(c) + 1];
  return `
  <section class="folder">
    <div class="folder-tab">Case #${c.num} · Report accepted</div>
    <div class="solved-head">
      <div>
        <p class="eyebrow">Case #${c.num}</p>
        <h1>${esc(c.title)}</h1>
        <ol class="recap recap-solved">${r.sentences.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
        ${r.plan ? `<p class="plan-line"><strong>Your plan:</strong> ${esc(r.plan)}</p>` : ""}
      </div>
      <div class="closed-stamp">Case closed</div>
    </div>
    ${c.nextCode ? `
    <div class="code-box">
      <span class="code-box-label">Write this down! Your agent code:</span>
      <span class="code-box-code">${esc(c.nextCode)}</span>
      <span class="code-box-note">Next class, enter it on the case files screen to unlock Case #${CASES[CASES.indexOf(c) + 1].num} and get your specimen cards back.</span>
    </div>` : ""}
    ${askClass(c, "solved")}
    <div class="score-grid">
      <div class="scorecard">
        <table>
          <tr><td>Evidence stamps (${r.right}/${r.total})</td><td>${r.sortPts}</td></tr>
          <tr><td>Accusation${r.wrong ? ` (${r.wrong} rejected)` : ""}</td><td>${r.theoryPts}</td></tr>
          <tr><td>Field Points saved</td><td>${r.effPts}</td></tr>
          ${r.fundingPts ? `<tr><td>Emergency funding</td><td>${r.fundingPts}</td></tr>` : ""}
          ${r.hints ? `<tr><td>Calls to the Chief (${r.hints})</td><td>${r.hintPts}</td></tr>` : ""}
          <tr class="total"><td>Case score</td><td>${r.score}</td></tr>
        </table>
        <div class="rank">RANK: ${esc(r.rank.toUpperCase())}</div>
        ${best && best.score > r.score ? `<div class="code-reveal">Best so far: ${best.score} (${esc(best.rank)})</div>` : ""}
        ${c.demo ? `<div class="code-reveal">Demo complete.</div>` : c.nextCode ? "" : `<div class="code-reveal">All current cases closed. Outstanding work, Agent.</div>`}
      </div>
      <div class="real-story" data-read>
        <div class="say-row"><h3>${esc(c.real.headline)}</h3>${sayBtn("Read what really happened aloud")}</div>
        ${c.real.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        <p class="note">${esc(c.real.note)}</p>
        <div>
          <p class="eyebrow" style="margin-bottom:6px">Detective tools you used</p>
          <div class="vocab">${c.vocab.map((v) => `<span>${esc(v)}</span>`).join("")}</div>
        </div>
      </div>
    </div>
    ${c.specimens ? `
    <div class="specimens">
      <div class="panel-title">Specimen cards collected <small>+${c.specimens.length}</small></div>
      <div class="album-page album-page-sm">${c.specimens.map((s) => `
        <article class="spec-card spec-new">
          <div class="spec-top"><span>New card</span><span>Case ${c.num}</span></div>
          ${specArt(c, s)}
          <h3 class="spec-name">${esc(s.name)}</h3>
          <p class="spec-fact">${esc(s.fact)}</p>
        </article>`).join("")}</div>
    </div>` : ""}
    <div class="review">
      <div class="panel-title">Evidence review</div>
      <div class="review-list">${review}</div>
    </div>
    <div class="row" style="margin-top:22px">
      ${next ? `<button class="btn btn-primary" type="button" data-action="open-case" data-id="${next.id}">Next case: ${esc(next.title)} →</button>` : ""}
      <button class="btn" type="button" data-action="replay">Replay this case</button>
      <button class="btn" type="button" data-action="cases">Case files</button>
      <button class="btn" type="button" data-action="hq-tab" data-tab="dispatch">Back to HQ</button>
      ${c.demo ? "" : `<button class="btn" type="button" data-action="report">Agent Report</button>`}
    </div>
  </section>`;
}

/* ----------------------------------------------------------
   6. TERMINAL TYPING
   ---------------------------------------------------------- */

let typeTimer = null;
function startTyping(text) {
  state.run.term = { text, count: 0 };
  resumeTyping();
}
function resumeTyping() {
  clearInterval(typeTimer);
  const t = state.run && state.run.term;
  if (!t || t.count >= t.text.length) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { t.count = t.text.length; writeTerm(); return; }
  typeTimer = setInterval(() => {
    t.count += 2;
    if (t.count % 6 === 0) sfx.type();
    writeTerm();
    if (t.count >= t.text.length) clearInterval(typeTimer);
  }, 18);
}
function writeTerm() {
  const el = document.getElementById("term-text");
  if (el && state.run) el.textContent = state.run.term.text.slice(0, state.run.term.count);
}

/* ----------------------------------------------------------
   7. GRADING
   ---------------------------------------------------------- */

function chainSentences(c, run) {
  return c.chain.slice(1).map((s, k) => chainSentence(c, k + 1, s.options[run.picked[k + 1]].text));
}

// Returns null when the accusation is right, or a feedback message.
function checkAccusation() {
  const c = currentCase();
  const run = state.run;
  const keyId = Object.keys(c.evidence).find((id) => c.evidence[id].key);
  const mainStamped = run.revealed.filter((id) => run.stamps[id] === "main");

  // 1. Has the real culprit been found at all?
  if (!run.revealed.includes(keyId)) {
    return {
      title: "Not enough evidence",
      body: "Your report blames something, but the Chief isn't convinced the real culprit is on your evidence board yet. Go back and investigate further.",
    };
  }

  // 2. Is the main cause stamped correctly?
  const wrongMain = mainStamped.find((id) => !c.evidence[id].accept.includes("main"));
  if (wrongMain) {
    const e = c.evidence[wrongMain];
    let body;
    if (e.mainHint) body = e.mainHint;
    else if (e.mainNote) body = e.mainNote;
    else if (e.accept.includes("ruled")) body = e.notCause || `The evidence says "${e.node}" isn't responsible.`;
    else if (e.accept[0] === "result") body = `"${e.node}" is something that changed because of the problem. It's a result, not the cause. Ask yourself: what caused it?`;
    else body = `"${e.node}" helped the problem happen, but it isn't what started it.`;
    return { title: `You named "${e.node}" as the main cause`, body };
  }
  if (run.stamps[keyId] !== "main") {
    return {
      title: "Check your main cause",
      body: "The real culprit is somewhere on your evidence board, but you haven't stamped it as the main cause. Look for the change that started everything.",
    };
  }

  // 3. Clues that must be stamped a certain way (e.g. multiple causes)
  for (const id of c.mustBe) {
    if (run.revealed.includes(id) && !c.evidence[id].accept.includes(run.stamps[id])) {
      return { title: "Check your other stamps", body: c.evidence[id].notCause || `Take another look at "${c.evidence[id].node}".` };
    }
  }

  return null;
}

function scoreRun() {
  const c = currentCase();
  const run = state.run;
  const total = run.revealed.length;
  const right = run.revealed.filter((id) => c.evidence[id].accept.includes(run.stamps[id])).length;
  const sortPts = Math.round((40 * right) / total);
  const theoryPts = Math.max(10, 40 - 10 * run.wrong);
  const spare = Math.max(1, c.budget - c.minNeeded);
  const effPts = Math.min(20, Math.round((20 * Math.max(0, run.fp)) / spare));
  const fundingPts = -10 * run.funding;
  const hints = run.hints || 0;
  const hintPts = -5 * hints;
  const score = Math.max(0, Math.min(100, sortPts + theoryPts + effPts + fundingPts + hintPts));
  const rank = score >= 90 ? "Chief Ecologist" : score >= 75 ? "Senior Detective" : score >= 60 ? "Field Agent" : "Rookie Agent";
  return { total, right, sortPts, theoryPts, effPts, fundingPts, hints, hintPts, score, rank, wrong: run.wrong, sentences: chainSentences(c, run),
    plan: c.solution && run.plan !== null ? c.solution.options[run.plan].text : null };
}

/* ----------------------------------------------------------
   8. MODALS
   ---------------------------------------------------------- */

const $modal = document.getElementById("modal");
const $modalBody = document.getElementById("modal-body");
let lastFocus = null;

function openModal(html) {
  stopSpeaking();
  lastFocus = document.activeElement;
  $modalBody.innerHTML = `<div class="modal-say">${sayBtn("Read this message aloud")}</div>${html}`;
  $modalBody.setAttribute("data-read", "");
  $modal.hidden = false;
  const btn = $modalBody.querySelector(".btn") || $modalBody.querySelector("button");
  if (btn) btn.focus();
}
function closeModal() {
  stopSpeaking();
  $modal.hidden = true;
  if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
}

function nudgeFor(e) {
  const role = e.accept[0];
  if (role === "main") return `Take another look at "${e.node}". Could this be the thing that started everything?`;
  if (role === "ruled") return e.notCause || `Look closely at "${e.node}". Did it actually change?`;
  if (role === "result") return `Take another look at "${e.node}". Did it cause the problem, or did it change because of the problem?`;
  return `Take another look at "${e.node}". It helped the problem happen, but did it start everything by itself?`;
}

function boardHint(c, run) {
  const keyId = Object.keys(c.evidence).find((id) => c.evidence[id].key);
  if (!run.revealed.includes(keyId)) {
    const t = c.tests.find((x) => x.reveals === keyId);
    let msg = `The real culprit isn't on your evidence board yet. Try the "${t.name}" test.`;
    if (run.fp < t.cost) msg += " You'll need more Field Points first, so ask for emergency funding.";
    return msg;
  }
  const stamped = run.revealed.filter((id) => run.stamps[id]);
  if (stamped.length === 0) {
    return "Start with the clue that's easiest to decide. Tip: if something didn't change, it can't explain a change, so you can rule it out.";
  }
  const wrong = stamped.filter((id) => !c.evidence[id].accept.includes(run.stamps[id]));
  if (wrong.length) {
    const pick = wrong.find((id) => run.stamps[id] === "main") || wrong.find((id) => id === keyId) || wrong[0];
    return nudgeFor(c.evidence[pick]);
  }
  const left = run.revealed.filter((id) => !run.stamps[id]);
  if (left.length) {
    return `Every stamp so far is correct. Now stamp the rest: ${left.map((id) => `"${c.evidence[id].node}"`).join(", ")}.`;
  }
  return "Your stamps all look right. You're ready to make your accusation!";
}

// Gives a hint for the current screen. Returns the message to show.
function useHint() {
  const c = currentCase();
  const run = state.run;
  run.hints = (run.hints || 0) + 1;
  if (state.screen === "board") return { title: "The Chief says…", body: boardHint(c, run) };
  if (run.phase === "node") {
    const id = c.chain[run.step].id;
    run.phase = "link";
    run.flash = null;
    return { title: "The Chief filled in a step", body: `Step ${run.step} is "${c.evidence[id].node}". Now finish the sentence that links it to the box before.` };
  }
  if (run.phase === "link") {
    const s = c.chain[run.step];
    const oi = s.options.findIndex((o) => o.ok);
    run.picked[run.step] = oi;
    const sentence = chainSentence(c, run.step, s.options[oi].text);
    run.step += 1;
    run.phase = run.step >= c.chain.length ? "done" : "node";
    run.flash = null;
    return { title: "The Chief finished the sentence", body: `"${sentence}"` };
  }
  return null;
}

function showGuide() {
  openModal(`
    <p class="from">Bureau reference</p>
    <h2 id="modal-title">Field Guide</h2>
    <dl class="guide-list">${GLOSSARY.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>
    <button class="btn" type="button" data-action="close-modal">Close</button>`);
}

function showRejected(fb) {
  openModal(`
    <div class="modal-chief">${chiefFace("stern", "chief-sm")}<p class="from">Memo from the Chief</p></div>
    <h2 id="modal-title" class="rejected">Accusation rejected</h2>
    <p><strong>${esc(fb.title)}</strong></p>
    <p>${esc(fb.body)}</p>
    <p style="font-size:.9rem;color:var(--ink-soft)">Each rejected accusation lowers your score by 10.</p>
    <button class="btn btn-primary" type="button" data-action="close-modal">Back to the case</button>`);
}

function showConfirmed(name) {
  openModal(`
    <div class="modal-chief">${chiefFace("pleased", "chief-sm")}<p class="from">Memo from the Chief</p></div>
    <div class="confirm-stamp">Suspect confirmed</div>
    <h2 id="modal-title">${esc(name)}</h2>
    <p>Good work, Agent. You found the main cause. Now prove it: show how it led to the problem, one step at a time.</p>
    <button class="btn btn-primary" type="button" data-action="to-theory">Build the chain of events →</button>`);
}

/* ----------------------------------------------------------
   9. ACTIONS
   ---------------------------------------------------------- */

const actions = {
  home() { go("title"); },
  report() { closeModal(); go("report"); },
  "hq-tab"(el) {
    closeModal();
    state.hqTab = el.dataset.tab;
    if (state.hqTab === "files") state.codeMsg = state.codeMsg || "";
    sfx.click();
    go("hq");
    const t = document.getElementById(`tab-${state.hqTab}`);
    if (t) t.focus({ preventScroll: true });
  },
  "map-view"(el) {
    state.mapView = el.dataset.view;
    sfx.click();
    const m = document.getElementById("map-monitor");
    if (m) m.innerHTML = renderMapMonitor();
  },
  pin(el) {
    state.pinSel = state.pinSel === el.dataset.id ? null : el.dataset.id;
    sfx.click();
    const m = document.getElementById("map-monitor");
    if (m) m.innerHTML = renderMapMonitor();
    const l = document.getElementById("loc-panel");
    if (l) l.innerHTML = renderLocationPanel();
    const again = document.querySelector(`.pin[data-id="${el.dataset.id}"]`);
    if (again) again.focus({ preventScroll: true });
  },
  "spec-filter"(el) { state.specFilter = el.dataset.id; sfx.click(); render(); },
  "debrief-next"() { state.debriefStep = Math.min(state.debriefStep + 1, DEBRIEF.length - 1); sfx.click(); go("debrief"); },
  "debrief-back"() { state.debriefStep = Math.max(state.debriefStep - 1, 0); sfx.click(); go("debrief"); },
  "debrief-done"() { state.codeMsg = ""; state.hqTab = "dispatch"; sfx.click(); go("hq"); },
  "replay-debrief"() { closeModal(); state.debriefStep = 0; go("debrief"); },
  "switch-agent"() {
    openModal(`
      <p class="from">Bureau records</p>
      <h2 id="modal-title">Switch agent?</h2>
      <p>This signs out the current agent and clears their progress on this Chromebook. Make sure their agent code is written down first.</p>
      <div class="row">
        <button class="btn btn-primary" type="button" data-action="switch-confirm">Yes, switch agent</button>
        <button class="btn" type="button" data-action="close-modal">Cancel</button>
      </div>`);
  },
  "switch-confirm"() {
    closeModal();
    state.progress = blankProgress();
    state.run = null;
    state.loginMsg = "";
    saveProgress();
    go("title");
  },
  cases() { state.codeMsg = ""; go("cases"); },
  guide() { showGuide(); },
  "close-modal"() { closeModal(); },
  speak(el) { speakText(readableText(el), el); },
  hint() {
    openModal(`
      <div class="modal-chief">${chiefFace("phone", "chief-sm")}<p class="from">Phone line to the Chief</p></div>
      <h2 id="modal-title">Call the Chief?</h2>
      <p>The Chief will give you a hint. Each hint takes 5 points off your case score.</p>
      <div class="row">
        <button class="btn btn-primary" type="button" data-action="hint-confirm">Get a hint (−5 points)</button>
        <button class="btn" type="button" data-action="close-modal">Never mind</button>
      </div>`);
  },
  "hint-confirm"() {
    const h = useHint();
    closeModal();
    render();
    if (!h) return;
    sfx.reveal();
    openModal(`
      <div class="modal-chief">${chiefFace("phone", "chief-sm")}<p class="from">Phone line to the Chief</p></div>
      <h2 id="modal-title">${esc(h.title)}</h2>
      <p>${esc(h.body)}</p>
      <button class="btn btn-primary" type="button" data-action="close-modal">Back to the case</button>`);
  },
  "go-board"() { closeModal(); go("board"); },
  sound() { state.sound = !state.sound; updateTopbar(); sfx.click(); },

  "open-case"(el) {
    const id = el.dataset.id;
    if (!state.progress.unlocked.includes(id)) return;
    state.run = newRun(id);
    go("brief");
  },
  replay() { state.run = newRun(state.run.caseId); go("brief"); },
  "start-board"() { go("board"); },

  test(el) {
    const c = currentCase();
    const t = c.tests.find((x) => x.id === el.dataset.id);
    const run = state.run;
    if (!t || run.testsDone.includes(t.id) || run.fp < t.cost) return;
    run.fp -= t.cost;
    run.testsDone.push(t.id);
    if (!run.revealed.includes(t.reveals)) run.revealed.push(t.reveals);
    run.justRevealed = t.reveals;
    sfx.reveal();
    startTyping(t.readout);
    render();
  },

  funding() {
    state.run.fp += 2;
    state.run.funding += 1;
    sfx.click();
    startTyping("CHIEF'S OFFICE // EMERGENCY FUNDING\n+2 FIELD POINTS APPROVED. SPEND THEM WISELY.");
    render();
  },

  stamp(el) {
    const { id, role } = el.dataset;
    const run = state.run;
    run.justRevealed = null;
    run.stamps[id] = run.stamps[id] === role ? undefined : role;
    if (!run.stamps[id]) delete run.stamps[id];
    // Only one main cause allowed: clear the stamp from any other card.
    if (role === "main" && run.stamps[id] === "main") {
      Object.keys(run.stamps).forEach((k) => { if (k !== id && run.stamps[k] === "main") delete run.stamps[k]; });
    }
    sfx.stamp();
    render();
    const again = $app.querySelector(`.stamp-btn[data-id="${id}"][data-role="${role}"]`);
    if (again) again.focus({ preventScroll: true });
  },

  accuse() {
    const fb = checkAccusation();
    if (fb) {
      state.run.wrong += 1;
      sfx.fail();
      showRejected(fb);
      return;
    }
    const c = currentCase();
    state.run.accused = true;
    sfx.stamp();
    setTimeout(sfx.win, 150);
    render();
    showConfirmed(c.evidence[c.chain[0].id].node);
  },

  "to-theory"() { closeModal(); state.run.flash = null; go("theory"); },

  "pick-node"(el) {
    const c = currentCase();
    const run = state.run;
    if (run.phase !== "node") return;
    const id = el.dataset.id;
    if (id === c.chain[run.step].id) {
      run.phase = "link";
      run.flash = null;
      sfx.stamp();
    } else {
      run.slips += 1;
      run.flash = { id, msg: nodeFeedback(c, c.chain[run.step - 1].id, id) };
      sfx.fail();
    }
    render();
  },

  "pick-link"(el) {
    const c = currentCase();
    const run = state.run;
    if (run.phase !== "link") return;
    const oi = Number(el.dataset.opt);
    const o = c.chain[run.step].options[oi];
    if (o.ok) {
      run.picked[run.step] = oi;
      run.step += 1;
      run.phase = run.step >= c.chain.length ? "done" : "node";
      run.flash = null;
      sfx.reveal();
    } else {
      run.slips += 1;
      run.flash = { opt: oi, msg: o.hint };
      sfx.fail();
    }
    render();
  },

  "pick-plan"(el) {
    const c = currentCase();
    const run = state.run;
    if (!c.solution || run.plan !== null) return;
    const i = Number(el.dataset.opt);
    const o = c.solution.options[i];
    if (o.ok) {
      run.plan = i;
      sfx.win();
      render();
      openModal(`
        <p class="from">One year later…</p>
        <h2 id="modal-title">Your plan worked</h2>
        <p>${esc(o.epilogue)}</p>
        <button class="btn btn-primary" type="button" data-action="close-modal">Finish my case report</button>`);
    } else {
      run.planWrong = [...(run.planWrong || []), i];
      sfx.fail();
      render();
      openModal(`
        <p class="from">One year later…</p>
        <h2 id="modal-title" class="rejected">The problem came back</h2>
        <p>${esc(o.epilogue)}</p>
        <p style="font-size:.9rem;color:var(--ink-soft)">No penalty. Look at your chain of events and choose a plan that fixes the cause.</p>
        <button class="btn btn-primary" type="button" data-action="close-modal">Choose a different plan</button>`);
    }
  },

  "file-report"() {
    const c = currentCase();
    state.run.result = scoreRun();
    const prev = state.progress.best[c.id];
    if (!prev || state.run.result.score > prev.score) {
      state.progress.best[c.id] = { score: state.run.result.score, rank: state.run.result.rank, sentences: state.run.result.sentences, plan: state.run.result.plan };
    }
    const next = c.demo ? null : CASES[CASES.indexOf(c) + 1];
    if (next && !state.progress.unlocked.includes(next.id)) state.progress.unlocked.push(next.id);
    saveProgress();
    sfx.win();
    go("solved");
  },
};

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const fn = actions[el.dataset.action];
  if (fn) fn(el);
});

function handleLogin() {
  const raw = (document.getElementById("agent-name").value || "").trim().replace(/\s+/g, " ");
  if (raw.toUpperCase() === TEACHER_PASSWORD) {
    state.progress = { ...blankProgress(), name: "Teacher", teacher: true, unlocked: [DEMO_CASE.id, ...CASES.map((c) => c.id)] };
    state.codeMsg = "";
    saveProgress();
    sfx.win();
    go("cases");
    return;
  }
  if (!/^[A-Za-zÀ-ÿ' -]{1,20}$/.test(raw)) {
    state.loginMsg = "Type your first name using letters only.";
    render();
    return;
  }
  const name = raw.charAt(0).toUpperCase() + raw.slice(1);
  state.progress = { ...blankProgress(), name };
  state.loginMsg = "";
  state.debriefStep = 0;
  saveProgress();
  sfx.stamp();
  go("debrief");
}

function handleCode() {
  const code = (document.getElementById("code-input").value || "").trim().toUpperCase().replace(/\s+/g, "-");
  if (!code) return;
  const idx = CASES.findIndex((x) => x.unlockCode === code);
  if (idx >= 0) {
    // A code proves every earlier case was closed, so unlock them all.
    CASES.slice(0, idx + 1).forEach((c) => {
      if (!state.progress.unlocked.includes(c.id)) state.progress.unlocked.push(c.id);
    });
    state.codeMsg = `Code accepted. Case #${CASES[idx].num} is open, and your specimen cards are back.`;
    sfx.win();
  } else {
    state.codeMsg = "That code isn't in the Bureau's records. Check the spelling.";
    sfx.fail();
  }
  saveProgress();
  render();
}

document.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (ev.target.id === "login-form") handleLogin();
  else if (ev.target.id === "code-form") handleCode();
});

$modal.addEventListener("click", (ev) => { if (ev.target === $modal) closeModal(); });
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && !$modal.hidden) closeModal(); });

/* ----------------------------------------------------------
   10. BOOT
   ---------------------------------------------------------- */

function start(saved) {
  if (saved && saved.screen) {
    state.screen = saved.screen;
    state.run = saved.run || null;
    if (state.run && state.run.step === undefined) { state.run = null; state.screen = "hq"; }
    state.sound = saved.sound !== false;
  }
  render();
}

const hot = window.claude && window.claude.hot;
if (hot && hot.snapshot) hot.snapshot(() => ({ screen: state.screen, run: state.run, sound: state.sound }));
if (hot && hot.ready) hot.ready(start);
else start(hot && hot.data ? hot.data : null);
