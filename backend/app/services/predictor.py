import pandas as pd
import numpy as np
import joblib
import os
import json
import re

# -----------------------------
# PATH SETUP
# -----------------------------
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

PRICE_MODEL_PATH = os.path.join(BASE_DIR, "models", "price_model.pkl")
FEATURE_COLUMNS_PATH = os.path.join(BASE_DIR, "models", "feature_columns.pkl")
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.json")


# -----------------------------
# LOAD MODEL
# -----------------------------
def load_model(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model not found at: {path}")
    return joblib.load(path)

if not os.path.exists(FEATURE_COLUMNS_PATH):
    raise FileNotFoundError(f"Feature columns file not found at: {FEATURE_COLUMNS_PATH}")

feature_columns = joblib.load(FEATURE_COLUMNS_PATH)

def load_metrics(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Metrics file not found at: {path}")
    with open(path, "r") as f:
        return json.load(f)


price_model = load_model(PRICE_MODEL_PATH)
METRICS_CACHE = load_metrics(METRICS_PATH)


# -----------------------------
# PREPROCESS (MATCH TRAINING)
# -----------------------------
def preprocess(df):
    df = df.copy()

    # BASIC
    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "").astype(int)
    df["Weight"] = df["Weight"].astype(str).str.replace("kg", "").astype(float)

    # SCREEN
    df["Touchscreen"] = df["ScreenResolution"].str.contains("Touch", case=False, na=False).astype(int)
    df["IPS"] = df["ScreenResolution"].str.contains("IPS", case=False, na=False).astype(int)

    res = df["ScreenResolution"].str.extract(r"(\d+)x(\d+)")
    df["X_res"] = res[0].astype(float)
    df["Y_res"] = res[1].astype(float)

    df["PPI"] = np.sqrt(df["X_res"]**2 + df["Y_res"]**2) / df["Inches"]

    # -----------------------------
    # STORAGE (FIXED)
    # -----------------------------
    df["SSD"] = 0
    df["HDD"] = 0

    for i in range(len(df)):
        mem = str(df.loc[i, "Memory"]).upper()

        ssd = re.findall(r"(\d+)(GB|TB)\s*SSD", mem)
        hdd = re.findall(r"(\d+)(GB|TB)\s*HDD", mem)

        if ssd:
            val, unit = ssd[0]
            df.loc[i, "SSD"] = int(val) * (1024 if unit == "TB" else 1)

        if hdd:
            val, unit = hdd[0]
            df.loc[i, "HDD"] = int(val) * (1024 if unit == "TB" else 1)

    df["Storage_total"] = df["SSD"] + df["HDD"]

    # -----------------------------
    # CPU
    # -----------------------------
    df["Cpu_gen"] = df["Cpu"].str.extract(r"i[3579]-(\d{4})")[0]
    df["Cpu_gen"] = pd.to_numeric(df["Cpu_gen"], errors="coerce").fillna(0)

    df["Cpu_speed"] = df["Cpu"].str.extract(r"(\d+\.\d+)GHz")[0]
    df["Cpu_speed"] = pd.to_numeric(df["Cpu_speed"], errors="coerce").fillna(0)

    df["Cpu_tier"] = df["Cpu"].str.extract(
        r"(i3|i5|i7|i9|Ryzen 3|Ryzen 5|Ryzen 7)", expand=False
    ).fillna("other")

    df["Cpu_class"] = 0
    df.loc[df["Cpu_tier"].str.contains("i3", na=False), "Cpu_class"] = 1
    df.loc[df["Cpu_tier"].str.contains("i5", na=False), "Cpu_class"] = 2
    df.loc[df["Cpu_tier"].str.contains("i7", na=False), "Cpu_class"] = 3
    df.loc[df["Cpu_tier"].str.contains("i9", na=False), "Cpu_class"] = 4

    # -----------------------------
    # GPU
    # -----------------------------
    df["Gpu_model_num"] = df["Gpu"].str.extract(r"(\d{3,4})")[0]
    df["Gpu_model_num"] = pd.to_numeric(df["Gpu_model_num"], errors="coerce").fillna(0)

    df["Dedicated_gpu"] = df["Gpu"].str.contains(
        "nvidia|amd|rtx|gtx", case=False, na=False
    ).astype(int)

    df["Gpu_tier"] = 0
    df.loc[df["Gpu"].str.contains("rtx", case=False), "Gpu_tier"] = 3
    df.loc[df["Gpu"].str.contains("gtx", case=False), "Gpu_tier"] = 2
    df.loc[df["Gpu"].str.contains("mx", case=False), "Gpu_tier"] = 1

    # -----------------------------
    # OS
    # -----------------------------
    df["MacOS"] = df["OpSys"].str.contains("mac", case=False, na=False).astype(int)

    # -----------------------------
    # BRAND
    # -----------------------------
    premium_brands = ["Apple", "Razer", "MSI"]
    df["Premium_brand"] = df["Company"].isin(premium_brands).astype(int)

    # -----------------------------
    # INTERACTION
    # -----------------------------
    df["Power_score"] = (
        df["Cpu_class"] * 2 +
        df["Gpu_tier"] * 3 +
        (df["Ram"] / 8)
    )

    df.drop(columns=["Cpu", "Gpu", "Memory", "ScreenResolution"], inplace=True)

    return df


# -----------------------------
# PREDICT
# -----------------------------
def predict_price(input_df):
    df = preprocess(input_df)

    df = pd.get_dummies(df, drop_first=True)
    
    df = df.reindex(columns=feature_columns, fill_value=0)

    pred_log = price_model.predict(df)[0]

    print("PRED_LOG:", pred_log)
    
    return float(np.exp(pred_log))


def predict_category(input_df):
    price = predict_price(input_df)

    if price < 45000:
        return "Budget"
    elif price < 90000:
        return "Mid-Range"
    else:
        return "Premium"


def calculate_metrics():
    return METRICS_CACHE