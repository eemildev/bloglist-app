import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  if (!users.length) {
    return <p>No users found.</p>
  }

  return (
    <div>
      <h2>Users</h2>
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <button className="blog-item">{user.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users