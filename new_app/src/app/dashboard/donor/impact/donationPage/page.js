"use client";

import { useState } from "react";

export default function DonationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally call your backend API to submit the donation
    console.log({ title, description, gender, material, weight, photo });
    alert("Donation submitted!");
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add a Donation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Section*/}
          <div>
            <label className="block font-medium mb-1">Title of Item</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </form>
      </div>
    </main>
  );
}
