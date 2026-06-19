"use client";

import React from "react";
import { Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { Magnifier, Pin, Calendar, FileDollar } from "@gravity-ui/icons";

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-background py-20 lg:py-28">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mx-auto max-w-[1280px] px-6 text-center"
      >
        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100 mb-6">
          Your Trusted Rental Partner
        </span>
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover a Place You&apos;ll Love to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">StayEase</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-default-500 sm:text-lg">
          Browse verified listings with transparent pricing. Experience an elite level of booking comfort with automated rental workflows.
        </p>

        {/* Search Bar Component */}
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-default-200 bg-background p-4 shadow-xl shadow-default-100">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center">
            <div className="flex items-center gap-2 px-2 border-b sm:border-b-0 sm:border-r border-default-200 py-2">
              <Pin className="text-default-400 w-5 h-5 flex-shrink-0" />
              <Input type="text" placeholder="Location" variant="flat" className="w-full" size="sm" />
            </div>
            <div className="flex items-center gap-2 px-2 border-b lg:border-b-0 lg:border-r border-default-200 py-2">
              <Calendar className="text-default-400 w-5 h-5 flex-shrink-0" />
              <Input type="text" placeholder="Property Type" variant="flat" className="w-full" size="sm" />
            </div>
            <div className="flex items-center gap-2 px-2 border-b sm:border-b-0 sm:border-r border-default-200 py-2">
              <FileDollar className="text-default-400 w-5 h-5 flex-shrink-0" />
              <Input type="number" placeholder="Min Price" variant="flat" className="w-full" size="sm" />
            </div>
            <div className="flex items-center gap-2 px-2 py-2">
              <FileDollar className="text-default-400 w-5 h-5 flex-shrink-0" />
              <Input type="number" placeholder="Max Price" variant="flat" className="w-full" size="sm" />
            </div>
          </div>
          <Button color="primary" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 font-bold shadow-md shadow-blue-200" startContent={<Magnifier className="w-4 h-4" />}>
            Search Properties
          </Button>
        </div>
      </motion.div>
    </section>
  );
}