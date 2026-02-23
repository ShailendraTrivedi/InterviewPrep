import * as categoryRepository from '../repository/categoryRepository';
import { mapCategory, mapCategoryList } from '../dto/category.dto';

export async function getAll() {
  const docs = await categoryRepository.findAll();
  return mapCategoryList(docs);
}

export async function getById(id: string) {
  const doc = await categoryRepository.findById(id);
  return mapCategory(doc);
}

export async function getByName(name: string) {
  const doc = await categoryRepository.findByName(name);
  return mapCategory(doc);
}
