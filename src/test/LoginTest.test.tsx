import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import LoginField from '../components/LoginField'
import App from '../App'
import { resetCredentials } from '../store/credentials'

describe('Login Page', () => {
  it('renders a login form', () => {
    render(<LoginField />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows error when username is empty', async () => {
    const user = userEvent.setup()
    render(<LoginField />)

    await user.type(screen.getByLabelText(/password/i), 'somepassword')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/invalid username\/password/i)).toBeInTheDocument()
  })

  it('shows error when password is empty', async () => {
    const user = userEvent.setup()
    render(<LoginField />)

    await user.type(screen.getByLabelText(/username/i), 'someuser')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/invalid username\/password/i)).toBeInTheDocument()
  })

  it('shows error when both fields are empty', async () => {
    const user = userEvent.setup()
    render(<LoginField />)

    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/invalid username\/password/i)).toBeInTheDocument()
  })

  it('shows error for invalid credentials', async () => {
    const user = userEvent.setup()
    render(<LoginField />)

    await user.type(screen.getByLabelText(/username/i), 'wronguser')
    await user.type(screen.getByLabelText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/invalid username\/password/i)).toBeInTheDocument()
  })
})

describe('Login Success Flow', () => {
  beforeEach(() => {
    resetCredentials()
  })

  it('navigates to 2FA screen on successful login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/password/i), 'testpass')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByText(/two-factor authentication/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument()
  })

  it('does not navigate to 2FA screen on failed login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/username/i), 'wronguser')
    await user.type(screen.getByLabelText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.queryByText(/two-factor authentication/i)).not.toBeInTheDocument()
    expect(screen.getByText(/invalid username\/password/i)).toBeInTheDocument()
  })
})
