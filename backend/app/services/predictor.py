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
    # 1. Clean and Parse (Crucial Step)
    df = input_df.copy()
    
    # Parse Resolution (e.g., "1920x1080" -> X_res: 1920, Y_res: 1080)
    if "ScreenResolution" in df.columns:
        res = str(df["ScreenResolution"].iloc[0]).split('x')
        df['X_res'] = int(res[0])
        df['Y_res'] = int(res[1])
        # Calculate PPI (approximate or use a fixed formula)
        df['PPI'] = (((df['X_res']**2 + df['Y_res']**2)**0.5) / df['Inches'].astype(float)).fillna(0)
        df.drop("ScreenResolution", axis=1, inplace=True)

    # Parse Memory (This is a simplified example)
    # You need to extract numbers for SSD and HDD specifically
    df['SSD'] = 0
    df['HDD'] = 0
    mem_val = str(df['Memory'].iloc[0])
    if "SSD" in mem_val:
        df['SSD'] = int(mem_val.split('GB')[0]) # Simplified logic
    if "HDD" in mem_val:
        df['HDD'] = 1024 if "1TB" in mem_val else 2048 # Simplified
    df.drop("Memory", axis=1, inplace=True)

    # 2. Fix Case Sensitivity
    df['Gpu_brand'] = df['Gpu'].str.lower() # Match 'intel', 'amd'
    df['Cpu_tier'] = df['Cpu'] # Ensure this matches training labels
    
    # 3. Ensure Numeric Types
    df['Ram'] = df['Ram'].astype(str).str.extract('(\d+)').astype(int)
    df['Weight'] = df['Weight'].astype(str).str.extract(r'(\d+\.?\d*)').astype(float)
    df['Inches'] = df['Inches'].astype(float)

    # 4. Dummy Variables
    df = pd.get_dummies(df) # Don't use drop_first=True here; reindex handles it better

    # 5. Reindex to match trained model features
    model_features = price_model.feature_names_in_
    df = df.reindex(columns=model_features, fill_value=0)

    prediction_log = price_model.predict(df)[0]
    return float(np.expm1(prediction_log))


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