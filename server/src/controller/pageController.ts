import { Router, Request, Response } from 'express';
import * as pageService from '../service/pageService';

const router = Router();

/** GET /api/page/category/:name → { category, groups } */
async function getCategoryPage(req: Request, res: Response) {
  try {
    const data = await pageService.getCategoryPage(req.params.name);
    if (!data) return res.status(404).json({ error: 'Category not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load page' });
  }
}

/** GET /api/page/category/:categoryName/group/:groupName → { category, group, topics } */
async function getGroupPage(req: Request, res: Response) {
  try {
    const data = await pageService.getGroupPage(req.params.categoryName, req.params.groupName);
    if (!data) return res.status(404).json({ error: 'Page not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load page' });
  }
}

/** GET /api/page/category/:categoryName/group/:groupName/topic/:topicName → { category, group, topic, questions } */
async function getTopicPage(req: Request, res: Response) {
  try {
    const data = await pageService.getTopicPage(
      req.params.categoryName,
      req.params.groupName,
      req.params.topicName
    );
    if (!data) return res.status(404).json({ error: 'Page not found' });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load page' });
  }
}

router.get('/category/:name', getCategoryPage);
router.get('/category/:categoryName/group/:groupName', getGroupPage);
router.get('/category/:categoryName/group/:groupName/topic/:topicName', getTopicPage);

export default router;
