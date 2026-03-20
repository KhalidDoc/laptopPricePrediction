from flask import Blueprint, request, jsonify
import pandas as pd

from app.services.predictor import predict_price, predict_category, calculate_metrics

predict_bp = Blueprint("predict", __name__)


@predict_bp.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    df = pd.DataFrame([data])

    price = predict_price(df)

    category = predict_category(df)

    metrics = calculate_metrics()

    return jsonify({
        "price": round(price, 2),
        "category": category,
        "metrics": metrics
    })