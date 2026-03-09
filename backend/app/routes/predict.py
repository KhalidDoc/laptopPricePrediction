from fastapi import APIRouter
from pydantic import BaseModel
from app.services.predictor import predict_price, predict_category, calculate_metrics
import pandas as pd

router = APIRouter()

# --------------------------------------------------
# INPUT SCHEMA
# --------------------------------------------------

class LaptopInput(BaseModel):
    Company: str
    TypeName: str
    Inches: float
    ScreenResolution: str
    Cpu: str
    Ram: str
    Memory: str
    Gpu: str
    OpSys: str
    Weight: str


# --------------------------------------------------
# PREDICTION ROUTE
# --------------------------------------------------

@router.post("/predict")
def predict(data: LaptopInput):

    # convert request to dataframe
    df = pd.DataFrame([data.dict()])

    # regression prediction
    price = predict_price(df)

    # classification prediction
    category = predict_category(df)

    # evaluation metrics
    metrics = calculate_metrics()

    return {
        "price": round(price, 2),
        "category": category,
        "metrics": metrics
    }