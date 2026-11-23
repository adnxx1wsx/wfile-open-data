# Using the dataset

## Python

```python
import pandas as pd

url = "https://wfile.org/data/articles.csv"
df = pd.read_csv(url)

print(df.groupby("lang").size())
print(df.groupby("region").size())

# Recent English records
recent = (
    df[df["lang"] == "en"]
    .assign(published_at=pd.to_datetime(df["published_at"], utc=True))
    .sort_values("published_at", ascending=False)
    .head(20)
)
```

## JavaScript

```js
const response = await fetch("https://wfile.org/data/articles.json");
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const { meta, articles } = await response.json();

console.log(meta.generated_at, articles.length);
const recent = articles
  .filter((article) => article.lang === "en")
  .sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)))
  .slice(0, 20);
```

## Linking back

If you publish a chart, article, or research note using the dataset, link to:

```text
https://wfile.org/data/
```

and include the license:

```text
Metadata: CC BY 4.0
```

Article text and source material remain subject to the original publishers' terms.

## Guides

WFile's evergreen guides explain how to read public notices, verify sources, and cross-check numbers and dates:

- https://wfile.org/en/guides/
- https://wfile.org/ja/guides/
- https://wfile.org/ko/guides/
- https://wfile.org/th/guides/
- https://wfile.org/vi/guides/
- https://wfile.org/id/guides/

## Suggested citation

```text
WFile Editorial Team. (2026). WFile Asia Public Notice Dataset (Version 1.0.0)
[Data set]. https://wfile.org/data/
```
