import React, { useState, useEffect } from 'react'
import { Clock, Play, Pause, RotateCcw, Target, TrendingUp } from 'lucide-react'
import { SessionData } from '../App'

interface TimeTrackerProps {
  sessionData: SessionData
  updateSessionData: (data: Partial<SessionData>) => void
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ sessionData, updateSessionData }) => {
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState(0) // in seconds
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus')
  const [dailyGoal, setDailyGoal] = useState(120) // in minutes

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        setCurrentSession(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking])

  const startTracking = () => {
    setIsTracking(true)
  }

  const pauseTracking = () => {
    setIsTracking(false)
  }

  const stopTracking = () => {
    setIsTracking(false)
    
    // Add session time to total
    const sessionMinutes = Math.floor(currentSession / 60)
    if (sessionType === 'focus') {
      updateSessionData({
        focusTime: sessionData.focusTime + sessionMinutes,
        totalScreenTime: sessionData.totalScreenTime + sessionMinutes
      })
    }
    
    setCurrentSession(0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getProgressPercentage = () => {
    return Math.min((sessionData.focusTime / dailyGoal) * 100, 100)
  }

  const weeklyData = [
    { day: 'Mon', focus: 95, distraction: 45 },
    { day: 'Tue', focus: 120, distraction: 30 },
    { day: 'Wed', focus: 85, distraction: 60 },
    { day: 'Thu', focus: 140, distraction: 25 },
    { day: 'Fri', focus: 110, distraction: 40 },
    { day: 'Sat', focus: 75, distraction: 80 },
    { day: 'Today', focus: sessionData.focusTime, distraction: sessionData.distractionTime },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Time Tracker ⏱️</h2>
        <p className="text-gray-600 text-lg">Track your focus sessions and build better habits</p>
      </div>

      {/* Current Session */}
      <div className="card text-center">
        <div className="mb-6">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setSessionType('focus')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                sessionType === 'focus'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Focus Session
            </button>
            <button
              onClick={() => setSessionType('break')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                sessionType === 'break'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Break Time
            </button>
          </div>
          
          <div className={`text-6xl font-mono font-bold mb-4 ${
            sessionType === 'focus' ? 'text-primary-600' : 'text-green-600'
          }`}>
            {formatTime(currentSession)}
          </div>
          
          <p className="text-gray-600 mb-6">
            {sessionType === 'focus' ? 'Stay focused and productive!' : 'Take a well-deserved break!'}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {!isTracking ? (
            <button
              onClick={startTracking}
              className="btn-primary flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={pauseTracking}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </button>
          )}
          
          <button
            onClick={stopTracking}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Stop</span>
          </button>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Daily Focus Goal</h3>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-500" />
            <input
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              max="1440"
            />
            <span className="text-sm text-gray-500">min</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{formatMinutes(sessionData.focusTime)} completed</span>
            <span>{formatMinutes(dailyGoal)} goal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-lg font-semibold text-primary-600">
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
        </div>

        {getProgressPercentage() >= 100 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium">🎉 Congratulations! You've reached your daily goal!</p>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Weekly Overview</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${day.day === 'Today' ? 'text-primary-600' : 'text-gray-700'}`}>
                  {day.day}
                </span>
                <div className="text-sm text-gray-600">
                  <span className="text-green-600">{formatMinutes(day.focus)}</span>
                  {' / '}
                  <span className="text-red-600">{formatMinutes(day.distraction)}</span>
                </div>
              </div>
              
              <div className="flex space-x-1 h-2">
                <div
                  className="bg-green-500 rounded-full"
                  style={{ width: `${(day.focus / (day.focus + day.distraction)) * 100}%` }}
                />
                <div
                  className="bg-red-500 rounded-full"
                  style={{ width: `${(day.distraction / (day.focus + day.distraction)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-600">Focus Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-gray-600">Distraction Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{formatMinutes(sessionData.totalScreenTime)}</p>
          <p className="text-sm text-gray-600">Total Screen Time</p>
        </div>

        <div className="card text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{formatMinutes(sessionData.focusTime)}</p>
          <p className="text-sm text-gray-600">Focus Time Today</p>
        </div>

        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {sessionData.focusTime > 0 ? Math.round((sessionData.focusTime / sessionData.totalScreenTime) * 100) : 0}%
          </p>
          <p className="text-sm text-gray-600">Focus Ratio</p>
        </div>
      </div>
    </div>
  )
}

export default TimeTracker