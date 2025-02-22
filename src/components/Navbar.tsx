import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
export function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold text-white">DaTha Trader</Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-white hover:text-accent">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>;
}