import { useState } from 'react'
import { type Role } from '../store/credentials'

interface Props {
  role: Role
}

interface Item {
  id: number
  name: string
  description: string
}

const initialItems: Item[] = [
  { id: 1, name: 'Project Alpha', description: 'Initial release planning' },
  { id: 2, name: 'Project Beta', description: 'Feature development' },
  { id: 3, name: 'Project Gamma', description: 'QA and testing phase' },
]

export default function ProtectedScreen({ role }: Props) {
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleAdd = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
    setItems([...items, { id: newId, name: `New Item`, description: 'Added by user' }])
  }

  const handleEdit = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, name: `${item.name} (edited)` } : item
      )
    )
  }

  return (
    <div>
      <h1>Protected</h1>
      <p>You have successfully authenticated.</p>
      <p>
        Role: <strong>{role}</strong>
      </p>

      {role === 'read-write' && (
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            {role === 'read-write' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              {role === 'read-write' && (
                <td>
                  <button type="button" onClick={() => handleEdit(item.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
