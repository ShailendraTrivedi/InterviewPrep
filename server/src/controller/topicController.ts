import { Router, Request, Response } from 'express';
import * as topicService from '../service/topicService';

const router = Router();

async function getAll(req: Request, res: Response) {
  try {
    const groupId = req.query.groupId as string | undefined;
    const search = (req.query.search as string)?.trim();
    const includeQuestionCount = req.query.includeQuestionCount === 'true';

    if (search) {
      const topics = await topicService.getBySearch(search);
      return res.json(topics);
    }
    const topics = groupId
      ? await topicService.getByGroupId(groupId, { includeQuestionCount })
      : await topicService.getAll();
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
}

async function getBySlug(req: Request, res: Response) {
  try {
    const topic = await topicService.getBySlug(req.params.groupId, req.params.name);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
}

router.get('/', getAll);
router.get('/by-slug/:groupId/:name', getBySlug);

export default router;
