import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addLikeToBlog } from "../../actions/blogs";
import Link from "next/link";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="blog-card">
      <div className="">
        <h2>Title:{blog.title}</h2>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes}</p>
      </div>
      <div className="flex gap-2">
        <Link href={blog.url} target="_blank" rel="noreferrer">
          <button className="btn">Visit Blog</button>
        </Link>
        <form action={addLikeToBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button className="btn" type="submit">
            Like Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;
