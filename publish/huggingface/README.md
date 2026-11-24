---
license: cc-by-4.0
language:
- en
- ja
- ko
- th
- vi
- id
tags:
- multilingual
- news
- asia
- public-information
- tabular
- text
pretty_name: WFile Asia Public Notice Dataset
---

# WFile Asia Public Notice Dataset

Article metadata from WFile, an independent multilingual publication covering public information from Japan, Korea, Thailand, Vietnam, Indonesia, and broader Asia/global stories.

WFile publishes in **Japanese, Korean, Thai, Vietnamese, Indonesian, and English**. This dataset contains metadata only: article ID, language, canonical URL, title, summary, section, region, publication time, source title, source URL, author, and topic tags.

## Files

- `data/articles.csv` — one row per language version
- `data/articles.json` — same records as JSON
- `data/sources.json` — public source directory
- `data/stats.json` — aggregate counts and generation time

## What is not included

Full article text, images, source article bodies, and third-party material are not included. Article text and source material remain subject to the original publishers' terms.

## License

Dataset metadata is released under **CC BY 4.0**. Attribution: WFile Editorial Team, *WFile Asia Public Notice Dataset*, https://wfile.org/data/.

## Links

- Website: https://wfile.org
- Dataset page: https://wfile.org/data/
- GitHub mirror: https://github.com/adnxx1wsx/wfile-open-data
