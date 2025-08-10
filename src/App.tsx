import React, { useState, useEffect } from 'react'
import { Brain, Clock, Shield, BarChart3, Settings, Plus, Trash2, Play, Pause, CheckCircle } from 'lucide-react'
import Dashboard from './components/Dashboard'
import AppBlocker from './components/AppBlocker'
import TimeTracker from './components/TimeTracker'
import Settings from './components/Settings'
import Onboarding from './components/Onboarding'

export interface App {
  id: string
  name: string
  icon: string
  timeLimit: number // in minutes
  timeUsed: number // in minutes
  isBlocked: boolean
  category: string
}

export interface SessionData {
  totalScreenTime: number
  focusTime: number
  distractionTime: number
  blockedAttempts: number
  apps: App[]
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'blocker' | 'tracker' | 'settings'>('dashboard')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [sessionData, setSessionData] = useState<SessionData>({
    totalScreenTime: 0,
    focusTime: 0,
    distractionTime: 0,
    blockedAttempts: 0,
    apps: []
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('brainDetoxOnboarding')
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }

    // Load saved data
    const savedData = localStorage.getItem('brainDetoxData')
    if (savedData) {
      setSessionData(JSON.parse(savedData))
    } else {
      // Initialize with sample data
      const sampleApps: App[] = [
        {
          id: '1',
          name: 'Social Media',
          icon: '📱',
          timeLimit: 30,
          timeUsed: 45,
          isBlocked: true,
          category: 'Social'
        },
        {
          id: '2',
          name: 'YouTube',
          icon: '📺',
          timeLimit: 60,
          timeUsed: 25,
          isBlocked: false,
          category: 'Entertainment'
        },
        {
          id: '3',
          name: 'Gaming',
          icon: '🎮',
          timeLimit: 90,
          timeUsed: 120,
          isBlocked: true,
          category: 'Games'
        },
        {
          id: '4',
          name: 'News Apps',
          icon: '📰',
          timeLimit: 20,
          timeUsed: 15,
          isBlocked: false,
          category: 'News'
        }
      ]
      
      setSessionData({
        totalScreenTime: 205,
        focusTime: 120,
        distractionTime: 85,
        blockedAttempts: 12,
        apps: sampleApps
      })
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever sessionData changes
    localStorage.setItem('brainDetoxData', JSON.stringify(sessionData))
  }, [sessionData])

  const completeOnboarding = () => {
    localStorage.setItem('brainDetoxOnboarding', 'true')
    setShowOnboarding(false)
  }

  const updateSessionData = (newData: Partial<SessionData>) => {
    setSessionData(prev => ({ ...prev, ...newData }))
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8" />
              <h1 className="text-xl font-bold">Brain Detox</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'dashboard' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('blocker')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'blocker' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                App Blocker
              </button>
              <button
                onClick={() => setCurrentView('tracker')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'tracker' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Time Tracker
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentView === 'settings' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around py-2">
          {[
            { key: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { key: 'blocker', icon: Shield, label: 'Blocker' },
            { key: 'tracker', icon: Clock, label: 'Tracker' },
            { key: 'settings', icon: Settings, label: 'Settings' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as any)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                currentView === key 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-500 hover:text-primary-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <div className="animate-fade-in">
          {currentView === 'dashboard' && (
            <Dashboard sessionData={sessionData} updateSessionData={updateSessionData} />
          )}
          {currentView === 'blocker' && (
            <AppBlocker sessionData={sessionData} updateSessionData={updateSessionData} />
          )}
          {currentView === 'tracker' && (
            <TimeTracker sessionData={sessionData} updateSessionData={updateSessionData} />
          )}
          {currentView === 'settings' && (
            <Settings onResetOnboarding={() => setShowOnboarding(true)} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App

export { App }