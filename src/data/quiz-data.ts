
import { QuizCategory, Question, PlayerScore } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Quiz Categories
export const categories: QuizCategory[] = [
  {
    id: 'minecraft',
    name: 'Minecraft Knowledge',
    description: 'Test your knowledge about the popular block building game!',
    questionsCount: 5,
    difficulty: 'medium',
  },
  {
    id: 'videogames',
    name: 'Video Game Classics',
    description: 'How well do you know your classic video games?',
    questionsCount: 5,
    difficulty: 'easy',
  },
  {
    id: 'coding',
    name: 'Coding & Programming',
    description: 'Challenge your programming knowledge!',
    questionsCount: 5,
    difficulty: 'hard',
  },
];

// Questions
export const questions: Question[] = [
  // Minecraft Questions
  {
    id: uuidv4(),
    text: 'What material is needed to create a Nether Portal?',
    options: [
      { id: uuidv4(), text: 'Diamond Blocks', isCorrect: false },
      { id: uuidv4(), text: 'Obsidian', isCorrect: true },
      { id: uuidv4(), text: 'Bedrock', isCorrect: false },
      { id: uuidv4(), text: 'End Stone', isCorrect: false },
    ],
    categoryId: 'minecraft',
  },
  {
    id: uuidv4(),
    text: 'Which mob only spawns during a thunderstorm?',
    options: [
      { id: uuidv4(), text: 'Enderman', isCorrect: false },
      { id: uuidv4(), text: 'Blaze', isCorrect: false },
      { id: uuidv4(), text: 'Charged Creeper', isCorrect: true },
      { id: uuidv4(), text: 'Wither Skeleton', isCorrect: false },
    ],
    categoryId: 'minecraft',
  },
  {
    id: uuidv4(),
    text: 'What is the rarest ore in Minecraft?',
    options: [
      { id: uuidv4(), text: 'Diamond', isCorrect: false },
      { id: uuidv4(), text: 'Emerald', isCorrect: true },
      { id: uuidv4(), text: 'Ancient Debris', isCorrect: false },
      { id: uuidv4(), text: 'Lapis Lazuli', isCorrect: false },
    ],
    categoryId: 'minecraft',
  },
  {
    id: uuidv4(),
    text: 'How many Eyes of Ender are needed to activate the End Portal?',
    options: [
      { id: uuidv4(), text: '10', isCorrect: false },
      { id: uuidv4(), text: '12', isCorrect: true },
      { id: uuidv4(), text: '9', isCorrect: false },
      { id: uuidv4(), text: '16', isCorrect: false },
    ],
    categoryId: 'minecraft',
  },
  {
    id: uuidv4(),
    text: 'What is the maximum stack size for most items in Minecraft?',
    options: [
      { id: uuidv4(), text: '64', isCorrect: true },
      { id: uuidv4(), text: '99', isCorrect: false },
      { id: uuidv4(), text: '16', isCorrect: false },
      { id: uuidv4(), text: '100', isCorrect: false },
    ],
    categoryId: 'minecraft',
  },
  
  // Video Game Questions
  {
    id: uuidv4(),
    text: 'Which character is the mascot of Nintendo?',
    options: [
      { id: uuidv4(), text: 'Sonic', isCorrect: false },
      { id: uuidv4(), text: 'Mario', isCorrect: true },
      { id: uuidv4(), text: 'Pikachu', isCorrect: false },
      { id: uuidv4(), text: 'Link', isCorrect: false },
    ],
    categoryId: 'videogames',
  },
  {
    id: uuidv4(),
    text: 'In what year was the first Pokemon game released?',
    options: [
      { id: uuidv4(), text: '1996', isCorrect: true },
      { id: uuidv4(), text: '1998', isCorrect: false },
      { id: uuidv4(), text: '1994', isCorrect: false },
      { id: uuidv4(), text: '2000', isCorrect: false },
    ],
    categoryId: 'videogames',
  },
  {
    id: uuidv4(),
    text: 'Which game features a character named Master Chief?',
    options: [
      { id: uuidv4(), text: 'Call of Duty', isCorrect: false },
      { id: uuidv4(), text: 'Gears of War', isCorrect: false },
      { id: uuidv4(), text: 'Halo', isCorrect: true },
      { id: uuidv4(), text: 'Destiny', isCorrect: false },
    ],
    categoryId: 'videogames',
  },
  {
    id: uuidv4(),
    text: 'What was the first video game to feature a high score table?',
    options: [
      { id: uuidv4(), text: 'Pong', isCorrect: false },
      { id: uuidv4(), text: 'Space Invaders', isCorrect: true },
      { id: uuidv4(), text: 'Pac-Man', isCorrect: false },
      { id: uuidv4(), text: 'Tetris', isCorrect: false },
    ],
    categoryId: 'videogames',
  },
  {
    id: uuidv4(),
    text: 'Which console was released by Sony in 1994?',
    options: [
      { id: uuidv4(), text: 'PlayStation', isCorrect: true },
      { id: uuidv4(), text: 'Dreamcast', isCorrect: false },
      { id: uuidv4(), text: 'Nintendo 64', isCorrect: false },
      { id: uuidv4(), text: 'Xbox', isCorrect: false },
    ],
    categoryId: 'videogames',
  },
  
  // Coding Questions
  {
    id: uuidv4(),
    text: 'Which programming language was developed by Brendan Eich?',
    options: [
      { id: uuidv4(), text: 'Python', isCorrect: false },
      { id: uuidv4(), text: 'JavaScript', isCorrect: true },
      { id: uuidv4(), text: 'Java', isCorrect: false },
      { id: uuidv4(), text: 'C++', isCorrect: false },
    ],
    categoryId: 'coding',
  },
  {
    id: uuidv4(),
    text: 'What does CSS stand for?',
    options: [
      { id: uuidv4(), text: 'Computer Style Sheets', isCorrect: false },
      { id: uuidv4(), text: 'Creative Style System', isCorrect: false },
      { id: uuidv4(), text: 'Cascading Style Sheets', isCorrect: true },
      { id: uuidv4(), text: 'Colorful Style Sheets', isCorrect: false },
    ],
    categoryId: 'coding',
  },
  {
    id: uuidv4(),
    text: 'Which of these is NOT a JavaScript framework?',
    options: [
      { id: uuidv4(), text: 'React', isCorrect: false },
      { id: uuidv4(), text: 'Angular', isCorrect: false },
      { id: uuidv4(), text: 'Vue', isCorrect: false },
      { id: uuidv4(), text: 'Django', isCorrect: true },
    ],
    categoryId: 'coding',
  },
  {
    id: uuidv4(),
    text: 'What does HTML stand for?',
    options: [
      { id: uuidv4(), text: 'Hyper Text Markup Language', isCorrect: true },
      { id: uuidv4(), text: 'High Tech Multi Language', isCorrect: false },
      { id: uuidv4(), text: 'Hyper Text Multiple Language', isCorrect: false },
      { id: uuidv4(), text: 'Hyper Tool Multi Language', isCorrect: false },
    ],
    categoryId: 'coding',
  },
  {
    id: uuidv4(),
    text: 'Which data structure operates on a LIFO principle?',
    options: [
      { id: uuidv4(), text: 'Queue', isCorrect: false },
      { id: uuidv4(), text: 'Stack', isCorrect: true },
      { id: uuidv4(), text: 'Linked List', isCorrect: false },
      { id: uuidv4(), text: 'Tree', isCorrect: false },
    ],
    categoryId: 'coding',
  },
];

