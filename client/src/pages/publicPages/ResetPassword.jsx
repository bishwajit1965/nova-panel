import { Loader, RefreshCw, RotateCcwKey } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    } catch (error) {
      console.error("Error in setting password.", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center">
      <div className="lg:min-w-sm min-w-full mx-auto border bg-gray-200 border-gray-300 rounded-lg shadow hover:shadow-xl lg:p-8 p-4">
        <form onSubmit={handleSubmit} className="lg:space-y-4 space-y-2">
          <h1 className="lg:text-2xl font-bold flex items-center gap-2">
            <RefreshCw /> Reset Password
          </h1>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email address..."
            className="input input-sm w-full"
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-sm bg-black text-white flex items-center gap-2"
            >
              {loading ? <Loader size={20} /> : <RotateCcwKey size={20} />}{" "}
              {loading ? "Resetting" : "Reset Password"}
            </button>
            <Link to="/" className="text-sm text-blue-500 hover:link">
              ← Go Home
            </Link>{" "}
            •
            <Link to="/login" className="text-sm text-blue-500 hover:link">
              ← Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
