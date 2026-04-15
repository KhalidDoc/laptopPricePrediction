import pandas as pd
import numpy as np
import joblib
import json
import re
import os

from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from xgboost import XGBRegressor

# -----------------------------
# PATHS
# -----------------------------
DATA_PATH = "data/laptop_data.csv"
MODEL_PATH = "models/price_model.pkl"
METRICS_PATH = "models/metrics.json"

os.makedirs("models", exist_ok=True)


# -----------------------------
# FEATURE ENGINEERING
# -----------------------------
def preprocess(df):
    df = df.copy()

    # -----------------------------
    # BASIC CLEANING
    # -----------------------------
    df.drop(columns=["Unnamed: 0"], errors="ignore", inplace=True)

    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "").astype(int)
    df["Weight"] = df["Weight"].astype(str).str.replace("kg", "").astype(float)

    # -----------------------------
    # SCREEN FEATURES
    # -----------------------------
    df["Touchscreen"] = df["ScreenResolution"].str.contains("Touch", case=False, na=False).astype(int)
    df["IPS"] = df["ScreenResolution"].str.contains("IPS", case=False, na=False).astype(int)

    res = df["ScreenResolution"].str.extract(r"(\d+)x(\d+)")
    df["X_res"] = res[0].astype(float)
    df["Y_res"] = res[1].astype(float)

    df["PPI"] = np.sqrt(df["X_res"]**2 + df["Y_res"]**2) / df["Inches"]

    # -----------------------------
    # STORAGE (HANDLE TB + GB)
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
    # CPU FEATURES
    # -----------------------------
    df["Cpu_gen"] = df["Cpu"].str.extract(r"i[3579]-(\d{4})")[0]
    df["Cpu_gen"] = pd.to_numeric(df["Cpu_gen"], errors="coerce").fillna(0)

    df["Cpu_speed"] = df["Cpu"].str.extract(r"(\d+\.\d+)GHz")[0]
    df["Cpu_speed"] = pd.to_numeric(df["Cpu_speed"], errors="coerce").fillna(0)

    df["Cpu_tier"] = df["Cpu"].str.extract(r"(i3|i5|i7|i9|Ryzen 3|Ryzen 5|Ryzen 7)", expand=False).fillna("other")

    # CPU class (strong signal)
    df["Cpu_class"] = 0
    df.loc[df["Cpu_tier"].str.contains("i3", na=False), "Cpu_class"] = 1
    df.loc[df["Cpu_tier"].str.contains("i5", na=False), "Cpu_class"] = 2
    df.loc[df["Cpu_tier"].str.contains("i7", na=False), "Cpu_class"] = 3
    df.loc[df["Cpu_tier"].str.contains("i9", na=False), "Cpu_class"] = 4

    # -----------------------------
    # GPU FEATURES (CRITICAL)
    # -----------------------------
    df["Gpu_model_num"] = df["Gpu"].str.extract(r"(\d{3,4})")[0]
    df["Gpu_model_num"] = pd.to_numeric(df["Gpu_model_num"], errors="coerce").fillna(0)

    df["Dedicated_gpu"] = df["Gpu"].str.contains("nvidia|amd|rtx|gtx", case=False, na=False).astype(int)

    # GPU tier (VERY IMPORTANT)
    df["Gpu_tier"] = 0
    df.loc[df["Gpu"].str.contains("rtx", case=False), "Gpu_tier"] = 3
    df.loc[df["Gpu"].str.contains("gtx", case=False), "Gpu_tier"] = 2
    df.loc[df["Gpu"].str.contains("mx", case=False), "Gpu_tier"] = 1

    # -----------------------------
    # OS
    # -----------------------------
    df["MacOS"] = df["OpSys"].str.contains("mac", case=False, na=False).astype(int)

    # -----------------------------
    # BRAND PREMIUM
    # -----------------------------
    premium_brands = ["Apple", "Razer", "MSI"]
    df["Premium_brand"] = df["Company"].isin(premium_brands).astype(int)

    # -----------------------------
    # INTERACTION FEATURE (POWER SCORE)
    # -----------------------------
    df["Power_score"] = (
        df["Cpu_class"] * 2 +
        df["Gpu_tier"] * 3 +
        (df["Ram"] / 8)
    )

    # -----------------------------
    # DROP UNUSED COLUMNS
    # -----------------------------
    df.drop(columns=["Cpu", "Gpu", "Memory", "ScreenResolution"], inplace=True)

    return df


# -----------------------------
# TRAINING
# -----------------------------
def train():
    df = pd.read_csv(DATA_PATH)

    # Log transform target
    df["Price"] = np.log(df["Price"])

    df = preprocess(df)

    X = df.drop("Price", axis=1)
    y = df["Price"]

    X = pd.get_dummies(X, drop_first=True)
    joblib.dump(X.columns.tolist(), "models/feature_columns.pkl")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = XGBRegressor(
        objective="reg:squarederror",
        n_estimators=2000,
        learning_rate=0.01,
        max_depth=7,
        subsample=0.9,
        colsample_bytree=0.9,
        reg_lambda=1.5,
        reg_alpha=0.3,
        random_state=42,
        n_jobs=-1,
        tree_method="hist"
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    # Convert back from log
    y_test_exp = np.exp(y_test)
    y_pred_exp = np.exp(y_pred)

    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test_exp, y_pred_exp)
    rmse = np.sqrt(mean_squared_error(y_test_exp, y_pred_exp))

    print("\n📊 MODEL PERFORMANCE")
    print("R2 Score :", r2)
    print("MAE      :", mae)
    print("RMSE     :", rmse)

    # Save model
    joblib.dump(model, MODEL_PATH)

    # Save metrics
    with open(METRICS_PATH, "w") as f:
        json.dump({
            "r2": round(float(r2), 4),
            "mae": round(float(mae), 2),
            "rmse": round(float(rmse), 2)
        }, f)

    print("\n✅ Model saved successfully!")


if __name__ == "__main__":
    train()