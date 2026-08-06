"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
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
  };
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values.username}
            />

          </label>
          {state.errors.username && (
              <p style={{ color: "red" }}>{state.errors.username}</p>
            )}
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values.name}
            />
          </label>
           {state.errors.name && (
              <p style={{ color: "red" }}>{state.errors.name}</p>
            )}
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
           {state.errors.password && (
              <p style={{ color: "red" }}>{state.errors.password}</p>
            )} 
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="confirm_password" required />
          </label>
            {state.errors.confirm_password && (
              <p style={{ color: "red" }}>{state.errors.confirm_password}</p>
            )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
