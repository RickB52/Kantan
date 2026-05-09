/* ============================================================
   Senpai — quiz.js
   Quiz trắc nghiệm tương tác cho từng bài học
   ============================================================ */

let _quizData = [];
let _answers  = {};

/**
 * Khởi tạo quiz từ data
 * @param {Array} questions - [{id, question, options:[{text,correct}], explanation}]
 */
function initQuiz(questions) {
  _quizData = questions;
  _answers  = {};
  _renderQuiz();
}

function _renderQuiz() {
  const container = document.querySelector('.quiz-container');
  if (!container) return;
  container.innerHTML = _quizData.map((q, i) => `
    <div class="quiz-question" data-id="${q.id}">
      <p class="quiz-question__text">${i + 1}. ${q.question}</p>
      <div class="quiz-options">
        ${q.options.map((opt, j) => `
          <button class="quiz-option" data-qid="${q.id}" data-idx="${j}" onclick="selectAnswer('${q.id}', ${j})">
            <span class="quiz-option__letter">${String.fromCharCode(65+j)}</span>
            <span class="quiz-option__text jp-text">${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="feedback-${q.id}"></div>
    </div>
  `).join('');
}

/**
 * Xử lý khi học viên chọn đáp án
 * @param {string} questionId
 * @param {number} optionIdx
 */
function selectAnswer(questionId, optionIdx) {
  if (_answers[questionId] !== undefined) return; // Đã chọn rồi, bỏ qua
  _answers[questionId] = optionIdx;

  const q = _quizData.find(q => q.id === questionId);
  const isCorrect = q.options[optionIdx].correct;

  // Lock tất cả options
  document.querySelectorAll(`[data-qid="${questionId}"]`).forEach(btn => {
    btn.disabled = true;
    const idx = parseInt(btn.dataset.idx);
    if (q.options[idx].correct) btn.classList.add('correct');
    else if (idx === optionIdx)  btn.classList.add('incorrect');
  });

  // Hiển thị feedback
  showInstantFeedback(questionId, isCorrect, q.explanation);
}

/**
 * Hiển thị feedback ngay lập tức sau khi chọn
 */
function showInstantFeedback(questionId, isCorrect, explanation) {
  const el = document.getElementById(`feedback-${questionId}`);
  if (!el) return;
  el.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
  el.innerHTML = isCorrect
    ? `✅ <strong>Đúng rồi!</strong>${explanation ? ' ' + explanation : ''}`
    : `❌ <strong>Chưa đúng.</strong>${explanation ? ' ' + explanation : ''}`;
}

/**
 * Tính điểm quiz (0-100)
 * @returns {number}
 */
function calculateQuizScore() {
  if (_quizData.length === 0) return 0;
  const correct = _quizData.filter(q => {
    const chosen = _answers[q.id];
    return chosen !== undefined && q.options[chosen].correct;
  }).length;
  return Math.round((correct / _quizData.length) * 100);
}

/**
 * Lưu score vào LocalStorage
 * @param {string} lessonId
 */
function saveQuizScore(lessonId) {
  const score = calculateQuizScore();
  const key   = `senpai_quiz_${lessonId}`;
  const prev  = JSON.parse(localStorage.getItem(key)) || {};
  const best  = Math.max(prev.best || 0, score);
  localStorage.setItem(key, JSON.stringify({ score, best, date: new Date().toISOString() }));
  return score;
}

/**
 * Cho phép làm lại quiz
 */
function retryQuiz() {
  _answers = {};
  _renderQuiz();
  const resultEl = document.querySelector('.quiz-result');
  if (resultEl) resultEl.style.display = 'none';
}

/**
 * Hiển thị kết quả quiz
 */
function showQuizResult(lessonId) {
  const score = saveQuizScore(lessonId);
  const resultEl = document.querySelector('.quiz-result');
  if (resultEl) {
    resultEl.style.display = 'block';
    const scoreEl = resultEl.querySelector('.quiz-result__score');
    if (scoreEl) scoreEl.textContent = score + '%';
    if (score >= 80 && typeof markLessonComplete === 'function') {
      markLessonComplete(lessonId);
    }
  }
}
