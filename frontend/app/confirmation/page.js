'use client';

import React from 'react';
import Link from 'next/link';

export default function BookingConfirmation() {
    return (
        <div style={{ backgroundColor: '#EAE2B7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '2rem', color: '#003049', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Thank you for the confirmation!
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#003049', marginBottom: '2rem' }}>
                    Have great fun! 🎉
                </p>

                <Link href="/user-dashboard">
                    <button style={buttonStyle}>Go to Dashboard</button>
                </Link>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#F77F00',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
};