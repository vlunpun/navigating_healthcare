import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, XCircle, FileText, Info, Phone } from "lucide-react";

export default function StatusNotEligible() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/get-started" className="flex items-center gap-2">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">Centauri Health</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 mb-4 text-lg px-3 py-1">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            You may not qualify for a medical frailty exemption
          </h1>
          <p className="text-2xl text-muted-foreground">
            Based on your assessment, you may not meet Indiana's medical frailty criteria at this time.
          </p>
        </div>

        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-8 h-8 text-amber-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Assessment Summary</h2>
              <p className="text-xl text-muted-foreground mb-4">
                Your health information does not currently indicate that you meet the threshold for
                medical frailty under Indiana Medicaid rules. This does not mean you cannot apply or
                that your circumstances won't change.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Why this determination was made:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-xl">•</span>
                <span className="text-xl">
                  The number and severity of chronic conditions may not meet the threshold
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-xl">•</span>
                <span className="text-xl">
                  Functional limitations in daily activities may be less than required
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-xl">•</span>
                <span className="text-xl">
                  Healthcare utilization patterns may not indicate medical frailty
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
              <FileText className="w-5 h-5" />
              <span>Last assessed: {new Date().toLocaleDateString()} — Based on Indiana policy v1.2 (effective Jan 2026)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6">
          <h3 className="text-2xl font-semibold mb-4">What this means for you</h3>
          <div className="space-y-3 text-xl text-muted-foreground">
            <p>
              This assessment is a screening tool based on the information you provided. It does not
              prevent you from applying for a medical frailty exemption through official channels.
            </p>
            <p>
              <strong className="text-foreground">Remember:</strong> Your health status may change,
              or there may be additional factors not captured in this assessment. If you believe you
              should qualify, we encourage you to speak with your healthcare provider or case manager.
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-xl text-muted-foreground mb-4">
                If you feel this assessment doesn't reflect your health situation, or if your
                condition has worsened since completing this assessment, consider these options:
              </p>
              <ul className="space-y-3 text-xl">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">•</span>
                  <span>Talk to your healthcare provider about your eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">•</span>
                  <span>Contact your Medicaid health plan or case manager directly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">•</span>
                  <span>Retake this assessment if your health status changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">•</span>
                  <span>Apply through Indiana FSSA for official evaluation</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6 bg-purple-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Need Help?</h3>
              <p className="text-xl text-muted-foreground mb-3">
                Contact Indiana Medicaid Member Services for questions about your benefits:
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-xl font-semibold mb-2">Indiana Medicaid Hotline:</p>
                <p className="text-2xl font-bold text-foreground mb-1">1-800-403-0864</p>
                <p className="text-lg text-muted-foreground">Monday-Friday, 8am-5pm EST</p>
                <p className="text-lg text-muted-foreground mt-2">TTY: 1-800-743-3333</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 text-xl h-14">
            <FileText className="w-5 h-5 mr-2" />
            Download Summary
          </Button>
          <Link to="/get-started" className="flex-1">
            <Button size="lg" variant="outline" className="w-full text-xl h-14">
              Retake Assessment
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
