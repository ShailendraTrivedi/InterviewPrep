# InterviewPrep Platform — Server

REST API for **InterviewPrep Platform**. Serves categories, groups, topics, and questions from MongoDB. Supports creating/updating questions, searching topics, and fetching questions by one or many topics.

---

## Tech stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Zod** (request validation)

---

## Where endpoints are defined

All API routes are mounted in **`src/app.ts`**. Each resource has its own controller file under **`src/controller/`**:

| Base path           | Controller file                  | Mount in app.ts                    |
|---------------------|----------------------------------|------------------------------------|
| (none)              | —                                | `GET /api/health` (inline in app)  |
| `/api/categories`   | `categoryController.ts`          | `app.use('/api/categories', ...)`  |
| `/api/groups`       | `groupController.ts`             | `app.use('/api/groups', ...)`      |
| `/api/topics`       | `topicController.ts`             | `app.use('/api/topics', ...)`      |
| `/api/questions`    | `questionController.ts`          | `app.use('/api/questions', ...)`   |
| `/api/page`         | `pageController.ts`              | `app.use('/api/page', ...)`        |

---

## Full API reference

### Health

| Method | Path           | Body | Response |
|--------|----------------|------|----------|
| GET    | `/api/health`  | —    | `{ status: "ok", message: "InterviewPrep API" }` |

Defined in **`src/app.ts`** (not in a controller).

---

### Categories

**Controller:** `src/controller/categoryController.ts`

| Method | Path                         | Params      | Query | Body | Response |
|--------|------------------------------|-------------|-------|------|----------|
| GET    | `/api/categories`            | —           | —     | —    | `CategoryResponse[]` |
| GET    | `/api/categories/by-name/:name` | `name`   | —     | —    | `CategoryResponse` or 404 |
| GET    | `/api/categories/:id`        | `id`        | —     | —    | `CategoryResponse` or 404 |

**CategoryResponse:** `{ id: string; name: string; title: string; icon: string }`

---

### Groups

**Controller:** `src/controller/groupController.ts`

| Method | Path                                | Params        | Query | Body | Response |
|--------|-------------------------------------|---------------|-------|------|----------|
| GET    | `/api/groups`                       | —             | `categoryId?`, `includeTopicCount?` (= `"true"`) | — | `GroupResponse[]` |
| GET    | `/api/groups/by-slug/:categoryId/:name` | `categoryId`, `name` | — | — | `GroupResponse` or 404 |

**GroupResponse:** `{ id: string; categoryId: string; name: string; title: string; icon: string; topicCount?: number }`

---

### Topics

**Controller:** `src/controller/topicController.ts`

| Method | Path                             | Params  | Query | Body | Response |
|--------|----------------------------------|---------|-------|------|----------|
| GET    | `/api/topics`                    | —       | `groupId?`, `search?`, `includeQuestionCount?` (= `"true"`) | — | `TopicResponse[]` |
| GET    | `/api/topics/by-slug/:groupId/:name` | `groupId`, `name` | — | — | `TopicResponse` or 404 |

- If `search` is set (non-empty string), results are filtered by title/name (case-insensitive); `groupId` is ignored.
- Without `groupId` and without `search`: returns all topics.

**TopicResponse:** `{ id: string; groupId: string; categoryId: string; name: string; title: string; questionCount?: number }`

---

### Questions

**Controller:** `src/controller/questionController.ts`  
**Validation:** `src/validation/questionValidation.ts`

| Method | Path                           | Params   | Query | Body | Response |
|--------|--------------------------------|----------|-------|------|----------|
| GET    | `/api/questions`               | —        | `topicId?` (single or multiple) | — | `QuestionResponse[]` |
| GET    | `/api/questions/:id`           | `id`     | —     | —    | `QuestionResponse & { categoryName, groupName, topicName }` or 404 |
| POST   | `/api/questions`               | —        | —     | Create body (see below) | `QuestionResponse` 201 or 400/404 |
| PUT    | `/api/questions/:id`           | `id`     | —     | Create body (same as POST) | `QuestionResponse` or 400/404 |
| POST   | `/api/questions/by-topics`     | —        | —     | `{ topicIds: string[] }` | `QuestionResponse[]` or 400 |

