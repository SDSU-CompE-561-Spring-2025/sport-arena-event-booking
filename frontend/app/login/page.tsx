"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data", data);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold text-center bg-blue-950 text-white py-3 rounded-md mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="text-sm font-semibold">Username</Label>
            <Input
              type="text"
              {...register("username")}
              placeholder="Enter username"
              className="mt-1 bg-white"
            />
          </div>
          <div>
            <Label className="text-sm font-semibold">Password</Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="mt-1 bg-white"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 rounded-md"
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
}
