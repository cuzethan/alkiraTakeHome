import { useState, type FormEvent } from 'react'

function validateUsername(username: string): string | null {
    if (username.length < 8) return 'Username must be at least 8 characters long'
    if (/\s/.test(username)) return 'Username must not contain whitespace'
    return null
}

function validatePassword(password: string): string | null {
    if (password.length < 8) return 'Password must be at least 8 characters long'
    if (/\s/.test(password)) return 'Password must not contain whitespace'
    if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter'
    if (!/[a-z]/.test(password)) return 'Password must contain at least 1 lowercase letter'
    if (!/\d/.test(password)) return 'Password must contain at least 1 number'
    if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least 1 symbol'
    return null
}

export default function SignUpField() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setError('')

        const usernameError = validateUsername(username)
        if (usernameError) {
            setError(usernameError)
            return
        }

        const passwordError = validatePassword(password)
        if (passwordError) {
            setError(passwordError)
            return
        }

        // TODO: Replace with real sign-up logic
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
            <button type="submit">Sign Up</button>
        </form>
    )
}
