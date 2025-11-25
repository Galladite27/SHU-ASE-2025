"use client";

import { useState } from "react";

export default function DonationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");

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
              placeholder="e.g. Levi Jeans"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Description of item */}
          {/* brief description of item, could limit to a certain number of characters?? */}
          <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea placeholder="Enter a brief description of your item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-black"
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
            <label className="block font-medium mb-1">Gender</label>
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

          {/* Material Section*/}
          {/* Asking the user to provide us with the type of material for their item */}
          <div>
            <label className="block font-medium mb-1">Material</label>
            <input
              type="text"
              placeholder="e.g. Cotton, Polyester etc."
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          {/* allowing the user to enter the weight of their item, needed for calculating the carbon savings */}
          {/* Weight Section */}
          <div>
            <label className="block font-medium mb-1">Weight (kg)</label>
            
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

          <div>
            <label className="block font-medium mb-1">Location</label>
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

          {/* Photo Upload section*/}
          {/* Allowing the user to add a photo alongside their donation
          How will this go into the databse, if it will - ask theo/harris */}
          <div>
            <label className="block font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="mt-2 h-40 object-contain border rounded"
              />
            )}
          </div>
          
          {/* Submitting the form, not connected to the databse */}
          {/* Submit Button */}
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

