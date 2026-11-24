# Dataset schema

The repository publishes article metadata, not article text.

## `articles.json`

```json
{
  "meta": {
    "name": "WFile Asia Public Notice Dataset",
    "site": "https://wfile.org",
    "generated_at": "2026-11-23T00:00:00.000Z",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "stories": 357,
    "count": 2142,
    "note": "Article metadata only; article text remains subject to the original source terms."
  },
  "articles": []
}
```

Each article record has:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | integer | Internal version ID; stable for that language version |
| `lang` | string | `ja`, `ko`, `th`, `vi`, `id`, or `en` |
| `url` | string | Canonical WFile URL |
| `title` | string | Headline in that language |
| `summary` | string | Short standfirst |
| `section` | string | Localized editorial section label |
| `region` | string | Country code when available (`JP`, `KR`, `TH`, `VN`, `ID`) |
| `published_at` | ISO 8601 | First publication time |
| `updated_at` | ISO 8601 | Last update time |
| `source_title` | string | Title of the original public source |
| `source_url` | string | URL of the original public source |
| `author` | string | Byline or `Editorial Team` |
| `tags` | string | Pipe-separated topic keys |

## `articles.csv`

The CSV has the same fields as one article record, one row per language version. UTF-8 encoded.

## `sources.json`

```json
{
  "meta": {
    "name": "WFile Public Sources",
    "site": "https://wfile.org",
    "license": "CC BY 4.0",
    "count": 67
  },
  "sources": []
}
```

Source fields: `id`, `name`, `site_url`, `url`, `region`, `region_code`, `category`, `lang`, `enabled`.

`enabled` describes whether WFile currently collects from that source. It is not a statement that the source endorses WFile.

## `stats.json`

Counts by:

- `stories`: distinct story groups
- `published_articles`: language versions
- `languages`: language code to version count
- `regions`: country/region code to version count
- `sections`: localized section labels
- `topics`: topic key counts
- `by_day`: recent publication dates

The dataset is regenerated on every successful site build. The GitHub workflow syncs the latest public files once a day.

## Important distinction

`stories` and `published_articles` are not interchangeable. One story can have six language versions. Use `stories` for editorial volume and `published_articles` for URL/page volume.

## Nulls and missing values

A missing `region` means the source did not provide a usable country code. A missing source URL means the article did not have a public source link at build time. Do not infer missing values.
