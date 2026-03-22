import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import categoryController from './controller/categoryController';
import groupController from './controller/groupController';
import topicController from './controller/topicController';
import questionController from './controller/questionController';
import pageController from './controller/pageController';
import { globalExceptionHandler } from './exception/globalExceptionHandler';
import { sendLandingPage, sendHtmlNotFound } from './landingPage';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.get('/', sendLandingPage);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'InterviewPrep API' });
});

/**
 * Vercel serverless invokes `app` without running `index.ts`, so `connectDB()` never runs unless
 * we connect here. Local `npm start` still connects in index.ts first; this is a no-op if already connected.
 */
async function ensureMongoConnected(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.path.startsWith('/api')) {
    next();
    return;
  }
  if (req.path === '/api/health') {
    next();
    return;
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
}

app.use(ensureMongoConnected);

app.use('/api/categories', categoryController);
app.use('/api/groups', groupController);
app.use('/api/topics', topicController);
app.use('/api/questions', questionController);
app.use('/api/page', pageController);

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  sendHtmlNotFound(req, res);
});

app.use(globalExceptionHandler);

export default app;
