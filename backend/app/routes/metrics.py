from flask import Blueprint, jsonify
import json
import os

metrics_bp = Blueprint("metrics", __name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.json")


@metrics_bp.route("/metrics", methods=["GET"])
def get_metrics():

    if not os.path.exists(METRICS_PATH):
        return jsonify({
            "r2": None,
            "mae": None,
            "rmse": None
        })

    with open(METRICS_PATH, "r") as f:
        metrics = json.load(f)

    return jsonify(metrics)