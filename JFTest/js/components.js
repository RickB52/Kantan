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
    if (!exam) return `
        ${renderSpaNavbar()}
        <div class="container">
            <h1>Exam not found</h1>
            ${renderBackButton('‹ Về trang chủ')}
        </div>
    `;
    return `
        ${renderSpaNavbar()}
        <div class="container">
            <header class="page-header reveal">
                 ${renderBackButton(`‹ Về danh sách`, `#/${exam.program}/${exam.type}`)}
            </header>
            <main>
                <section class="question-slide glass-card reveal">
                    <h2>${exam.titleJP}</h2>
                    <p class="theme">${exam.theme}</p>
                    <div class="badges">
                        <span class="badge type-badge">${exam.type}</span>
                        <span class="badge level-badge">${exam.level}</span>
                    </div>
                    <div class="question-details">
                        <div class="detail-block situation">
                            <h3>状況 (Situation)</h3>
                            <p>${exam.question.situation}</p>
                        </div>
                        <div class="detail-block role">
                            <h3>Role</h3>
                            <p><strong>You:</strong> ${exam.question.role.you}</p>
                            <p><strong>Partner:</strong> ${exam.question.role.partner}</p>
                        </div>
                        <div class="detail-block tasks">
                             <h3>タスク (Tasks)</h3>
                             <ul>${exam.question.tasks.map(t => `<li>${t}</li>`).join('')}</ul>
                        </div>
                    </div>
                </section>

                <button class="toggle-answer-btn glass-card reveal">模範解答とポイントを見る</button>
                
                <div class="answer-content">
                    ${renderMemoCard(exam.answer.memo)}
                    ${renderScriptSection(exam.answer.script, 'roleplay')}
                    ${renderQAAccordion(exam.answer.qa)}
                    ${renderVocabularyGrid(exam.answer.vocabulary)}
                    ${renderPhrasesGrid(exam.answer.phrases)}
                    ${renderWhyGood(exam.answer.whyGood)}
                    ${renderTips(exam.answer.tips)}
                </div>
            </main>
        </div>
    `;
}

function renderPresentationDetail({ exam }) {
    if (!exam) return `
        ${renderSpaNavbar()}
        <div class="container">
            <h1>Exam not found</h1>
            ${renderBackButton('‹ Về trang chủ')}
        </div>
    `;
     return `
        ${renderSpaNavbar()}
        <div class="container">
            <header class="page-header reveal">
                 ${renderBackButton(`‹ Về danh sách`, `#/${exam.program}/${exam.type}`)}
            </header>
            <main>
                <section class="question-slide glass-card reveal">
                    <h2>${exam.titleJP}</h2>
                    <p class="theme">${exam.theme}</p>
                    <div class="badges">
                        <span class="badge type-badge">${exam.type}</span>
                        <span class="badge level-badge">${exam.level}</span>
                    </div>
                    <div class="question-details-grid">
                        <div class="detail-block role-card">
                            <h3>Role Card</h3>
                            <p><strong>You:</strong> ${exam.question.roleCard.you}</p>
                            <p><strong>Audience:</strong> ${exam.question.roleCard.audience}</p>
                            <p><strong>Situation:</strong> ${exam.question.roleCard.situation}</p>
                            <p><strong>Task:</strong> ${exam.question.roleCard.task}</p>
                        </div>
                        <div class="detail-block given-info">
                             <h3>Given Slide Info</h3>
                             <p><strong>Current Status:</strong> ${exam.question.givenInfo.currentStatus}</p>
                             <p><strong>Deadline:</strong> ${exam.question.givenInfo.deadline}</p>
                             <p><strong>Constraints:</strong> ${exam.question.givenInfo.constraints}</p>
                             <p><strong>Expected Outcome:</strong> ${exam.question.givenInfo.expectedOutcome}</p>
                        </div>
                    </div>
                </section>

                <button class="toggle-answer-btn glass-card reveal">模範解答とポイントを見る</button>
                
                <div class="answer-content">
                    ${renderOutlineStepper(exam.answer.outline)}
                    ${renderScriptSection(exam.answer.script, 'presentation')}
                    ${renderSummaryCard(exam.answer.summary)}
                    ${renderQAAccordion(exam.answer.qa)}
                    ${renderVocabularyGrid(exam.answer.vocabulary)}
                    ${renderPhrasesGrid(exam.answer.phrases)}
                    ${renderWhyGood(exam.answer.whyGood)}
                    ${renderTips(exam.answer.tips)}
                </div>
            </main>
        </div>
    `;
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
