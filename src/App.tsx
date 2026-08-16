import { useState } from 'react'
import './App.css'
import LoginField from './components/LoginField'
import SignUpField from './components/SignUpField'
import TwoFactorAuth from './components/TwoFactorAuth'
import ProtectedScreen from './components/ProtectedScreen'

type Screen = 'login' | 'signup' | 'twoFactor' | 'protected'

function App() {
  const [screen, setScreen] = useState<Screen>('login')

  return (
    <div>
      {screen === 'login' && (
        <>
          <LoginField onSuccess={() => setScreen('twoFactor')} />
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={() => setScreen('signup')}>
              Sign Up
            </button>
          </p>
        </>
      )}
      {screen === 'signup' && (
        <>
          <SignUpField onSuccess={() => setScreen('login')} />
          <p>
            Already have an account?{' '}
            <button type="button" onClick={() => setScreen('login')}>
              Log In
            </button>
          </p>
        </>
      )}
      {screen === 'twoFactor' && (
        <TwoFactorAuth onSuccess={() => setScreen('protected')} />
      )}
      {screen === 'protected' && <ProtectedScreen />}
    </div>
  )
}

export default App
