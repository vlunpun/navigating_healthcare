import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle, FileText, Info, ArrowRight } from "lucide-react";

export default function StatusEligible() {
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
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-4 text-lg px-3 py-1">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            You are likely eligible for a medical frailty exemption
          </h1>
          <p className="text-2xl text-muted-foreground">
            Based on your assessment, you meet Indiana's medical frailty criteria.
          </p>
        </div>

        <Card className="p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Assessment Summary</h2>
              <p className="text-xl text-muted-foreground mb-4">
                Your health information indicates that you likely qualify for a medical frailty exemption
                under Indiana Medicaid rules. This assessment is based on:
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-3">Factors Supporting Eligibility:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl">
                  Multiple chronic conditions including diabetes, heart disease, and COPD
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl">
                  Need for assistance with activities of daily living (ADLs)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl">
                  Recent hospitalizations indicating acute care needs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-xl">
                  Significant health challenges that meet Indiana's medical frailty criteria
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
              Based on your assessment, you may be able to apply for a medical frailty exemption
              under Indiana Medicaid. This could provide you with additional healthcare benefits and services.
            </p>
            <p>
              <strong className="text-foreground">Important:</strong> This assessment is a screening tool
              and does not guarantee approval. You will need to complete an official application through
              Indiana's Family and Social Services Administration (FSSA).
            </p>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Next Steps</h3>
              <p className="text-xl text-muted-foreground mb-4">
                We recommend the following actions to move forward with your application:
              </p>
              <ul className="space-y-3 text-xl">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">1.</span>
                  <span>Download your assessment summary (PDF) for your records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">2.</span>
                  <span>Contact your Medicaid health plan or case manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">3.</span>
                  <span>Gather documentation of your conditions and limitations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">4.</span>
                  <span>Apply through Indiana FSSA for official determination</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1 text-xl h-14">
            <FileText className="w-5 h-5 mr-2" />
            Download Summary
          </Button>
          <Link to="/guidance" className="flex-1">
            <Button size="lg" variant="outline" className="w-full text-xl h-14">
              View Detailed Guidance
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
