"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/actions/bookings";
import { Table } from "@heroui/react";

export default function MyBookingsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    const email = session?.user?.email;


    const fetchBookings = useCallback(async () => {
        if (!email) return;

        setLoading(true);
        try {
            const data = await getBookingsByEmail(email);
            setBookings(data || []);
        } catch (error) {
            console.error("Error fetching:", error);
        } finally {
            setLoading(false);
        }
    }, [email]);


    useEffect(() => {
        let isMounted = true;

        const performFetch = async () => {
            if (isMounted) {
                await fetchBookings();
            }
        };

        performFetch();

        return () => {
            isMounted = false;
        };
    }, [fetchBookings]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <button
                    onClick={fetchBookings}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    Refresh List
                </button>
            </div>

            {loading ? (
                <p>Loading your bookings...</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="My Bookings" className="min-w-[800px]">
                            <Table.Header>
                                <Table.Column isRowHeader>Property Name</Table.Column>
                                <Table.Column>Booking Date</Table.Column>
                                <Table.Column>Amount Paid</Table.Column>
                                <Table.Column>Booking Status</Table.Column>
                                <Table.Column>Payment Status</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {bookings.map((item) => (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{item.propertyTitle}</Table.Cell>
                                        <Table.Cell>{new Date(item.moveInDate).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>${item.amountPaid || "0"}</Table.Cell>
                                        <Table.Cell>{item.status}</Table.Cell>
                                        <Table.Cell>{item.paymentStatus || "Paid"}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    );
}