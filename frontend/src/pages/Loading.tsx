import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, CheckCircle } from "lucide-react";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/assessment");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-lg font-bold text-foreground">Centauri Health</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center">
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Accessing your health records...
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Securely retrieving your information through Clear API
          </p>

          <div className="max-w-md mx-auto bg-white rounded-lg p-6 border">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-base">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-left">Identity verified</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-left">Connecting to Centauri network</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <Loader2 className="w-5 h-5 text-blue-600 flex-shrink-0 animate-spin" />
                <span className="text-left">Retrieving medical records...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
