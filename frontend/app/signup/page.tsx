"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

type SignupFormData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
      <div className="rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center bg-blue-950 text-white py-2 rounded-md">SIGNUP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label>Username</Label>
            <Input {...register("username")} placeholder="Enter username" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="Enter email" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="tel" {...register("phone")} placeholder="Enter phone number" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" {...register("password")} placeholder="Enter password" className="mt-1 bg-white" />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" {...register("confirmPassword")} placeholder="Re-enter password" className="mt-1 bg-white" />
          </div>
          <Button type="submit" className="w-full bg-blue-950 text-white hover:bg-blue-800">SIGNUP</Button>
        </form>
      </div>
    </div>
  );
}
