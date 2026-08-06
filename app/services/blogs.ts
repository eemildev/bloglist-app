const blogs = [
  {
    id: 1,
    title: "Next.js Blog",
    author: "Vercel",
    url: "https://nextjs.org/blog",
    likes: 24,
  },
  {
    id: 2,
    title: "React Blog",
    author: "Meta",
    url: "https://react.dev/blog",
    likes: 19,
  },
  {
    id: 3,
    title: "Vercel Blog",
    author: "Vercel",
    url: "https://vercel.com/blog",
    likes: 31,
  },
  {
    id: 4,
    title: "GitHub Blog",
    author: "GitHub",
    url: "https://github.blog/",
    likes: 17,
  },
  {
    id: 5,
    title: "Tailwind CSS Blog",
    author: "Tailwind Labs",
    url: "https://tailwindcss.com/blog",
    likes: 12,
  },
]

let nextId = blogs.length + 1

export const getBlogs = () => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes += 1
  } 
}