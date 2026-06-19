"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Star } from "@gravity-ui/icons";

export default function CustomerReviews() {
  const reviews = [
    { id: 1, name: "Ahsan Habib", role: "Tenant", text: "Finding a home through StayEase was incredibly smooth. Highly recommended!", rating: 5 },
    { id: 2, name: "Nusrat Jahan", role: "Software Engineer", text: "The dashboard configuration made managing my monthly rent bookings seamless.", rating: 5 },
    { id: 3, name: "Tanvir Rahman", role: "Student", text: "Verified properties saved me from fake listings. Excellent security features.", rating: 4 },
    { id: 4, name: "Mariyam Begum", role: "Businesswoman", text: "The premium customer service and transparent pricing structure are wonderful.", rating: 5 },
  ];

  return (
    <section className="py-16 mx-auto max-w-[1280px] px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">What Our Tenants Say</h2>
        <p className="mt-4 text-default-500">Authentic operational reviews compiled straight from real active subscribers.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((rev) => (
          <Card key={rev.id} className="border border-default-100 p-5 bg-background shadow-xs" shadow="none">
            <div className="flex gap-1 text-warning-500 mb-3">
              {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm text-default-600 italic flex-1">{rev.text}</p>
            <div className="mt-4 border-t border-default-100 pt-3">
              <h4 className="font-bold text-sm text-default-800">{rev.name}</h4>
              <p className="text-xs text-default-400">{rev.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}