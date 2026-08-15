import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const Bloglist = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div data-testid="blogs-list">
      <ul className="flex flex-col gap-2">
        {blogs.map((blog) => (
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
  );
};

export default Bloglist;
