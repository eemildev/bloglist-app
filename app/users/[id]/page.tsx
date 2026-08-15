import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserWithBlogs(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <div className="gap-4 flex flex-col">
      <div>
        <h1>{user.name}</h1>
        <p>Username: {user.username}</p>
      </div>
      <div>
        <h2>Blogs</h2>
        <div>
          <ul className="flex flex-col gap-2">
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                  <Link href={`/blogs/${blog.id}`} className="block">
              <button className="blog-item">
                <span className="truncate">{blog.title}</span>
                <span className="ml-2 shrink-0 rounded-md bg-blue-800 px-2 py-1">
                  {blog.likes} likes
                </span>
              </button>
            </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
