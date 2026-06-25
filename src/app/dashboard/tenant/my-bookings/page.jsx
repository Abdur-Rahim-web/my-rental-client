// "use client";

// import React from "react";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";

// export default function MyBookingsPage() {
//     const bookings = [
//         { id: 1, name: "Luxury Sky Villa", date: "2026-06-15", amount: 1500, bStatus: "Confirmed", pStatus: "Paid" },
//         { id: 2, name: "Modern Cozy Studio", date: "2026-06-10", amount: 600, bStatus: "Pending", pStatus: "Unpaid" },
//     ];

//     return (
//         <div className="flex flex-col gap-6">
//             <div>
//                 <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
//                 <p className="text-sm text-default-400 mt-1">Manage and track your active rental bookings.</p>
//             </div>

//             <Table aria-label="Tenant Bookings Table" shadow="none" className="border border-default-200 rounded-xl">
//                 <TableHeader>
//                     <TableColumn>Property Name</TableColumn>
//                     <TableColumn>Booking Date</TableColumn>
//                     <TableColumn>Amount Paid</TableColumn>
//                     <TableColumn>Booking Status</TableColumn>
//                     <TableColumn>Payment Status</TableColumn>
//                 </TableHeader>
//                 <TableBody>
//                     {bookings.map((booking) => (
//                         <TableRow key={booking.id}>
//                             <TableCell className="font-semibold">{booking.name}</TableCell>
//                             <TableCell>{booking.date}</TableCell>
//                             <TableCell>${booking.amount}</TableCell>
//                             <TableCell>
//                                 <Chip color={booking.bStatus === "Confirmed" ? "success" : "warning"} variant="flat" size="sm">
//                                     {booking.bStatus}
//                                 </Chip>
//                             </TableCell>
//                             <TableCell>
//                                 <Chip color={booking.pStatus === "Paid" ? "success" : "danger"} variant="flat" size="sm">
//                                     {booking.pStatus}
//                                 </Chip>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// }