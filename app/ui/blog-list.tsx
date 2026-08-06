'use client'

import Link from "next/link"

type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

const Bloglist = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bloglist