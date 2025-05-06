'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
        setLoading(true);
        setMessage(null);

        const token = localStorage.getItem('access_token');
        const bookingData = JSON.parse(localStorage.getItem('bookingDetails') || '{}');

        try {
            const res = await fetch('http://localhost:8000/bookings/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    venue_id: Number(bookingData.venueId),
                    date: bookingData.date,
                    time_slot: bookingData.time,
                    hours: bookingData.hours,
                }),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) {
                router.push('/confirmation');
            } else {
                const errorDetail = Array.isArray(data.detail)
                    ? data.detail.map((e) => e.msg).join(', ')
                    : data.detail;
                setMessage(errorDetail);
            }
        } catch (error) {
            setLoading(false);
            setMessage('Booking failed. Please try again.');
            console.error(error);
        }
    };

    if (!bookingData) {
        return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading summary...</p>;
    }

    return (
        <div style={{ backgroundColor: '#EAE2B7', minHeight: '100vh', fontFamily: 'Arial', padding: '2rem' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: '#003049', fontSize: '1.75rem', fontWeight: 'bold' }}>
                    Booking Summary
                </h2>

                <p style={{ color: '#000' }}><strong>Date:</strong> {bookingData.date}</p>
                <p style={{ color: '#000' }}><strong>Time:</strong> {bookingData.time}</p>
                <p style={{ color: '#000' }}><strong>Hours:</strong> {bookingData.hours}</p>

                {message && (
                    <p style={{ color: 'red', marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>
                )}

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