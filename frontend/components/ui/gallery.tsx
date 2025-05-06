// components/Gallery.tsx
import Image from 'next/image';

export default function Gallery({ images }: { images: string[] }) {
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
