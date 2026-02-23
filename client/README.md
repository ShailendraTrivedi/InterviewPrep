# InterviewPrep Platform — Client

Frontend for **InterviewPrep Platform**: browse interview questions by category/group/topic, add and edit questions (Markdown), and run quizzes.

---

## Tech stack

- **React** (functional components, hooks)
- **Vite** (build and dev server)
- **TypeScript**
- **React Router** (routing)
- **Redux** (state; sagas for async)
- **Tailwind CSS** (styling)
- **ReactMarkdown** (question and answer Markdown)

---

## Where page URLs (routes) are defined

All routes are declared in **`src/App.tsx`** inside `<Routes>`. Order matters: more specific paths must come before parameterized ones (e.g. `/add-question` before `/:categoryId`).

---

## Full route and page reference

| URL (path) | Component | File | Description |
|------------|-----------|------|-------------|
| `/` | `HomePage` | `src/pages/HomePage.tsx` | Home: list categories, hero, features, CTA. |
| `/add-question` | `AddQuestionPage` | `src/pages/AddQuestionPage.tsx` | Form to create a question: Category → Group → Topic, Question (MD with Code/Preview), Answer (MD with Code/Preview). |
| `/update-question/:questionId` | `UpdateQuestionPage` | `src/pages/UpdateQuestionPage.tsx` | Same form as Add Question, pre-filled; edit category, group, topic, question, answer. |
| `/start-quiz` | `StartQuizPage` | `src/pages/StartQuizPage.tsx` | Select topics (search + multi-select), then quiz: one random question at a time, show/hide answer, next. |
| `/:categoryId` | `CategoryPage` | `src/pages/CategoryPage.tsx` | Single category: list groups (e.g. Frontend, Backend). Uses slug in URL (e.g. `/development`). |
| `/:categoryId/:groupSlug` | `TopicPage` | `src/pages/TopicPage.tsx` | Single group: list topics. Example: `/development/frontend`. |
| `/:categoryId/:groupSlug/:itemSlug` | `ItemPage` | `src/pages/ItemPage.tsx` | Single topic: list questions/answers (expandable cards). Edit (pencil) → `/update-question/:questionId`. Example: `/development/frontend/javascript`. |

**Route params:**

- `categoryId` — category slug (e.g. `development`)
- `groupSlug` — group slug (e.g. `frontend`)
- `itemSlug` — topic slug (e.g. `javascript`)
- `questionId` — MongoDB question id (24-char hex), used only for update page

---

## Where API calls are made

All HTTP calls to the server go through **`src/redux/service/contentService.ts`**:

- **Content:** `getCategories`, `getCategoryById`, `getCategoryByName`, `getGroups`, `getGroupBySlug`, `getTopics`, `getTopicBySlug`, `getQuestions`, `getQuestionsByTopicIds`, `getQuestionById`
- **Mutations:** `createQuestion`, `updateQuestion`
- **Page payloads:** `getCategoryPage`, `getGroupPage`, `getTopicPage`

Base URL: `VITE_API_URL` from env, or `http://localhost:5000`.

Redux saga **`src/redux/saga/contentSaga.ts`** listens for actions and uses `contentService` for category/group/topic/page fetches. Some pages (e.g. Add Question, Start Quiz) call `contentService` directly without Redux.

---

## Folder structure

```
client/
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx                 # Entry: React root, Redux Provider, Router
│   ├── App.tsx                  # Navbar + <Routes> (all page URLs)
│   ├── index.css                # Tailwind + global/components (e.g. .markdown-content)
│   ├── pages/                   # One component per screen (route)
│   │   ├── HomePage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── TopicPage.tsx
│   │   ├── ItemPage.tsx
│   │   ├── AddQuestionPage.tsx
│   │   ├── UpdateQuestionPage.tsx
│   │   └── StartQuizPage.tsx
│   ├── components/
│   │   ├── Navbar.tsx            # Logo, links: Add question, Start Quiz
│   │   ├── Hero.tsx
│   │   ├── Categories.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── redux/
│   │   ├── store/index.ts       # Store (root reducer, saga middleware)
│   │   ├── action/contentActions.ts
│   │   ├── constant/contentConstants.ts
│   │   ├── reducer/contentReducer.ts
│   │   ├── saga/contentSaga.ts
│   │   ├── service/contentService.ts   # All API calls
│   │   └── index.ts              # Re-exports (store, actions, selectors, etc.)
│   ├── hooks/
│   │   └── useProgress.ts        # Track “Done” on questions (e.g. localStorage)
│   ├── constants.ts               # UI config (features, footerLinks, socialLinks)
│   └── assets/
│       └── logo.svg
└── README.md                    # This file
```

---

## Run and build

```bash
cd client
npm install
npm run dev      # Dev server (e.g. http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

Optional: set **`VITE_API_URL`** in `.env` to the server base URL (default `http://localhost:5000`).
