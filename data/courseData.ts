import { CourseDay } from '../types';

export const COURSE_DAYS: CourseDay[] = [
  // WEEK 1: FOUNDATIONS
  {
    day: 1,
    title: "The Stream of Consciousness",
    focus: "Flow & Inhibition",
    prompt: "Set a timer for 10 minutes. Write exactly what you are thinking right now, without stopping to edit or correct. If you get stuck, write 'I am stuck' until a new thought comes. The goal is to bypass your internal editor.",
    vocab: [{ word: "Unfiltered", definition: "Not censored or edited.", example: "His unfiltered thoughts were surprising." }]
  },
  {
    day: 2,
    title: "Sensory Details",
    focus: "Descriptive Writing",
    prompt: "Describe your favorite meal. Do not just say it was good. Describe the texture, the temperature, the aroma, and the specific flavors. Use all five senses if possible.",
    vocab: [{ word: "Olfactory", definition: "Relating to the sense of smell.", example: "The olfactory memory of baking bread was strong." }]
  },
  {
    day: 3,
    title: "The Object",
    focus: "Observation",
    prompt: "Pick a small object near you (a pen, a cup, a key). Describe its history. Where did it come from? Who made it? Who has held it before? Invent a backstory for this mundane object.",
    vocab: [{ word: "Mundane", definition: "Lacking interest or excitement; dull.", example: "He found the mundane task soothing." }]
  },
  {
    day: 4,
    title: "Memory Lane",
    focus: "Recall & Emotion",
    prompt: "Write about a specific childhood memory. Focus on the emotional atmosphere. Was it safe? Chaotic? Joyful? Try to capture the feeling of being that age again.",
    vocab: [{ word: "Nostalgia", definition: "A sentimental longing for the past.", example: "The song evoked a wave of nostalgia." }]
  },
  {
    day: 5,
    title: "The Routine",
    focus: "Clarity & Sequence",
    prompt: "Explain exactly how to make a cup of coffee or tea. Break it down into such precise detail that an alien who has never seen liquid could do it. Focus on clarity and sequence.",
    vocab: [{ word: "Sequential", definition: "Forming or following in a logical order.", example: "The instructions were sequential and easy to follow." }]
  },
  // WEEK 2: STRUCTURE
  {
    day: 6,
    title: "The Argument",
    focus: "Persuasion",
    prompt: "Argue for an opinion you hold strongly (e.g., 'Pineapple belongs on pizza' or 'Cats are better than dogs'). Write three distinct paragraphs: The Claim, The Evidence, and The Conclusion.",
    vocab: [{ word: "Rhetoric", definition: "The art of effective or persuasive speaking or writing.", example: "Her rhetoric was convincing." }]
  },
  {
    day: 7,
    title: "The Devil's Advocate",
    focus: "Empathy & Perspective",
    prompt: "Take the argument you wrote yesterday. Now, write the exact opposite viewpoint with equal conviction. Try to understand why someone would believe the opposite of you.",
    vocab: [{ word: "Dichotomy", definition: "A division or contrast between two things.", example: "The dichotomy between theory and practice." }]
  },
  {
    day: 8,
    title: "Dialogue",
    focus: "Voice",
    prompt: "Write a conversation between two people stuck in an elevator. Do not use tags like 'he said' or 'she said' unless necessary. Let the way they speak reveal who they are.",
    vocab: [{ word: "Colloquial", definition: "Used in ordinary or familiar conversation; not formal.", example: "His writing style is colloquial and accessible." }]
  },
  {
    day: 9,
    title: "The Opening Line",
    focus: "Hooks",
    prompt: "Write 5 different opening sentences for a mystery novel. Pick the best one and write the first 200 words of that story.",
    vocab: [{ word: "Intrigue", definition: "Arouse the curiosity or interest of.", example: "The title intrigued me." }]
  },
  {
    day: 10,
    title: "Transitions",
    focus: "Flow",
    prompt: "Write a story that moves from a noisy city street to a quiet library. Focus on the transition. How does the sound change? The light? The atmosphere? Smoothly guide the reader from A to B.",
    vocab: [{ word: "Juxtaposition", definition: "The fact of two things being seen or placed close together with contrasting effect.", example: "The juxtaposition of the old castle and new skyscrapers." }]
  },
  // WEEK 3: CREATIVITY
  {
    day: 11,
    title: "Metaphor Magic",
    focus: "Figurative Language",
    prompt: "Describe an emotion (anger, joy, sadness) without naming it. Use a metaphor. Is it a storm? A warm blanket? A broken glass? Extend the metaphor as far as you can.",
    vocab: [{ word: "Allegory", definition: "A story, poem, or picture that can be interpreted to reveal a hidden meaning.", example: "The film is an allegory for the Cold War." }]
  },
  {
    day: 12,
    title: "Speculative Fiction",
    focus: "Imagination",
    prompt: "What if humans could fly, but only for 10 seconds at a time? Write a news report or diary entry from a world where this is true.",
    vocab: [{ word: "Hypothetical", definition: "Based on or serving as a hypothesis.", example: "Let's consider a hypothetical situation." }]
  },
  {
    day: 13,
    title: "Personification",
    focus: "Imagery",
    prompt: "Write from the perspective of an old house. What does it feel when people walk on its floors? What does it see through its windows? Give the house a personality.",
    vocab: [{ word: "Anthropomorphism", definition: "The attribution of human characteristics to a god, animal, or object.", example: "Cartoon animals are examples of anthropomorphism." }]
  },
  {
    day: 14,
    title: "Restricted Writing",
    focus: "Vocabulary Constraint",
    prompt: "Write a story about a theft without using the letter 'e'. This is a lipogram. It forces you to choose your words very carefully.",
    vocab: [{ word: "Constraint", definition: "A limitation or restriction.", example: "Time constraints made the task difficult." }]
  },
  {
    day: 15,
    title: "The Anti-Cliché",
    focus: "Originality",
    prompt: "Take a common cliché (e.g., 'It was a dark and stormy night'). Rewrite the scene to be fresh, original, and surprising. Avoid the expected.",
    vocab: [{ word: "Hackneyed", definition: "Lacking significance through having been overused.", example: "The plot was hackneyed and predictable." }]
  },
  // WEEK 4: ADVANCED
  {
    day: 16,
    title: "Conciseness",
    focus: "Editing",
    prompt: "Write a 300-word story. Then, cut it down to exactly 100 words without losing the main plot or emotion. Every word must fight for its place.",
    vocab: [{ word: "Brevity", definition: "Concise and exact use of words in writing or speech.", example: "For the sake of brevity, I will summarize." }]
  },
  {
    day: 17,
    title: "Active Voice",
    focus: "Strength",
    prompt: "Describe an action scene (a chase, a fight, a sport). Use only active voice (e.g., 'The dog chased the ball', not 'The ball was chased by the dog'). Make it punchy.",
    vocab: [{ word: "Dynamic", definition: "Characterized by constant change, activity, or progress.", example: "The market is dynamic and volatile." }]
  },
  {
    day: 18,
    title: "Atmosphere",
    focus: "Tone",
    prompt: "Describe a park. First, make it seem terrifying without changing the physical facts (only tone/word choice). Then, describe the exact same park to make it seem like paradise.",
    vocab: [{ word: "Ambience", definition: "The character and atmosphere of a place.", example: "The restaurant had a romantic ambience." }]
  },
  {
    day: 19,
    title: "Stream of Consciousness II",
    focus: "Internal Monologue",
    prompt: "Write the internal monologue of a person waiting for a job interview. Jump between anxiety, observation of the room, and random memories. Mimic how the mind actually works.",
    vocab: [{ word: "Cognition", definition: "The mental action or process of acquiring knowledge and understanding.", example: "The study focuses on human cognition." }]
  },
  {
    day: 20,
    title: "The Letter",
    focus: "Direct Address",
    prompt: "Write a letter to your future self, 10 years from now. Tell them what you hope they have achieved, what you are afraid of losing, and what matters to you today.",
    vocab: [{ word: "Introspective", definition: "Characterized by or given to introspection.", example: "He was in an introspective mood." }]
  },
  // WEEK 5: MASTERY
  {
    day: 21,
    title: "The Unreliable Narrator",
    focus: "Subtext",
    prompt: "Write a diary entry from someone who is clearly lying to themselves about a relationship or event. Let the reader see the truth through the cracks in their story.",
    vocab: [{ word: "Subjective", definition: "Based on or influenced by personal feelings, tastes, or opinions.", example: "Taste is subjective." }]
  },
  {
    day: 22,
    title: "Flash Fiction",
    focus: "Impact",
    prompt: "Write a complete story with a beginning, middle, and end in fewer than 50 words. It must have a conflict and a resolution.",
    vocab: [{ word: "Poignant", definition: "Evoking a keen sense of sadness or regret.", example: "A poignant reminder of the passing of time." }]
  },
  {
    day: 23,
    title: "Sensory Overload",
    focus: "Maximalism",
    prompt: "Describe a busy market or a concert. Overwhelm the reader with details, colors, sounds, and smells. Create a chaotic, vibrant texture with your words.",
    vocab: [{ word: "Cacophony", definition: "A harsh, discordant mixture of sounds.", example: "A cacophony of deafening alarm bells." }]
  },
  {
    day: 24,
    title: "Silence",
    focus: "Minimalism",
    prompt: "Write a scene where two people are sitting together saying nothing. Convey the tension or peace between them purely through body language and the environment.",
    vocab: [{ word: "Tacit", definition: "Understood or implied without being stated.", example: "Your silence may be taken to mean tacit agreement." }]
  },
  {
    day: 25,
    title: "Rhythm",
    focus: "Musicality",
    prompt: "Write a paragraph where the sentence lengths vary drastically. Use short staccato sentences for action. Long, flowing sentences for thought. Pay attention to the beat.",
    vocab: [{ word: "Cadence", definition: "A modulation or inflection of the voice.", example: "The measured cadence of his speech." }]
  },
  {
    day: 26,
    title: "The Micro-Moment",
    focus: "Zooming In",
    prompt: "Take a 5-second event (dropping a glass, lighting a match) and stretch it out into 300 words. Slow down time. Describe every micro-movement and physics detail.",
    vocab: [{ word: "Minute", definition: "Extremely small.", example: "Minute particles of gold." }]
  },
  {
    day: 27,
    title: "Advice Column",
    focus: "Voice & Authority",
    prompt: "Invent a ridiculous problem sent in by a reader. Write a response as a wise (or terrible) advice columnist. Adopt a strong persona.",
    vocab: [{ word: "Sage", definition: "Having, showing, or indicating profound wisdom.", example: "They nodded in agreement with her sage remarks." }]
  },
  {
    day: 28,
    title: "The Villain",
    focus: "Complexity",
    prompt: "Write a scene from the perspective of a 'bad guy'. Show their motivation. Make them human, understandable, even if their actions are wrong.",
    vocab: [{ word: "Nuance", definition: "A subtle difference in or shade of meaning, expression, or sound.", example: "The nuances of facial expression." }]
  },
  {
    day: 29,
    title: "Revision Day",
    focus: "Polishing",
    prompt: "Go back to your favorite piece from the last 28 days. Rewrite it completely. Change the tone, the perspective, or the ending. Make it 20% better.",
    vocab: [{ word: "Iterative", definition: "Relating to or involving iteration, especially of a mathematical or computational process.", example: "An iterative process of refinement." }]
  },
  {
    day: 30,
    title: "The Manifesto",
    focus: "Purpose",
    prompt: "Why do you write? What do you want to achieve with your words? Write your personal writer's manifesto to guide you forward after this course.",
    vocab: [{ word: "Conviction", definition: "A firmly held belief or opinion.", example: "She spoke with conviction." }]
  }
];
