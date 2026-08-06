"use client";

import { createBlog } from "../../actions/blogs";

import { useActionState } from "react";
const NewBlog = () => {
  const initialState = {
    errors: { title: undefined, author: undefined, url: undefined },
    values: { title: "", author: "", url: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              name="URL"
              required
              defaultValue={state.values?.url}
            />
          </label>
          {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
