import { getBlogs } from "@/app/services/blogs"
import Bloglist from "@/app/ui/blog-list"
import BlogSearch from "@/app/ui/blog-search"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {

  const { query } = await searchParams
  const blogs = await getBlogs(query)

  return ( 
  <div>
    <h2>Blogs</h2>
     <div>
   <BlogSearch searchQuery={query || ""}/>
    <Bloglist blogs={blogs} />
  </div>
  </div>
  )
}

export default Blogs