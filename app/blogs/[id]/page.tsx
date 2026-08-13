import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { getUserWithReadingList } from "../../services/users";
import { auth } from "@/auth";
import BlogActions from "./BlogActions";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    notFound();
  }
  
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const session = await auth();

  const userId = session ? session.user.id : null;
  const user = userId ? await getUserWithReadingList(Number(userId)) : null;
  const isInReadingList = user
    ? user.readingList.some(
        (item: { blogId: number }) => item.blogId === blog.id,
      )
    : false;

  return (
    <div className="blog-card">
      <div className="">
        <h2>Title:{blog.title}</h2>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes}</p>
      </div>
<BlogActions blog={blog} isInReadingList={isInReadingList} />
    </div>
  );
};

export default BlogPage;
