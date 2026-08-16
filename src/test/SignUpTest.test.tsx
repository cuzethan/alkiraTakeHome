import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import SignUpField from '../components/SignUpField'
import App from '../App'
import { resetCredentials } from '../store/credentials'

describe('Sign Up Page', () => {
  it('renders a sign up form', () => {
    render(<SignUpField />)
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  describe('Username validation', () => {
    it('shows error when username is less than 8 characters', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'short')
      await user.type(screen.getByLabelText(/password/i), 'Valid1a@x')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/username must be at least 8 characters long/i)).toBeInTheDocument()
    })

    it('shows error when username contains whitespace', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'has space here')
      await user.type(screen.getByLabelText(/password/i), 'Valid1a@x')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/username must not contain whitespace/i)).toBeInTheDocument()
    })
  })

  describe('Password validation', () => {
    it('shows error when password is less than 8 characters', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'Ab1@xx')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument()
    })

    it('shows error when password contains whitespace', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'Ab1@ xxxx')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must not contain whitespace/i)).toBeInTheDocument()
    })

    it('shows error when password has no uppercase letter', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'abcdefg1@')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must contain at least 1 uppercase letter/i)).toBeInTheDocument()
    })

    it('shows error when password has no lowercase letter', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'ABCDEFG1@')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must contain at least 1 lowercase letter/i)).toBeInTheDocument()
    })

    it('shows error when password has no number', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'Abcdefg@!')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must contain at least 1 number/i)).toBeInTheDocument()
    })

    it('shows error when password has no symbol', async () => {
      const user = userEvent.setup()
      render(<SignUpField />)

      await user.type(screen.getByLabelText(/username/i), 'validuser')
      await user.type(screen.getByLabelText(/password/i), 'Abcdefg1x')
      await user.click(screen.getByRole('button', { name: /sign up/i }))

      expect(screen.getByText(/password must contain at least 1 symbol/i)).toBeInTheDocument()
    })
  })

  it('shows no error when all fields are valid', async () => {
    const user = userEvent.setup()
    render(<SignUpField />)

    await user.type(screen.getByLabelText(/username/i), 'validuser')
    await user.type(screen.getByLabelText(/password/i), 'Valid1a@x')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('Sign Up Success Flow', () => {
  beforeEach(() => {
    resetCredentials()
  })

  it('navigates to login screen on successful sign up', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Navigate to sign up page
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    await user.type(screen.getByLabelText(/username/i), 'validuser')
    await user.type(screen.getByLabelText(/password/i), 'Valid1a@x')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    // Should redirect to login screen
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    expect(screen.queryByText(/two-factor authentication/i)).not.toBeInTheDocument()
  })

  it('does not navigate to 2FA screen on failed sign up', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Navigate to sign up page
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    await user.type(screen.getByLabelText(/username/i), 'short')
    await user.type(screen.getByLabelText(/password/i), 'Valid1a@x')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.queryByText(/two-factor authentication/i)).not.toBeInTheDocument()
    expect(screen.getByText(/username must be at least 8 characters long/i)).toBeInTheDocument()
  })

  it('adds credentials to store so login works after sign up', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Navigate to sign up page
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    // Sign up with new credentials
    await user.type(screen.getByLabelText(/username/i), 'newuser1')
    await user.type(screen.getByLabelText(/password/i), 'NewPass1@')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    // Should redirect to login screen
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()

    // Now log in with the credentials we just created
    await user.type(screen.getByLabelText(/username/i), 'newuser1')
    await user.type(screen.getByLabelText(/password/i), 'NewPass1@')
    await user.click(screen.getByRole('button', { name: /log in/i }))

    // Should navigate to 2FA screen
    expect(screen.getByText(/two-factor authentication/i)).toBeInTheDocument()
  })
})
