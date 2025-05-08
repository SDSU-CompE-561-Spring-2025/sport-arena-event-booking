"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";


const API_BASE_URL = "http://localhost:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User>({ id: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
  
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!user.first_name && !user.last_name && !user.phone_number) {
      toast.error("Please enter at least one field to update.");
      return;
    }
    
    if (user.first_name && !nameRegex.test(user.first_name)) {
      toast.error("First name must contain only letters.");
      return;
    }
  
    if (user.last_name && !nameRegex.test(user.last_name)) {
      toast.error("Last name must contain only letters.");
      return;
    }
  
    if (user.phone_number && !phoneRegex.test(user.phone_number)) {
      toast.error("Phone number must be in XXX-XXX-XXXX format.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/user/update/me`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Profile updated successfully!");
      router.push("/home-page");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Could not update profile.");
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sdnews.com%2Fwp-content%2Fuploads%2F20240426071905%2Fsdsu-viejas-pic-1-lmc-.jpg&f=1&nofb=1&ipt=7b3c44e32b7d024dd732881ac330babca75c24b6f38de77dffaabee88005c53c')",
      }}
    >
        <Card className="w-full max-w-md rounded-xl bg-white/90 shadow-md p-6 space-y-4">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <div className="mb-4">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={user.first_name || ""}
                onChange={handleChange}
                className="bg-white"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={user.last_name || ""}
                onChange={handleChange}
                className="bg-white"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={user.phone_number || ""}
                onChange={handleChange}
                className="bg-white"
              />
            </div>

            <Button onClick={handleSave} className="bg-blue-950 text-white hover:bg-blue-800">
              Save Profile
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}