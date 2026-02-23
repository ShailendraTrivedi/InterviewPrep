import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { contentService } from '../redux/service/contentService';
import type { TopicResponse, QuestionResponse } from '../redux/service/contentService';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function StartQuizPage() {
  const [step, setStep] = useState<'select' | 'quiz'>('select');
  const [allTopics, setAllTopics] = useState<TopicResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TopicResponse[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [startLoading, setStartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayedTopics = searchQuery.trim() ? searchResults : allTopics;

  useEffect(() => {
    contentService
      .getTopics(undefined, true)
      .then(setAllTopics)
      .catch(() => setError('Failed to load topics'))
      .finally(() => setTopicsLoading(false));
  }, []);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const timer = setTimeout(() => {
      contentService
        .getTopics(undefined, false, q)
        .then(setSearchResults)
        .catch(() => setSearchResults([]))
        .finally(() => setSearchLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function toggleTopic(id: string) {
    setSelectedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelectedTopicIds(new Set(allTopics.map((t) => t.id)));
  }

  function clearSelection() {
    setSelectedTopicIds(new Set());
  }

  function selectFiltered() {
    if (displayedTopics.length === 0) return;
    setSelectedTopicIds((prev) => {
      const next = new Set(prev);
      displayedTopics.forEach((t) => next.add(t.id));
      return next;
    });
  }

  async function handleStart() {
    const ids = Array.from(selectedTopicIds);
    if (ids.length === 0) {
      setError('Please select at least one topic.');
      return;
    }
    setError(null);
    setStartLoading(true);
    try {
      const list = await contentService.getQuestionsByTopicIds(ids);
      const shuffled = shuffle(list);
      setQuestions(shuffled);
      setCurrentIndex(0);
      setAnswerRevealed(false);
      setStep('quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setStartLoading(false);
    }
  }

  function handleNext() {
    setAnswerRevealed(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleChooseTopics() {
    setStep('select');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswerRevealed(false);
  }

  if (topicsLoading && allTopics.length === 0) {
    return (
      <main className="section-spacing">
        <div className="container-narrow text-text-secondary">Loading…</div>
      </main>
    );
  }

  if (step === 'select') {
    return (
      <main className="section-spacing">
        <div className="container-narrow max-w-2xl">
          <Link to="/" className="text-primary hover:underline text-sm mb-4 sm:mb-6 inline-block py-1">
            ← Back to Home
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">Start Quiz</h1>
          <p className="text-sm text-text-secondary mb-6">
            Select one or more topics from the list below. Questions from your selected topics will be mixed and shown
            randomly—click to reveal the answer, then go to the next.
          </p>

          <div className="mb-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics…"
              aria-label="Search topics"
              className="input-base w-full mb-3"
            />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={selectAll} className="btn-secondary text-sm py-2 px-4">
                Select all
              </button>
              {searchQuery.trim() && displayedTopics.length > 0 && (
                <button type="button" onClick={selectFiltered} className="btn-secondary text-sm py-2 px-4">
                  Select filtered ({displayedTopics.length})
                </button>
              )}
              <button type="button" onClick={clearSelection} className="btn-secondary text-sm py-2 px-4">
                Clear
              </button>
            </div>
          </div>

          {searchQuery.trim() && (
            <p className="text-sm text-text-secondary mb-2">
              {searchLoading ? 'Searching…' : `Showing ${searchResults.length} of ${allTopics.length} topics`}
            </p>
          )}

          <ul className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto border border-gray-200 rounded-lg p-3 mb-6">
            {searchLoading && searchQuery.trim() ? (
              <li className="text-text-secondary text-sm py-4 text-center">Searching…</li>
            ) : displayedTopics.length === 0 ? (
              <li className="text-text-secondary text-sm py-4 text-center">
                {searchQuery.trim() ? `No topics match "${searchQuery.trim()}"` : 'No topics'}
              </li>
            ) : (
              displayedTopics.map((topic) => (
              <li key={topic.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`topic-${topic.id}`}
                  checked={selectedTopicIds.has(topic.id)}
                  onChange={() => toggleTopic(topic.id)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <label
                  htmlFor={`topic-${topic.id}`}
                  className="flex-1 cursor-pointer text-text-primary font-medium select-none"
                >
                  {topic.title}
                </label>
                {topic.questionCount != null && (
                  <span className="text-xs text-text-secondary">({topic.questionCount} questions)</span>
                )}
              </li>
            ))
            )}
          </ul>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200" role="alert">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleStart}
            className="btn-primary py-3 px-6 w-full sm:w-auto"
            disabled={selectedTopicIds.size === 0 || startLoading}
          >
            {startLoading ? 'Loading…' : `Start (${selectedTopicIds.size} topic${selectedTopicIds.size !== 1 ? 's' : ''} selected)`}
          </button>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="section-spacing">
        <div className="container-narrow max-w-2xl">
          <p className="text-text-secondary mb-4">No questions in the selected topics yet.</p>
          <button type="button" onClick={handleChooseTopics} className="btn-secondary py-2.5 px-5">
            Choose topics again
          </button>
        </div>
      </main>
    );
  }

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <main className="section-spacing">
      <div className="container-narrow max-w-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={handleChooseTopics}
            className="text-primary hover:underline text-sm py-1"
          >
            ← Choose topics
          </button>
          <span className="text-sm text-text-secondary">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="card">
          <div className="markdown-content text-text-primary font-medium mb-4">
            <ReactMarkdown>{question.question}</ReactMarkdown>
          </div>

          {!answerRevealed ? (
            <button
              type="button"
              onClick={() => setAnswerRevealed(true)}
              className="text-primary font-medium text-sm hover:underline py-2"
            >
              Show answer
            </button>
          ) : (
            <div className="border-t border-gray-100 pt-4 mt-2 markdown-content text-text-secondary text-sm sm:text-base">
              <ReactMarkdown>{question.answer}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {!isLast ? (
            <button type="button" onClick={handleNext} className="btn-primary py-3 px-6">
              Next question
            </button>
          ) : (
            <p className="text-text-secondary text-sm">You’ve reached the end of this quiz.</p>
          )}
          <button type="button" onClick={handleChooseTopics} className="btn-secondary py-3 px-6">
            Choose topics again
          </button>
        </div>
      </div>
    </main>
  );
}
