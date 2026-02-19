from fastapi import APIRouter
from app.services.predictor import predict_price
import pandas as pd

router = APIRouter()

@router.post("/predict")
def predict(data: dict):
    df = pd.DataFrame([data])
    price = predict_price(df)

    # simple category rule
    if price < 40000:
        category = "Budget"
    elif price < 80000:
        category = "Mid-Range"
    else:
        category = "Premium"

    return {
        "price": round(price,2),
        "category": category
    }
