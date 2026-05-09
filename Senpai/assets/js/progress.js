/* ============================================================
   Senpai — progress.js
   Quản lý tiến độ học tập qua LocalStorage
   ============================================================ */

const STORAGE_KEY = 'senpai_progress';

/** Lưu danh sách bài đã hoàn thành vào LocalStorage */
function _saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Đọc dữ liệu tiến độ từ LocalStorage */
function _loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

/**
 * Đánh dấu bài học đã hoàn thành
 * @param {string} lessonId - VD: "L2-EMAIL-01"
 */
function markLessonComplete(lessonId) {
  const data = _loadProgress();
  data[lessonId] = { completedAt: new Date().toISOString() };
  _saveProgress(data);
  _updateUI(lessonId);
}

/**
 * Kiểm tra bài học đã hoàn thành chưa
 * @param {string} lessonId
 * @returns {boolean}
 */
function isLessonComplete(lessonId) {
  return !!_loadProgress()[lessonId];
}

/**
 * Lấy danh sách tất cả bài đã hoàn thành
 * @returns {string[]} Mảng lessonId đã hoàn thành
 */
function getCompletedLessons() {
  return Object.keys(_loadProgress());
}

/**
 * Tính % hoàn thành của một tập bài
 * @param {string[]} allLessonIds - Tổng danh sách bài trong module/stage
 * @returns {number} 0-100
 */
function calculateProgress(allLessonIds) {
  if (!allLessonIds || allLessonIds.length === 0) return 0;
  const completed = getCompletedLessons();
  const done = allLessonIds.filter(id => completed.includes(id)).length;
  return Math.round((done / allLessonIds.length) * 100);
}

/**
 * Xóa toàn bộ tiến độ (dùng để test hoặc học lại)
 */
function resetProgress() {
  if (confirm('Bạn có chắc muốn xóa toàn bộ tiến độ học tập? Hành động này không thể hoàn tác.')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

/**
 * Tìm bài học đầu tiên chưa hoàn thành trong danh sách
 * @param {string[]} lessonIds
 * @returns {string|null}
 */
function getNextLesson(lessonIds) {
  const completed = getCompletedLessons();
  return lessonIds.find(id => !completed.includes(id)) || null;
}

/** Cập nhật UI sau khi đánh dấu hoàn thành */
function _updateUI(lessonId) {
  const btn = document.querySelector('.complete-btn');
  if (btn) {
    btn.classList.add('completed');
    btn.textContent = '✅ Đã hoàn thành';
    btn.disabled = true;
  }
  // Cập nhật progress bar nếu có
  const progressFill = document.querySelector('.progress-bar__fill');
  if (progressFill && window.MODULE_LESSONS) {
    const pct = calculateProgress(window.MODULE_LESSONS);
    progressFill.style.width = pct + '%';
  }
}

/** Khởi tạo trạng thái UI khi tải trang */
function initProgressUI(lessonId) {
  if (isLessonComplete(lessonId)) {
    const btn = document.querySelector('.complete-btn');
    if (btn) {
      btn.classList.add('completed');
      btn.textContent = '✅ Đã hoàn thành';
      btn.disabled = true;
    }
  }
}
