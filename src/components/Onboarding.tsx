import React, { useState } from 'react'
import { Brain, Shield, Clock, BarChart3, ChevronRight, ChevronLeft } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: Brain,
      title: 'Welcome to Brain Detox',
      description: 'Take control of your digital habits and reduce mindless scrolling. Set limits, block distractions, and focus on what matters most.',
      color: 'text-primary-500',
      bgColor: 'bg-primary-100'
    },
    {
      icon: Shield,
      title: 'Smart App Blocking',
      description: 'Block distracting apps when you reach your daily limits. Our intelligent system helps you stay focused and productive.',
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Monitor your screen time and track focus sessions. Build awareness of your digital habits with detailed insights.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'View your daily and weekly progress. Celebrate achievements and identify areas for improvement in your digital wellness journey.',
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glass-effect rounded-3xl p-8 text-center">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className={`w-20 h-20 ${currentStepData.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <IconComponent className={`w-10 h-10 ${currentStepData.color}`} />
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentStepData.title}
          </h2>
          
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === 0
                  ? 'text-white/50 cursor-not-allowed'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <span className="text-white/70 text-sm">
              {currentStep + 1} of {steps.length}
            </span>

            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center mt-6">
          <button
            onClick={onComplete}
            className="text-white/80 hover:text-white text-sm underline transition-colors"
          >
            Skip onboarding
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding