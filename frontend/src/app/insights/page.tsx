'use client';

export default function Insights() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insights</h1>
        <p className="text-gray-600">AI-powered analytics across all your modules</p>
      </div>

      <div className="space-y-4">
        {/* Weekly Spending Insights */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
              💰
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Weekly Spending Insights</h3>
              <p className="text-xs text-gray-500">Last 7 days</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Total Spent</span>
              <span className="text-lg font-bold text-gray-900">$892</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Average Daily</span>
              <span className="text-sm font-medium text-gray-700">$127</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                💡 <strong>Insight:</strong> You spent 15% more this week compared to last week. 
                Most expenses were on food and transport.
              </p>
            </div>
          </div>
        </div>

        {/* Task Completion Trends */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              📝
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Task Completion Trends</h3>
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Completion Rate</span>
              <span className="text-lg font-bold text-blue-600">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '78%' }} />
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                💡 <strong>Insight:</strong> You're most productive on Tuesdays and Wednesdays. 
                Try scheduling important tasks on these days.
              </p>
            </div>
          </div>
        </div>

        {/* Mood + Productivity Correlation */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
              🙂
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mood + Productivity Correlation</h3>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Average Mood Score</span>
              <span className="text-lg font-bold text-purple-600">7.2/10</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                💡 <strong>Insight:</strong> Your mood directly correlates with task completion. 
                On days when you rate your mood above 7, you complete 40% more tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Habit Streaks */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Habit Streaks</h3>
              <p className="text-xs text-gray-500">Current streaks</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Morning Exercise', streak: 12, status: 'good' },
              { name: 'Read 30 min', streak: 8, status: 'good' },
              { name: 'Meditation', streak: 3, status: 'warning' },
            ].map((habit, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">{habit.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{habit.streak} day streak</span>
                    {habit.status === 'warning' && (
                      <span className="text-xs text-orange-600">⚠️ At risk</span>
                    )}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  habit.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  🔥 {habit.streak}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Tracking Patterns */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-xl">
              ⏱
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Time Tracking Patterns</h3>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Total Time Tracked</span>
              <span className="text-lg font-bold text-cyan-600">32h 15m</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                💡 <strong>Insight:</strong> You're most focused between 9-11 AM. 
                Schedule deep work during this window.
              </p>
            </div>
          </div>
        </div>

        {/* Top Achievements */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-sm p-5 border border-yellow-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
              ⭐
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Achievements This Week</h3>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Completed 45 tasks (personal best!)</li>
            <li>✅ Maintained 12-day exercise streak</li>
            <li>✅ Saved $450 this month</li>
            <li>✅ Logged mood for 7 consecutive days</li>
          </ul>
        </div>

        {/* Recommendations for Tomorrow */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm p-5 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Recommendations for Tomorrow</h3>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Schedule important tasks between 9-11 AM</li>
            <li>• Set a budget limit of $100 for the day</li>
            <li>• Don't forget your morning exercise routine</li>
            <li>• Log your mood in the morning and evening</li>
          </ul>
        </div>

        {/* Monthly Life Story */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Life Story</h3>
              <p className="text-xs text-gray-500">November 2024</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              This month, you've been on a roll! You completed <strong>180 tasks</strong>, 
              tracked <strong>142 hours</strong> of focused work, and maintained an average 
              mood score of <strong>7.2/10</strong>. Your spending was well-controlled at 
              <strong>$3,240</strong>, and you saved <strong>$450</strong> towards your goals.
            </p>
            <p>
              Your strongest habits were morning exercise (12-day streak) and reading 
              (8-day streak). You were most productive on Tuesdays and Wednesdays.
            </p>
            <p className="text-indigo-600 font-medium">
              Keep up the great work! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

