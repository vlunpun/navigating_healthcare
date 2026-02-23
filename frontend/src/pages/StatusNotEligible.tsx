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
              <ShieldCheck className="w-7 h-7 text-blue-600" />
              <span className="text-lg font-bold text-foreground">Centauri Health</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 mb-4 text-sm px-2 py-0.5">
            Assessment Complete
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            You may not qualify for a medical frailty exemption
          </h1>
          <p className="text-lg text-muted-foreground">
            Based on your assessment, you may not meet Indiana's medical frailty criteria at this time.
          </p>
        </div>

        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">Assessment Summary</h2>
              <p className="text-base text-muted-foreground mb-4">
                Your health information does not currently indicate that you meet the threshold for
                medical frailty under Indiana Medicaid rules. This does not mean you cannot apply or
                that your circumstances won't change.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <h3 className="text-base font-semibold mb-3">Why this determination was made:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-base">•</span>
                <span className="text-base">
                  The number and severity of chronic conditions may not meet the threshold
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-base">•</span>
                <span className="text-base">
                  Functional limitations in daily activities may be less than required
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground text-base">•</span>
                <span className="text-base">
                  Healthcare utilization patterns may not indicate medical frailty
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <FileText className="w-4 h-4" />
              <span>Last assessed: {new Date().toLocaleDateString()} — Based on Indiana policy v1.2 (effective Jan 2026)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6">
          <h3 className="text-lg font-semibold mb-4">What this means for you</h3>
          <div className="space-y-3 text-base text-muted-foreground">
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
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-base text-muted-foreground mb-4">
                If you feel this assessment doesn't reflect your health situation, or if your
                condition has worsened since completing this assessment, consider these options:
              </p>
              <ul className="space-y-3 text-base">
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
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-base text-muted-foreground mb-3">
                Contact Indiana Medicaid Member Services for questions about your benefits:
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <p className="text-base font-semibold mb-2">Indiana Medicaid Hotline:</p>
                <p className="text-xl font-bold text-foreground mb-1">1-800-403-0864</p>
                <p className="text-sm text-muted-foreground">Monday-Friday, 8am-5pm EST</p>
                <p className="text-sm text-muted-foreground mt-2">TTY: 1-800-743-3333</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 text-base h-11">
            <FileText className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
          <Link to="/get-started" className="flex-1">
            <Button size="lg" variant="outline" className="w-full text-base h-11">
              Retake Assessment
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
