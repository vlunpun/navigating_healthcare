import { Router, Request, Response } from 'express';
import { evaluateEligibility } from '../services/eligibilityEngine';
import { z } from 'zod';

const router = Router();

// Assessment data schema validation
const AssessmentDataSchema = z.object({
  hasChronicConditions: z.boolean().optional(),
  chronicConditions: z.array(z.string()).optional(),
  hasDiabetes: z.boolean().optional(),
  hasHeartDisease: z.boolean().optional(),
  hasCOPD: z.boolean().optional(),
  hasMentalHealth: z.boolean().optional(),
  needsADLHelp: z.boolean().optional(),
  adlLimitations: z.array(z.string()).optional(),
  hasHospitalizations: z.boolean().optional(),
  hospitalizationCount: z.number().optional(),
  takingMedications: z.boolean().optional(),
  medicationCount: z.number().optional(),
  hasMobilityLimitations: z.boolean().optional(),
  usesAssistiveDevices: z.boolean().optional(),
  hasHomeHealth: z.boolean().optional(),
});

// Evaluate assessment endpoint
router.post('/evaluate', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const assessmentData = AssessmentDataSchema.parse(req.body);

    // Evaluate eligibility using hybrid engine
    const result = await evaluateEligibility(assessmentData);

    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid assessment data',
        details: error.errors,
      });
    }

    console.error('Error evaluating assessment:', error);
    res.status(500).json({
      error: 'Failed to evaluate assessment',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get assessment history (placeholder for when database is connected)
router.get('/history/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // TODO: Implement database query for assessment history
    res.json({
      userId,
      assessments: [],
      message: 'Assessment history endpoint - to be implemented with database',
    });
  } catch (error) {
    console.error('Error fetching assessment history:', error);
    res.status(500).json({
      error: 'Failed to fetch assessment history',
    });
  }
});

export default router;
