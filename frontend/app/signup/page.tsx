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
    <div className="min-h-screen bg-white-100 flex items-center justify-center p-4">
      <div className="rounded-xl w-full max-w-md space-y-4 bg-yellow-100 shadow-xl p-6">
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
            <Input type="password" {...register("password", { required: true })} placeholder="Enter password" className="mt-1 bg-white" />
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
        </form>
      </div>
    </div>
  )
}
