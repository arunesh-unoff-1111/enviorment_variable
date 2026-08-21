import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { QUESTIONS_BANK } from './src/data/questions';
import { AssessmentRecord, AssessmentResultsData, QuestionAnswerDetail, AdminAnalytics } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Ensure data storage directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
const ASSESSMENTS_FILE = path.join(DATA_DIR, 'assessments.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory token storage for admin sessions
const activeAdminTokens = new Set<string>();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

const CHAKRA_NAMES: Record<string, string> = {
  root: 'Root',
  sacral: 'Sacral',
  solarPlexus: 'Solar Plexus',
  heart: 'Heart',
  throat: 'Throat',
  thirdEye: 'Third Eye',
  crown: 'Crown'
};

const CHAKRA_KEYS = ['root', 'sacral', 'solarPlexus', 'heart', 'throat', 'thirdEye', 'crown'] as const;

// Helper to generate a 6-character uppercase alphanumeric ID
function generateResponseId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Helper to format date
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper to seed initial sample records if none exist
function getSeedAssessments(): AssessmentRecord[] {
  return [
    {
      responseId: 'A82K91',
      name: 'Rahul Sharma',
      timestamp: new Date('2026-08-21T09:30:00Z').toISOString(),
      formattedDate: '21 Aug 2026',
      answers: {},
      results: {
        rootScore: 14,
        sacralScore: 16,
        solarPlexusScore: 11,
        heartScore: 17,
        throatScore: 12,
        thirdEyeScore: 15,
        crownScore: 13,
        strongestChakra: 'Heart',
        lowestChakra: 'Solar Plexus'
      }
    },
    {
      responseId: 'M94P22',
      name: 'Maya Patel',
      timestamp: new Date('2026-08-20T14:15:00Z').toISOString(),
      formattedDate: '20 Aug 2026',
      answers: {},
      results: {
        rootScore: 16,
        sacralScore: 13,
        solarPlexusScore: 15,
        heartScore: 14,
        throatScore: 18,
        thirdEyeScore: 16,
        crownScore: 12,
        strongestChakra: 'Throat',
        lowestChakra: 'Crown'
      }
    },
    {
      responseId: 'D45L88',
      name: 'David Miller',
      timestamp: new Date('2026-08-19T11:45:00Z').toISOString(),
      formattedDate: '19 Aug 2026',
      answers: {},
      results: {
        rootScore: 18,
        sacralScore: 12,
        solarPlexusScore: 16,
        heartScore: 13,
        throatScore: 11,
        thirdEyeScore: 14,
        crownScore: 15,
        strongestChakra: 'Root',
        lowestChakra: 'Throat'
      }
    },
    {
      responseId: 'E77W39',
      name: 'Elena Rostova',
      timestamp: new Date('2026-08-18T16:20:00Z').toISOString(),
      formattedDate: '18 Aug 2026',
      answers: {},
      results: {
        rootScore: 12,
        sacralScore: 17,
        solarPlexusScore: 13,
        heartScore: 18,
        throatScore: 14,
        thirdEyeScore: 15,
        crownScore: 16,
        strongestChakra: 'Heart',
        lowestChakra: 'Root'
      }
    }
  ];
}

// Load assessments from disk
function loadAssessments(): AssessmentRecord[] {
  try {
    if (fs.existsSync(ASSESSMENTS_FILE)) {
      const data = fs.readFileSync(ASSESSMENTS_FILE, 'utf-8');
      return JSON.parse(data);
    } else {
      const initial = getSeedAssessments();
      saveAssessments(initial);
      return initial;
    }
  } catch (err) {
    console.error('Error loading assessments:', err);
    return getSeedAssessments();
  }
}

// Save assessments to disk
function saveAssessments(records: AssessmentRecord[]) {
  try {
    fs.writeFileSync(ASSESSMENTS_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving assessments:', err);
  }
}

// Server-side scoring calculation
function calculateServerScores(userAnswers: Record<number, number>): {
  results: AssessmentResultsData;
  detailedAnswers: Record<number, QuestionAnswerDetail>;
} {
  const rawScores: Record<string, number> = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  const maxPossibleScores: Record<string, number> = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  const detailedAnswers: Record<number, QuestionAnswerDetail> = {};

  QUESTIONS_BANK.forEach((q) => {
    // Find max points for each chakra key in this question
    CHAKRA_KEYS.forEach((key) => {
      let maxForThisQuestion = 0;
      q.choices.forEach((choice) => {
        const weight = (choice.weights && choice.weights[key]) || 0;
        if (weight > maxForThisQuestion) {
          maxForThisQuestion = weight;
        }
      });
      maxPossibleScores[key] += maxForThisQuestion;
    });

    const choiceIdx = userAnswers[q.id];
    if (choiceIdx !== undefined && q.choices[choiceIdx]) {
      const choice = q.choices[choiceIdx];
      const weights = choice.weights || {};
      CHAKRA_KEYS.forEach((key) => {
        rawScores[key] += weights[key] || 0;
      });

      detailedAnswers[q.id] = {
        questionId: q.id,
        choiceIndex: choiceIdx,
        scenario: q.scenario,
        selectedText: choice.text
      };
    }
  });

  // Normalize scores to 0-20 scale
  const normalizedScores: Record<string, number> = {};
  CHAKRA_KEYS.forEach((key) => {
    const maxPoss = maxPossibleScores[key] || 1;
    const raw = rawScores[key] || 0;
    const normalized = Math.round((raw / maxPoss) * 20);
    normalizedScores[key] = Math.min(20, Math.max(0, normalized));
  });

  // Calculate highest & lowest
  let highestVal = -1;
  let lowestVal = 21;

  CHAKRA_KEYS.forEach((key) => {
    const val = normalizedScores[key];
    if (val > highestVal) highestVal = val;
    if (val < lowestVal) lowestVal = val;
  });

  const strongestList = CHAKRA_KEYS.filter((k) => normalizedScores[k] === highestVal).map((k) => CHAKRA_NAMES[k]);
  const lowestList = CHAKRA_KEYS.filter((k) => normalizedScores[k] === lowestVal).map((k) => CHAKRA_NAMES[k]);

  const results: AssessmentResultsData = {
    rootScore: normalizedScores.root,
    sacralScore: normalizedScores.sacral,
    solarPlexusScore: normalizedScores.solarPlexus,
    heartScore: normalizedScores.heart,
    throatScore: normalizedScores.throat,
    thirdEyeScore: normalizedScores.thirdEye,
    crownScore: normalizedScores.crown,
    strongestChakra: strongestList.join(', '),
    lowestChakra: lowestList.join(', ')
  };

  return { results, detailedAnswers };
}

// Compute aggregate analytics
function computeAnalytics(records: AssessmentRecord[]): AdminAnalytics {
  const total = records.length;
  if (total === 0) {
    return {
      totalAssessments: 0,
      averageScores: {
        root: 0,
        sacral: 0,
        solarPlexus: 0,
        heart: 0,
        throat: 0,
        thirdEye: 0,
        crown: 0
      },
      mostCommonStrongest: 'None',
      mostCommonLowest: 'None',
      strongestDistribution: {},
      lowestDistribution: {}
    };
  }

  const sumScores = {
    root: 0,
    sacral: 0,
    solarPlexus: 0,
    heart: 0,
    throat: 0,
    thirdEye: 0,
    crown: 0
  };

  const strongestCounts: Record<string, number> = {};
  const lowestCounts: Record<string, number> = {};

  records.forEach((rec) => {
    sumScores.root += rec.results.rootScore;
    sumScores.sacral += rec.results.sacralScore;
    sumScores.solarPlexus += rec.results.solarPlexusScore;
    sumScores.heart += rec.results.heartScore;
    sumScores.throat += rec.results.throatScore;
    sumScores.thirdEye += rec.results.thirdEyeScore;
    sumScores.crown += rec.results.crownScore;

    // Strongest distribution
    const strongests = rec.results.strongestChakra.split(', ');
    strongests.forEach((s) => {
      strongestCounts[s] = (strongestCounts[s] || 0) + 1;
    });

    // Lowest distribution
    const lowests = rec.results.lowestChakra.split(', ');
    lowests.forEach((l) => {
      lowestCounts[l] = (lowestCounts[l] || 0) + 1;
    });
  });

  // Calculate most common
  let maxStrongCount = -1;
  let mostCommonStrongest = 'None';
  Object.entries(strongestCounts).forEach(([chakra, count]) => {
    if (count > maxStrongCount) {
      maxStrongCount = count;
      mostCommonStrongest = chakra;
    }
  });

  let maxLowCount = -1;
  let mostCommonLowest = 'None';
  Object.entries(lowestCounts).forEach(([chakra, count]) => {
    if (count > maxLowCount) {
      maxLowCount = count;
      mostCommonLowest = chakra;
    }
  });

  return {
    totalAssessments: total,
    averageScores: {
      root: Number((sumScores.root / total).toFixed(1)),
      sacral: Number((sumScores.sacral / total).toFixed(1)),
      solarPlexus: Number((sumScores.solarPlexus / total).toFixed(1)),
      heart: Number((sumScores.heart / total).toFixed(1)),
      throat: Number((sumScores.throat / total).toFixed(1)),
      thirdEye: Number((sumScores.thirdEye / total).toFixed(1)),
      crown: Number((sumScores.crown / total).toFixed(1))
    },
    mostCommonStrongest,
    mostCommonLowest,
    strongestDistribution: strongestCounts,
    lowestDistribution: lowestCounts
  };
}

// Middleware: Verify Admin Authorization
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-admin-token'] as string;
  let token = customHeader;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (!token || !activeAdminTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
  }

  next();
}

/* =========================================================================
   PUBLIC PARTICIPANT API ENDPOINTS
   ========================================================================= */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Participant assessment submission
app.post('/api/assessments', (req, res) => {
  try {
    const { name, answers } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Participant name is required.' });
    }

    const trimmedName = name.trim();

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Assessment answers are required.' });
    }

    // Calculate scores on the secure backend
    const { results, detailedAnswers } = calculateServerScores(answers);

    const now = new Date();
    const responseId = generateResponseId();

    const record: AssessmentRecord = {
      responseId,
      name: trimmedName,
      timestamp: now.toISOString(),
      formattedDate: formatDate(now),
      answers: detailedAnswers,
      results
    };

    const currentRecords = loadAssessments();
    currentRecords.unshift(record);
    saveAssessments(currentRecords);

    // IMPORTANT: Return ONLY confirmation, NEVER send back scores to participant
    res.json({
      success: true,
      responseId,
      name: trimmedName
    });
  } catch (err: any) {
    console.error('Error submitting assessment:', err);
    res.status(500).json({ error: 'Internal server error while processing assessment.' });
  }
});

