import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness check (for Kubernetes/Cloud Run)
router.get('/ready', (req: Request, res: Response) => {
  // Check database connection, external services, etc.
  res.json({
    ready: true,
    timestamp: new Date().toISOString(),
  });
});

// Liveness check (for Kubernetes/Cloud Run)
router.get('/live', (req: Request, res: Response) => {
  res.json({
    alive: true,
    timestamp: new Date().toISOString(),
  });
});

export default router;
