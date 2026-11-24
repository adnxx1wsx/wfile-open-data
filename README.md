# WFile Asia Public Notice Dataset

Machine-readable metadata for multilingual public-interest coverage from **WFile — Asia Multilingual News**.

- Repository: https://github.com/adnxx1wsx/wfile-open-data
- Website: https://wfile.org
- Dataset page: https://wfile.org/data/
- Coverage: Japan, Korea, Thailand, Vietnam, Indonesia
- Languages: Japanese, Korean, Thai, Vietnamese, Indonesian, English
- Update cadence: site data is regenerated on every successful build; this repository syncs daily

> This repository contains **article metadata only**. Full article text, images, and source material remain subject to the original publishers' terms.

## Files

| File | Format | Contents |
| --- | --- | --- |
| `data/articles.csv` | CSV | One row per published language version |
| `data/articles.json` | JSON | The same records with a metadata envelope |
| `data/sources.json` | JSON | Public source directory |
| `data/stats.json` | JSON | Counts by language, region, section, topic, and day |

The live files are always available at:

```text
https://wfile.org/data/articles.csv
https://wfile.org/data/articles.json
https://wfile.org/data/sources.json
https://wfile.org/data/stats.json
```

## Schema

| Field | Type | Description |
| --- | --- | --- |
| `id` | integer | Internal article version ID |
| `lang` | string | ISO 639-1 language code: `ja`, `ko`, `th`, `vi`, `id`, `en` |
| `url` | string | Canonical public URL |
| `title` | string | Headline in that language |
| `summary` | string | Short standfirst / summary |
| `section` | string | Editorial section label |
| `region` | string | Source country code, when available |
| `published_at` | ISO 8601 | First publication timestamp |
| `updated_at` | ISO 8601 | Last update timestamp |
| `source_title` | string | Title of the cited public source |
| `source_url` | string | URL of the original public source |
| `author` | string | Byline or `Editorial Team` |
| `tags` | string | Pipe-separated topic keys |

`stats.json` also exposes `stories` (distinct story groups) and `published_articles` (language versions), so the two are not confused.

## Example

```bash
curl -fsSL https://wfile.org/data/articles.csv -o articles.csv
```

```python
import pandas as pd

df = pd.read_csv("https://wfile.org/data/articles.csv")
print(df.groupby("lang").size())
```

```javascript
const response = await fetch("https://wfile.org/data/articles.json");
const { meta, articles } = await response.json();
console.log(meta.generated_at, articles.length);
```

## Documentation

- [Dataset schema](docs/SCHEMA.md)
- [Usage examples](docs/USAGE.md)
- [Python example](examples/python.py)
- [JavaScript example](examples/javascript.mjs)

## Guides

WFile's evergreen public-information guides are available in six languages:

- [English](https://wfile.org/en/guides/)
- [Japanese](https://wfile.org/ja/guides/)
- [Korean](https://wfile.org/ko/guides/)
- [Thai](https://wfile.org/th/guides/)
- [Vietnamese](https://wfile.org/vi/guides/)
- [Indonesian](https://wfile.org/id/guides/)

## Methodology

WFile summarizes public information published by government bodies and public institutions. Each record links to the original source. The dataset is an index of what WFile published; it is not a substitute for the source document and does not imply endorsement by the source organization.

See https://wfile.org/en/how-we-report.html for the editorial method and https://wfile.org/en/corrections.html for corrections.

## License

Article **metadata** in this repository is released under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).

That license does not cover full article text, images, logos, or material owned by the original publishers. When reusing a record, retain the source link and attribution.

## Citation

If you use the dataset, please cite:

```text
WFile Editorial Team. (2026). WFile Asia Public Notice Dataset (Version 1.1.0)
[Data set]. https://doi.org/10.5281/zenodo.24503671
```

BibTeX:

```bibtex
@dataset{wfile_asia_public_notice_2026,
  author    = {{WFile Editorial Team}},
  title     = {WFile Asia Public Notice Dataset},
  year      = {2026},
  version   = {1.1.0},
  publisher = {WFile},
  url       = {https://wfile.org/data/},
  license   = {CC BY 4.0}
}
```

DOI: https://doi.org/10.5281/zenodo.24503671 (concept DOI, always points to the latest version).

## Repository maintenance

The file `.github/workflows/update-data.yml` fetches the live dataset once a day and commits changes. You can also run it manually from the **Actions** tab. No secret or token is required beyond the repository's default `GITHUB_TOKEN` with write permission.

To refresh locally:

```bash
mkdir -p data
for file in articles.csv articles.json sources.json stats.json; do
  curl -fsSL "https://wfile.org/data/$file" -o "data/$file"
done
```

## Contact

- Contact: https://wfile.org/en/contact.html
- Editorial standards: https://wfile.org/en/editorial-policy.html
- Press: https://wfile.org/en/press.html
