/**
 * Hybrid Eligibility Determination Engine
 * Combines rule-based assessment with ML confidence scoring
 * Based on Indiana Medicaid Medical Frailty Criteria
 */

interface AssessmentData {
  hasChronicConditions?: boolean;
  chronicConditions?: string[];
  hasDiabetes?: boolean;
  hasHeartDisease?: boolean;
  hasCOPD?: boolean;
  hasMentalHealth?: boolean;
  needsADLHelp?: boolean;
  adlLimitations?: string[];
  hasHospitalizations?: boolean;
  hospitalizationCount?: number;
  takingMedications?: boolean;
  medicationCount?: number;
  hasMobilityLimitations?: boolean;
  usesAssistiveDevices?: boolean;
  hasHomeHealth?: boolean;
}

interface EligibilityResult {
  eligible: boolean;
  confidence: number; // 0-100
  ruleBasedScore: number;
  mlSimulatedScore: number;
  reasons: string[];
  factors: {
    chronicConditions: { score: number; impact: string };
    functionalLimitations: { score: number; impact: string };
    healthcareUtilization: { score: number; impact: string };
    medications: { score: number; impact: string };
    mobility: { score: number; impact: string };
  };
  recommendation: string;
  explanation: string;
}

/**
 * Indiana Medicaid Medical Frailty Criteria (Simplified)
 *
 * A person is considered medically frail if they have:
 * 1. Serious and complex medical conditions
 * 2. Chronic conditions that significantly limit daily activities
 * 3. Need for assistance with ADLs
 * 4. Recent hospitalizations or ER visits
 * 5. Multiple medications indicating complex health needs
 */

export async function evaluateEligibility(data: AssessmentData): Promise<EligibilityResult> {
  // Rule-based scoring
  const ruleBasedScore = calculateRuleBasedScore(data);

  // Simulated ML scoring (would call Vertex AI in production)
  const mlSimulatedScore = calculateMLSimulatedScore(data);

  // Hybrid decision: combine both approaches
  const combinedScore = (ruleBasedScore * 0.6) + (mlSimulatedScore * 0.4);

  // Eligibility threshold
  const eligible = combinedScore >= 60;

  // Confidence calculation
  const confidence = calculateConfidence(ruleBasedScore, mlSimulatedScore, combinedScore);

  // Generate detailed factors analysis
  const factors = analyzeFactors(data);

  // Generate reasons
  const reasons = generateReasons(data, eligible);

  // Generate recommendation and explanation
  const recommendation = generateRecommendation(eligible, confidence);
  const explanation = generateExplanation(data, eligible, combinedScore);

  return {
    eligible,
    confidence,
    ruleBasedScore,
    mlSimulatedScore,
    reasons,
    factors,
    recommendation,
    explanation,
  };
}

function calculateRuleBasedScore(data: AssessmentData): number {
  let score = 0;

  // Chronic Conditions (0-25 points)
  if (data.hasChronicConditions) {
    score += 10;
    const conditionCount = data.chronicConditions?.length || 0;
    if (conditionCount >= 3) score += 15;
    else if (conditionCount >= 2) score += 10;
    else if (conditionCount >= 1) score += 5;
  }

  // Specific high-impact conditions
  if (data.hasDiabetes) score += 5;
  if (data.hasHeartDisease) score += 5;
  if (data.hasCOPD) score += 5;
  if (data.hasMentalHealth) score += 3;

  // Activities of Daily Living (0-30 points)
  if (data.needsADLHelp) {
    score += 15;
    const adlCount = data.adlLimitations?.length || 0;
    if (adlCount >= 4) score += 15;
    else if (adlCount >= 3) score += 10;
    else if (adlCount >= 2) score += 7;
    else if (adlCount >= 1) score += 5;
  }

  // Healthcare Utilization (0-20 points)
  if (data.hasHospitalizations) {
    const hospCount = data.hospitalizationCount || 0;
    if (hospCount >= 3) score += 20;
    else if (hospCount >= 2) score += 15;
    else if (hospCount >= 1) score += 10;
  }

  // Medications (0-15 points)
  if (data.takingMedications) {
    const medCount = data.medicationCount || 0;
    if (medCount >= 10) score += 15;
    else if (medCount >= 7) score += 12;
    else if (medCount >= 5) score += 10;
    else if (medCount >= 3) score += 7;
    else score += 3;
  }

  // Mobility and Assistive Devices (0-10 points)
  if (data.hasMobilityLimitations) score += 5;
  if (data.usesAssistiveDevices) score += 3;
  if (data.hasHomeHealth) score += 7;

  return Math.min(score, 100);
}

