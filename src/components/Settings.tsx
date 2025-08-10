import React, { useState } from 'react'
import { Settings as SettingsIcon, Bell, Moon, Smartphone, RefreshCw, Download, Trash2, Shield } from 'lucide-react'

interface SettingsProps {
  onResetOnboarding: () => void
}

const Settings: React.FC<SettingsProps> = ({ onResetOnboarding }) => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [autoBlock, setAutoBlock] = useState(true)

  const exportData = () => {
    const data = localStorage.getItem('brainDetoxData')
    if (data) {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'brain-detox-data.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const clearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('brainDetoxData')
      localStorage.removeItem('brainDetoxOnboarding')
      window.location.reload()
    }
  }

  const installPWA = () => {
    // This would trigger PWA installation prompt in a real app
    alert('To install Brain Detox as an app:\n\n1. Open this page in Chrome/Edge\n2. Click the install button in the address bar\n3. Or use "Add to Home Screen" from the browser menu')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings ⚙️</h2>
        <p className="text-gray-600 text-lg">Customize your Brain Detox experience</p>
      </div>

      {/* App Settings */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2" />
          App Settings
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Get reminders and progress updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Auto-Block</p>
                <p className="text-sm text-gray-500">Automatically block apps when limits are reached</p>
              </div>
            </div>
            <button
              onClick={() => setAutoBlock(!autoBlock)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoBlock ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoBlock ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Focus Mode</p>
                <p className="text-sm text-gray-500">Hide distracting elements during focus sessions</p>
              </div>
            </div>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                focusMode ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  focusMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h3>

        <div className="space-y-4">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
          >
            <Download className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
            <span className="font-medium text-gray-700 group-hover:text-primary-700">Export Data</span>
          </button>

          <button
            onClick={clearData}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-red-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 group"
          >
            <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-500" />
            <span className="font-medium text-red-700 group-hover:text-red-700">Clear All Data</span>
          </button>
        </div>
      </div>

      {/* App Actions */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">App Actions</h3>

        <div className="space-y-4">
          <button
            onClick={installPWA}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-green-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
          >
            <Smartphone className="w-5 h-5 text-green-400 group-hover:text-green-500" />
            <span className="font-medium text-green-700 group-hover:text-green-700">Install as App</span>
          </button>

          <button
            onClick={onResetOnboarding}
            className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
          >
            <RefreshCw className="w-5 h-5 text-blue-400 group-hover:text-blue-500" />
            <span className="font-medium text-blue-700 group-hover:text-blue-700">Reset Onboarding</span>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="card text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">About Brain Detox</h3>
        <p className="text-gray-600 mb-4">
          Version 1.0.0 - A digital wellness app to help you build healthier relationships with technology.
        </p>
        <p className="text-sm text-gray-500">
          Made with ❤️ for better digital habits
        </p>
      </div>
    </div>
  )
}

export default Settings