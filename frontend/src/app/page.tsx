'use client';

import { useState } from 'react';

export default function Home() {
  const [mood, setMood] = useState<string | null>(null);

  const moods = ['😊', '😐', '😢', '😴', '😤', '😍'];

  return (
    <div>
      {/* Top Section - Today's Summary */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-4">
          <h1 className="text-2xl font-bold mb-2">Good Morning! 👋</h1>
          <p className="text-blue-100">Here's your day at a glance</p>
        </div>

        {/* Daily Review Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Daily Review</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-500">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$127</div>
              <div className="text-xs text-gray-500">Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3/5</div>
              <div className="text-xs text-gray-500">Habits</div>
            </div>
          </div>
        </div>

        {/* Mood Picker */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">How are you feeling?</h3>
          <div className="flex gap-3">
            {moods.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setMood(emoji)}
                className={`
                  w-12 h-12 rounded-full text-2xl flex items-center justify-center
                  transition-all
                  ${mood === emoji ? 'bg-purple-100 scale-110' : 'bg-gray-50 hover:bg-gray-100'}
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Widgets */}
      <div className="space-y-4">
        {/* Today's Tasks Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>📝</span> Today's Tasks
            </h3>
            <span className="text-sm text-gray-500">5 remaining</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-sm text-gray-700">Complete project proposal</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Expenses Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>💰</span> Today's Expenses
            </h3>
            <span className="text-sm text-green-600 font-semibold">$127</span>
          </div>
          <div className="space-y-2">
            {[
              { category: 'Food', amount: '$45', color: 'bg-green-100' },
              { category: 'Transport', amount: '$32', color: 'bg-blue-100' },
              { category: 'Shopping', amount: '$50', color: 'bg-purple-100' },
            ].map((expense, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${expense.color}`} />
                  <span className="text-sm text-gray-700">{expense.category}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{expense.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Habits Due Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>📊</span> Habits Due
            </h3>
            <span className="text-sm text-gray-500">3/5 done</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Morning Exercise', done: true },
              { name: 'Read 30 min', done: true },
              { name: 'Meditation', done: true },
              { name: 'Water 8 glasses', done: false },
              { name: 'No social media', done: false },
            ].map((habit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${habit.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                  {habit.done && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm ${habit.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                  {habit.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Tracked Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>⏱</span> Time Tracked Today
            </h3>
            <span className="text-sm text-blue-600 font-semibold">4h 32m</span>
          </div>
          <div className="space-y-2">
            {[
              { task: 'Work', time: '2h 15m', color: 'bg-blue-500' },
              { task: 'Exercise', time: '45m', color: 'bg-green-500' },
              { task: 'Reading', time: '1h 32m', color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-700">{item.task}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journal Snippet Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>📰</span> Journal
            </h3>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            Had a productive morning. Finished the project proposal and went for a run. Feeling energized!
          </p>
        </div>

        {/* Savings Progress Widget */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>💸</span> Savings Progress
            </h3>
            <span className="text-sm text-emerald-600 font-semibold">$2,450 / $5,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '49%' }} />
          </div>
          <p className="text-xs text-gray-500">49% to goal</p>
        </div>
      </div>

      {/* Bottom - Quick Actions & Recommendations */}
      <div className="mt-6 space-y-4">
        {/* Recommendations */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span>💡</span> Smart Recommendations
          </h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• You overspent yesterday by $45</li>
            <li>• You missed 2 habits - try setting reminders</li>
            <li>• Finish tasks before 4pm to reduce stress spending</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-blue-50 rounded-lg text-blue-700 font-medium text-sm hover:bg-blue-100 transition-colors">
              Add Expense
            </button>
            <button className="p-3 bg-purple-50 rounded-lg text-purple-700 font-medium text-sm hover:bg-purple-100 transition-colors">
              Log Mood
            </button>
            <button className="p-3 bg-green-50 rounded-lg text-green-700 font-medium text-sm hover:bg-green-100 transition-colors">
              Start Timer
            </button>
            <button className="p-3 bg-orange-50 rounded-lg text-orange-700 font-medium text-sm hover:bg-orange-100 transition-colors">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
