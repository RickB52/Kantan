// Shared component for the SPA navbar
const renderSpaNavbar = () => `
    <nav class="navbar">
        <div class="container">
            <div class="navbar-left">
                <a href="#" onclick="window.location.hash=''" class="logo">JF Test</a>
                <span class="tagline">GLS Internal</span>
            </div>
            <div class="navbar-right">
                <span class="badge">Internal Only</span>
            </div>
        </div>
    </nav>
`;

// Shared component for the back button
const renderBackButton = (text, hash) => {
    if (hash) {
        return `<a href="${hash}" class="btn-back">${text}</a>`;
    }
    return `<button onclick="window.location.hash=''" class="btn-back">‹ Về trang chủ</button>`;
};

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function startCountdown(seconds, displayEl, onEnd) {
    let remaining = seconds;
    displayEl.textContent = formatTime(remaining);
    const interval = setInterval(() => {
        remaining--;
        displayEl.textContent = formatTime(remaining);
        if (remaining <= 30) displayEl.classList.add('urgent');
        if (remaining <= 0) {
            clearInterval(interval);
            onEnd();
        }
    }, 1000);
    return interval;
}

function initSlider(scope = document) {
    const deck = scope ? scope.querySelector('.slide-deck') : document.querySelector('.slide-deck');
    if (!deck) return;

    const slides = Array.from(deck.querySelectorAll('.slide'));
    const dots = Array.from(deck.querySelectorAll('.slide-dot'));
    let current = 0;
    let timerInterval = null;

    function goTo(n) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = n;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    deck.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-slide-action]');
        if (!btn) return;
        const action = btn.dataset.slideAction;

        if (action === 'next' && current < slides.length - 1) {
            goTo(current + 1);
        } else if (action === 'prev' && current > 0) {
            goTo(current - 1);
        } else if (action === 'start-timer') {
            const seconds = parseInt(btn.dataset.seconds || '60', 10);
            if (current + 1 < slides.length) {
                goTo(current + 1);
                const displayEl = slides[current].querySelector('.timer-display');
                if (displayEl) {
                    if (timerInterval) clearInterval(timerInterval);
                    timerInterval = startCountdown(seconds, displayEl, () => {
                        if (current < slides.length - 1) goTo(current + 1);
                    });
                }
            }
        } else if (action === 'skip-timer') {
            if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
            if (current < slides.length - 1) goTo(current + 1);
        }
    });

    goTo(0);
}

function renderHomepage(params) {
    // This function is no longer used, as the homepage is static in index.html.
    return '';
}

function renderProgramDetail({ program }) {
    const title = program.toUpperCase();
    const levelLabel = program === 'jf3' ? 'Advanced · N2-N1' : 'Foundation · N3-N2';
    return `
        ${renderSpaNavbar()}
        <div class="container">
            <header class="page-header reveal">
                ${renderBackButton('‹ Về trang chủ')}
                <h1>${title} <span style="font-size:1rem;color:var(--gray-400);font-weight:400">${levelLabel}</span></h1>
                <p>Chọn dạng bài luyện tập phù hợp với mục tiêu của bạn.</p>
            </header>
            <main class="category-cards-container reveal">
                <a href="#/${program}/roleplay" class="category-card glass-card">
                    <h3>🎭 RolePlay</h3>
                    <p>Luyện hội thoại tình huống business. Phản xạ với khách hàng Nhật / PM Nhật trong môi trường offshore IT.</p>
                    <span class="card-arrow">Bắt đầu luyện →</span>
                </a>
                <a href="#/${program}/presentation" class="category-card glass-card">
                    <h3>🎤 Presentation</h3>
                    <p>Luyện trình bày đề xuất, thuyết phục và giải thích vấn đề kỹ thuật bằng tiếng Nhật business.</p>
                    <span class="card-arrow">Bắt đầu luyện →</span>
                </a>
            </main>
        </div>
    `;
}

