from fastapi import APIRouter
from pydantic import BaseModel
from app.services.predictor import predict_price, calculate_metrics
import pandas as pd

router = APIRouter()

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

@router.post("/predict")
def predict(data: LaptopInput):

    df = pd.DataFrame([data.dict()])
    price = predict_price(df)
    metrics = calculate_metrics()

    if price < 40000:
        category = "Budget"
    elif price < 80000:
        category = "Mid-Range"
    else:
        category = "Premium"

    return {
        "price": round(price, 2),
        "category": category,
        "metrics": metrics
    }
