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

function initReveal(scope = document) {
    const deck = scope ? scope.querySelector('.reveal-deck') : document.querySelector('.reveal-deck');
    if (!deck) return;

    let timerInterval = null;

    function revealNext(currentSection) {
        const next = currentSection.nextElementSibling;
        if (!next || !next.classList.contains('reveal-section')) return null;
        next.classList.remove('hidden');
        next.classList.add('revealed');
        setTimeout(() => {
            next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        return next;
    }

    deck.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-reveal-action]');
        if (!btn) return;
        const action = btn.dataset.revealAction;
        const currentSection = btn.closest('.reveal-section');

        if (action === 'show-next') {
            revealNext(currentSection);
            btn.style.display = 'none';
        } else if (action === 'start-timer') {
            const seconds = parseInt(btn.dataset.seconds || '60', 10);
            const next = revealNext(currentSection);
            btn.style.display = 'none';
            if (!next) return;
            const displayEl = next.querySelector('.timer-display');
            if (!displayEl) return;
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = startCountdown(seconds, displayEl, () => {
                timerInterval = null;
                const skipBtn = next.querySelector('[data-reveal-action="skip-timer"]');
                if (skipBtn) skipBtn.style.display = 'none';
                revealNext(next);
            });
        } else if (action === 'skip-timer') {
            if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
            btn.style.display = 'none';
            revealNext(currentSection);
        } else if (action === 'start-perform-timer') {
            const seconds = parseInt(btn.dataset.seconds || '120', 10);
            const next = revealNext(currentSection);
            btn.style.display = 'none';
            if (!next) return;
            const displayEl = next.querySelector('.timer-display');
            if (!displayEl) return;
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = startCountdown(seconds, displayEl, () => {
                timerInterval = null;
                const skipBtn = next.querySelector('[data-reveal-action="skip-timer"]');
                if (skipBtn) skipBtn.style.display = 'none';
                revealNext(next);
            });
        }
    });
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

    const taskItems = (exam.question.tasks || []).map((t, i) =>
        `<div class="task-item"><span class="task-num">${i + 1}</span><p>${t}</p></div>`
    ).join('');

    const memoSection = isJF3 && exam.answer.memo ? `
        <div class="reveal-section hidden">
          <div class="section-header"><span class="section-badge">Memo (2分準備)</span></div>
          <div class="section-body">
            <div class="memo-grid">
              <div class="memo-item"><div class="memo-label">結論</div><p>${exam.answer.memo.conclusion}</p></div>
              <div class="memo-item"><div class="memo-label">根拠</div><p>${exam.answer.memo.basis}</p></div>
              <div class="memo-item"><div class="memo-label">リスク</div><p>${exam.answer.memo.risk}</p></div>
              <div class="memo-item"><div class="memo-label">対策</div><p>${exam.answer.memo.countermeasure}</p></div>
            </div>
          </div>
          <div class="section-action"><button data-reveal-action="show-next">Xem Script →</button></div>
        </div>` : '';

    const scriptParts = Object.entries(exam.answer.script || {}).map(([k, v]) =>
        `<div class="script-part"><div class="script-label">${k}</div><p>${v}</p></div>`
    ).join('');

    const qaItems = (exam.answer.qa || []).map(item =>
        `<div class="qa-item"><div class="qa-q">Q: ${item.q}</div><div class="qa-a">A: ${item.a}</div></div>`
    ).join('');

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

    return `
        ${renderSpaNavbar()}
        <div class="container reveal-deck-container">
          <div class="reveal-deck">
            <div class="reveal-section visible">
              <div class="section-cover">
                <div class="exam-meta"><span class="badge badge-level">${exam.level}</span><span class="badge badge-program">${exam.program.toUpperCase()}</span><span class="badge badge-category">${exam.category}</span></div>
                <h1 class="exam-title">${exam.titleJP}</h1>
                <p class="exam-theme">${exam.theme}</p>
                <div class="timings-display"><div class="timing-item"><span class="timing-label">準備</span><span class="timing-value">${prepSec / 60}分</span></div><div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">Roleplay</span><span class="timing-value">${performSec / 60}分</span></div></div>
              </div>
              <div class="section-action"><button data-reveal-action="show-next">🔍 Xem đề thi</button></div>
            </div>

            <div class="reveal-section hidden">
              <div class="exam-slide">
                <div class="exam-slide-header">
                  <div class="exam-slide-header-left">
                    <span class="exam-slide-logo">JF Standard Test</span>
                    <span class="exam-slide-type">ロールプレイ</span>
                  </div>
                  <span class="exam-slide-num">#${exam.id}</span>
                </div>
                <div class="exam-slide-body">
                  <div class="exam-slide-block">
                    <div class="exam-slide-block-label">状況</div>
                    <div class="exam-slide-block-content">${exam.question.situation}</div>
                  </div>
                  <div class="exam-slide-block">
                    <div class="exam-slide-block-label">役割</div>
                    <div class="exam-slide-role-grid">
                      <div class="exam-slide-role-item">
                        <div class="exam-slide-role-name">あなた</div>
                        <p class="exam-slide-role-desc">${exam.question.role.you}</p>
                      </div>
                      <div class="exam-slide-role-item">
                        <div class="exam-slide-role-name">相手</div>
                        <p class="exam-slide-role-desc">${exam.question.role.partner}</p>
                      </div>
                    </div>
                  </div>
                  <div class="exam-slide-block">
                    <div class="exam-slide-block-label">タスク</div>
                    <div class="exam-slide-task-list">
                      ${(exam.question.tasks || []).map((t, i) => `
                        <div class="exam-slide-task-item">
                          <span class="exam-slide-task-num">${i + 1}</span>
                          <span>${t}</span>
                        </div>`).join('')}
                    </div>
                  </div>
                </div>
                <div class="exam-slide-footer">
                  <div class="exam-slide-footer-timing">
                    <span class="exam-slide-footer-time">準備 <strong>${prepSec / 60}分</strong></span>
                    <span class="exam-slide-footer-time">ロールプレイ <strong>${performSec / 60}分</strong></span>
                  </div>
                  <span class="exam-slide-footer-note">内容を確認してから準備を始めてください</span>
                </div>
              </div>
              <div class="section-action">
                <button data-reveal-action="start-timer" data-seconds="${prepSec}">▶ Bắt đầu chuẩn bị ${prepSec / 60} phút</button>
              </div>
            </div>
            <div class="reveal-section hidden timer-section"><div class="section-header"><span class="section-badge">準備時間</span></div><div class="timer-label">Chuẩn bị - ${prepSec / 60} phút</div><div class="timer-display">--:--</div><div class="section-action"><button data-reveal-action="start-perform-timer" data-seconds="${performSec}">▶ Bắt đầu Roleplay</button><button data-reveal-action="skip-timer" class="btn-ghost">⏭ Bỏ qua</button></div></div>
            <div class="reveal-section hidden timer-section"><div class="section-header"><span class="section-badge">ロールプレイ</span></div><div class="timer-label">Roleplay - ${performSec / 60} phút</div><div class="timer-display">--:--</div><div class="section-action"><button data-reveal-action="show-next">📖 Xem đáp án</button><button data-reveal-action="skip-timer" class="btn-ghost">⏹ Kết thúc</button></div></div>
            ${memoSection}
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">模範会話 (Mẫu lời thoại)</span></div><div class="section-body script-body">${scriptParts}</div><div class="section-action"><button data-reveal-action="show-next">Xem Q&A →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">Q&A</span></div><div class="section-body">${qaItems}</div><div class="section-action"><button data-reveal-action="show-next">Xem từ vựng →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">語彙・表現</span></div><div class="section-body two-col"><div class="col"><h3>語彙</h3>${vocabItems}</div><div class="col"><h3>フレーズ</h3>${phraseItems}</div></div><div class="section-action"><button data-reveal-action="show-next">Xem nhận xét →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">評価ポイント</span></div><div class="section-body"><div class="why-good"><h3>なぜ良いか</h3><ul>${whyItems}</ul></div><div class="tips">${tipItems}</div></div><div class="section-action"><a href="#/${exam.program}/roleplay" class="btn-back">← Danh sách đề</a></div></div>
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

    const infoItems = [['Current Status', givenInfo.currentStatus], ['Deadline', givenInfo.deadline], ['Constraints', givenInfo.constraints], ['Expected Outcome', givenInfo.expectedOutcome]].map(([label, value]) => `<div class="memo-item"><div class="memo-label">${label}</div><p>${value || ''}</p></div>`).join('');
    const outlineItems = (exam.answer.outline || []).map((s, i) => `<div class="task-item"><span class="task-num">${i + 1}</span><p>${s}</p></div>`).join('');
    const scriptParts = Object.entries(exam.answer.script || {}).map(([k, v]) => `<div class="script-part"><div class="script-label">${k}</div><p>${v}</p></div>`).join('');
    const summary = exam.answer.summary || {};
    const summaryItems = [['Conclusion', summary.conclusion], ['Reason', summary.reason], ['Countermeasure', summary.countermeasure], ['Effect', summary.effect]].map(([label, value]) => `<div class="memo-item"><div class="memo-label">${label}</div><p>${value || ''}</p></div>`).join('');
    const qaItems = (exam.answer.qa || []).map(item => `<div class="qa-item"><div class="qa-q">Q: ${item.q}</div><div class="qa-a">A: ${item.a}</div></div>`).join('');
    const vocabItems = (exam.answer.vocabulary || []).map(v => `<div class="vocab-item"><span class="vocab-term">${v.term}</span><span class="vocab-meaning">${v.meaning}</span></div>`).join('');
    const phraseItems = (exam.answer.phrases || []).map(p => `<div class="phrase-item"><span class="phrase-text">${p.phrase}</span><span class="phrase-usage">${p.usage}</span></div>`).join('');
    const whyItems = (exam.answer.whyGood || []).map(w => `<li>${w}</li>`).join('');
    const tipItems = (exam.answer.tips || []).map(t => `<div class="tip-item"><div class="tip-title">${t.title}</div><div class="tip-example">${t.example}</div></div>`).join('');
    const qaTimerSection = isJF3 ? `<div class="reveal-section hidden timer-section"><div class="section-header"><span class="section-badge">Q&A</span></div><div class="timer-label">Q&A - ${qaSec / 60} phút</div><div class="timer-display">--:--</div><div class="section-action"><button data-reveal-action="show-next">📖 Xem đáp án</button><button data-reveal-action="skip-timer" class="btn-ghost">⏹ Kết thúc</button></div></div>` : '';

    return `
        ${renderSpaNavbar()}
        <div class="container reveal-deck-container">
          <div class="reveal-deck">
            <div class="reveal-section visible"><div class="section-cover"><div class="exam-meta"><span class="badge badge-level">${exam.level}</span><span class="badge badge-program">${exam.program.toUpperCase()}</span><span class="badge badge-category">${exam.category}</span></div><h1 class="exam-title">${exam.titleJP}</h1><p class="exam-theme">${exam.theme}</p><div class="timings-display"><div class="timing-item"><span class="timing-label">準備</span><span class="timing-value">${prepSec / 60}分</span></div><div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">発表</span><span class="timing-value">${presentSec / 60}分</span></div>${isJF3 ? `<div class="timing-sep">→</div><div class="timing-item"><span class="timing-label">Q&A</span><span class="timing-value">${qaSec / 60}分</span></div>` : ''}</div></div><div class="section-action"><button data-reveal-action="show-next">🔍 Xem đề thi</button></div></div>
            <div class="reveal-section hidden">
              <div class="exam-slide">
                <div class="exam-slide-header">
                  <div class="exam-slide-header-left">
                    <span class="exam-slide-logo">JF Standard Test</span>
                    <span class="exam-slide-type">プレゼンテーション</span>
                  </div>
                  <span class="exam-slide-num">#${exam.id}</span>
                </div>
                <div class="exam-slide-body">
                  <div class="exam-slide-block">
                    <div class="exam-slide-block-label">Role Card</div>
                    <div class="exam-slide-info-grid">
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">あなた</div>
                        <p class="exam-slide-info-value">${roleCard.you || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">相手</div>
                        <p class="exam-slide-info-value">${roleCard.audience || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">状況</div>
                        <p class="exam-slide-info-value">${roleCard.situation || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">タスク</div>
                        <p class="exam-slide-info-value">${roleCard.task || ''}</p>
                      </div>
                    </div>
                  </div>
                  <hr class="exam-slide-divider" />
                  <div class="exam-slide-block">
                    <div class="exam-slide-block-label">Given Information</div>
                    <div class="exam-slide-info-grid">
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">Current Status</div>
                        <p class="exam-slide-info-value">${givenInfo.currentStatus || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">Deadline</div>
                        <p class="exam-slide-info-value">${givenInfo.deadline || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">Constraints</div>
                        <p class="exam-slide-info-value">${givenInfo.constraints || ''}</p>
                      </div>
                      <div class="exam-slide-info-item">
                        <div class="exam-slide-info-label">Expected Outcome</div>
                        <p class="exam-slide-info-value">${givenInfo.expectedOutcome || ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="exam-slide-footer">
                  <div class="exam-slide-footer-timing">
                    <span class="exam-slide-footer-time">準備 <strong>${prepSec / 60}分</strong></span>
                    <span class="exam-slide-footer-time">発表 <strong>${presentSec / 60}分</strong></span>
                    ${isJF3 ? `<span class="exam-slide-footer-time">Q&A <strong>${qaSec / 60}分</strong></span>` : ''}
                  </div>
                  <span class="exam-slide-footer-note">内容を確認してから準備を始めてください</span>
                </div>
              </div>
              <div class="section-action">
                <button data-reveal-action="start-timer" data-seconds="${prepSec}">▶ Bắt đầu chuẩn bị ${prepSec / 60} phút</button>
              </div>
            </div>
            <div class="reveal-section hidden timer-section"><div class="section-header"><span class="section-badge">準備時間</span></div><div class="timer-label">Chuẩn bị - ${prepSec / 60} phút</div><div class="timer-display">--:--</div><div class="section-action"><button data-reveal-action="start-perform-timer" data-seconds="${presentSec}">▶ Bắt đầu phát biểu</button><button data-reveal-action="skip-timer" class="btn-ghost">⏭ Bỏ qua</button></div></div>
            <div class="reveal-section hidden timer-section"><div class="section-header"><span class="section-badge">発表</span></div><div class="timer-label">Presentation - ${presentSec / 60} phút</div><div class="timer-display">--:--</div><div class="section-action">${isJF3 ? `<button data-reveal-action="start-perform-timer" data-seconds="${qaSec}">Q&A →</button>` : `<button data-reveal-action="show-next">📖 Xem đáp án</button>`}<button data-reveal-action="skip-timer" class="btn-ghost">⏹ Kết thúc</button></div></div>
            ${qaTimerSection}
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">Outline</span></div><div class="section-body">${outlineItems}</div><div class="section-action"><button data-reveal-action="show-next">Xem Script →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">Presentation Script</span></div><div class="section-body script-body">${scriptParts}</div><div class="section-action"><button data-reveal-action="show-next">Xem tóm tắt →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">Summary (PREP)</span></div><div class="section-body memo-grid">${summaryItems}</div><div class="section-action"><button data-reveal-action="show-next">Xem Q&A →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">Q&A</span></div><div class="section-body">${qaItems}</div><div class="section-action"><button data-reveal-action="show-next">Xem từ vựng →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">語彙・表現</span></div><div class="section-body two-col"><div class="col"><h3>語彙</h3>${vocabItems}</div><div class="col"><h3>フレーズ</h3>${phraseItems}</div></div><div class="section-action"><button data-reveal-action="show-next">Xem nhận xét →</button></div></div>
            <div class="reveal-section hidden"><div class="section-header"><span class="section-badge">評価ポイント</span></div><div class="section-body"><div class="why-good"><h3>なぜ良いか</h3><ul>${whyItems}</ul></div><div class="tips">${tipItems}</div></div><div class="section-action"><a href="#/${exam.program}/presentation" class="btn-back">← Danh sách đề</a></div></div>
          </div>
        </div>`;
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