// Sample leaderboard data
export const leaderboardData: PlayerScore[] = [
  {
    id: uuidv4(),
    name: 'PixelMaster',
    score: 480,
    timeSpent: 120,
    correctAnswers: 5,
    totalQuestions: 5,
    categoryId: 'minecraft',
    date: new Date('2025-04-10')
  },
  {
    id: uuidv4(),
    name: 'GameWizard',
    score: 450,
    timeSpent: 150,
    correctAnswers: 5,
    totalQuestions: 5,
    categoryId: 'videogames',
    date: new Date('2025-04-11')
  },
  {
    id: uuidv4(),
    name: 'CodeNinja',
    score: 420,
    timeSpent: 180,
    correctAnswers: 5,
    totalQuestions: 5,
    categoryId: 'coding',
    date: new Date('2025-04-12')
  },
  {
    id: uuidv4(),
    name: 'BlockBuilder',
    score: 380,
    timeSpent: 200,
    correctAnswers: 4,
    totalQuestions: 5,
    categoryId: 'minecraft',
    date: new Date('2025-04-09')
  },
  {
    id: uuidv4(),
    name: 'RetroGamer',
    score: 350,
    timeSpent: 220,
    correctAnswers: 4,
    totalQuestions: 5,
    categoryId: 'videogames',
    date: new Date('2025-04-08')
  },
];

// Helper functions
export const getQuestionsByCategory = (categoryId: string): Question[] => {
  return questions.filter(q => q.categoryId === categoryId);
};

export const getCategoryById = (categoryId: string): QuizCategory | undefined => {
  return categories.find(c => c.id === categoryId);
};

export const getLeaderboardByCategory = (categoryId?: string): PlayerScore[] => {
  const scores = categoryId 
    ? leaderboardData.filter(score => score.categoryId === categoryId)
    : leaderboardData;
  
  return [...scores].sort((a, b) => b.score - a.score);
};

// Calculate score based on correctness and time spent
export const calculateScore = (isCorrect: boolean, timeSpent: number, maxTime: number): number => {
  if (!isCorrect) return 0;
  
  // Base score for correct answer
  const baseScore = 100;
  
  // Time bonus: faster answers get higher scores
  // If the answer is given in half the allotted time, the time bonus is maxed out
  const timeBonus = Math.max(0, Math.floor((1 - timeSpent / maxTime) * baseScore * 0.5));
  
  return baseScore + timeBonus;
};
