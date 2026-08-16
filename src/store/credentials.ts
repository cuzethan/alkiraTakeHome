export type Role = 'read-only' | 'read-write'

export interface Credential {
    username: string
    password: string
    role: Role
}

// In-memory credential store (mock for a real backend)
const credentials: Credential[] = [
    { username: 'testuser', password: 'testpass', role: 'read-write' },
    { username: 'viewer', password: 'viewerpass', role: 'read-only' },
]

export function addCredential(cred: Omit<Credential, 'role'>) {
    credentials.push({ ...cred, role: 'read-only' })
}

export function validateCredential(username: string, password: string): boolean {
    return credentials.some(
        (c) => c.username === username && c.password === password
    )
}

export function getRoleForUser(username: string): Role | null {
    const cred = credentials.find((c) => c.username === username)
    return cred ? cred.role : null
}

export function resetCredentials() {
    credentials.length = 0
    credentials.push(
        { username: 'testuser', password: 'testpass', role: 'read-write' },
        { username: 'viewer', password: 'viewerpass', role: 'read-only' },
    )
}
