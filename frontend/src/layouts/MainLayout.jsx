import InteractiveBackground from "../animations/InteractiveBackground";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <InteractiveBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}