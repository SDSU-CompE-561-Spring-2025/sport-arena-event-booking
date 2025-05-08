'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateVenuePage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [eventType, setEventType] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [availability, setAvailability] = useState(true);
    const [contactInfo, setContactInfo] = useState('');
    const [venueHours, setVenueHours] = useState([{ day: '', open: '', close: '' }]);
    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ status: 'success' | 'error'; message: string } | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const urls = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...urls]);
    };

    const addVenueHour = () => {
        setVenueHours([...venueHours, { day: '', open: '', close: '' }]);
    };

    const handleCreateVenue = async () => {
        const payload = {
            name,
            location,
            capacity: parseInt(capacity),
            event_type: eventType,
            // image: images,
            availability,
            hourly_rate: parseFloat(hourlyRate),
            contact_info: contactInfo,
            venue_hours: venueHours.map(h => ({
                day: h.day,
                open_time: h.open,
                close_time: h.close,
              })),
            };          

        setLoading(true);
        setFeedback(null);
        
        alert(`${JSON.stringify(payload)}`);
        try {
            const res = await fetch("http://localhost:8000/venue/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            setLoading(false);

            if (res.ok) {
                setFeedback({ status: 'success', message: 'Venue created successfully! Redirecting...' });
                setTimeout(() => router.push("/venues?created=true"), 1500);
            } else {
                //setFeedback({ status: 'error', message: result.detail || 'Failed to create venue.' });
                const errorMsg = Array.isArray(result.detail)
                ? result.detail.map((err: any) => `${err.loc.join('.')}: ${err.msg}`).join('\n')
                : result.detail || 'Failed to create venue.';

                setFeedback({ status: 'error', message: errorMsg });
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
            setFeedback({ status: 'error', message: 'Server error. Please try again.' });
        }
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
        }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#003049' }}>Create New Venue</h1>

                {feedback && (
                    <div style={{ marginBottom: '1rem', color: feedback.status === 'success' ? 'green' : 'red' }}>
                        {feedback.message}
                    </div>
                )}

                <label style={labelStyle}>Name:</label>
                <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Venue Name" /><br />

                <label style={labelStyle}>Location:</label>
                <input style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} /><br />

                <label style={labelStyle}>Capacity:</label>
                <input type="number" style={inputStyle} value={capacity} onChange={(e) => setCapacity(e.target.value)} /><br />

                <label style={labelStyle}>Event Type:</label>
                <input style={inputStyle} value={eventType} onChange={(e) => setEventType(e.target.value)} /><br />

                <label style={labelStyle}>Hourly Rate:</label>
                <input type="number" style={inputStyle} value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} /><br />

                <label style={labelStyle}>Contact Info:</label>
                <textarea style={{ ...inputStyle, height: '80px' }} value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} /><br />

                <label style={labelStyle}>Availability:</label>
                <select style={inputStyle} value={availability ? 'true' : 'false'} onChange={(e) => setAvailability(e.target.value === 'true')}>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select><br />

                <label style={labelStyle}>Venue Hours:</label>
                {venueHours.map((vh, idx) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                        <input style={inputStyle} placeholder="Day (e.g., Monday)" value={vh.day} onChange={(e) => {
                            const copy = [...venueHours];
                            copy[idx].day = e.target.value;
                            setVenueHours(copy);
                        }} />
                        <input type="time" style={inputStyle} value={vh.open} onChange={(e) => {
                            const copy = [...venueHours];
                            copy[idx].open = e.target.value;
                            setVenueHours(copy);
                        }} />
                        <input type="time" style={inputStyle} value={vh.close} onChange={(e) => {
                            const copy = [...venueHours];
                            copy[idx].close = e.target.value;
                            setVenueHours(copy);
                        }} />
                    </div>
                ))}
                <label style={labelStyle}>Upload Images:</label>
                <input type="file" multiple onChange={handleImageChange} style={{ marginBottom: '1rem' }} /><br />
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {images.map((src, idx) => (
                        <img key={idx} src={src} alt={`upload-${idx}`} width={80} height={80} style={{ objectFit: 'cover', borderRadius: '6px' }} />
                    ))}
                </div>

                <button
                    style={{ ...primaryButton, backgroundColor: loading ? '#ccc' : '#F77F00', cursor: loading ? 'not-allowed' : 'pointer' }}
                    onClick={handleCreateVenue}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Venue'}
                </button>
            </div>
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
    marginTop: '1rem',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
};
