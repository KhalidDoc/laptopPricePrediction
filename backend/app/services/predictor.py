import pandas as pd
import numpy as np
import joblib
import os

from app.services.preprocessing import load_and_clean_data



BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "models", "price_model.pkl")

model = joblib.load(MODEL_PATH)


def predict_price(input_df):
    """
    input_df must be a pandas DataFrame with same columns as raw dataset
    (Company, TypeName, Cpu, Ram, Memory, Gpu, OpSys, Weight, ScreenResolution, Inches)
    """

    # Clean and transform using same pipeline as training
    df = load_and_clean_data(input_df)

    # Remove target column if present
    if "Price" in df.columns:
        df = df.drop("Price", axis=1)

    # One-hot encoding like training
    df = pd.get_dummies(df, drop_first=True)

    # Align columns with model input
    model_features = model.feature_names_in_
    df = df.reindex(columns=model_features, fill_value=0)

    # Predict   
    prediction_log = model.predict(df)[0]
    prediction = np.expm1(prediction_log)   # convert back from log price
    return prediction

