import pandas as pd
import numpy as np
import joblib
import os
import json

from app.services.preprocessing import load_and_clean_data

# --------------------------------------------------
# PATH SETUP
# --------------------------------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

PRICE_MODEL_PATH = os.path.join(BASE_DIR, "models", "price_model.pkl")
CATEGORY_MODEL_PATH = os.path.join(BASE_DIR, "models", "category_model.pkl")
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.json")

# --------------------------------------------------
# LOAD MODELS
# --------------------------------------------------

price_model = joblib.load(PRICE_MODEL_PATH)

# classification model (if exists)
if os.path.exists(CATEGORY_MODEL_PATH):
    category_model = joblib.load(CATEGORY_MODEL_PATH)
else:
    category_model = None

# --------------------------------------------------
# LOAD METRICS
# --------------------------------------------------

if os.path.exists(METRICS_PATH):
    with open(METRICS_PATH, "r") as f:
        METRICS_CACHE = json.load(f)
else:
    METRICS_CACHE = {
        "r2": None,
        "mae": None,
        "rmse": None
    }

# --------------------------------------------------
# PRICE PREDICTION (REGRESSION)
# --------------------------------------------------

def predict_price(input_df: pd.DataFrame):

    df = load_and_clean_data(input_df)

    if "Price" in df.columns:
        df = df.drop("Price", axis=1)

    df = pd.get_dummies(df, drop_first=True)

    model_features = price_model.feature_names_in_

    df = df.reindex(columns=model_features, fill_value=0)

    prediction_log = price_model.predict(df)[0]

    prediction = np.expm1(prediction_log)

    return float(prediction)


# --------------------------------------------------
# CATEGORY PREDICTION (CLASSIFICATION)
# --------------------------------------------------

def predict_category(input_df: pd.DataFrame):

    # fallback if classification model not trained
    if category_model is None:
        price = predict_price(input_df)
        print("Predicted price:", price)

        if price < 40000:
            return "Budget"
        elif price < 80000:
            return "Mid-Range"
        else:
            return "Premium"

    df = load_and_clean_data(input_df)

    if "Price" in df.columns:
        df = df.drop("Price", axis=1)

    df = pd.get_dummies(df, drop_first=True)

    model_features = category_model.feature_names_in_

    df = df.reindex(columns=model_features, fill_value=0)

    pred = category_model.predict(df)[0]

    if pred == 0:
        return "Budget"
    elif pred == 1:
        return "Mid-Range"
    else:
        return "Premium"


# --------------------------------------------------
# RETURN MODEL METRICS
# --------------------------------------------------

def calculate_metrics():
    return METRICS_CACHE