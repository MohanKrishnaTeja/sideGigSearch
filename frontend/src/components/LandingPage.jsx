import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-5xl font-bold text-blue-800 mb-4">
        Welcome to Side Gig Search
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-3xl">
        Discover freelance and side gig opportunities. Sign in or sign up to get started. 
        Take the next step in your career with us.
      </p>
      <div className="flex gap-4">
        <Link to="/signin">
          <Button
            variant="outline"
            className="text-blue-800 border-blue-800 hover:bg-blue-50 transition-all duration-300 px-6 py-2"
          >
            Sign In
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            variant="outline"
            className="text-blue-800 border-blue-800 hover:bg-blue-50 transition-all duration-300 px-6 py-2"
          >
            Sign Up
          </Button>
        </Link>
      </div>
      
    </div>
  );
}
