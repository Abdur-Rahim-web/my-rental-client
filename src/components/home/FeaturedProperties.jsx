// "use client";

// import React from "react";
// import Link from "next/link";
// // HeroUI এর সঠিক কার্ড সাব-কম্পোনেন্ট ইম্পোর্ট
// import { Button, Card, CardBody, CardFooter } from "@heroui/react";
// import { motion } from "framer-motion";
// import { Pin, Star, ArrowRight } from "@gravity-ui/icons";

// export default function FeaturedProperties({ isLoggedIn }) {
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 1 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
//   };

//   // 6 Approved Properties Mock Data
//   const properties = [
//     { id: "1", title: "Luxury Sky Villa", location: "Dhaka, Bangladesh", price: 1500, type: "Apartment", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", rating: 4.8 },
//     { id: "2", title: "Modern Cozy Studio", location: "Chittagong", price: 600, type: "Studio", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80", rating: 4.5 },
//     { id: "3", title: "Green Valley Apartment", location: "Sylhet", price: 900, type: "Apartment", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80", rating: 4.7 },
//     { id: "4", title: "Ocean View Penthouse", location: "Cox's Bazar", price: 2500, type: "Villa", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80", rating: 4.9 },
//     { id: "5", title: "Urban Living Space", location: "Dhaka", price: 1100, type: "Apartment", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", rating: 4.6 },
//     { id: "6", title: "Rustic Lakeside Cabin", location: "Rangamati", price: 1300, type: "Cabin", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80", rating: 4.4 },
//   ];

//   return (
//     <section className="py-16 mx-auto max-w-[1280px] px-6">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Accommodations</h2>
//         <p className="mt-4 text-default-500">Handpicked Premium approved properties straight from MongoDB storage layers.</p>
//       </div>

//       <motion.div 
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={staggerContainer}
//         className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
//       >
//         {properties.map((item) => (
//           <motion.div key={item.id} variants={fadeInUp}>
//             <Card className="border border-default-100 hover:shadow-lg transition-all" shadow="sm">
//               <CardBody className="p-0 relative overflow-hidden">
//                 <img src={item.image} alt={item.title} className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500" />
//                 <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-warning-600">
//                   <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
//                 </div>
//               </CardBody>
//               <CardFooter className="flex-col items-start p-5 gap-2">
//                 <div className="flex justify-between w-full items-center">
//                   <span className="text-xs font-semibold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">{item.type}</span>
//                   <p className="text-lg font-bold text-foreground">${item.price}<span className="text-xs text-default-400 font-normal">/mo</span></p>
//                 </div>
//                 <h3 className="font-bold text-xl text-default-800 truncate w-full">{item.title}</h3>
//                 <p className="text-xs text-default-500 flex items-center gap-1"><Pin className="w-3.5 h-3.5" /> {item.location}</p>
                
//                 <Button 
//                   as={Link} 
//                   href={isLoggedIn ? `/properties/${item.id}` : "/login"} 
//                   color="primary" 
//                   variant="flat" 
//                   className="w-full mt-2 font-semibold"
//                   endContent={<ArrowRight className="w-4 h-4" />}
//                 >
//                   View Details
//                 </Button>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }