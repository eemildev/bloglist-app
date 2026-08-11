import { getBlogs } from "@/app/services/blogs";
import Bloglist from "@/app/blogs/blog-list";
import BlogSearch from "@/app/blogs/blog-search";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;
  const blogs = await getBlogs(query);

  return (
    <div className="flex flex-col gap-4">
      <h2>Blogs</h2>
      <BlogSearch searchQuery={query || ""} />
      <Bloglist blogs={blogs} />
    </div>
  );
};

export default Blogs;
