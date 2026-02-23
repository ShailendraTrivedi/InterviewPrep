import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { TopicPage } from './pages/TopicPage';
import { ItemPage } from './pages/ItemPage';
import { AddQuestionPage } from './pages/AddQuestionPage';
import { StartQuizPage } from './pages/StartQuizPage';
import { UpdateQuestionPage } from './pages/UpdateQuestionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
        <Route path="/update-question/:questionId" element={<UpdateQuestionPage />} />
        <Route path="/start-quiz" element={<StartQuizPage />} />
        <Route path="/:categoryId" element={<CategoryPage />} />
        <Route path="/:categoryId/:groupSlug" element={<TopicPage />} />
        <Route path="/:categoryId/:groupSlug/:itemSlug" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}
