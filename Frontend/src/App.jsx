import { useState } from 'react'
import Register from './components/Auth/Register'
import SignIn from './components/Auth/SignIn'
import './App.css'

function App() {
  const [currentTab, setCurrentTab] = useState('Register')

  return (
    <div className='APP'>
      <h1>Battle Log</h1>

      <div className='tabs'>
        <button
          className={currentTab === 'Register' ? 'Active' : ''}
          onClick={() => setCurrentTab('Register')}
        >
          Register
        </button>

        <button
          className={currentTab === 'SignIn' ? 'Active' : ''}
          onClick={() => setCurrentTab('SignIn')}
        >
          Sign In
        </button>
      </div>

      {currentTab === 'Register' && <Register />}
      {currentTab === 'SignIn' && <SignIn />}
    </div>
  )
}

export default App
