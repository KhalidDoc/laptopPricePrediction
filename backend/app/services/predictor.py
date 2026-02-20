import pandas as pd
import numpy as np
import joblib
import os
import json

from app.services.preprocessing import load_and_clean_data

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
MODEL_PATH = os.path.join(BASE_DIR, "models", "price_model.pkl")
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.json")

model = joblib.load(MODEL_PATH)

# Load saved test metrics
if os.path.exists(METRICS_PATH):
    with open(METRICS_PATH, "r") as f:
        METRICS_CACHE = json.load(f)
else:
    METRICS_CACHE = {
        "r2": None,
        "mae": None,
        "rmse": None
    }

# ------------------------
# PREDICT SINGLE
# ------------------------
def predict_price(input_df: pd.DataFrame):

    df = load_and_clean_data(input_df)

    if "Price" in df.columns:
        df = df.drop("Price", axis=1)

    df = pd.get_dummies(df, drop_first=True)

    model_features = model.feature_names_in_
    df = df.reindex(columns=model_features, fill_value=0)

    prediction_log = model.predict(df)[0]
    prediction = np.expm1(prediction_log)

    return float(prediction)


# ------------------------
# RETURN SAVED METRICS
# ------------------------
def calculate_metrics():
    return METRICS_CACHE
