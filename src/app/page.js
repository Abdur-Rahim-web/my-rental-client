// "use client";

// import React, { useState } from "react";
import Hero from "@/components/Home/Hero";
// import FeaturedProperties from "@/components/Home/FeaturedProperties";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import CustomerReviews from "@/components/Home/CustomerReviews";
import ExtraSections from "@/components/Home/ExtraSections";
import FeaturedProperties from "@/components/home/FeaturedProperties";

export default function HomePage() {
  // Global login state to control navigation rules in Featured Properties
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="w-full min-h-screen bg-background">
      <Hero />
      <FeaturedProperties  />
      <WhyChooseUs />
      <CustomerReviews />
      <ExtraSections />
    </main>
  );
}