**Create/Update body (Zod `createQuestionSchema`):**

- `topicId`: string, 24-char hex (MongoDB ObjectId)
- `question`: string, non-empty, trimmed (Markdown supported)
- `answer`: string, non-empty, trimmed (Markdown supported)

**By-topics body (Zod `questionsByTopicIdsSchema`):**

- `topicIds`: array of 24-char hex strings, at least one

**QuestionResponse:** `{ id: string; categoryId: string; groupId: string; topicId: string; question: string; answer: string }`

---

### Page (slug-based payloads)

**Controller:** `src/controller/pageController.ts`

| Method | Path                                                                 | Params | Response |
|--------|----------------------------------------------------------------------|--------|----------|
| GET    | `/api/page/category/:name`                                          | `name` | `{ category: CategoryResponse; groups: GroupResponse[] }` or 404 |
| GET    | `/api/page/category/:categoryName/group/:groupName`                  | `categoryName`, `groupName` | `{ category; group; topics: TopicResponse[] }` or 404 |
| GET    | `/api/page/category/:categoryName/group/:groupName/topic/:topicName`| `categoryName`, `groupName`, `topicName` | `{ category; group; topic; questions: QuestionResponse[] }` or 404 |

Uses **slug** values (`name`), not IDs (e.g. `development`, `javascript`, `variables`).

---

## Folder structure

```
server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Entry: connect DB, start Express
│   ├── app.ts                 # Express app, CORS, JSON, route mounting, global error handler
│   ├── config/
│   │   ├── index.ts           # Config (PORT, etc.)
│   │   └── db.ts              # MongoDB connection
│   ├── controller/            # Routes + handlers (one file per resource)
│   │   ├── categoryController.ts
│   │   ├── groupController.ts
│   │   ├── topicController.ts
│   │   ├── questionController.ts
│   │   └── pageController.ts
│   ├── service/               # Business logic
│   │   ├── categoryService.ts
│   │   ├── groupService.ts
│   │   ├── topicService.ts
│   │   ├── questionService.ts
│   │   └── pageService.ts
│   ├── repository/           # Data access (Mongoose)
│   │   ├── categoryRepository.ts
│   │   ├── groupRepository.ts
│   │   ├── topicRepository.ts
│   │   └── questionRepository.ts
│   ├── model/                 # Mongoose schemas
│   │   ├── Category.ts
│   │   ├── Group.ts
│   │   ├── Topic.ts
│   │   └── Question.ts
│   ├── dto/                   # Response types + mappers (_id → id, etc.)
│   │   ├── category.dto.ts
│   │   ├── group.dto.ts
│   │   ├── topic.dto.ts
│   │   └── question.dto.ts
│   ├── validation/
│   │   └── questionValidation.ts   # Zod schemas for question create/update and by-topics
│   ├── util/
│   │   └── toResponse.ts      # Lean doc → API shape (id, string refs)
│   └── exception/
│       └── globalExceptionHandler.ts    # Central error handler
└── README.md                  # This file
```

---

## Setup

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and set:

- `PORT` (default `5000`)
- `MONGODB_URI` (e.g. `mongodb://localhost:27017/interviewprep` or Atlas URI)

**Atlas / `querySrv ECONNREFUSED`:** The `mongodb+srv://` URI performs a DNS SRV lookup. If that fails (firewall, VPN, DNS, some corporate networks), use Atlas **Connect → Drivers → Standard connection string** (`mongodb://…`) instead, or use a local MongoDB URI for development.

MongoDB must be running with your collections and documents available to the API.

## Scripts

- `npm run dev` — Start with hot reload (ts-node-dev)
- `npm run build` — Compile TypeScript to `dist/`
- `npm start` — Run `dist/index.js`
