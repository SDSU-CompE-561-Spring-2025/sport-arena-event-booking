'use client';

import React from 'react';
import Link from 'next/link';

export default function BookingConfirmation() {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
            <h2 style={{ color: '#003049', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>EventEz</h2>
            <div style={{ 
                backgroundColor: '#003049',
                padding: '3rem',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '2rem', color: '#fff', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Thank you for the confirmation!
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '2rem' }}>
                    Have great fun! 🎉
                </p>

                <Link href="/home-page">
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
    transition: 'background-color 0.2s',
    ':hover': {
        backgroundColor: '#e67300'
    }
};
