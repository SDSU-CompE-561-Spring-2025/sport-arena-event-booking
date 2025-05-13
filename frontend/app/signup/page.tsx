'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type SignupFormData = {
  user_role: number
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  confirmPassword: string
  phone_number: string
}

export default function SignupPage() {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupFormData>()
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ status: 'success' | 'error'; message: string } | null>(null)

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" })
      return
    }

    const payload = {
      user_role: 1,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number,
    }

    setLoading(true)
    setFeedback(null)

    const res = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    setLoading(false)

    if (res.ok) {
      setFeedback({ status: 'success', message: 'Signup successful! Redirecting to login...' })
      setTimeout(() => router.push("/login?signup=success"), 1500)
    } else {
      setFeedback({ status: 'error', message: result.detail || 'Signup failed. Please try again.' })
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sdnews.com%2Fwp-content%2Fuploads%2F20240426071905%2Fsdsu-viejas-pic-1-lmc-.jpg&f=1&nofb=1&ipt=7b3c44e32b7d024dd732881ac330babca75c24b6f38de77dffaabee88005c53c')",
      }}
    >
      <div className="rounded-xl w-full max-w-md space-y-4 bg-white/90 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center bg-blue-950 text-white py-2 rounded-md">SIGNUP</h2>

        {feedback && (
          <div className={`p-2 text-center rounded font-medium transition-all duration-300 text-white ${feedback.status === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label>Username</Label>
            <Input {...register("username", { required: true })} placeholder="Enter username" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>First Name</Label>
            <Input {...register("first_name", { required: true })} placeholder="Enter first name" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input {...register("last_name", { required: true })} placeholder="Enter last name" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email", { required: true })} placeholder="Enter email" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" {...register("phone_number", { required: true })} placeholder="Enter phone number" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Password</Label>
            <Input 
              type="password" 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                }
              })} 
              placeholder="Enter password" 
              className="mt-1 bg-white" 
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Re-enter password"
              className="mt-1 bg-white"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-blue-950 text-white hover:bg-blue-800" disabled={loading}>
            {loading ? 'Registering...' : 'SIGNUP'}
          </Button>
          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-700 font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
