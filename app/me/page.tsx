"use client";

import { useSession } from "next-auth/react";
import { generateApiToken } from "../actions/me";
import { useActionState, useEffect, useRef } from "react";
import { useNotification } from "../components/NotificationContext";

export default function MyProfile() {
  const { data: session, update } = useSession();
  const [state, formAction] = useActionState(generateApiToken, {
    error: undefined,
    success: false,
    apiToken: "",
  });

  const { showNotification } = useNotification();
  const apiToken = session?.user?.apiToken;
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (prevStateRef.current !== state) {
      prevStateRef.current = state;

      if (state.success && state.apiToken) {
        showNotification("API token generated successfully", "success");
        // Pass the updated data to NextAuth update()
        update({ apiToken: state.apiToken });
      } else if (state.error) {
        showNotification(state.error, "error");
      }
    }
  }, [state, showNotification, update]);

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="gap-4 flex flex-col">
      <div>
        <h2>My Profile</h2>
        <p>Name: {session.user?.name}</p>
        <p>Username: {session.user?.email}</p>
      </div>
      <div>
        <h2>API Token</h2>
        <p>Current token: {apiToken ?? "No token generated yet"}</p>
      </div>

      <form action={formAction}>
        <button className="btn" type="submit">
          Generate new token
        </button>
      </form>
    </div>
  );
}
