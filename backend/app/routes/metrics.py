from fastapi import APIRouter
import json
import os

router = APIRouter()

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.json")

@router.get("/metrics")
def get_metrics():

    if not os.path.exists(METRICS_PATH):
        return {
            "r2": None,
            "mae": None,
            "rmse": None
        }

    with open(METRICS_PATH, "r") as f:
        metrics = json.load(f)

    return metrics
