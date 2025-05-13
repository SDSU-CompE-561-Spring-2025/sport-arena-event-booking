"use client";

import { useEffect, useState } from "react";

type User = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

export default function ViewProfile() {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    fetch("http://localhost:8000/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setUser)
      .catch(err => console.error("Failed to load user", err));
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sdnews.com%2Fwp-content%2Fuploads%2F20240426071905%2Fsdsu-viejas-pic-1-lmc-.jpg')",
      }}
    >
      <div className="max-w-md w-full bg-white/90 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
        <div className="space-y-4">
          <p><strong>First Name:</strong> {user.first_name || "-"}</p>
          <p><strong>Last Name:</strong> {user.last_name || "-"}</p>
          <p><strong>Phone Number:</strong> {user.phone_number || "-"}</p>
        </div>
      </div>
    </div>
  );
}
