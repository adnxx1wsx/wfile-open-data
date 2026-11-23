const response = await fetch("https://wfile.org/data/articles.json");
if (!response.ok) throw new Error(`HTTP ${response.status}`);

const { meta, articles } = await response.json();
console.log(meta.generated_at, meta.count);

const recentEnglish = articles
  .filter((article) => article.lang === "en")
  .sort((a, b) =>
    String(b.published_at || "").localeCompare(String(a.published_at || "")),
  )
  .slice(0, 20);

for (const article of recentEnglish) {
  console.log(article.published_at, article.title, article.url);
}
