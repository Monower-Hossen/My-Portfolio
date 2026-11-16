/** GitHub activity: public API data with graceful failure; nothing is ever invented. */
document.addEventListener('DOMContentLoaded', async () => {
    const stats = document.getElementById('githubStats');
    const repos = document.getElementById('githubRepos');
    if (!stats) return;
    const user = 'Monower-Hossen';
    const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
    try {
        const [u, r] = await Promise.all([
            fetch(`https://api.github.com/users/${user}`).then(x => { if (!x.ok) throw new Error(x.status); return x.json(); }),
            fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`).then(x => { if (!x.ok) throw new Error(x.status); return x.json(); })
        ]);
        stats.textContent = '';
        [['Public repositories', u.public_repos], ['Followers', u.followers]].forEach(([l, v]) => {
            const c = el('div', 'gh-stat'); c.append(el('strong', '', v), el('span', '', l)); stats.appendChild(c);
        });
        r.forEach(repo => {
            const a = el('a', 'gh-repo'); a.href = repo.html_url; a.target = '_blank'; a.rel = 'noopener';
            a.append(el('strong', '', repo.name), el('span', '', repo.description || repo.language || 'Repository'));
            repos.appendChild(a);
        });
    } catch (e) {
        stats.textContent = '';
        stats.appendChild(el('p', 'gh-note', 'Live GitHub data is temporarily unavailable (API limit or network). Please visit the GitHub profile directly.'));
    }
});
