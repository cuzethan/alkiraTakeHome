import { useState, type FormEvent } from 'react'

export default function LoginField() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setError('')

        if (!username.trim() || !password.trim()) {
            setError('Invalid Username/Password')
            return
        }

        // TODO: Replace with real auth check
        setError('Invalid Username/Password')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p role="alert">{error}</p>}
            <button type="submit">Log In</button>
        </form>
    )
}
