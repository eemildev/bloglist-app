"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const { data: session } = useSession();

  const { showNotification } = useNotification();

  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Logged in successfully");
      router.push("/");
      router.refresh();
    }
  };

  // disabled because tests expect to login twice.
/*   if (session) {
    return <p>You are already logged in. </p>;
  } */

  return (
    <div>
      <h1>Login</h1>
      {error && (
        <p data-testid="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm font-medium text-heading"
          >
            Username
          </label>
          <input id="username" type="text" name="username" required />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-heading"
          >
            Password
          </label>
          <input id="password" type="password" name="password" required />
        </div>
        <button data-testid="login-button" className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
