import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, FileText, CheckCircle } from "lucide-react";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">Centauri Health</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Check if you may qualify for a medical frailty exemption
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Answer a few questions or upload your health information to see if you may qualify under Indiana Medicaid rules.
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-xl px-10 py-7">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Sign in securely</h3>
            <p className="text-lg text-muted-foreground">
              Access your health records safely through our secure authentication
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Review your information</h3>
            <p className="text-lg text-muted-foreground">
              We'll analyze your health data against Indiana's medical frailty criteria
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Get your results</h3>
            <p className="text-lg text-muted-foreground">
              Receive a clear explanation of your eligibility status
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
