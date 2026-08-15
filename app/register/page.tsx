"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "../actions/users";
import { useNotification } from "../components/NotificationContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterPage() {

  const { data: session } = useSession()
  
  const initialState = {
    errors: {
      username: undefined,
      name: undefined,
      password: undefined,
      confirm_password: undefined,
    },
    values: {
      username: "",
      name: "",
    },
    success: false,
  };
  const [state, formAction] = useActionState(registerUser, initialState);
  const router = useRouter();
  const { showNotification } = useNotification();

    useEffect(() => {
      if (state.success) {
        showNotification("Account created successfully");
        router.push("/login");
      }
    }, [state, showNotification, router]);

    if (session) {
      return <p>You are already logged in. </p>
    }

  return (
    <div>
      <h2>Register</h2>
      <form className="space-y-4" action={formAction}>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm font-medium text-heading"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            defaultValue={state.values.username}
          />

          {state.errors.username && (
            <p data-testid="username-error" style={{ color: "red" }}>
              {state.errors.username}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-heading">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={state.values.name}
          />

          {state.errors.name && (
            <p data-testid="name-error" style={{ color: "red" }}>
              {state.errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-heading"
          >
            Password
          </label>
          <input id="password" type="password" name="password" required />

          {state.errors.password && (
            <p data-testid="password-error" style={{ color: "red" }}>
              {state.errors.password}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirm_password"
            className="text-sm font-medium text-heading"
          >
            Confirm Password
          </label>
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            required
          />

          {state.errors.confirm_password && (
            <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
              {state.errors.confirm_password}
            </p>
          )}
        </div>
        <button data-testid="register-button" className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