function calculateMLSimulatedScore(data: AssessmentData): number {
  /**
   * Simulated ML scoring that mimics Vertex AI prediction
   * In production, this would call Vertex AI endpoint
   * Uses a weighted feature approach similar to ML models
   */

  let score = 50; // Base score

  // Feature engineering (simulating ML feature importance)
  const features = {
    chronicComplexity: calculateChronicComplexity(data),
    functionalImpairment: calculateFunctionalImpairment(data),
    healthcareIntensity: calculateHealthcareIntensity(data),
    medicationBurden: calculateMedicationBurden(data),
    supportNeeds: calculateSupportNeeds(data),
  };

  // Weighted scoring (mimics ML model weights)
  score += features.chronicComplexity * 0.25;
  score += features.functionalImpairment * 0.30;
  score += features.healthcareIntensity * 0.20;
  score += features.medicationBurden * 0.15;
  score += features.supportNeeds * 0.10;

  // Add some "ML randomness" to simulate confidence intervals
  const mlNoise = (Math.random() - 0.5) * 5; // ±2.5 points
  score += mlNoise;

  return Math.max(0, Math.min(score, 100));
}

function calculateChronicComplexity(data: AssessmentData): number {
  let complexity = 0;
  const conditionCount = data.chronicConditions?.length || 0;

  if (conditionCount >= 3) complexity += 30;
  else if (conditionCount >= 2) complexity += 20;
  else if (conditionCount === 1) complexity += 10;

  // High-impact conditions
  if (data.hasDiabetes) complexity += 5;
  if (data.hasHeartDisease) complexity += 5;
  if (data.hasCOPD) complexity += 5;
  if (data.hasMentalHealth) complexity += 3;

  return Math.min(complexity, 50);
}

function calculateFunctionalImpairment(data: AssessmentData): number {
  if (!data.needsADLHelp) return 0;

  let impairment = 20;
  const adlCount = data.adlLimitations?.length || 0;

  if (adlCount >= 4) impairment += 30;
  else if (adlCount >= 3) impairment += 20;
  else if (adlCount >= 2) impairment += 15;
  else if (adlCount >= 1) impairment += 10;

  return Math.min(impairment, 50);
}

function calculateHealthcareIntensity(data: AssessmentData): number {
  if (!data.hasHospitalizations) return 0;

  const hospCount = data.hospitalizationCount || 0;

  if (hospCount >= 3) return 40;
  if (hospCount >= 2) return 30;
  if (hospCount >= 1) return 20;

  return 0;
}

function calculateMedicationBurden(data: AssessmentData): number {
  if (!data.takingMedications) return 0;

  const medCount = data.medicationCount || 0;

  if (medCount >= 10) return 30;
  if (medCount >= 7) return 25;
  if (medCount >= 5) return 20;
  if (medCount >= 3) return 15;

  return 5;
}

function calculateSupportNeeds(data: AssessmentData): number {
  let needs = 0;

  if (data.hasMobilityLimitations) needs += 15;
  if (data.usesAssistiveDevices) needs += 10;
  if (data.hasHomeHealth) needs += 20;

  return Math.min(needs, 45);
}

function calculateConfidence(ruleBased: number, mlScore: number, combined: number): number {
  // Higher confidence when both methods agree
  const agreement = 100 - Math.abs(ruleBased - mlScore);
  const strengthOfSignal = Math.abs(combined - 50); // Distance from threshold

  const confidence = (agreement * 0.6) + (strengthOfSignal * 0.4);

  return Math.max(65, Math.min(confidence, 99)); // 65-99% range
}

