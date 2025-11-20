import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import DashboardSidebar from "../../(components)/DashboardSidebar";

export default function DonateItemsPage() {
  const [form, setForm] = useState({
    itemName: "",
    condition: "",
    description: "",
    donorName: "",
    donorEmail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Donation:", form);
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">
    <main className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <Card className="max-w-2xl w-full rounded-2xl shadow-lg p-6">
        <CardContent className="space-y-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            Donate an Item
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Fill out the form below to donate items that can help families in need.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium">Item Name</label>
              <Input
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
                placeholder="e.g., Winter Jacket, School Supplies"
                required
              />
            </div>

            <div>
              <label className="font-medium">Condition</label>
              <Input
                name="condition"
                value={form.condition}
                onChange={handleChange}
                placeholder="e.g., New, Gently Used"
                required
              />
            </div>

            <div>
              <label className="font-medium">Description</label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief details about the item"
                required
              />
            </div>

            <div>
              <label className="font-medium">Your Name</label>
              <Input
                name="donorName"
                value={form.donorName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="font-medium">Your Email</label>
              <Input
                type="email"
                name="donorEmail"
                value={form.donorEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-xl p-4 text-lg font-semibold">
              Submit Donation
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
      </div>
    </div>
  );
}
