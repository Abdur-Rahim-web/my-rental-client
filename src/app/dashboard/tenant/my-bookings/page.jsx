"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { getBookingsByEmail } from "@/lib/actions/bookings";
import { Table } from "@heroui/react";
import { div } from "framer-motion/m";

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
        <div>
            <h1 className="text-2xl mb-4 font-bold">My Bookings</h1>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="My Bookings" className="w-full">
                        <Table.Header className="hidden md:table-header-group">
                            <Table.Column isRowHeader>Property Name</Table.Column>
                            <Table.Column>Booking Date</Table.Column>
                            <Table.Column>Amount Paid</Table.Column>
                            <Table.Column>Booking Status</Table.Column>
                            <Table.Column>Payment Status</Table.Column>
                        </Table.Header>

                        <Table.Body className="block md:table-row-group">
                            {bookings.map((item) => (
                                <Table.Row key={item._id} className="block md:table-row border-b p-4 mb-4 md:mb-0 bg-white md:bg-transparent">

                                    <Table.Cell className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-xs text-zinc-500 uppercase">Property</span>
                                        <span className="text-sm font-medium">{item.propertyTitle}</span>
                                    </Table.Cell>

                                    <Table.Cell className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-xs text-zinc-500 uppercase">Date</span>
                                        <span className="text-sm">{new Date(item.moveInDate).toLocaleDateString()}</span>
                                    </Table.Cell>

                                    <Table.Cell className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-xs text-zinc-500 uppercase">Amount</span>
                                        <span className="text-sm font-bold">${item.amountPaid || "0"}</span>
                                    </Table.Cell>

                                    <Table.Cell className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-xs text-zinc-500 uppercase">Status</span>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-xs text-zinc-500 uppercase">Payment</span>
                                        <span className="text-sm">{item.paymentStatus || "Paid"}</span>
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