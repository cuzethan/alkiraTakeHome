import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoginField from '../components/LoginField'

describe('Login Page', () => {
  it('renders a login form', () => {
    render(<LoginField />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })
})
