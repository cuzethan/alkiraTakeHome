import { useState, type FormEvent } from 'react'
import { addCredential } from '../store/credentials'

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

interface SignUpFieldProps {
    onSuccess?: () => void
}

export default function SignUpField({ onSuccess }: SignUpFieldProps) {
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

        // Validation passed — register the new credentials
        addCredential({ username, password })
        onSuccess?.()
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
                <p>Username requirements:</p>
                <ul>
                    <li>At least 8 characters</li>
                    <li>No whitespace</li>
                </ul>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>Password requirements:</p>
                <ul>
                    <li>At least 8 characters</li>
                    <li>No whitespace</li>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                    <li>At least 1 symbol</li>
                </ul>
            </div>
            {error && <p role="alert">{error}</p>}
            <button type="submit">Sign Up</button>
        </form>
    )
}
