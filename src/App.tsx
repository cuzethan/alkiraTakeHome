import { useState } from 'react'
import './App.css'
import LoginField from './components/LoginField'
import SignUpField from './components/SignUpField'
import TwoFactorAuth from './components/TwoFactorAuth'
import ProtectedScreen from './components/ProtectedScreen'
import { getRoleForUser, type Role } from './store/credentials'

type Screen = 'login' | 'signup' | 'twoFactor' | 'protected'

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [userRole, setUserRole] = useState<Role>('read-only')

  const handleLoginSuccess = (username: string) => {
    const role = getRoleForUser(username)
    setUserRole(role ?? 'read-only')
    setScreen('twoFactor')
  }

  return (
    <div>
      {screen === 'login' && (
        <>
          <LoginField onSuccess={handleLoginSuccess} />
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
      {screen === 'protected' && <ProtectedScreen role={userRole} />}
    </div>
  )
}

export default App
