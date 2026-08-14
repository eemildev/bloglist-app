"use client";

import { createBlog } from "../../actions/blogs";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useNotification } from "../../components/NotificationContext";

const NewBlog = () => {
  const initialState = {
    errors: { title: undefined, author: undefined, url: undefined },
    values: { title: "", author: "", url: "" },
    success: false,
  };

  const [state, formAction] = useActionState(createBlog, initialState);

  const { showNotification } = useNotification();

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);
  return (
    <div>
      <h1>Create a new blog</h1>
      <form  className="space-y-4" action={formAction}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-heading">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={state.values?.title}
          />

          {state.errors.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="author" className="text-sm font-medium text-heading">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            required
            defaultValue={state.values?.author}
          />

          {state.errors.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="url" className="text-sm font-medium text-heading">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            required
            defaultValue={state.values?.url}
          />

          {state.errors.url && (
            <p style={{ color: "red" }}>{state.errors.url}</p>
          )}
        </div>
        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
