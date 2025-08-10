import React from 'react'
import { Clock, Shield, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { SessionData } from '../App'

interface DashboardProps {
  sessionData: SessionData
  updateSessionData: (data: Partial<SessionData>) => void
}

const Dashboard: React.FC<DashboardProps> = ({ sessionData }) => {
  const { totalScreenTime, focusTime, distractionTime, blockedAttempts, apps } = sessionData

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getProgressColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100
    if (percentage >= 100) return 'text-red-500'
    if (percentage >= 80) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getProgressWidth = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 🧠</h2>
        <p className="text-gray-600 text-lg">Here's your digital wellness overview for today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Screen Time</p>
              <p className="text-2xl font-bold text-gray-900">{formatTime(totalScreenTime)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Focus Time</p>
              <p className="text-2xl font-bold text-green-600">{formatTime(focusTime)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Distraction Time</p>
              <p className="text-2xl font-bold text-red-600">{formatTime(distractionTime)}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blocked Attempts</p>
              <p className="text-2xl font-bold text-primary-600">{blockedAttempts}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Today's Progress</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getProgressColor(app.timeUsed, app.timeLimit)}`}>
                    {formatTime(app.timeUsed)} / {formatTime(app.timeLimit)}
                  </p>
                  {app.isBlocked && (
                    <div className="flex items-center text-red-500 text-sm">
                      <Shield className="w-3 h-3 mr-1" />
                      Blocked
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    app.timeUsed >= app.timeLimit 
                      ? 'bg-red-500' 
                      : app.timeUsed >= app.timeLimit * 0.8 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${getProgressWidth(app.timeUsed, app.timeLimit)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <p className="font-medium text-gray-900">Block Distracting Apps</p>
              <p className="text-sm text-gray-500 mt-1">Set up app blocking rules</p>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Set Focus Goals</p>
              <p className="text-sm text-gray-500 mt-1">Define your daily targets</p>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Track Time</p>
              <p className="text-sm text-gray-500 mt-1">Monitor your usage patterns</p>
            </div>
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Today's Achievements</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-900">Stayed under limit for News Apps</p>
              <p className="text-sm text-green-700">Great job maintaining healthy news consumption!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-900">2 hours of focused work time</p>
              <p className="text-sm text-blue-700">You're building great focus habits!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard