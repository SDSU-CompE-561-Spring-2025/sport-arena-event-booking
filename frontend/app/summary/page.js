'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SummaryPage() {
    const [bookingData, setBookingData] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        try {
            const data = localStorage.getItem('bookingDetails');
            if (data) {
                setBookingData(JSON.parse(data));
            }
        } catch (error) {
            console.error('Failed to parse booking details:', error);
        }
    }, []);

    const handleConfirmBooking = async () => {
        if (!bookingData) {
            console.error("No booking data found");
            alert("Booking details missing. Please go back and try again.");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('Please login to confirm booking');
                return;
            }

            const payload = {
                venue_id: 123, // Replace later with dynamic ID
                date: bookingData.date,
                time_slot: bookingData.time,
                hours: bookingData.hours,
            };

            const response = await axios.post('http://localhost:8000/bookings/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Booking successful:', response.data);
            router.push('/confirmation');
            return;

        } catch (error) {
            console.error('Booking failed:', error);
            if (error.response) {
                console.log('Error response from backend:', error.response.data);
                alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Network or unknown error occurred');
            }
        }
    };

    if (!bookingData) {
        return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading summary...</p>;
    }

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Arial', padding: '2rem' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: '#003049', fontSize: '1.75rem', fontWeight: 'bold' }}>
                    Booking Summary
                </h2>

                <p><strong>Event Name:</strong> {bookingData.eventName}</p>
                <p><strong>Date:</strong> {bookingData.date}</p>
                <p><strong>Time:</strong> {bookingData.time}</p>
                <p><strong>Hours:</strong> {bookingData.hours}</p>
                <p><strong>Message:</strong> {bookingData.message || '—'}</p>

                <button
                    onClick={handleConfirmBooking}
                    disabled={loading}
                    style={{
                        marginTop: '2rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#F77F00',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
}