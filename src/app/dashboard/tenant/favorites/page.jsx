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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Favorites</h1>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Favorites" className="min-w-[700px]">
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
                                            {/* ১. Remove Button (প্রথমে) */}
                                            <Button
                                                variant="ghost"
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleRemove(item._id)}
                                            >
                                                <TrashBin size={16} /> Remove
                                            </Button>

                                            {/* ২. View Button (পরে) - hover effect সহ */}
                                            <Link href={`/properties/${item.propertyId}`} className="group">
                                                <Button
                                                    variant="ghost"
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    View
                                                    <ArrowRight 
                                                        className="transition-transform duration-300 group-hover:translate-x-1" 
                                                        size={16} 
                                                    />
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
    );
}