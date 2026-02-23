import { Router, Request, Response } from 'express';
import * as categoryService from '../service/categoryService';

const router = Router();

async function getAll(_req: Request, res: Response) {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

async function getByName(req: Request, res: Response) {
  try {
    const category = await categoryService.getByName(req.params.name);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

router.get('/', getAll);
router.get('/by-name/:name', getByName);
router.get('/:id', getById);

export default router;
