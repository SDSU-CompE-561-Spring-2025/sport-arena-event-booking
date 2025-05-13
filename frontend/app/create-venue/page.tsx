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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCreateVenue = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("event_type", eventType);
    formData.append("venue_id", venueId);
    formData.append("availability", availability.toString());
    formData.append("hourly_rate", hourlyRate);
    formData.append("contact_info", contactInfo);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await fetch("http://localhost:8000/venue/create", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Venue created successfully!");
        router.push("/home-page");
      } else {
        toast.error(result.detail || "Failed to create venue.");
      }
    } catch (err) {
      toast.error("Server error.");
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
              <Label>Upload Image</Label>
              <Input type="file" onChange={handleImageChange} />
              {selectedFile && (
                <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-20 h-20 object-cover rounded mt-2" />
              )}
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