from fastapi import APIRouter
import pandas as pd
import os
import numpy as np

router = APIRouter()

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_laptop_good.csv")

@router.get("/insights")
def get_insights():

    df = pd.read_csv(DATA_PATH)

    # Convert back from log if needed
    df["Price"] = np.expm1(df["Price"])

    # -------------------------
    # Company vs Avg Price
    # -------------------------
    company_avg = (
        df.groupby("Company")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(5)
    )

    # -------------------------
    # RAM vs Avg Price
    # -------------------------
    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "", regex=False).astype(int)

    ram_avg = (
        df.groupby("Ram")["Price"]
        .mean()
        .sort_index()
    )

    return {
        "company_labels": company_avg.index.tolist(),
        "company_prices": company_avg.values.tolist(),
        "ram_labels": [f"{r}GB" for r in ram_avg.index.tolist()],
        "ram_prices": ram_avg.values.tolist(),
    }
