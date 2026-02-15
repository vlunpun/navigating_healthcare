import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, FileText, Phone, CheckSquare, ExternalLink, ArrowLeft, User, Building2 } from "lucide-react";

export default function Guidance() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Link
          to="/status/eligible"
          className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to My Status
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Guidance and Next Steps
          </h1>
          <p className="text-2xl text-muted-foreground">
            Here are resources that can help you understand and apply for a medical frailty
            exemption in Indiana.
          </p>
        </div>

        <Card className="p-6 sm:p-8 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Your Assessment Summary</h2>
              <p className="text-xl text-muted-foreground mb-4">
                Based on your assessment, you are likely eligible for a medical frailty exemption.
                You can share this summary with your healthcare provider or case manager.
              </p>
              <Button variant="outline" className="bg-white text-xl h-12">
                <FileText className="w-5 h-5 mr-2" />
                Download Summary (PDF)
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  How to Apply for a Medical Frailty Exemption (Indiana Medicaid)
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  Official guidance from the Indiana Family and Social Services Administration
                  on applying for medical frailty exemptions under Medicaid.
                </p>
                <Button className="gap-2 text-xl h-12">
                  Visit Indiana FSSA Website
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  Talk to Your Health Plan or Case Manager
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  Your Medicaid health plan can help you with the application process. Contact
                  them directly to discuss your medical frailty assessment and next steps.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xl font-semibold mb-2">Important Contact Information:</p>
                  <ul className="text-xl space-y-2 text-muted-foreground">
                    <li>• Indiana Medicaid Hotline: 1-800-403-0864</li>
                    <li>• Member Services: Available Monday-Friday, 8am-5pm EST</li>
                    <li>• TTY for hearing impaired: 1-800-743-3333</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <CheckSquare className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  Prepare Documentation About Your Daily Limitations
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  Having detailed documentation can strengthen your application. Use this
                  checklist to prepare:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1.5 w-5 h-5" id="check1" />
                    <label htmlFor="check1" className="text-xl">
                      List of all chronic conditions and current medications
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1.5 w-5 h-5" id="check2" />
                    <label htmlFor="check2" className="text-xl">
                      Documentation of hospitalizations or ER visits in the past 6 months
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1.5 w-5 h-5" id="check3" />
                    <label htmlFor="check3" className="text-xl">
                      Notes on activities of daily living (ADLs) you need help with
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1.5 w-5 h-5" id="check4" />
                    <label htmlFor="check4" className="text-xl">
                      Letters from healthcare providers documenting your functional limitations
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1.5 w-5 h-5" id="check5" />
                    <label htmlFor="check5" className="text-xl">
                      Records of home health services or other care assistance you receive
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  Bring This to Your Provider
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  Share this summary with your doctor or healthcare provider during your next visit:
                </p>
                <div className="bg-white rounded-lg p-4 border border-amber-300">
                  <p className="text-xl font-semibold mb-2">Assessment Summary for Provider:</p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Patient assessed as likely eligible for medical frailty exemption based on:
                  </p>
                  <ul className="text-lg space-y-1 text-muted-foreground ml-4">
                    <li>• Multiple chronic conditions (diabetes, COPD, heart disease)</li>
                    <li>• Significant functional limitations in ADLs</li>
                    <li>• Recent acute care utilization (2 hospitalizations in 3 months)</li>
                  </ul>
                  <p className="text-base text-muted-foreground mt-3 pt-3 border-t">
                    Assessment completed via Centauri Health on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <Link to="/status/eligible">
            <Button variant="outline" size="lg" className="w-full h-16 text-xl">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to My Status
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
