import { Router, Request, Response } from 'express';
import { ZodIssue } from 'zod';
import * as questionService from '../service/questionService';
import { createQuestionSchema, questionsByTopicIdsSchema } from '../validation/questionValidation';

const router = Router();

async function getAll(req: Request, res: Response) {
  try {
    const topicIdParam = req.query.topicId;
    const topicIds = topicIdParam === undefined
      ? undefined
      : Array.isArray(topicIdParam)
        ? (topicIdParam as string[])
        : [topicIdParam as string];
    if (topicIds && topicIds.length > 0) {
      const questions =
        topicIds.length === 1
          ? await questionService.getByTopicId(topicIds[0])
          : await questionService.getByTopicIds(topicIds);
      return res.json(questions);
    }
    const questions = await questionService.getAll();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const question = await questionService.getById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
}

async function create(req: Request, res: Response) {
  try {
    const parsed = createQuestionSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues.map((e: ZodIssue) => `${e.path.join('.')}: ${e.message}`).join('; ');
      return res.status(400).json({ error: message });
    }
    const { topicId, question, answer } = parsed.data;
    const created = await questionService.create(topicId, question, answer);
    if (!created) return res.status(404).json({ error: 'Topic not found' });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create question' });
  }
}

async function getByTopicIds(req: Request, res: Response) {
  try {
    const parsed = questionsByTopicIdsSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues.map((e: ZodIssue) => `${e.path.join('.')}: ${e.message}`).join('; ');
      return res.status(400).json({ error: message });
    }
    const questions = await questionService.getByTopicIds(parsed.data.topicIds);
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const parsed = createQuestionSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues.map((e: ZodIssue) => `${e.path.join('.')}: ${e.message}`).join('; ');
      return res.status(400).json({ error: message });
    }
    const { topicId, question, answer } = parsed.data;
    const updated = await questionService.update(id, topicId, question, answer);
    if (!updated) return res.status(404).json({ error: 'Question or topic not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update question' });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const deleted = await questionService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Question not found' });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
}

router.post('/', create);
router.post('/by-topics', getByTopicIds);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/', getAll);
router.get('/:id', getById);

export default router;
