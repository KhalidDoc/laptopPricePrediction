from fastapi import APIRouter
import pandas as pd
import os
import numpy as np

router = APIRouter()

# ----------------------------------
# DATA PATH
# ----------------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_laptop_good.csv")


@router.get("/insights")
def get_insights():

    df = pd.read_csv(DATA_PATH)

    # ----------------------------------
    # Convert log price back to real price
    # ----------------------------------

    df["Price"] = np.expm1(df["Price"])

    # ----------------------------------
    # Summary Stats
    # ----------------------------------

    total_laptops = len(df)
    avg_price = int(df["Price"].mean())

    most_expensive = df.groupby("Company")["Price"].mean().idxmax()
    cheapest_brand = df.groupby("Company")["Price"].mean().idxmin()

    # ----------------------------------
    # Company vs Avg Price
    # ----------------------------------

    company_avg = (
        df.groupby("Company")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(8)
    )

    # ----------------------------------
    # RAM vs Avg Price
    # ----------------------------------

    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "", regex=False)
    df["Ram"] = pd.to_numeric(df["Ram"], errors="coerce")

    ram_avg = (
        df.groupby("Ram")["Price"]
        .mean()
        .sort_index()
    )

    # ----------------------------------
    # GPU vs Avg Price
    # ----------------------------------

    gpu_avg = (
        df.groupby("Gpu_brand")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(6)
    )

    # ----------------------------------
    # CPU Tier vs Avg Price
    # ----------------------------------

    cpu_avg = (
        df.groupby("Cpu_tier")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(6)
    )

    # ----------------------------------
    # Price Distribution
    # ----------------------------------

    price_bins = pd.cut(
        df["Price"],
        bins=[0, 30000, 50000, 70000, 100000, 200000],
        labels=["<30k", "30-50k", "50-70k", "70-100k", "100k+"]
    )

    price_dist = price_bins.value_counts().sort_index()

    # ----------------------------------
    # Screen Size vs Price
    # ----------------------------------

    screen_avg = (
        df.groupby("Inches")["Price"]
        .mean()
        .sort_index()
        .head(10)
    )

    # ----------------------------------
    # Storage vs Price
    # ----------------------------------

    storage_avg = (
        df.groupby("SSD")["Price"]
        .mean()
        .sort_index()
        .head(8)
    )

    # ----------------------------------
    # Return JSON
    # ----------------------------------

    return {

        # stats
        "total_laptops": total_laptops,
        "avg_price": avg_price,
        "most_expensive_brand": most_expensive,
        "cheapest_brand": cheapest_brand,

        # company chart
        "company_labels": company_avg.index.tolist(),
        "company_prices": company_avg.values.tolist(),

        # RAM chart
        "ram_labels": [f"{int(r)}GB" for r in ram_avg.index.tolist()],
        "ram_prices": ram_avg.values.tolist(),

        # GPU chart
        "gpu_labels": gpu_avg.index.tolist(),
        "gpu_prices": gpu_avg.values.tolist(),

        # CPU chart
        "cpu_labels": cpu_avg.index.tolist(),
        "cpu_prices": cpu_avg.values.tolist(),

        # price histogram
        "price_dist_labels": price_dist.index.tolist(),
        "price_dist_values": price_dist.values.tolist(),

        # screen chart
        "screen_labels": screen_avg.index.tolist(),
        "screen_prices": screen_avg.values.tolist(),

        # storage chart
        "storage_labels": storage_avg.index.tolist(),
        "storage_prices": storage_avg.values.tolist()
    }