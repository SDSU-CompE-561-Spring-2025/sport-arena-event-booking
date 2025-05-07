'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const venueMap = {
    123: 'Sunset Arena',
    124: 'Lakeside Hall',
    125: 'Downtown Studio',
    126: 'Viejas Arena',
    127: 'Grand Pavilion',
    128: 'Harbor Conference Center',
    129: 'Greenfield Grounds',
};

// Spinner component
function Spinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingBookingId, setEditingBookingId] = useState(null);
    const [editData, setEditData] = useState({
        date: '',
        time_slot: '',
        hours: 1,
    });

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error("Token missing");
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/bookings/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);
    

    async function handleDelete(bookingId) {
        const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:8000/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        } catch (error) {
            console.error('Failed to delete booking:', error);
            toast.alert('Error deleting booking.');
        }
    }

    async function handleUpdate(bookingId) {
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`http://localhost:8000/bookings/${bookingId}`, editData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            setBookings((prev) =>
                prev.map((b) => (b.id === bookingId ? { ...b, ...editData } : b))
            );
            setEditingBookingId(null);
            toast.success('Booking updated successfully!');

        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to delete booking.');
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

            {loading ? (
                <Spinner />
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="border p-4 rounded shadow">
                            <p><strong>Venue:</strong> {venueMap[booking.venue_id] || `ID ${booking.venue_id}`}</p>                            <p><strong>Date:</strong> {booking.date}</p>
                            <p><strong>Time Slot:</strong> {booking.time_slot}</p>
                            <p><strong>Hours:</strong> {booking.hours}</p>
                            <p><strong>Status:</strong> {booking.status}</p>

                            <button
                                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                                onClick={() => {
                                    setEditingBookingId(booking.id);
                                    setEditData({
                                        date: booking.date,
                                        time_slot: booking.time_slot,
                                        hours: booking.hours,
                                    });
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => handleDelete(booking.id)}
                            >
                                Delete
                            </button>

                            {editingBookingId === booking.id && (
                                <div className="mt-4 space-y-2">
                                    <input
                                        type="date"
                                        value={editData.date}
                                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                        className="border p-2 rounded w-full"
                                    />
                                    <input
                                        type="time"
                                        value={editData.time_slot}
                                        onChange={(e) => setEditData({ ...editData, time_slot: e.target.value })}
                                        className="border p-2 rounded w-full"
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={editData.hours || ''}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (!isNaN(value) && value >= 1 && value <= 5) {
                                                setEditData({ ...editData, hours: value });
                                            }
                                        }}
                                        className="border p-2 rounded w-full"
                                    />
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        onClick={() => handleUpdate(booking.id)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}