function renderExamList({ program, type }) {
    const data = type === 'roleplay' ? window.ROLEPLAY_DATA : window.PRESENTATION_DATA;
    const exams = data.filter(d => d.program === program);
    const title = `${program.toUpperCase()} - ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return `
        ${renderSpaNavbar()}
        <div class="container">
            <header class="page-header reveal">
                ${renderBackButton(`‹ Về ${program.toUpperCase()}`, `#/${program}`)}
                <h1>${title}</h1>
            </header>
            <main class="exam-list-container reveal">
                ${exams.map(exam => `
                    <a href="#/${program}/${type}/${exam.id}" class="exam-card glass-card">
                        <h4>${exam.id}. ${exam.titleJP}</h4>
                        <p>${exam.theme}</p>
                        <div class="badges">
                            <span class="badge">${exam.level}</span>
                            <span class="badge">${exam.category}</span>
                            <span class="badge">${exam.estimatedTime}</span>
                        </div>
                    </a>
                `).join('')}
                 ${exams.length === 0 ? `<p>No exams found for this category.</p>` : ''}
            </main>
        </div>
    `;
}


function renderRolePlayDetail({ exam }) {
    if (!exam) return `${renderSpaNavbar()}<div class="container"><h1>Exam not found</h1>${renderBackButton('‹ Về trang chủ')}</div>`;

    const prepSec = exam.timings ? exam.timings.prep : 120;
    const performSec = exam.timings ? exam.timings.perform : 180;
    const isJF3 = exam.program === 'jf3';

    const memoSlide = isJF3 && exam.answer.memo ? `
        <div class="slide">
          <div class="slide-header"><span class="slide-badge">Memo (2分準備)</span></div>
          <div class="slide-body">
            <div class="memo-grid">
              <div class="memo-item"><div class="memo-label">結論</div><p>${exam.answer.memo.conclusion}</p></div>
              <div class="memo-item"><div class="memo-label">根拠</div><p>${exam.answer.memo.basis}</p></div>
              <div class="memo-item"><div class="memo-label">リスク</div><p>${exam.answer.memo.risk}</p></div>
              <div class="memo-item"><div class="memo-label">対策</div><p>${exam.answer.memo.countermeasure}</p></div>
            </div>
          </div>
          <div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Xem Script →</button></div>
        </div>` : '';

    const vocabItems = (exam.answer.vocabulary || []).map(v =>
        `<div class="vocab-item"><span class="vocab-term">${v.term}</span><span class="vocab-meaning">${v.meaning}</span></div>`
    ).join('');
    const phraseItems = (exam.answer.phrases || []).map(p =>
        `<div class="phrase-item"><span class="phrase-text">${p.phrase}</span><span class="phrase-usage">${p.usage}</span></div>`
    ).join('');
    const whyItems = (exam.answer.whyGood || []).map(w => `<li>${w}</li>`).join('');
    const tipItems = (exam.answer.tips || []).map(t =>
        `<div class="tip-item"><div class="tip-title">${t.title}</div><div class="tip-example">${t.example}</div></div>`
    ).join('');
    const qaItems = (exam.answer.qa || []).map(item =>
        `<div class="qa-item"><div class="qa-q">Q: ${item.q}</div><div class="qa-a">A: ${item.a}</div></div>`
    ).join('');
    const taskItems = (exam.question.tasks || []).map((t, i) =>
        `<div class="task-item"><span class="task-num">${i + 1}</span><p>${t}</p></div>`
    ).join('');

    return `
        ${renderSpaNavbar()}
        <div class="container slide-deck-container">
          <div class="slide-deck">
            <div class="slide-dots">
              ${Array.from({ length: isJF3 ? 11 : 10 }, (_, i) => `<span class="slide-dot${i === 0 ? ' active' : ''}"></span>`).join('')}
            </div>
            <div class="slide active"><div class="slide-cover"><div class="exam-meta"><span class="badge badge-level">${exam.level}</span><span class="badge badge-program">${exam.program.toUpperCase()}</span><span class="badge badge-category">${exam.category}</span></div><h1 class="exam-title">${exam.titleJP}</h1><p class="exam-theme">${exam.theme}</p><div class="timings-display"><div class="timing-item"><span class="timing-label">準備</span><span class="timing-value">${prepSec / 60}分</span></div><div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">Roleplay</span><span class="timing-value">${performSec / 60}分</span></div></div><button class="btn-primary" data-slide-action="next">▶ Bắt đầu</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">状況 (Tình huống)</span></div><div class="slide-body"><p class="situation-text">${exam.question.situation}</p></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Tiếp theo →</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">役割 (Vai trò)</span></div><div class="slide-body"><div class="role-grid"><div class="role-you"><div class="role-label">あなた</div><p>${exam.question.role.you}</p></div><div class="role-partner"><div class="role-label">相手</div><p>${exam.question.role.partner}</p></div></div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Tiếp theo →</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">タスク (Nhiệm vụ)</span></div><div class="slide-body">${taskItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="start-timer" data-seconds="${prepSec}">▶ Bắt đầu chuẩn bị</button></div></div>
            <div class="slide timer-slide"><div class="timer-label">Chuẩn bị (${prepSec / 60} phút)</div><div class="timer-display">00:00</div><div class="slide-nav"><button data-slide-action="start-timer" data-seconds="${performSec}">▶ Bắt đầu Roleplay</button><button data-slide-action="skip-timer">⏭ Bỏ qua</button></div></div>
            <div class="slide timer-slide"><div class="timer-label">Roleplay (${performSec / 60} phút)</div><div class="timer-display">00:00</div><div class="slide-nav"><button data-slide-action="next">📖 Xem đáp án</button><button data-slide-action="skip-timer">⏹ Kết thúc</button></div></div>
            ${memoSlide}
            <div class="slide"><div class="slide-header"><span class="slide-badge">模範会話 (Mẫu lời thoại)</span></div><div class="slide-body script-body">${Object.entries(exam.answer.script || {}).map(([k, v]) => `<div class="script-part"><div class="script-label">${k}</div><p>${v}</p></div>`).join('')}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Q&A →</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">Q&A</span></div><div class="slide-body">${qaItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Từ vựng →</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">語彙・表現</span></div><div class="slide-body two-col"><div class="col"><h3>語彙</h3>${vocabItems}</div><div class="col"><h3>フレーズ</h3>${phraseItems}</div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Nhận xét →</button></div></div>
            <div class="slide"><div class="slide-header"><span class="slide-badge">評価ポイント</span></div><div class="slide-body"><div class="why-good"><h3>なぜ良いか</h3><ul>${whyItems}</ul></div><div class="tips">${tipItems}</div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><a href="#/${exam.program}/roleplay" class="btn-secondary">← Danh sách đề</a></div></div>
          </div>
        </div>`;
}

function renderPresentationDetail({ exam }) {
    if (!exam) return `${renderSpaNavbar()}<div class="container"><h1>Exam not found</h1>${renderBackButton('‹ Về trang chủ')}</div>`;

    const prepSec = exam.timings ? exam.timings.prep : 120;
    const presentSec = exam.timings ? exam.timings.present : 180;
    const qaSec = exam.timings ? exam.timings.qa : 240;
    const isJF3 = exam.program === 'jf3';
    const roleCard = exam.question.roleCard || {};
    const givenInfo = exam.question.givenInfo || {};
    const slideCount = isJF3 ? 13 : 12;
    const qaTimerSlide = isJF3 ? `<div class="slide timer-slide"><div class="timer-label">Q&A (${qaSec / 60} phút)</div><div class="timer-display">00:00</div><div class="slide-nav"><button data-slide-action="next">📖 Xem đáp án</button><button data-slide-action="skip-timer">⏹ Kết thúc</button></div></div>` : '';
    const taskItems = [roleCard.task].filter(Boolean).map((t, i) => `<div class="task-item"><span class="task-num">${i + 1}</span><p>${t}</p></div>`).join('');
    const infoItems = [['Current Status', givenInfo.currentStatus], ['Deadline', givenInfo.deadline], ['Constraints', givenInfo.constraints], ['Expected Outcome', givenInfo.expectedOutcome]].map(([label, value]) => `<div class="memo-item"><div class="memo-label">${label}</div><p>${value || ''}</p></div>`).join('');
    const outlineItems = (exam.answer.outline || []).map((s, i) => `<div class="task-item"><span class="task-num">${i + 1}</span><p>${s}</p></div>`).join('');
    const summary = exam.answer.summary || {};
    const summaryItems = [['Conclusion', summary.conclusion], ['Reason', summary.reason], ['Countermeasure', summary.countermeasure], ['Effect', summary.effect]].map(([label, value]) => `<div class="memo-item"><div class="memo-label">${label}</div><p>${value || ''}</p></div>`).join('');
    const qaItems = (exam.answer.qa || []).map(item => `<div class="qa-item"><div class="qa-q">Q: ${item.q}</div><div class="qa-a">A: ${item.a}</div></div>`).join('');
    const vocabItems = (exam.answer.vocabulary || []).map(v => `<div class="vocab-item"><span class="vocab-term">${v.term}</span><span class="vocab-meaning">${v.meaning}</span></div>`).join('');
    const phraseItems = (exam.answer.phrases || []).map(p => `<div class="phrase-item"><span class="phrase-text">${p.phrase}</span><span class="phrase-usage">${p.usage}</span></div>`).join('');
    const whyItems = (exam.answer.whyGood || []).map(w => `<li>${w}</li>`).join('');
    const tipItems = (exam.answer.tips || []).map(t => `<div class="tip-item"><div class="tip-title">${t.title}</div><div class="tip-example">${t.example}</div></div>`).join('');

    return `
        ${renderSpaNavbar()}
        <div class="container slide-deck-container"><div class="slide-deck"><div class="slide-dots">${Array.from({ length: slideCount }, (_, i) => `<span class="slide-dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>
          <div class="slide active"><div class="slide-cover"><div class="exam-meta"><span class="badge badge-level">${exam.level}</span><span class="badge badge-program">${exam.program.toUpperCase()}</span><span class="badge badge-category">${exam.category}</span></div><h1 class="exam-title">${exam.titleJP}</h1><p class="exam-theme">${exam.theme}</p><div class="timings-display"><div class="timing-item"><span class="timing-label">準備</span><span class="timing-value">${prepSec / 60}分</span></div><div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">発表</span><span class="timing-value">${presentSec / 60}分</span></div>${isJF3 ? `<div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">Q&A</span><span class="timing-value">${qaSec / 60}分</span></div>` : ''}</div><button class="btn-primary" data-slide-action="next">▶ Bắt đầu</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">Role Card</span></div><div class="slide-body memo-grid"><div class="memo-item"><div class="memo-label">You</div><p>${roleCard.you || ''}</p></div><div class="memo-item"><div class="memo-label">Audience</div><p>${roleCard.audience || ''}</p></div><div class="memo-item"><div class="memo-label">Situation</div><p>${roleCard.situation || ''}</p></div><div class="memo-item"><div class="memo-label">Task</div><p>${roleCard.task || ''}</p></div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Tiếp theo →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">Given Info</span></div><div class="slide-body memo-grid">${infoItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Tiếp theo →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">タスク (Nhiệm vụ)</span></div><div class="slide-body">${taskItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="start-timer" data-seconds="${prepSec}">▶ Bắt đầu chuẩn bị</button></div></div>
          <div class="slide timer-slide"><div class="timer-label">Chuẩn bị (${prepSec / 60} phút)</div><div class="timer-display">00:00</div><div class="slide-nav"><button data-slide-action="start-timer" data-seconds="${presentSec}">▶ Bắt đầu Presentation</button><button data-slide-action="skip-timer">⏭ Bỏ qua</button></div></div>
          <div class="slide timer-slide"><div class="timer-label">Presentation (${presentSec / 60} phút)</div><div class="timer-display">00:00</div><div class="slide-nav">${isJF3 ? `<button data-slide-action="start-timer" data-seconds="${qaSec}">▶ Bắt đầu Q&A</button>` : `<button data-slide-action="next">📖 Xem đáp án</button>`}<button data-slide-action="skip-timer">⏹ Kết thúc</button></div></div>
          ${qaTimerSlide}
          <div class="slide"><div class="slide-header"><span class="slide-badge">Outline</span></div><div class="slide-body">${outlineItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Script →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">Presentation Script</span></div><div class="slide-body script-body">${Object.entries(exam.answer.script || {}).map(([k, v]) => `<div class="script-part"><div class="script-label">${k}</div><p>${v}</p></div>`).join('')}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Summary →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">Summary (PREP)</span></div><div class="slide-body memo-grid">${summaryItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Q&A →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">Q&A</span></div><div class="slide-body">${qaItems}</div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Từ vựng →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">語彙・表現</span></div><div class="slide-body two-col"><div class="col"><h3>語彙</h3>${vocabItems}</div><div class="col"><h3>フレーズ</h3>${phraseItems}</div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><button data-slide-action="next">Nhận xét →</button></div></div>
          <div class="slide"><div class="slide-header"><span class="slide-badge">評価ポイント</span></div><div class="slide-body"><div class="why-good"><h3>なぜ良いか</h3><ul>${whyItems}</ul></div><div class="tips">${tipItems}</div></div><div class="slide-nav"><button data-slide-action="prev">← Quay lại</button><a href="#/${exam.program}/presentation" class="btn-secondary">← Danh sách đề</a></div></div>
        </div></div>`;
}
// --- Sub-components ---

function renderMemoCard(memo) {
    if (!memo) return '';
    return `<div class="answer-section glass-card reveal"><h3>A - 2分間の準備メモ</h3><div class="memo-grid">
        <div><h4>Conclusion:</h4><p>${memo.conclusion}</p></div>
        <div><h4>Basis:</h4><p>${memo.basis}</p></div>
        <div><h4>Risk:</h4><p>${memo.risk}</p></div>
        <div><h4>Countermeasure:</h4><p>${memo.countermeasure}</p></div>
    </div></div>`;
}

function renderScriptSection(script, type) {
    if (!script) return '';
    const title = type === 'roleplay' ? 'B - Script Band 8.5+' : 'B - Band 8.5 プレゼンスクリプト';
    const segments = Object.entries(script).map(([key, value]) => `
        <div class="script-segment">
            <strong>[${key.charAt(0).toUpperCase() + key.slice(1)}]</strong>
            <p>${value}</p>
        </div>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>${title}</h3>${segments}</div>`;
}

function renderQAAccordion(qaArray) {
    if (!qaArray || qaArray.length === 0) return '';
    const items = qaArray.map((item, index) => `
        <div class="qa-item">
            <div class="qa-question">${item.q}</div>
            <div class="qa-answer">${item.a}</div>
        </div>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>C - 質疑応答 Q&A</h3>${items}</div>`;
}

function renderVocabularyGrid(vocab) {
    if (!vocab || vocab.length === 0) return '';
    const items = vocab.map(v => `<div class="vocab-card glass-card"><strong>${v.term}</strong><p>${v.meaning}</p></div>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>D - 関連単語</h3><div class="vocab-grid">${items}</div></div>`;
}

function renderPhrasesGrid(phrases) {
    if (!phrases || phrases.length === 0) return '';
    const items = phrases.map(p => `<div class="phrase-card glass-card"><strong>${p.phrase}</strong><p>${p.usage}</p></div>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>E - 使えるフレーズ</h3><div class="phrases-grid">${items}</div></div>`;
}

function renderWhyGood(points) {
    if (!points || points.length === 0) return '';
    const items = points.map(p => `<li>${p}</li>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>F - なぜこの回答は評価されるのか</h3><ul>${items}</ul></div>`;
}

function renderTips(tips) {
    if (!tips || tips.length === 0) return '';
    const items = tips.map(t => `<li><strong>${t.title}:</strong> ${t.example}</li>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>G - Speaking Tips</h3><ul>${items}</ul></div>`;
}

function renderOutlineStepper(steps) {
    if (!steps || steps.length === 0) return '';
    const items = steps.map((s, i) => `<div class="step"><span class="step-number">${i + 1}</span><span class="step-title">${s}</span></div>`).join('');
    return `<div class="answer-section glass-card reveal"><h3>A - プレゼンの構成案 (Outline)</h3><div class="stepper">${items}</div></div>`;
}

function renderSummaryCard(summary) {
    if (!summary) return '';
    return `<div class="answer-section glass-card reveal"><h3>C - 1分で要約</h3><div class="summary-grid">
        <div><h4>Conclusion:</h4><p>${summary.conclusion}</p></div>
        <div><h4>Reason:</h4><p>${summary.reason}</p></div>
        <div><h4>Countermeasure:</h4><p>${summary.countermeasure}</p></div>
        <div><h4>Effect:</h4><p>${summary.effect}</p></div>
    </div></div>`;
}

function toggleAnswer(buttonEl, contentEl) {
  if (!contentEl) return;
  const isVisible = contentEl.classList.toggle('answer-visible');
  buttonEl.textContent = isVisible ? '解答とポイントを隠す' : '模範解答とポイントを見る';
  if (isVisible) {
      // Temporarily set to auto to find the scroll height, then set it back.
      contentEl.style.maxHeight = contentEl.scrollHeight + "px";
  } else {
      contentEl.style.maxHeight = '0';
  }
}

