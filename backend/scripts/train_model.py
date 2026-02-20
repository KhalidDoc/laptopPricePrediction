import pandas as pd
import numpy as np
import joblib
import json
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from xgboost import XGBRegressor

DATA_PATH = "data/cleaned_laptop_good.csv"
MODEL_PATH = "models/price_model.pkl"
METRICS_PATH = "models/metrics.json"

def train():

    df = pd.read_csv(DATA_PATH)

    X = df.drop("Price", axis=1)
    y = df["Price"]

    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = XGBRegressor(
        objective="reg:squarederror",
        n_estimators=1500,
        learning_rate=0.015,
        max_depth=6,
        subsample=0.9,
        colsample_bytree=0.9,
        reg_lambda=1.2,
        random_state=42,
        n_jobs=-1,
        tree_method="hist"
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(np.expm1(y_test), np.expm1(y_pred))
    rmse = np.sqrt(mean_squared_error(np.expm1(y_test), np.expm1(y_pred)))

    print("R2:", r2)
    print("MAE:", mae)
    print("RMSE:", rmse)

    joblib.dump(model, MODEL_PATH)

    with open(METRICS_PATH, "w") as f:
        json.dump({
            "r2": round(float(r2), 4),
            "mae": round(float(mae), 2),
            "rmse": round(float(rmse), 2)
        }, f)

if __name__ == "__main__":
    train()
