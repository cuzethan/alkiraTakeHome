import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'
import { resetCredentials } from '../store/credentials'

describe('Two-Factor Authentication', () => {
  beforeEach(async () => {
    resetCredentials()
    const user = userEvent.setup()
    render(<App />)

    // Log in with valid credentials to reach the 2FA screen
    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/password/i), 'testpass')
    await user.click(screen.getByRole('button', { name: /log in/i }))
  })

  it('renders the 2FA form', () => {
    expect(screen.getByText(/two-factor authentication/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /verify/i })).toBeInTheDocument()
  })

  describe('Verification code validation', () => {
    it('shows error when code is empty', async () => {
      const user = userEvent.setup()

      await user.click(screen.getByRole('button', { name: /verify/i }))

      expect(screen.getByText(/verification code must be exactly 6 characters long/i)).toBeInTheDocument()
    })

    it('shows error when code is fewer than 6 characters', async () => {
      const user = userEvent.setup()

      await user.type(screen.getByLabelText(/verification code/i), '12345')
      await user.click(screen.getByRole('button', { name: /verify/i }))

      expect(screen.getByText(/verification code must be exactly 6 characters long/i)).toBeInTheDocument()
    })

    it('shows error when code is more than 6 characters', async () => {
      const user = userEvent.setup()

      await user.type(screen.getByLabelText(/verification code/i), '1234567')
      await user.click(screen.getByRole('button', { name: /verify/i }))

      expect(screen.getByText(/verification code must be exactly 6 characters long/i)).toBeInTheDocument()
    })

    it('shows error when code contains non-digit characters', async () => {
      const user = userEvent.setup()

      await user.type(screen.getByLabelText(/verification code/i), '12ab56')
      await user.click(screen.getByRole('button', { name: /verify/i }))

      expect(screen.getByText(/verification code must contain only digits/i)).toBeInTheDocument()
    })
  })

  it('shows invalid verification code message on failed verification', async () => {
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/verification code/i), '000000')
    await user.click(screen.getByRole('button', { name: /verify/i }))

    expect(screen.getByText(/invalid verification code/i)).toBeInTheDocument()
  })

  it('navigates to ProtectedScreen on successful verification', async () => {
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/verification code/i), '123456')
    await user.click(screen.getByRole('button', { name: /verify/i }))

    expect(screen.getByText(/protected/i)).toBeInTheDocument()
    expect(screen.queryByText(/two-factor authentication/i)).not.toBeInTheDocument()
  })
})
