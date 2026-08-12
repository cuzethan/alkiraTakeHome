import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import LoginField from '../components/LoginField'

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
