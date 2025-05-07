// components/Gallery.tsx
import Image from 'next/image';

export default function Gallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) {
    return <div className="mb-4">No images available</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {images.map((src, index) => (
        <div key={index} className="relative h-40">
          <Image src={src} alt={`Venue Pic #${index + 1}`} fill className="object-cover rounded" />
        </div>
      ))}
    </div>
  );
}
