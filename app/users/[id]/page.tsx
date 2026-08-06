import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/app/services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserWithBlogs(Number(id))

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            {blog.likes > 0 && <span> ({blog.likes} likes)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage