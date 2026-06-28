"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getFavoritesByEmail, deleteFavorite } from "@/lib/actions/favorites";
import { Table, Button } from "@heroui/react";
import { TrashBin, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function FavoritesPage() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (session?.user?.email) {
                const data = await getFavoritesByEmail(session.user.email);
                setFavorites(data);
            }
        };
        fetchFavorites();
    }, [session]);

    const handleRemove = async (id) => {
        await deleteFavorite(id);
        if (session?.user?.email) {
            const data = await getFavoritesByEmail(session.user.email);
            setFavorites(data);
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-6">Favorites</h1>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
                {favorites.map((item) => (
                    <div key={item._id} className="border border-zinc-200 rounded-lg p-4 bg-white shadow-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase">Property</span>
                            <span className="font-semibold text-sm">{item.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase">Location</span>
                            <span className="text-sm">{item.location}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold text-xs text-zinc-500 uppercase">Rent</span>
                            <span className="text-sm font-bold text-blue-600">${item.rent}</span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t mt-2">
                            <Button variant="ghost" color="danger" size="sm" className="flex-1 text-red-400" onClick={() => handleRemove(item._id)}>
                                <TrashBin size={16} /> Remove
                            </Button>
                            <Link href={`/properties/${item.propertyId}`} className="flex-1">
                                <Button variant="ghost" color="primary" size="sm" className=" text-green-400">
                                    View 
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Favorites">
                            <Table.Header>
                                <Table.Column isRowHeader>Property Title</Table.Column>
                                <Table.Column>Location</Table.Column>
                                <Table.Column>Rent</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {favorites.map((item) => (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>{item.location}</Table.Cell>
                                        <Table.Cell>${item.rent}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" color="danger" className="text-red-400" size="sm" onClick={() => handleRemove(item._id)}>
                                                    <TrashBin size={16} /> Remove
                                                </Button>
                                                <Link href={`/properties/${item.propertyId}`} className="group">
                                                    <Button variant="ghost" color="primary" size="sm" className="text-green-400">
                                                        View <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
}