export interface Credential {
    username: string
    password: string
}

// In-memory credential store (mock for a real backend)
const credentials: Credential[] = [
    { username: 'testuser', password: 'testpass' },
]

export function addCredential(cred: Credential) {
    credentials.push(cred)
}

export function validateCredential(username: string, password: string): boolean {
    return credentials.some(
        (c) => c.username === username && c.password === password
    )
}

export function resetCredentials() {
    credentials.length = 0
    credentials.push({ username: 'testuser', password: 'testpass' })
}
