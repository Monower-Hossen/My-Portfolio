/**
 * Projects Module: data, category filters, search and details modal.
 * Only facts supported by the repositories / original site content are listed.
 * Leave githubUrl empty to fall back to the GitHub profile.
 */
const PROFILE_URL = 'https://github.com/Monower-Hossen';
const GH = 'https://github.com/Monower-Hossen/';

const CATEGORIES = ['All Projects', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'NLP & RAG', 'Computer Vision'];

const projects = [
    {
        title: 'Multi-Agent AI Research System', icon: 'fa-users-gear',
        categories: ['Artificial Intelligence', 'NLP & RAG'],
        description: 'A multi-agent system that turns a research query into a structured Markdown report, exposed through a FastAPI REST API.',
        technologies: 'Python, FastAPI, Uvicorn, LangChain, Pydantic', status: 'Repository available',
        githubUrl: GH + 'Multi-Agent-AI-Research-System',
        details: {
            problem: 'Producing a well-structured research report from a single query involves several separate steps: searching, summarising, checking and writing.',
            solution: 'A pipeline of specialised AI agents, each with its own role, collaborates to take a query through to a final report.',
            architecture: 'Search Agent (e.g. DuckDuckGo, Wikipedia, Arxiv) → Summarizer Agent → Critique Agent → Writer Agent, with further agents for planning and workflow management. Exposed via REST endpoints (/research, /search, /summarize, /factcheck).',
            features: ['7-agent research pipeline', 'Individual agents can be run separately', 'Final report in Markdown', 'Interactive API docs and hot-reload dev server']
        }
    },
    {
        title: 'Fingerprint-Based Blood Group Detection', icon: 'fa-fingerprint',
        categories: ['Deep Learning', 'Computer Vision'],
        description: 'An experimental research prototype exploring blood group prediction from fingerprint images. It is not a medically validated diagnostic method.',
        technologies: 'Deep Learning, Computer Vision', status: 'Experimental prototype',
        githubUrl: GH + 'Fingerprint-Blood-Group-Detection',
        details: {
            limitations: ['Experimental research prototype only.', 'Not a medically validated diagnostic method and must not be used for medical decisions.']
        }
    },
    {
        title: 'Chicken Disease Detection Using Deep Learning', icon: 'fa-feather',
        categories: ['Deep Learning', 'Computer Vision'],
        description: 'A deep learning project for detecting chicken disease from images.',
        technologies: 'Deep Learning, Computer Vision', status: 'Completed',
        githubUrl: GH + 'Chicken-Disease-Detection',
        details: {}
    },
    {
        title: 'Dhaka House Price Prediction', icon: 'fa-house',
        categories: ['Machine Learning'],
        description: 'A machine learning project for predicting house prices in Dhaka, organised as a modular Python package with a web app and Docker support.',
        technologies: 'Python, Machine Learning, Docker, MLOps', status: 'Completed',
        githubUrl: GH + 'dhaka-house-price-predictions',
        details: {
            architecture: 'Repository layout: src/house_price_prediction package, config and params.yaml, notebook, templates, app.py, Dockerfile.',
            features: ['Modular source package with configuration file', 'Web app entry point (app.py) with HTML templates', 'Dockerfile for containerised setup']
        }
    },
    {
        title: 'AI-Based Fraud Detection System', icon: 'fa-shield-halved',
        categories: ['Machine Learning', 'Artificial Intelligence'],
        description: 'A machine learning application designed to identify potentially fraudulent financial transactions using classification algorithms.',
        technologies: 'Python, Scikit-learn, Pandas, Machine Learning, Fraud classification', status: 'Completed', githubUrl: '',
        details: {
            problem: 'Identify potentially fraudulent financial transactions using classification algorithms.',
            features: ['Data preprocessing', 'Exploratory data analysis', 'Fraud prediction', 'Machine learning model comparison', 'Model evaluation', 'Interactive dashboard']
        }
    },
    {
        title: 'Food Delivery Time Prediction', icon: 'fa-motorcycle',
        categories: ['Machine Learning'],
        description: 'A machine learning project that predicts estimated food delivery times based on relevant order, distance, and delivery-related features.',
        technologies: 'Python, Pandas, NumPy, Regression, Machine Learning', status: 'Completed', githubUrl: '',
        details: {
            problem: 'Predict estimated food delivery times based on order, distance, and delivery-related features.',
            features: ['Data cleaning', 'Exploratory data analysis', 'Feature engineering', 'Regression modeling', 'Model evaluation', 'Prediction interface']
        }
    },
    {
        title: 'AI Video Assistant with RAG', icon: 'fa-video',
        categories: ['Artificial Intelligence', 'NLP & RAG'],
        description: 'An AI-powered application that allows users to interact with video content and ask questions based on video transcripts using Retrieval-Augmented Generation.',
        technologies: 'Python, LangChain, FAISS, Whisper, Retrieval-Augmented Generation', status: 'Completed',
        githubUrl: GH + 'AI-Video-Assistant-RAG',
        details: {
            problem: 'Allow users to ask questions about video content based on its transcript.',
            features: ['Video transcript processing', 'Text chunking', 'Embedding generation', 'Vector search', 'Context-aware question answering']
        }
    },
    {
        title: 'AI Interview Assistant with RAG', icon: 'fa-user-tie',
        categories: ['Artificial Intelligence', 'NLP & RAG'],
        description: 'An AI-powered interview preparation assistant designed to help users practice interviews and retrieve relevant information through a RAG-based architecture.',
        technologies: 'Python, LLM, RAG, Streamlit', status: 'Completed',
        githubUrl: GH + 'AI-Interview-Assistant',
        details: {
            problem: 'Help users practise interviews and retrieve relevant information.',
            features: ['Intelligent question answering', 'Document retrieval', 'Context-aware responses', 'LLM integration', 'Interview preparation workflows']
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    const filterBar = document.getElementById('filterBar');
    const search = document.getElementById('projectSearch');
    const noResults = document.getElementById('noResults');
    const modal = document.getElementById('projectModal');
    let activeCategory = CATEGORIES[0];

    const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
    const link = (href, cls, label, icon) => {
        const a = el('a', cls); a.href = href; a.target = '_blank'; a.rel = 'noopener';
        if (icon) { a.appendChild(el('i', icon)); a.appendChild(document.createTextNode(' ')); }
        a.appendChild(document.createTextNode(label)); return a;
    };
    const repoLabel = (p) => p.githubUrl ? 'View on GitHub' : 'GitHub Profile';

    projects.forEach((p) => {
        const card = el('article', 'project-card');
        card.dataset.categories = p.categories.join('|');
        card.dataset.search = `${p.title} ${p.technologies} ${p.description}`.toLowerCase();

        const img = el('div', 'project-image'); img.setAttribute('aria-hidden', 'true'); img.appendChild(el('i', `fas ${p.icon}`));
        const content = el('div', 'project-content');
        content.appendChild(el('h3', '', p.title));
        content.appendChild(el('p', '', p.description));
        const tags = el('div', 'project-tags');
        p.technologies.split(',').forEach(t => tags.appendChild(el('span', 'project-tag', t.trim())));
        content.appendChild(tags);

        const actions = el('div', 'project-actions');
        actions.appendChild(link(p.githubUrl || PROFILE_URL, 'btn btn-secondary btn-small', repoLabel(p), 'fab fa-github'));
        const detailsBtn = el('button', 'btn btn-primary btn-small', 'Details'); detailsBtn.type = 'button';
        detailsBtn.setAttribute('aria-label', `Details: ${p.title}`);
        detailsBtn.addEventListener('click', () => openModal(p, detailsBtn));
        actions.appendChild(detailsBtn);
        // Live Demo button only when a verified URL exists
        if (p.demoUrl) actions.appendChild(link(p.demoUrl, 'btn btn-tertiary btn-small', 'Live Demo', 'fas fa-external-link-alt'));

        card.append(img, content, actions, el('div', 'project-status', p.status));
        grid.appendChild(card);
    });

    CATEGORIES.forEach((c, i) => {
        const b = el('button', 'filter-btn' + (i === 0 ? ' active' : ''), c);
        b.type = 'button'; b.setAttribute('aria-pressed', i === 0);
        b.addEventListener('click', () => {
            activeCategory = c;
            filterBar.querySelectorAll('.filter-btn').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
            applyFilters();
        });
        filterBar.appendChild(b);
    });
    search.addEventListener('input', applyFilters);

    function applyFilters() {
        const q = search.value.trim().toLowerCase();
        let shown = 0;
        grid.querySelectorAll('.project-card').forEach((card) => {
            const ok = (activeCategory === CATEGORIES[0] || card.dataset.categories.split('|').includes(activeCategory)) && card.dataset.search.includes(q);
            card.hidden = !ok; if (ok) shown++;
        });
        noResults.hidden = shown > 0;
    }

    function section(title, body) {
        const s = el('section', 'modal-section'); s.appendChild(el('h4', '', title));
        if (Array.isArray(body)) { const ul = el('ul'); body.forEach(i => ul.appendChild(el('li', '', i))); s.appendChild(ul); }
        else s.appendChild(el('p', '', body));
        return s;
    }

    function openModal(p, opener) {
        const d = p.details || {};
        modal.textContent = '';
        const head = el('div', 'modal-head');
        const title = el('h3', '', p.title); title.id = 'modalTitle';
        const close = el('button', 'modal-close', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Close project details');
        close.addEventListener('click', () => modal.close());
        head.append(title, close);
        modal.appendChild(head);
        modal.appendChild(section('Project Overview', p.description));
        if (d.problem) modal.appendChild(section('Problem Statement', d.problem));
        if (d.solution) modal.appendChild(section('Proposed Solution', d.solution));
        if (d.architecture) modal.appendChild(section('System Architecture', d.architecture));
        modal.appendChild(section('Technology Stack', p.technologies));
        if (d.features) modal.appendChild(section('Key Features', d.features));
        if (d.limitations) modal.appendChild(section('Challenges and Limitations', d.limitations));
        if (d.future) modal.appendChild(section('Future Improvements', d.future));
        modal.appendChild(link(p.githubUrl || PROFILE_URL, 'btn btn-primary', p.githubUrl ? 'GitHub Repository' : 'GitHub Profile', 'fab fa-github'));
        modal.addEventListener('close', () => opener.focus(), { once: true });
        modal.showModal();
    }
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
});
