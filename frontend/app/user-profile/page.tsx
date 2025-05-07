"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      alert("Profile updated successfully!");
      router.push("/home-page");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update profile.");
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

          <div className="mb-4">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              value={user.first_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              value={user.last_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={user.phone_number || ""}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSave} className="bg-[#F77F00] text-white hover:bg-[#d56600]">
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}