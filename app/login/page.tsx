"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-heading">
            Username</label>
            <input type="text" name="username" required />
          
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-heading">
            Password </label>
            <input type="password" name="password" required />
         
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}