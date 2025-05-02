'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const signupStatus = searchParams.get("signup")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
  
    const formData = new URLSearchParams()
    formData.append("username", email)      // or username, if you're using that
    formData.append("password", password)
  
    const res = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
  
    const data = await res.json()
    setLoading(false)
  
    if (res.ok) {
      localStorage.setItem("access_token", data.access_token)
      router.push("/home-page")
    } else {
      const errorDetail = Array.isArray(data.detail)
        ? data.detail.map((e: any) => e.msg).join(", ")
        : data.detail
  
      setMessage(errorDetail)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {signupStatus && (
          <div className={`p-2 text-center rounded font-medium text-white ${signupStatus === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {signupStatus === "success" ? "Signup successful!" : "Signup failed."}
          </div>
        )}

        {message && (
          <div className="p-2 text-center rounded bg-red-600 text-white font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-blue-950 text-white hover:bg-blue-800" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