/* =========================================================================
   PRIVATE ADMIN AUTH & DASHBOARD ENDPOINTS
   ========================================================================= */

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeAdminTokens.add(token);

  res.json({
    success: true,
    token
  });
});

// Admin Logout
app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-admin-token'] as string;
  let token = customHeader;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (token) {
    activeAdminTokens.delete(token);
  }

  res.json({ success: true });
});

// Verify Admin Session
app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json({ authenticated: true });
});

// Get all assessments (Admin Only)
app.get('/api/admin/assessments', requireAdmin, (req, res) => {
  const records = loadAssessments();
  res.json({
    total: records.length,
    assessments: records
  });
});

// Get single assessment with all 36 detailed responses (Admin Only)
app.get('/api/admin/assessments/:responseId', requireAdmin, (req, res) => {
  const { responseId } = req.params;
  const records = loadAssessments();
  const assessment = records.find((r) => r.responseId === responseId);

  if (!assessment) {
    return res.status(404).json({ error: 'Assessment not found.' });
  }

  res.json({ assessment });
});

// Get aggregate analytics (Admin Only)
app.get('/api/admin/analytics', requireAdmin, (req, res) => {
  const records = loadAssessments();
  const analytics = computeAnalytics(records);
  res.json({ analytics });
});

// Delete an assessment record (Admin Only)
app.delete('/api/admin/assessments/:responseId', requireAdmin, (req, res) => {
  const { responseId } = req.params;
  let records = loadAssessments();
  const initialLength = records.length;
  records = records.filter((r) => r.responseId !== responseId);

  if (records.length === initialLength) {
    return res.status(404).json({ error: 'Assessment not found.' });
  }

  saveAssessments(records);
  res.json({ success: true, remaining: records.length });
});

/* =========================================================================
   VITE MIDDLEWARE / STATIC ASSETS
   ========================================================================= */

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Inner Balance Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
