import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface AssessmentData {
  hasChronicConditions: boolean;
  chronicConditions: string[];
  hasDiabetes: boolean;
  hasHeartDisease: boolean;
  hasCOPD: boolean;
  hasMentalHealth: boolean;
  needsADLHelp: boolean;
  adlLimitations: string[];
  hasHospitalizations: boolean;
  hospitalizationCount: number;
  takingMedications: boolean;
  medicationCount: number;
  hasMobilityLimitations: boolean;
  usesAssistiveDevices: boolean;
  hasHomeHealth: boolean;
}

const questions = [
  {
    id: 1,
    text: "Hi! I'm here to help you determine if you may qualify for a medical frailty exemption under Indiana Medicaid. This assessment will take about 5-10 minutes. Let's start: Do you have any chronic health conditions? (Type 'yes' or 'no')",
    field: "hasChronicConditions" as keyof AssessmentData
  },
  {
    id: 2,
    text: "Thank you. Could you list your chronic conditions? For example: diabetes, heart disease, COPD, cancer, etc. (You can list multiple, separated by commas)",
    field: "chronicConditions" as keyof AssessmentData,
    dependsOn: { hasChronicConditions: true }
  },
  {
    id: 3,
    text: "Do you have diabetes? (Type 'yes' or 'no')",
    field: "hasDiabetes" as keyof AssessmentData,
    dependsOn: { hasChronicConditions: true }
  },
  {
    id: 4,
    text: "Do you have heart disease or cardiovascular problems? (Type 'yes' or 'no')",
    field: "hasHeartDisease" as keyof AssessmentData,
    dependsOn: { hasChronicConditions: true }
  },
  {
    id: 5,
    text: "Do you have COPD, asthma, or other chronic lung conditions? (Type 'yes' or 'no')",
    field: "hasCOPD" as keyof AssessmentData,
    dependsOn: { hasChronicConditions: true }
  },
  {
    id: 6,
    text: "Do you have any mental health diagnoses such as depression, anxiety, bipolar disorder, or schizophrenia? (Type 'yes' or 'no')",
    field: "hasMentalHealth" as keyof AssessmentData
  },
  {
    id: 7,
    text: "Do you need help with daily activities like bathing, dressing, eating, or moving around? (Type 'yes' or 'no')",
    field: "needsADLHelp" as keyof AssessmentData
  },
  {
    id: 8,
    text: "Which activities do you need help with? For example: bathing, dressing, eating, toileting, transferring, walking. (List all that apply, separated by commas)",
    field: "adlLimitations" as keyof AssessmentData,
    dependsOn: { needsADLHelp: true }
  },
  {
    id: 9,
    text: "Have you been hospitalized in the past 6 months? (Type 'yes' or 'no')",
    field: "hasHospitalizations" as keyof AssessmentData
  },
  {
    id: 10,
    text: "How many times have you been hospitalized in the past 6 months? (Enter a number)",
    field: "hospitalizationCount" as keyof AssessmentData,
    dependsOn: { hasHospitalizations: true }
  },
  {
    id: 11,
    text: "Are you currently taking any prescription medications? (Type 'yes' or 'no')",
    field: "takingMedications" as keyof AssessmentData
  },
  {
    id: 12,
    text: "How many different prescription medications do you take regularly? (Enter a number)",
    field: "medicationCount" as keyof AssessmentData,
    dependsOn: { takingMedications: true }
  },
  {
    id: 13,
    text: "Do you have difficulty walking or moving around? (Type 'yes' or 'no')",
    field: "hasMobilityLimitations" as keyof AssessmentData
  },
  {
    id: 14,
    text: "Do you use any assistive devices like a walker, wheelchair, or cane? (Type 'yes' or 'no')",
    field: "usesAssistiveDevices" as keyof AssessmentData
  },
  {
    id: 15,
    text: "Do you receive home health services or have a caregiver who helps you at home? (Type 'yes' or 'no')",
    field: "hasHomeHealth" as keyof AssessmentData
  }
];

