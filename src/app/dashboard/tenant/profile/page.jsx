// "use client";

// import React from "react";
// import { Card, CardBody, Avatar, Chip } from "@heroui/react";

// export default function ProfilePage() {
//     // Mock Data (Later dynamic from DB)
//     const user = { name: "John Doe", email: "john@stayease.com", role: "Owner" };

//     return (
//         <div className="max-w-2xl">
//             <h1 className="text-2xl font-bold text-foreground mb-6">My Profile</h1>
//             <Card className="border border-default-200 p-6" shadow="none">
//                 <CardBody className="flex flex-col sm:flex-row items-center gap-6">
//                     <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" className="w-24 h-24 text-large" />
//                     <div className="flex flex-col gap-2 text-center sm:text-left">
//                         <div className="flex items-center justify-center sm:justify-start gap-2">
//                             <h2 className="text-2xl font-bold">{user.name}</h2>
//                             <Chip color="primary" variant="flat" size="sm">{user.role}</Chip>
//                         </div>
//                         <p className="text-sm text-default-500">{user.email}</p>
//                         <p className="text-xs text-default-400 mt-2">Account Status: Active</p>
//                     </div>
//                 </CardBody>
//             </Card>
//         </div>
//     );
// }