"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Card } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import { getAllReviews } from "@/lib/api/reviews";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const data = await getAllReviews();
      setReviews(data || []);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-20 text-lg font-medium text-default-400">Loading experience...</div>;

  return (
    <section className="py-20 bg-default-50/50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-foreground"
          >
            What Our Tenants Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-default-500 text-lg"
          >
            Real experiences from our verified community members.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev._id?.$oid || rev._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, delay: index * 0. }}
            >
              <Card className="h-full border border-default-200 p-6 bg-background shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-3xl">
                <div className="flex gap-1 text-warning-500 mb-4 text-yellow-500">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-default-700 italic flex-1 leading-relaxed mb-6">
                  &quot;{rev.comment}&quot;
                </p>
                <div className="mt-auto border-t border-default-100 pt-4 flex items-center gap-3">
                  <div className="w-12 h-12 flex-shrink-0">
                    <Avatar className="w-full h-full border-2 border-background shadow-md">
                      
                      <Avatar.Image
                        src={rev.reviewerImage} 
                        alt={rev.reviewerName || "User"}
                        className="object-cover"
                      />

                      
                      <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-primary to-secondary text-green-500 font-bold text-lg uppercase">
                        {rev.reviewerName?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{rev.reviewerName}</h4>
                    <p className="text-xs text-default-400  tracking-wider">{rev.reviewerEmail}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}