const $ = (id) => document.getElementById(id);
const state = { articles: [], stats: null };

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toLocaleDateString('en-CA');
}

function renderStats() {
  const s = state.stats || {};
  const items = [
    [s.stories, 'stories'],
    [s.published_articles, 'language versions'],
    [s.sources, 'public sources'],
    [Object.keys(s.languages || {}).length, 'languages'],
  ];
  $('stats').innerHTML = items.map(([value, label]) =>
    `<div class="stat"><strong>${Number(value || 0).toLocaleString()}</strong><span>${escapeHtml(label)}</span></div>`
  ).join('');
}

function fillSelect(id, values) {
  const el = $(id);
  el.innerHTML = ['All', ...values].map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
}

function render() {
  const q = $('q').value.trim().toLowerCase();
  const lang = $('lang').value;
  const region = $('region').value;
  const limit = Number($('limit').value) || 30;
  const filtered = state.articles.filter((a) => {
    if (lang !== 'All' && a.lang !== lang) return false;
    if (region !== 'All' && a.region !== region) return false;
    if (!q) return true;
    return `${a.title || ''} ${a.summary || ''}`.toLowerCase().includes(q);
  }).sort((a, b) => String(b.published_at || '').localeCompare(String(a.published_at || '')));
  const rows = filtered.slice(0, limit);
  $('meta').textContent = `${filtered.length.toLocaleString()} matching versions · showing ${rows.length}`;
  $('rows').innerHTML = rows.map((a) => `<tr>
    <td>${escapeHtml(a.lang)}</td>
    <td>${escapeHtml(a.region || '—')}</td>
    <td>${escapeHtml(a.section || '—')}</td>
    <td><a href="${escapeHtml(a.url)}" target="_blank" rel="noopener">${escapeHtml(a.title)}</a></td>
    <td>${escapeHtml(formatDate(a.published_at))}</td>
  </tr>`).join('');
}

Promise.all([
  fetch('data/articles.json').then((r) => r.json()),
  fetch('data/stats.json').then((r) => r.json()),
]).then(([data, stats]) => {
  state.articles = data.articles || [];
  state.stats = stats || data.meta || {};
  const langs = [...new Set(state.articles.map((a) => a.lang).filter(Boolean))].sort();
  const regions = [...new Set(state.articles.map((a) => a.region).filter(Boolean))].sort();
  fillSelect('lang', langs);
  fillSelect('region', regions);
  renderStats();
  render();
  ['q', 'lang', 'region', 'limit'].forEach((id) => $(id).addEventListener('input', render));
  $('q').addEventListener('keydown', (event) => { if (event.key === 'Enter') render(); });
}).catch((error) => {
  $('meta').textContent = `Could not load dataset: ${error.message}`;
});
