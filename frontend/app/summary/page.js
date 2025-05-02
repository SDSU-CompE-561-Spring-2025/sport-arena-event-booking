'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
    const [bookingData, setBookingData] = useState(null);
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

    const handleConfirmBooking = () => {
        // Later replace with axios.post to backend
        router.push('/confirmation');
    };

    if (!bookingData) {
        return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading summary...</p>;
    }

    return (
        <div style={{ backgroundColor: '#EAE2B7', minHeight: '100vh', fontFamily: 'Arial', padding: '2rem' }}>
            <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', color: '#003049', fontSize: '1.75rem', fontWeight: 'bold' }}>Booking Summary</h2>

                <p style={{ color: '#000' }}><strong>Event Name:</strong> {bookingData.eventName}</p>
                <p style={{ color: '#000' }}><strong>Date:</strong> {bookingData.date}</p>
                <p style={{ color: '#000' }}><strong>Time:</strong> {bookingData.time}</p>
                <p style={{ color: '#000' }}><strong>Hours:</strong> {bookingData.hours}</p>
                <p style={{ color: '#000' }}><strong>Message:</strong> {bookingData.message || '—'}</p>

                <button
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
                    onClick={handleConfirmBooking}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}