"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      data-testid="notification"
      className={`p-4 mb-2 rounded text-white ${type === "success" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
    >
      {message}
    </div>
  );
}
