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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-300 to-background py-20 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-[1280px] px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100 mb-6"
        >
          Your Trusted Rental Partner
        </motion.span>

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover a Place You&apos;ll Love to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Nestora</span>
        </h1>

        <p className="mx-auto mb-20 mt-10 max-w-2xl text-base text-default-500 sm:text-lg">
          Browse verified listings with transparent pricing. Experience an elite level of booking comfort with automated rental workflows.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-40 p-2  bg-white rounded-2xl shadow-sm border border-zinc-200 flex flex-wrap gap-2 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search by Location..."
            className="p-2.5 px-4 border border-transparent focus:border-zinc-200 outline-none rounded-xl flex-1 min-w-[200px] text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select className="p-2.5 px-3 border border-transparent focus:border-zinc-200 outline-none rounded-xl min-w-[120px] text-sm text-default-600" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Studio">Studio</option>
          </select>

          <select className="p-2.5 px-3 border border-transparent focus:border-zinc-200 outline-none rounded-xl min-w-[120px] text-sm text-default-600" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By Price</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <Button
            onClick={handleSearch}
            className="bg-blue-600 text-white p-2.5 px-6 rounded-xl font-bold hover:bg-blue-700 transition duration-300 text-sm"
            startContent={<Magnifier size={16} />}
          >
            Search
          </Button>
        </motion.div>
        <hr className="border-2 text-gray-500" />
      </motion.div>
    </section>
  );
}