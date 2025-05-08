'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function BookingPage() {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [hours, setHours] = useState(1);
    const [message, setMessage] = useState('');
    const [venueId, setVenueId] = useState('');

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    const handleReviewBooking = () => {
        const bookingDetails = {
            eventName,
            date,
            time,
            hours,
            message,
            venueId: 2025,
        };
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        window.location.href = '/summary';
    };

    return (
        <div style={{ 
            backgroundColor: '#fff',
            minHeight: '100vh',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '5rem'
            }}
        >
            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', marginBottom: '2rem' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#003049', fontWeight: 'bold', fontSize: '1.5rem' }}>Booking Details</h1>

                <label style={labelStyle}>Event Name:</label>
                <input style={inputStyle} value={eventName} onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z0-9 ]*$/.test(value)) {
                        setEventName(e.target.value)}
                    }}
                    placeholder="Enter event name" /><br />
                <label style={labelStyle}>Date:</label>
                <input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} min={today} max={maxDateStr} /><br />

                <label style={labelStyle}>Time:</label>
                <input type="time" style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)} /><br />

                <label style={labelStyle}>Hours:</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    style={inputStyle}
                    value={hours}
                    onChange={(e) => setHours(Math.min(Math.max(parseInt(e.target.value), 1), 5))}
                    placeholder="Number of hours"
                /><br />

                <label style={labelStyle}>Message to Venue Manager (optional):</label>
                <textarea style={{ ...inputStyle, height: '80px' }} value={message} onChange={(e) => setMessage(e.target.value)} /><br />

                <button
                    style={{ ...primaryButton, backgroundColor: '#F77F00', cursor: 'pointer' }}
                    onClick={handleReviewBooking}
                >
                    Review Booking
                </button>
            </div>

            <style jsx>{`
                input::placeholder, textarea::placeholder {
                    color: #003049;
                    opacity: 1;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #003049',
    fontSize: '1rem',
    color: '#003049',
};

const labelStyle = {
    fontWeight: 'bold',
    color: '#003049',
};

const primaryButton = {
    padding: '0.75rem 1.5rem',
    marginRight: '1rem',
    backgroundColor: '#F77F00',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    marginTop: '1rem',
};