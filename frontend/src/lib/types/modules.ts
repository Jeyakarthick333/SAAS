export type ModuleId =
  | 'expenses'
  | 'tasks'
  | 'notes'
  | 'mood'
  | 'journal'
  | 'habits'
  | 'budget'
  | 'receipts'
  | 'time-tracking'
  | 'health'
  | 'goals'
  | 'calendar';

export interface Module {
  id: ModuleId;
  name: string;
  icon: string;
  color: string;
  description: string;
  enabled: boolean;
  route: string;
}

export const MODULES: Module[] = [
  {
    id: 'expenses',
    name: 'Expenses',
    icon: '💰',
    color: 'bg-green-500',
    description: 'Track your spending',
    enabled: true,
    route: '/modules/expenses',
  },
  {
    id: 'tasks',
    name: 'Tasks',
    icon: '📝',
    color: 'bg-blue-500',
    description: 'Manage your to-dos',
    enabled: true,
    route: '/modules/tasks',
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '📘',
    color: 'bg-yellow-500',
    description: 'Quick notes and ideas',
    enabled: true,
    route: '/modules/notes',
  },
  {
    id: 'mood',
    name: 'Mood Tracking',
    icon: '🙂',
    color: 'bg-purple-500',
    description: 'Track your mood',
    enabled: true,
    route: '/modules/mood',
  },
  {
    id: 'journal',
    name: 'Journal',
    icon: '📰',
    color: 'bg-indigo-500',
    description: 'Daily journal entries',
    enabled: true,
    route: '/modules/journal',
  },
  {
    id: 'habits',
    name: 'Habit Tracker',
    icon: '📊',
    color: 'bg-pink-500',
    description: 'Build better habits',
    enabled: true,
    route: '/modules/habits',
  },
  {
    id: 'goals',
    name: 'Goals',
    icon: '🧭',
    color: 'bg-orange-500',
    description: 'Set and track goals',
    enabled: true,
    route: '/modules/goals',
  },
  {
    id: 'budget',
    name: 'Budget & Savings',
    icon: '💸',
    color: 'bg-emerald-500',
    description: 'Manage your budget',
    enabled: true,
    route: '/modules/budget',
  },
  {
    id: 'time-tracking',
    name: 'Time Tracking',
    icon: '⏱',
    color: 'bg-cyan-500',
    description: 'Track your time',
    enabled: true,
    route: '/modules/time-tracking',
  },
  {
    id: 'receipts',
    name: 'Receipt Vault',
    icon: '📷',
    color: 'bg-teal-500',
    description: 'Store receipts and files',
    enabled: true,
    route: '/modules/receipts',
  },
  {
    id: 'health',
    name: 'Health & Well-being',
    icon: '💚',
    color: 'bg-red-500',
    description: 'Track health stats',
    enabled: true,
    route: '/modules/health',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: '📅',
    color: 'bg-violet-500',
    description: 'Sync your calendar',
    enabled: true,
    route: '/modules/calendar',
  },
];

export interface AddAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  moduleId: ModuleId;
  route: string;
}

export const ADD_ACTIONS: AddAction[] = [
  {
    id: 'add-expense',
    label: 'Add Expense',
    icon: '💰',
    color: 'bg-green-500',
    moduleId: 'expenses',
    route: '/modules/expenses/add',
  },
  {
    id: 'add-task',
    label: 'Add Task',
    icon: '📝',
    color: 'bg-blue-500',
    moduleId: 'tasks',
    route: '/modules/tasks/add',
  },
  {
    id: 'add-note',
    label: 'Add Note',
    icon: '📘',
    color: 'bg-yellow-500',
    moduleId: 'notes',
    route: '/modules/notes/add',
  },
  {
    id: 'add-journal',
    label: 'Add Journal Entry',
    icon: '📰',
    color: 'bg-indigo-500',
    moduleId: 'journal',
    route: '/modules/journal/add',
  },
  {
    id: 'add-habit',
    label: 'Add Habit',
    icon: '📊',
    color: 'bg-pink-500',
    moduleId: 'habits',
    route: '/modules/habits/add',
  },
  {
    id: 'add-mood',
    label: 'Add Mood',
    icon: '🙂',
    color: 'bg-purple-500',
    moduleId: 'mood',
    route: '/modules/mood/add',
  },
  {
    id: 'add-goal',
    label: 'Add Goal',
    icon: '🧭',
    color: 'bg-orange-500',
    moduleId: 'goals',
    route: '/modules/goals/add',
  },
  {
    id: 'add-savings',
    label: 'Add Savings Entry',
    icon: '💸',
    color: 'bg-emerald-500',
    moduleId: 'budget',
    route: '/modules/budget/add',
  },
  {
    id: 'add-receipt',
    label: 'Add Receipt',
    icon: '📷',
    color: 'bg-teal-500',
    moduleId: 'receipts',
    route: '/modules/receipts/add',
  },
  {
    id: 'start-timer',
    label: 'Start Time Tracking',
    icon: '⏱',
    color: 'bg-cyan-500',
    moduleId: 'time-tracking',
    route: '/modules/time-tracking/start',
  },
];

