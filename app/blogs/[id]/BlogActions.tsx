"use client";

import { useNotification } from "../../components/NotificationContext";
import { addLikeToBlog } from "../../actions/blogs";
import {
  addReadingListItem,
  removeReadingListItem,
} from "../../actions/reading-list";
import Link from "next/link";

const BlogActions = ({
  blog,
  isInReadingList,
}: {
  blog: { id: number; url: string };
  isInReadingList: boolean;
}) => {

    const { showNotification } = useNotification();

  const handleAdd = async (formData: FormData) => {
    const result = await addReadingListItem(formData);
    if (result?.error) {
      showNotification(`Error: ${result.error}`, "error");
    } else {
      showNotification("Blog added to reading list");
    }
  };

  const handleRemove = async (formData: FormData) => {
    const result = await removeReadingListItem(formData);
    if (result?.error) {
      showNotification(`Error: ${result.error}`, "error");
    } else {
      showNotification("Blog removed from reading list");
    }
  };

  const handleLike = async (formData: FormData) => {
    const result = await addLikeToBlog(formData);
    if (result?.error) {
      showNotification(`Error: ${result.error}`, "error");
    } else {
        showNotification("Blog liked");
    }
};


  return (
    <div className="flex gap-2">
      <Link href={blog.url} target="_blank" rel="noreferrer">
        <button className="btn" type="button">
          Visit Blog
        </button>
      </Link>
      <form action={handleLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button className="btn" type="submit">
          Like Blog
        </button>
      </form>

      {isInReadingList ? (
        <form action={handleRemove}>
          <input type="hidden" name="id" value={blog.id} />
          <button className="btn" type="submit">
            Remove from reading list
          </button>
        </form>
      ) : (
        <form action={handleAdd}>
          <input type="hidden" name="id" value={blog.id} />
          <button className="btn" type="submit">
            Add to reading list
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogActions;
