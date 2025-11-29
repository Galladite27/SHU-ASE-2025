"use client";

import { useState } from "react";
import { setDonations } from "@/lib/setDonation";

export default function DonationPage() {
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

    const res = await setDonations({
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
    });

    alert(res?.error || res?.success);
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
            } // limitting the description field to 258 characters
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
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

          {/* Material */}
          <div>
            <RequiredLabel>Material</RequiredLabel>
            <input
              type="text"
              placeholder="e.g. Cotton, Polyester etc."
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
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
            <label className="block font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              placeholder="Select weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded px-3 py-2"
              step="0.01"
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
              <option value="Sheffield">Sheffield</option>
              <option value="Manchester">Manchester</option>
              <option value="Leeds">Leeds</option>
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
