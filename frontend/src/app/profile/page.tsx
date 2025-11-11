'use client';

import { useState } from 'react';

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Name</h2>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        </div>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Appearance */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                <p className="text-xs text-gray-500">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Theme Color</p>
                <p className="text-xs text-gray-500">Choose your accent color</p>
              </div>
              <div className="flex gap-2">
                {['blue', 'purple', 'green', 'orange'].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-gray-200 hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">PIN Lock</p>
              <p className="text-xs text-gray-500">Set up PIN protection</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Change Password</p>
              <p className="text-xs text-gray-500">Update your password</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security</p>
            </button>
          </div>
        </div>

        {/* Data & Backup */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Data & Backup</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Backup & Sync</p>
              <p className="text-xs text-gray-500">Sync your data to cloud</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Export Data</p>
              <p className="text-xs text-gray-500">Download your data as JSON/CSV</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Import Data</p>
              <p className="text-xs text-gray-500">Restore from backup</p>
            </button>
          </div>
        </div>

        {/* Modules */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Manage Modules</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Customize Modules</p>
              <p className="text-xs text-gray-500">Reorder, hide, or add modules</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Widget Settings</p>
              <p className="text-xs text-gray-500">Configure dashboard widgets</p>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive updates and reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Notification Preferences</p>
              <p className="text-xs text-gray-500">Customize what you're notified about</p>
            </button>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Integrations</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Calendar Sync</p>
              <p className="text-xs text-gray-500">Connect Google Calendar, iCal</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Health Data</p>
              <p className="text-xs text-gray-500">Import from Apple Health, Fitbit</p>
            </button>
          </div>
        </div>

        {/* Goals Settings */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Goals Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Manage Goals</p>
              <p className="text-xs text-gray-500">View and edit your goals</p>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-900">Goal Reminders</p>
              <p className="text-xs text-gray-500">Set up goal tracking reminders</p>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">About</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Version 1.0.0</p>
            <p>Personal Productivity OS</p>
            <div className="pt-3 border-t border-gray-100">
              <button className="text-red-600 hover:text-red-700 font-medium">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