export default function AssessmentChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-focus the input when typing indicator disappears (new question ready)
  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const hasStarted = useRef(false);
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    // Show first question
    askQuestion(0);
  }, []);

  const askQuestion = (index: number) => {
    if (index >= questions.length) {
      // Assessment complete
      finishAssessment();
      return;
    }

    const question = questions[index];

    // Check if question has dependencies
    if (question.dependsOn) {
      const dependencyKey = Object.keys(question.dependsOn)[0] as keyof AssessmentData;
      const dependencyValue = question.dependsOn[dependencyKey];

      if (assessmentData[dependencyKey] !== dependencyValue) {
        // Skip this question and move to next
        setCurrentQuestionIndex(index + 1);
        askQuestion(index + 1);
        return;
      }
    }

    setIsTyping(true);

    setTimeout(() => {
      const newMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: question.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Process answer
    const currentQuestion = questions[currentQuestionIndex];
    processAnswer(currentInput, currentQuestion.field);

    setCurrentInput("");

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setTimeout(() => {
      askQuestion(currentQuestionIndex + 1);
    }, 500);
  };

  const processAnswer = (answer: string, field: keyof AssessmentData) => {
    const lowerAnswer = answer.toLowerCase().trim();

    let value: any;

    // Parse answer based on field type
    if (field === "chronicConditions" || field === "adlLimitations") {
      value = answer.split(",").map(item => item.trim()).filter(item => item);
    } else if (field === "hospitalizationCount" || field === "medicationCount") {
      value = parseInt(answer) || 0;
    } else {
      // Boolean fields
      value = lowerAnswer === "yes" || lowerAnswer === "y";
    }

    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const finishAssessment = async () => {
    setIsTyping(true);

    setTimeout(async () => {
      const completionMessage: Message = {
        id: `assistant-final`,
        sender: "assistant",
        text: "Thank you for completing the assessment! I'm now analyzing your information against Indiana's medical frailty criteria...",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, completionMessage]);
      setIsTyping(false);

      // Send to backend for assessment
      try {
        const response = await fetch('/api/assessment/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(assessmentData),
        });

        const result = await response.json();

        // Navigate to appropriate status page
        setTimeout(() => {
          if (result.eligible) {
            navigate('/status/eligible', { state: { assessment: result } });
          } else {
            navigate('/status/not-eligible', { state: { assessment: result } });
          }
        }, 2000);
      } catch (error) {
        console.error('Assessment error:', error);
        // Fallback: simple client-side determination for demo
        const isEligible = determineEligibilityClientSide();
        setTimeout(() => {
          if (isEligible) {
            navigate('/status/eligible', { state: { assessment: assessmentData } });
          } else {
            navigate('/status/not-eligible', { state: { assessment: assessmentData } });
          }
        }, 2000);
      }
    }, 1000);
  };

  const determineEligibilityClientSide = (): boolean => {
    // Simple rule-based determination (fallback)
    let score = 0;

    if (assessmentData.hasChronicConditions) score += 2;
    if (assessmentData.hasDiabetes) score += 1;
    if (assessmentData.hasHeartDisease) score += 1;
    if (assessmentData.hasCOPD) score += 1;
    if (assessmentData.hasMentalHealth) score += 1;
    if (assessmentData.needsADLHelp) score += 3;
    if (assessmentData.hasHospitalizations && (assessmentData.hospitalizationCount || 0) >= 2) score += 2;
    if (assessmentData.takingMedications && (assessmentData.medicationCount || 0) >= 5) score += 1;
    if (assessmentData.hasMobilityLimitations) score += 1;
    if (assessmentData.usesAssistiveDevices) score += 1;
    if (assessmentData.hasHomeHealth) score += 1;

    return score >= 6;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
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

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col">
        <Card className="flex-1 flex flex-col p-4 sm:p-6 mb-4">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-foreground">Medical Frailty Assessment</h1>
            <p className="text-xl text-muted-foreground">Answer the questions to determine your eligibility</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-xl sm:text-2xl">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your answer here..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 text-xl h-14"
              disabled={currentQuestionIndex >= questions.length || isTyping}
              autoFocus
            />
            <Button
              type="submit"
              size="icon"
              className="h-14 w-14"
              disabled={!currentInput.trim() || currentQuestionIndex >= questions.length || isTyping}
            >
              <Send className="w-6 h-6" />
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
