import { z } from 'zod';

// Constant for match status
export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished'
};

// Schema for listing matches with optional limit
export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional()
});

// Schema for match ID parameter
export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

// Schema for creating a new match
export const createMatchSchema = z.object({
  sport: z.string().min(1, 'Sport is required'),
  homeTeam: z.string().min(1, 'Home team is required'),
  awayTeam: z.string().min(1, 'Away team is required'),
  startTime: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    'Start time must be a valid ISO date string'
  ),
  endTime: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    'End time must be a valid ISO date string'
  ),
  homeScore: z.coerce.number().int().nonnegative().optional(),
  awayScore: z.coerce.number().int().nonnegative().optional()
}).superRefine((data, ctx) => {
  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  
  if (endTime <= startTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End time must be chronologically after start time',
      path: ['endTime']
    });
  }
});

// Schema for updating score
export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative()
});

