import { randomUUID } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const categories = JSON.parse(readFileSync(join(dataDir, 'categories.json'), 'utf8'));
const groups = JSON.parse(readFileSync(join(dataDir, 'groups.json'), 'utf8'));
const topicsIn = JSON.parse(readFileSync(join(dataDir, 'topics.json'), 'utf8'));
const questionsIn = JSON.parse(readFileSync(join(dataDir, 'questions.json'), 'utf8'));

const catIdByName = Object.fromEntries(categories.map((c) => [c.name, c.id]));
const grpIdByName = Object.fromEntries(groups.map((g) => [g.name, g.id]));

const topicIdByName = {};
const topicsOut = topicsIn.map((t) => {
  const id = randomUUID();
  topicIdByName[t.groupId + ':' + t.id] = id;
  return {
    id,
    groupId: grpIdByName[t.groupId],
    categoryId: catIdByName[t.categoryId],
    name: t.id,
    title: t.title,
  };
});
writeFileSync(join(dataDir, 'topics.json'), JSON.stringify(topicsOut, null, 2));

const topicIdByCatGroupName = {};
topicsOut.forEach((t) => {
  const g = groups.find((x) => x.id === t.groupId);
  const c = categories.find((x) => x.id === t.categoryId);
  if (g && c) topicIdByCatGroupName[c.name + ':' + g.name + ':' + t.name] = t.id;
});

const questionsOut = questionsIn.map((q) => ({
  id: randomUUID(),
  categoryId: catIdByName[q.categoryId],
  groupId: grpIdByName[q.groupId],
  topicId: topicIdByCatGroupName[q.categoryId + ':' + q.groupId + ':' + q.topicId],
  question: q.question,
  answer: q.answer,
}));
writeFileSync(join(dataDir, 'questions.json'), JSON.stringify(questionsOut, null, 2));

console.log('Generated topics.json and questions.json with UUIDs');
