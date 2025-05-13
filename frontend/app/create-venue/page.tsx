'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function CreateVenuePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventType, setEventType] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [availability, setAvailability] = useState(true);
  const [contactInfo, setContactInfo] = useState('');
  const [venueId, setVenueId] = useState('');
  const [venueHours, setVenueHours] = useState([{ day: '', open: '', close: '' }]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...urls]);
  };

  const handleCreateVenue = async () => {
    const payload = {
      name,
      location,
      capacity: parseInt(capacity),
      event_type: eventType,
      venue_id: venueId,
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

    try {
      const res = await fetch("http://localhost:8000/venue/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Venue created successfully! Redirecting...");
        setTimeout(() => router.push("/home-page"), 1500);
      } else {
        const errorMsg = Array.isArray(result.detail)
          ? result.detail.map((err: any) => `${err.loc.join('.')}: ${err.msg}`).join('\n')
          : result.detail || 'Failed to create venue.';
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-[#003049]">Create New Venue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Input id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate</Label>
              <Input type="number" id="hourlyRate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="venueId">Venue ID</Label>
              <Input id="venueId" value={venueId} onChange={(e) => setVenueId(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="contactInfo">Contact Info</Label>
              <Textarea id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <select id="availability" value={availability ? 'true' : 'false'} onChange={(e) => setAvailability(e.target.value === 'true')} className="w-full border rounded px-3 py-2">
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <div>
              <Label>Venue Hours</Label>
              {venueHours.map((vh, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
                  <Input placeholder="Day (e.g., Monday)" value={vh.day} onChange={(e) => {
                    const copy = [...venueHours];
                    copy[idx].day = e.target.value;
                    setVenueHours(copy);
                  }} />
                  <Input type="time" value={vh.open} onChange={(e) => {
                    const copy = [...venueHours];
                    copy[idx].open = e.target.value;
                    setVenueHours(copy);
                  }} />
                  <Input type="time" value={vh.close} onChange={(e) => {
                    const copy = [...venueHours];
                    copy[idx].close = e.target.value;
                    setVenueHours(copy);
                  }} />
                </div>
              ))}
            </div>
            <div>
              <Label>Upload Images</Label>
              <Input type="file" multiple onChange={handleImageChange} />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((src, idx) => (
                  <img key={idx} src={src} alt={`upload-${idx}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            </div>
            <Button onClick={handleCreateVenue} disabled={loading} className="mt-4">
              {loading ? 'Creating...' : 'Create Venue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}