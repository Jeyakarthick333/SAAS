'use client';

export default function ExpensesModule() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Expenses</h1>
        <p className="text-gray-600">Track and manage your spending</p>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Today's Spending</p>
            <p className="text-3xl font-bold text-gray-900">$127</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-green-600">$3,240</p>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Expenses</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { category: 'Food', amount: '$45', date: 'Today', icon: '🍔' },
            { category: 'Transport', amount: '$32', date: 'Today', icon: '🚗' },
            { category: 'Shopping', amount: '$50', date: 'Yesterday', icon: '🛍️' },
          ].map((expense, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {expense.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{expense.category}</p>
                  <p className="text-xs text-gray-500">{expense.date}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">{expense.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Preview */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Food', amount: '$1,200', color: 'bg-green-100' },
            { name: 'Transport', amount: '$450', color: 'bg-blue-100' },
            { name: 'Shopping', amount: '$800', color: 'bg-purple-100' },
            { name: 'Bills', amount: '$790', color: 'bg-orange-100' },
          ].map((cat, i) => (
            <div key={i} className={`${cat.color} rounded-xl p-4`}>
              <p className="font-medium text-gray-900 mb-1">{cat.name}</p>
              <p className="text-lg font-bold text-gray-900">{cat.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

