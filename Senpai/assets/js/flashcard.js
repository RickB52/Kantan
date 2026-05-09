/* ============================================================
   Senpai — flashcard.js
   Hệ thống flashcard từ vựng Nhật-Việt
   ============================================================ */

const FC_STORAGE_KEY = 'senpai_flashcards';
let _cards    = [];
let _current  = 0;
let _isFlipped = false;

function _loadFCData() {
  try { return JSON.parse(localStorage.getItem(FC_STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function _saveFCData(data) { localStorage.setItem(FC_STORAGE_KEY, JSON.stringify(data)); }

/**
 * Khởi tạo flashcard deck
 * @param {Array} cards - [{id, front:{jp,reading}, back:{vi,example}}]
 */
function initFlashcards(cards) {
  _cards   = cards;
  _current = 0;
  _isFlipped = false;
  _renderCard();
  _updateCounter();
}

function _renderCard() {
  const card = _cards[_current];
  if (!card) return;
  const fcEl = document.querySelector('.flashcard');
  if (!fcEl) return;
  fcEl.classList.remove('flipped');
  _isFlipped = false;
  const frontEl = fcEl.querySelector('.flashcard__front');
  const backEl  = fcEl.querySelector('.flashcard__back');
  if (frontEl) frontEl.innerHTML = `
    <div class="flashcard__jp">${card.front.jp}</div>
    <div class="flashcard__reading">${card.front.reading || ''}</div>
  `;
  if (backEl) backEl.innerHTML = `
    <div class="flashcard__vi">${card.back.vi}</div>
    ${card.back.example ? `<div class="flashcard__example jp-text">${card.back.example}</div>` : ''}
  `;
  // Restore known/difficult status
  const data = _loadFCData();
  const status = data[card.id];
  const knowBtn = document.querySelector('[data-action="known"]');
  const diffBtn = document.querySelector('[data-action="difficult"]');
  if (knowBtn) knowBtn.classList.toggle('active', status === 'known');
  if (diffBtn) diffBtn.classList.toggle('active', status === 'difficult');
}

/** Lật thẻ Nhật ↔ Việt */
function flipCard() {
  const fcEl = document.querySelector('.flashcard');
  if (!fcEl) return;
  _isFlipped = !_isFlipped;
  fcEl.classList.toggle('flipped', _isFlipped);
}

/** Sang thẻ tiếp theo */
function nextCard() {
  if (_current < _cards.length - 1) { _current++; _renderCard(); _updateCounter(); }
}

/** Quay lại thẻ trước */
function prevCard() {
  if (_current > 0) { _current--; _renderCard(); _updateCounter(); }
}

function _updateCounter() {
  const el = document.querySelector('.flashcard-counter');
  if (el) el.textContent = `${_current + 1} / ${_cards.length}`;
}

/**
 * Đánh dấu từ đã nhớ
 * @param {string} cardId
 */
function markWordKnown(cardId) {
  const id   = cardId || _cards[_current]?.id;
  const data = _loadFCData();
  data[id]   = 'known';
  _saveFCData(data);
  _renderCard();
}

/**
 * Đánh dấu từ khó cần ôn lại
 * @param {string} cardId
 */
function markWordDifficult(cardId) {
  const id   = cardId || _cards[_current]?.id;
  const data = _loadFCData();
  data[id]   = 'difficult';
  _saveFCData(data);
  _renderCard();
}

/**
 * Lấy danh sách từ cần ôn lại
 * @returns {Array} cards có status = 'difficult'
 */
function getDifficultWords() {
  const data = _loadFCData();
  return _cards.filter(c => data[c.id] === 'difficult');
}

/**
 * Chế độ ôn lại — chỉ hiện các từ khó
 */
function reviewDifficultWords() {
  const difficult = getDifficultWords();
  if (difficult.length === 0) { alert('Chưa có từ nào được đánh dấu khó!'); return; }
  initFlashcards(difficult);
}
