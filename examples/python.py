import pandas as pd

URL = "https://wfile.org/data/articles.csv"

df = pd.read_csv(URL)
print(df.columns.tolist())
print(df.groupby("lang").size())
print(df.groupby("region").size())

recent_en = (
    df[df["lang"] == "en"]
    .assign(published_at=pd.to_datetime(df["published_at"], utc=True))
    .sort_values("published_at", ascending=False)
    .head(20)
)
print(recent_en[["published_at", "title", "url"]].to_string(index=False))
