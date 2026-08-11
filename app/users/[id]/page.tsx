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
    <div >
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="text-lg font-bold">Blogs</h3>
      <div>
      <ul className="flex flex-col gap-2">
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <button className="blog-item">{blog.title}</button>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default UserPage