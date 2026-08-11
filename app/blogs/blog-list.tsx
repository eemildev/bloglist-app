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
      <ul className="flex flex-col gap-2">
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <button className="blog-item">
                {blog.title}
              </button>
            </Link> 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bloglist