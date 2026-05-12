const app = document.getElementById('app');
const homepage = document.getElementById('homepage-content');
const spaRoot = document.getElementById('spa-root');

const routes = {
    //'#/': 'renderHomepage', // Homepage is now static
    '#/jf2': 'renderProgramDetail',
    '#/jf3': 'renderProgramDetail',
    '#/jf2/roleplay': 'renderExamList',
    '#/jf2/presentation': 'renderExamList',
    '#/jf3/roleplay': 'renderExamList',
    '#/jf3/presentation': 'renderExamList',
    '#/jf3/roleplay/:id': 'renderRolePlayDetail',
    '#/jf3/presentation/:id': 'renderPresentationDetail',
    '#/jf2/roleplay/:id': 'renderRolePlayDetail',
    '#/jf2/presentation/:id': 'renderPresentationDetail',
};

function router() {
    const hash = window.location.hash;

    // No hash or #/ ??? show homepage, hide SPA
    if (!hash || hash === '#/' || hash === '#') {
        if(homepage) homepage.style.display = '';
        if(spaRoot) spaRoot.style.display = 'none';
        // Initialize animations for the homepage if it's visible
        initPage(document.getElementById('homepage-content'));
        return;
    }

    // Has sub-route ??? hide homepage, show SPA
    if(homepage) homepage.style.display = 'none';
    if(spaRoot) spaRoot.style.display = '';

    const path = hash || '#/';
    const pathSegments = path.split('/').filter(s => s !== '#');

    let rendererName = null;
    let params = {};

    if (pathSegments.length === 1) { // #/jf2, #/jf3
        rendererName = routes[`#/${pathSegments[0]}`];
        params = { program: pathSegments[0] };
    } else if (pathSegments.length === 2) { // #/jf3/roleplay
        rendererName = routes[`#/${pathSegments[0]}/${pathSegments[1]}`];
        params = { program: pathSegments[0], type: pathSegments[1] };
    } else if (pathSegments.length === 3) { // #/jf3/roleplay/1
        const routeKey = `#/${pathSegments[0]}/${pathSegments[1]}/:id`;
        rendererName = routes[routeKey];
        const examId = parseInt(pathSegments[2], 10);
        const dataType = pathSegments[1] === 'roleplay' ? window.ROLEPLAY_DATA : window.PRESENTATION_DATA;
        const exam = dataType.find(e => e.id === examId && e.program === pathSegments[0]);
        params = { exam };
    }

    const renderer = window[rendererName];

    if (renderer) {
        app.innerHTML = renderer(params);
        window.scrollTo({ top: 0, behavior: 'instant' });
        initPage(spaRoot);
    } else {
        app.innerHTML = `<div class="container"><h1>404 Not Found</h1><p>Page not found.</p></div>`;
    }
}

function initPage(scope = document) {
    if (!scope) return;
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scope.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Event listeners for answer toggles
    const toggleButtons = scope.querySelectorAll('.toggle-answer-btn');
    toggleButtons.forEach(button => {
        // Prevent duplicate listeners
        if (button.dataset.listenerAttached) return;
        button.dataset.listenerAttached = true;
        
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            toggleAnswer(button, content);
        });
    });

    // Init reveal deck if present in this scope
    if (typeof initReveal === 'function') {
        initReveal(scope);
    }
}


window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
