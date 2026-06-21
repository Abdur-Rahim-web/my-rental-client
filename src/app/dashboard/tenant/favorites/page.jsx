// "use client";

// import React, { useState } from "react";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
// import { TrashBin } from "@gravity-ui/icons";

// export default function FavoritesPage() {
//     const [favorites, setFavorites] = useState([
//         { id: 1, name: "Ocean View Penthouse", location: "Cox's Bazar", price: 2500 },
//         { id: 2, name: "Green Valley Apartment", location: "Sylhet", price: 900 },
//     ]);

//     const handleRemove = (id) => {
//         setFavorites(favorites.filter(item => item.id !== id));
//     };

//     return (
//         <div className="flex flex-col gap-6">
//             <div>
//                 <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
//                 <p className="text-sm text-default-400 mt-1">Properties you saved for later viewing.</p>
//             </div>

//             <Table aria-label="Favorites Table" shadow="none" className="border border-default-200 rounded-xl">
//                 <TableHeader>
//                     <TableColumn>Property Name</TableColumn>
//                     <TableColumn>Location</TableColumn>
//                     <TableColumn>Price</TableColumn>
//                     <TableColumn align="center">Action</TableColumn>
//                 </TableHeader>
//                 <TableBody>
//                     {favorites.map((item) => (
//                         <TableRow key={item.id}>
//                             <TableCell className="font-semibold">{item.name}</TableCell>
//                             <TableCell>{item.location}</TableCell>
//                             <TableCell>${item.price}/mo</TableCell>
//                             <TableCell>
//                                 <Button isIconOnly color="danger" variant="light" size="sm" onClick={() => handleRemove(item.id)}>
//                                     <TrashBin className="w-4 h-4" />
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// }