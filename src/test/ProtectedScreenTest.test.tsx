import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProtectedScreen from '../components/ProtectedScreen'

describe('ProtectedScreen - Read/Write Role', () => {
  it('renders the protected screen heading', () => {
    render(<ProtectedScreen role="read-write" />)
    expect(screen.getByRole('heading', { name: /protected/i })).toBeInTheDocument()
  })

  it('displays the list of items', () => {
    render(<ProtectedScreen role="read-write" />)
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1) // header + data rows
  })

  it('shows Edit buttons for each item', () => {
    render(<ProtectedScreen role="read-write" />)
    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    expect(editButtons.length).toBeGreaterThan(0)
    editButtons.forEach((btn) => {
      expect(btn).toBeEnabled()
    })
  })

  it('shows Delete buttons for each item', () => {
    render(<ProtectedScreen role="read-write" />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    expect(deleteButtons.length).toBeGreaterThan(0)
    deleteButtons.forEach((btn) => {
      expect(btn).toBeEnabled()
    })
  })

  it('shows an Add button that is enabled', () => {
    render(<ProtectedScreen role="read-write" />)
    const addButton = screen.getByRole('button', { name: /add/i })
    expect(addButton).toBeInTheDocument()
    expect(addButton).toBeEnabled()
  })
})

describe('ProtectedScreen - Read-Only Role', () => {
  it('renders the protected screen heading', () => {
    render(<ProtectedScreen role="read-only" />)
    expect(screen.getByRole('heading', { name: /protected/i })).toBeInTheDocument()
  })

  it('displays the list of items', () => {
    render(<ProtectedScreen role="read-only" />)
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1)
  })

  it('does not show Edit buttons', () => {
    render(<ProtectedScreen role="read-only" />)
    expect(screen.queryAllByRole('button', { name: /edit/i })).toHaveLength(0)
  })

  it('does not show Delete buttons', () => {
    render(<ProtectedScreen role="read-only" />)
    expect(screen.queryAllByRole('button', { name: /delete/i })).toHaveLength(0)
  })

  it('does not show an Add button', () => {
    render(<ProtectedScreen role="read-only" />)
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument()
  })
})
