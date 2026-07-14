import { Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <button className="flex items-center gap-2 transition hover:scale-105">
          <User size={20} />
          <span>Profile</span>
        </button>

        {/* Center */}
        <h1
          className="flex items-center gap-2 text-2xl font-bold"
          style={{ fontFamily: "Poppins" }}
        >
          🐞 Bug Tracker
        </h1>

        {/* Right */}
        <div className="flex items-center gap-5">

          <button
            onClick={toggleTheme}
            className="transition hover:rotate-180"
          >
            {theme === "dark"
              ? <Sun size={22}/>
              : <Moon size={22}/>}
          </button>

          <button className="flex items-center gap-2 transition hover:text-red-400">
            <LogOut size={20}/>
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}