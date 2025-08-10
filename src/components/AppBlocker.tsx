import React, { useState } from 'react'
import { Shield, Plus, Trash2, Clock, AlertTriangle, Settings } from 'lucide-react'
import { SessionData, App } from '../App'

interface AppBlockerProps {
  sessionData: SessionData
  updateSessionData: (data: Partial<SessionData>) => void
}

const AppBlocker: React.FC<AppBlockerProps> = ({ sessionData, updateSessionData }) => {
  const [showAddApp, setShowAddApp] = useState(false)
  const [newApp, setNewApp] = useState({ name: '', icon: '📱', timeLimit: 30, category: 'Other' })

  const categories = ['Social', 'Entertainment', 'Games', 'News', 'Shopping', 'Other']
  const commonIcons = ['📱', '📺', '🎮', '📰', '🛒', '💬', '📸', '🎵', '📚', '🌐']

  const addApp = () => {
    if (!newApp.name.trim()) return

    const app: App = {
      id: Date.now().toString(),
      name: newApp.name,
      icon: newApp.icon,
      timeLimit: newApp.timeLimit,
      timeUsed: 0,
      isBlocked: false,
      category: newApp.category
    }

    updateSessionData({
      apps: [...sessionData.apps, app]
    })

    setNewApp({ name: '', icon: '📱', timeLimit: 30, category: 'Other' })
    setShowAddApp(false)
  }

  const removeApp = (id: string) => {
    updateSessionData({
      apps: sessionData.apps.filter(app => app.id !== id)
    })
  }

  const toggleBlock = (id: string) => {
    updateSessionData({
      apps: sessionData.apps.map(app =>
        app.id === id ? { ...app, isBlocked: !app.isBlocked } : app
      )
    })
  }

  const updateTimeLimit = (id: string, timeLimit: number) => {
    updateSessionData({
      apps: sessionData.apps.map(app =>
        app.id === id ? { ...app, timeLimit } : app
      )
    })
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getStatusColor = (app: App) => {
    if (app.isBlocked) return 'text-red-500'
    if (app.timeUsed >= app.timeLimit) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getStatusText = (app: App) => {
    if (app.isBlocked) return 'Blocked'
    if (app.timeUsed >= app.timeLimit) return 'Limit Reached'
    return 'Active'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">App Blocker 🛡️</h2>
        <p className="text-gray-600 text-lg">Manage your digital distractions with smart blocking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Apps</p>
              <p className="text-2xl font-bold text-gray-900">{sessionData.apps.length}</p>
            </div>
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Currently Blocked</p>
              <p className="text-2xl font-bold text-red-500">
                {sessionData.apps.filter(app => app.isBlocked).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blocked Attempts</p>
              <p className="text-2xl font-bold text-primary-500">{sessionData.blockedAttempts}</p>
            </div>
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Add App Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Managed Apps</h3>
        <button
          onClick={() => setShowAddApp(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add App</span>
        </button>
      </div>

      {/* Add App Modal */}
      {showAddApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New App</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter app name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {commonIcons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewApp({ ...newApp, icon })}
                      className={`p-2 text-2xl rounded-lg border-2 transition-all ${
                        newApp.icon === icon 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newApp.category}
                  onChange={(e) => setNewApp({ ...newApp, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={newApp.timeLimit}
                  onChange={(e) => setNewApp({ ...newApp, timeLimit: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                  max="1440"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddApp(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addApp}
                className="flex-1 btn-primary"
              >
                Add App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apps List */}
      <div className="space-y-4">
        {sessionData.apps.length === 0 ? (
          <div className="card text-center py-12">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No apps added yet</h3>
            <p className="text-gray-500 mb-4">Start by adding apps you want to manage</p>
            <button
              onClick={() => setShowAddApp(true)}
              className="btn-primary"
            >
              Add Your First App
            </button>
          </div>
        ) : (
          sessionData.apps.map((app) => (
            <div key={app.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{app.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.category}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Used: {formatTime(app.timeUsed)} / {formatTime(app.timeLimit)}
                      </span>
                      <span className={`text-sm font-medium ${getStatusColor(app)}`}>
                        {getStatusText(app)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={app.timeLimit}
                      onChange={(e) => updateTimeLimit(app.id, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      min="1"
                      max="1440"
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>

                  <button
                    onClick={() => toggleBlock(app.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      app.isBlocked
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {app.isBlocked ? 'Unblock' : 'Block'}
                  </button>

                  <button
                    onClick={() => removeApp(app.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      app.timeUsed >= app.timeLimit 
                        ? 'bg-red-500' 
                        : app.timeUsed >= app.timeLimit * 0.8 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((app.timeUsed / app.timeLimit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AppBlocker