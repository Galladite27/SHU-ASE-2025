"use client";

import React, { useEffect, useState } from "react";

export default function DonationPage() {

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const res = await fetch("../../../api/getLocationNames");
        if (!res.ok) throw new Error("Failed to fetch donor info");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadMetrics();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [quality, setQuality] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/setDonation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        gender,
        material,
        weight,
        photo,
        quality,
        size,
        category,
        title,
        location,
      }),
      credentials: "include",
    });

    const res2 = await res.json();

    alert(res2?.error || res2?.success);
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const RequiredLabel = ({ children }) => (
    <label className="block font-medium mb-1">
      {children} <span className="text-red-600">*</span>
    </label>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-6">Add a Donation</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <RequiredLabel>Title of Item</RequiredLabel>
            <input
              type="text"
              placeholder="e.g. Levi Jeans"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>

          {/* Description */}
          <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea placeholder="Enter a brief description of your item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-black text-sm sm:text-base"
            rows={4}
            maxLength={256
            } // limitting the description field to 256 characters
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {description.length} / 256 characters
          </p>
        </div>

          {/* Gender Section*/}
          {/* Selecting the gender of their item to help with correct distribution */}
          <div>
            <RequiredLabel>Gender</RequiredLabel>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <RequiredLabel>Size</RequiredLabel>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <RequiredLabel>Category</RequiredLabel>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Dresses">Dresses</option>
              <option value="Sweatshirts">Sweatshirts</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Selecting the gender of their item to help with correct distribution */}
          <div>
            <RequiredLabel>Material</RequiredLabel>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Material</option>
              <option value="Acrylic">Acrylic</option>
              <option value="Cotton">Cotton</option>
              <option value="Denim">Denim</option>
              <option value="Flax linen">Flax linen</option>
              <option value="Leather">Leather</option>
              <option value="Polyester">Polyester</option>
              <option value="Polyurethane">Polyurethane</option>
              <option value="Silk">Silk</option>
              <option value="Viscose">Viscose</option>
              <option value="Wool">Wool</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <RequiredLabel>Quality</RequiredLabel>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Quality</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Weight (optional) */}
          <div>
            <RequiredLabel>Weight (kg) </RequiredLabel>
            <p className="text-gray-600 text-sm sm:text-base">If you do not know enter 0 and we do an average weight of a piece of clothing</p>
            <input
              type="number"
              placeholder="Select weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded px-3 py-2"
              step="0.01"
              required
            />
          </div>

          {/* Location */}
          <div>
            <RequiredLabel>Location</RequiredLabel>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc.Location_ID} value={loc.Name}>{loc.Name}</option>))}
            </select>
          </div>

          {/* Photo */}
          <div>
            <RequiredLabel>Photo</RequiredLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
              required
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="mt-2 h-40 object-contain border rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </main>
  );
}

// make the weight optional but the title and description required