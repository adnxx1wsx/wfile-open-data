# Dataset publication staging

Prepared on 2026-11-24 from the live WFile open-data snapshot.

Published:

- Zenodo concept DOI: https://doi.org/10.5281/zenodo.24503671
- Kaggle: https://www.kaggle.com/datasets/eranewsnew/wfile-asia-public-notice-dataset
- Hugging Face: https://huggingface.co/datasets/beijizhidayww/wfile-asia-public-notice-dataset

## Snapshot

- `data/articles.csv` — 2,262 article versions
- `data/articles.json` — same records as JSON
- `data/sources.json` — 67 public sources
- `data/stats.json` — aggregate counts

## Zenodo

Upload archive:

```bash
export ZENODO_TOKEN=...
cd /root/方案/open-data/publish

# 1. Create deposition
curl -fsS -X POST https://zenodo.org/api/deposit/depositions \
  -H "Authorization: Bearer $ZENODO_TOKEN" \
  -H "Content-Type: application/json" \
  -d @zenodo/metadata.json > /tmp/zenodo-deposition.json

# 2. Read files link and deposition id
python3 - <<'PY'
import json
d=json.load(open('/tmp/zenodo-deposition.json'))
print('id:', d['id'])
print('files:', d['links']['files'])
open('/tmp/zenodo-id','w').write(str(d['id']))
open('/tmp/zenodo-files-url','w').write(d['links']['files'])
PY

# 3. Upload archive
curl -fsS -X POST "$(cat /tmp/zenodo-files-url)" \
  -H "Authorization: Bearer $ZENODO_TOKEN" \
  -F "file=@wfile-asia-public-notice-dataset-v1.1.0.zip"

# 4. Publish
curl -fsS -X POST "https://zenodo.org/api/deposit/depositions/$(cat /tmp/zenodo-id)/actions/publish" \
  -H "Authorization: Bearer $ZENODO_TOKEN"
```

Use the **concept DOI** on the website after publishing, not the version DOI.

## Kaggle

Requirements: `~/.kaggle/kaggle.json` with username and key.

```bash
kaggle datasets create -p /root/方案/open-data/publish/kaggle
# later updates:
kaggle datasets version -p /root/方案/open-data/publish/kaggle \
  -m "WFile open-data snapshot 2026-11-24"
```

## Hugging Face

Requirements: `huggingface_hub` CLI and a write token.

```bash
pip install -U "huggingface_hub[cli]"
huggingface-cli login

huggingface-cli upload \
  adnxx1wsx/wfile-asia-public-notice-dataset \
  /root/方案/open-data/publish/huggingface \
  --repo-type dataset
```

## Credentials

The current environment does not contain Zenodo, Kaggle, or Hugging Face tokens. Do not commit `.env` or tokens to this repository.
