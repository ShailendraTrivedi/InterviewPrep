import express from 'express';
import cors from 'cors';
import categoryController from './controller/categoryController';
import groupController from './controller/groupController';
import topicController from './controller/topicController';
import questionController from './controller/questionController';
import pageController from './controller/pageController';
import { globalExceptionHandler } from './exception/globalExceptionHandler';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'InterviewPrep API' });
});

app.use('/api/categories', categoryController);
app.use('/api/groups', groupController);
app.use('/api/topics', topicController);
app.use('/api/questions', questionController);
app.use('/api/page', pageController);

app.use(globalExceptionHandler);

export default app;
