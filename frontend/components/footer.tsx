export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 text-sm py-6 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© 2025 EventEz. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="https://github.com/https://github.com/SDSU-CompE-561-Spring-2025/sport-arena-event-booking/eventez" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}