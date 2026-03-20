from flask import Blueprint, jsonify
import pandas as pd
import os
import numpy as np

insights_bp = Blueprint("insights", __name__)

# ----------------------------------
# DATA PATH
# ----------------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_laptop_good.csv")


@insights_bp.route("/insights", methods=["GET"])
def get_insights():

    df = pd.read_csv(DATA_PATH)

    # Convert log price back
    df["Price"] = np.expm1(df["Price"])

    total_laptops = len(df)
    avg_price = int(df["Price"].mean())

    most_expensive = df.groupby("Company")["Price"].mean().idxmax()
    cheapest_brand = df.groupby("Company")["Price"].mean().idxmin()

    company_avg = (
        df.groupby("Company")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(8)
    )

    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "", regex=False)
    df["Ram"] = pd.to_numeric(df["Ram"], errors="coerce")

    ram_avg = df.groupby("Ram")["Price"].mean().sort_index()

    gpu_avg = (
        df.groupby("Gpu_brand")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(6)
    )

    cpu_avg = (
        df.groupby("Cpu_tier")["Price"]
        .mean()
        .sort_values(ascending=False)
        .head(6)
    )

    price_bins = pd.cut(
        df["Price"],
        bins=[0, 30000, 50000, 70000, 100000, 200000],
        labels=["<30k", "30-50k", "50-70k", "70-100k", "100k+"]
    )

    price_dist = price_bins.value_counts().sort_index()

    screen_avg = df.groupby("Inches")["Price"].mean().sort_index().head(10)

    storage_avg = df.groupby("SSD")["Price"].mean().sort_index().head(8)

    return jsonify({

        "total_laptops": total_laptops,
        "avg_price": avg_price,
        "most_expensive_brand": most_expensive,
        "cheapest_brand": cheapest_brand,

        "company_labels": company_avg.index.tolist(),
        "company_prices": company_avg.values.tolist(),

        "ram_labels": [f"{int(r)}GB" for r in ram_avg.index.tolist()],
        "ram_prices": ram_avg.values.tolist(),

        "gpu_labels": gpu_avg.index.tolist(),
        "gpu_prices": gpu_avg.values.tolist(),

        "cpu_labels": cpu_avg.index.tolist(),
        "cpu_prices": cpu_avg.values.tolist(),

        "price_dist_labels": price_dist.index.tolist(),
        "price_dist_values": price_dist.values.tolist(),

        "screen_labels": screen_avg.index.tolist(),
        "screen_prices": screen_avg.values.tolist(),

        "storage_labels": storage_avg.index.tolist(),
        "storage_prices": storage_avg.values.tolist()
    })