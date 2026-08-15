"use client";

import { useSession } from "next-auth/react";
import { generateApiToken } from "../actions/me";
import { useActionState, useEffect, useRef } from "react";
import { useNotification } from "../components/NotificationContext";
import { markAsRead } from "../actions/reading-list";
import Link from "next/link";

export type ReadingList = {
  blogId: number;
  read: boolean;
  id: number;
  userId: number;
  blog: {
    id: number;
    title: string;
    author: string;
    url: string;
    likes: number;
    userId: number;
  };
};

interface MyProfileProps {
  readingList: ReadingList[];
}

export default function MyProfile({ readingList }: MyProfileProps) {
  const unread = readingList.filter((item) => !item.read);
  const read = readingList.filter((item) => item.read);

  const { data: session, update } = useSession();
  const { showNotification } = useNotification();

  const [state, formAction] = useActionState(generateApiToken, {
    error: undefined,
    success: false,
    apiToken: "",
  });

  const apiToken = session?.user?.apiToken;
  const prevStateRef = useRef(state);

  // Handle Action Notification & Session Sync
  useEffect(() => {
    if (prevStateRef.current !== state) {
      prevStateRef.current = state;

      if (state.success && state.apiToken) {
        showNotification("API token generated successfully", "success");
        update({ apiToken: state.apiToken });
      } else if (state.error) {
        showNotification(state.error, "error");
      }
    }
  }, [state, showNotification, update]);

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  const handleMarkAsRead = async (formData: FormData) => {
    const result = await markAsRead(formData);
    if (result?.error) {
      showNotification(`Error: ${result.error}`, "error");
    } else {
      showNotification("Blog marked as read");
    }
  };

  return (
    <div className="gap-4 flex flex-col">
      <div data-testid="user-profile" className="gap-2 flex flex-col">
        <h1>My Profile</h1>
        <p data-testid="user-name">Name: {session.user?.name}</p>
        <p data-testid="user-username">Username: {session.user?.email}</p>
      </div>
      <div data-testid="reading-list-section" className="gap-4 flex flex-col">
        <div data-testid="unread-section">
          <h2>Reading List</h2>
          <h4 className="text-lg font-semibold mb-2">
            Unread ({unread.length})
          </h4>
          {unread.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {unread.map((item) => (
                <li
                  className="blog-card flex-row justify-between"
                  key={item.blogId}
                >
                  <Link
                    href={`/blogs/${item.blogId}`}
                    className="btn bg-gray-800 hover:bg-gray-600"
                    type="button"
                  >
                    {item.blog.title}
                  </Link>
                  <form action={handleMarkAsRead}>
                    <input type="hidden" name="id" value={item.blogId} />
                    <button data-testid="mark-read-" type="submit" className="btn">
                      Mark as Read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <div data-testid="empty-reading-list">
              <p data-testid="no-unread-blogs">You haven&apos;t added any blogs to your reading list yet.</p>
            </div>
          )}
        </div>
        <div data-testid="read-section">
          <h4 className="text-lg font-semibold mb-2">Read ({read.length})</h4>
          {read.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {read.map((item) => (
                <li
                  className="blog-card flex-row justify-between"
                  key={item.blogId}
                >
                  <Link
                    href={`/blogs/${item.blogId}`}
                    className="btn bg-gray-800 hover:bg-gray-600"
                    type="button"
                  >
                    {item.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p data-testid="no-read-blogs">You haven&apos;t marked any blogs as read yet.</p>
          )}
        </div>
      </div>

      <div data-testid="api-token-section">
        <h2 data-testid="token-display">API Token</h2>
        {apiToken && <p data-testid="api-token">Current token: {apiToken}</p>}
        {!apiToken && <p data-testid="no-token-message">Current token: {"No token generated yet"}</p>}
      </div>
      <form action={formAction}>
        <button data-testid="generate-token-button" className="btn" type="submit">
          Generate new token
        </button>
      </form>
    </div>
  );
}