function analyzeFactors(data: AssessmentData) {
  const chronicScore = calculateChronicComplexity(data);
  const functionalScore = calculateFunctionalImpairment(data);
  const utilizationScore = calculateHealthcareIntensity(data);
  const medicationScore = calculateMedicationBurden(data);
  const mobilityScore = calculateSupportNeeds(data);

  return {
    chronicConditions: {
      score: chronicScore,
      impact: chronicScore >= 30 ? 'High' : chronicScore >= 15 ? 'Moderate' : 'Low',
    },
    functionalLimitations: {
      score: functionalScore,
      impact: functionalScore >= 30 ? 'High' : functionalScore >= 15 ? 'Moderate' : 'Low',
    },
    healthcareUtilization: {
      score: utilizationScore,
      impact: utilizationScore >= 25 ? 'High' : utilizationScore >= 15 ? 'Moderate' : 'Low',
    },
    medications: {
      score: medicationScore,
      impact: medicationScore >= 20 ? 'High' : medicationScore >= 10 ? 'Moderate' : 'Low',
    },
    mobility: {
      score: mobilityScore,
      impact: mobilityScore >= 25 ? 'High' : mobilityScore >= 10 ? 'Moderate' : 'Low',
    },
  };
}

function generateReasons(data: AssessmentData, eligible: boolean): string[] {
  const reasons: string[] = [];

  if (eligible) {
    if (data.hasChronicConditions && (data.chronicConditions?.length || 0) >= 2) {
      reasons.push('Multiple chronic conditions indicating complex health needs');
    }

    if (data.needsADLHelp && (data.adlLimitations?.length || 0) >= 2) {
      reasons.push('Significant limitations in activities of daily living requiring assistance');
    }

    if (data.hasHospitalizations && (data.hospitalizationCount || 0) >= 2) {
      reasons.push('Recent hospitalizations indicating acute and ongoing health issues');
    }

    if (data.takingMedications && (data.medicationCount || 0) >= 5) {
      reasons.push('High medication burden suggesting complex medical management needs');
    }

    if (data.hasHomeHealth) {
      reasons.push('Requirement for home health services indicating significant support needs');
    }

    if (reasons.length === 0) {
      reasons.push('Health profile meets Indiana Medicaid medical frailty criteria');
    }
  } else {
    reasons.push('Health indicators do not currently meet the threshold for medical frailty determination');
    reasons.push('This assessment may change as health status evolves');
  }

  return reasons;
}

function generateRecommendation(eligible: boolean, confidence: number): string {
  if (eligible) {
    if (confidence >= 85) {
      return 'Strongly Recommended: Apply for medical frailty exemption. Your health profile strongly indicates eligibility.';
    } else if (confidence >= 75) {
      return 'Recommended: Consider applying for medical frailty exemption. Gather supporting documentation from healthcare providers.';
    } else {
      return 'Consider Applying: You may qualify for medical frailty exemption. Consult with your healthcare provider or case manager.';
    }
  } else {
    if (confidence >= 85) {
      return 'Not Recommended: Current health profile does not meet medical frailty criteria. Monitor health status and reassess if conditions change.';
    } else {
      return 'Uncertain: Consider consultation with healthcare provider or case manager for personalized evaluation.';
    }
  }
}

function generateExplanation(data: AssessmentData, eligible: boolean, score: number): string {
  if (eligible) {
    return `Based on your assessment (score: ${score.toFixed(1)}/100), you likely meet Indiana's medical frailty criteria. ` +
      `This determination considers multiple factors including chronic conditions, functional limitations, healthcare utilization, ` +
      `and support needs. We recommend gathering supporting documentation and contacting your Medicaid health plan to initiate ` +
      `the formal application process.`;
  } else {
    return `Based on your assessment (score: ${score.toFixed(1)}/100), you may not currently meet Indiana's medical frailty criteria threshold. ` +
      `This does not prevent you from applying through official channels, and circumstances may change. If your health status worsens ` +
      `or you believe this assessment doesn't reflect your situation, please consult with your healthcare provider or case manager.`;
  }
}
