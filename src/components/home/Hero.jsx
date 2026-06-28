"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Magnifier } from "@gravity-ui/icons";

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [sort, setSort] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    
    if (location.trim()) params.append("location", location);
    if (propertyType) params.append("propertyType", propertyType);
    if (sort) params.append("sort", sort);

    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-background py-20 lg:py-28">
      <motion.div className="mx-auto max-w-[1280px] px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100 mb-6">
          Your Trusted Rental Partner
        </span>
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover a Place You&apos;ll Love to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Nestora</span>
        </h1>
        <p className="mx-auto my-6 max-w-2xl text-base text-default-500 sm:text-lg">
          Browse verified listings with transparent pricing. Experience an elite level of booking comfort with automated rental workflows.
        </p>

        <div className="max-w-7xl mx-auto mb-10 p-6 bg-white rounded-3xl shadow-sm border border-zinc-100 flex flex-wrap gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Search by Location..."
            className="p-3 border border-zinc-200 rounded-xl flex-1 min-w-[200px]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select className="p-3 border border-zinc-200 rounded-xl min-w-[150px]" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
          </select>

          <select className="p-3 border border-zinc-200 rounded-xl min-w-[150px]" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By Price</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <Button
            onClick={handleSearch}
            className="bg-blue-600 text-white p-3 px-6 rounded-xl font-bold hover:bg-blue-700 transition"
            startContent={<Magnifier size={18} />}
          >
            Search
          </Button>
        </div>
      </motion.div>
    </section>
  );
}