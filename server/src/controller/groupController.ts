import { Router, Request, Response } from 'express';
import * as groupService from '../service/groupService';

const router = Router();

async function getAll(req: Request, res: Response) {
  try {
    const categoryId = req.query.categoryId as string | undefined;
    const includeTopicCount = req.query.includeTopicCount === 'true';

    const groups = categoryId
      ? await groupService.getByCategoryId(categoryId, { includeTopicCount })
      : await groupService.getAll();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
}

async function getBySlug(req: Request, res: Response) {
  try {
    const group = await groupService.getBySlug(req.params.categoryId, req.params.name);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch group' });
  }
}

router.get('/', getAll);
router.get('/by-slug/:categoryId/:name', getBySlug);

export default router;
