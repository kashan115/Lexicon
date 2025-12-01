import { Book } from '../types';

export const BOOKS_OF_THE_MONTH: Book[] = [
  {
    title: "On Writing",
    author: "Stephen King",
    description: "Part memoir, part master class. King reveals the basic tools of the trade every writer must have.",
    coverColor: "bg-red-800"
  },
  {
    title: "Bird by Bird",
    author: "Anne Lamott",
    description: "Some instructions on writing and life. A funny, helpful guide to the creative process.",
    coverColor: "bg-blue-700"
  },
  {
    title: "The Elements of Style",
    author: "Strunk & White",
    description: "The classic manual on the principles of plain English. Essential for clarity.",
    coverColor: "bg-stone-800"
  },
  {
    title: "Zen in the Art of Writing",
    author: "Ray Bradbury",
    description: "Essays on creativity and the joy of writing. Pure fuel for the imagination.",
    coverColor: "bg-orange-600"
  },
  {
    title: "Steering the Craft",
    author: "Ursula K. Le Guin",
    description: "Exercises and discussions on story, voice, and perspective from a sci-fi master.",
    coverColor: "bg-purple-700"
  },
  {
    title: "Story",
    author: "Robert McKee",
    description: "The definitive guide to the principles of screenwriting and storytelling structure.",
    coverColor: "bg-zinc-900"
  },
  {
    title: "Writing Down the Bones",
    author: "Natalie Goldberg",
    description: "Freeing the writer within. Connects writing practice with Zen meditation.",
    coverColor: "bg-amber-700"
  },
  {
    title: "Consider This",
    author: "Chuck Palahniuk",
    description: "Moments in my writing life after which everything was different.",
    coverColor: "bg-teal-800"
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    description: "Break through the blocks and win your inner creative battles.",
    coverColor: "bg-red-600"
  },
  {
    title: "Draft No. 4",
    author: "John McPhee",
    description: "On the writing process. Insights into structure and editing from a non-fiction giant.",
    coverColor: "bg-sky-700"
  },
  {
    title: "Daemon Voices",
    author: "Philip Pullman",
    description: "Essays on storytelling. Deep dives into the mechanics of narrative.",
    coverColor: "bg-indigo-900"
  },
  {
    title: "Into the Woods",
    author: "John Yorke",
    description: "A five-act journey into story. Explains why all stories share the same structure.",
    coverColor: "bg-emerald-800"
  }
];

export const getBookForMonth = (): Book => {
  const month = new Date().getMonth(); // 0-11
  return BOOKS_OF_THE_MONTH[month % BOOKS_OF_THE_MONTH.length];
};