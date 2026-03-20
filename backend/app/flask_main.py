from flask import Flask
from flask_cors import CORS

from app.routes.predict import predict_bp
from app.routes.metrics import metrics_bp
from app.routes.insights import insights_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(predict_bp, url_prefix="/api")
app.register_blueprint(metrics_bp, url_prefix="/api")
app.register_blueprint(insights_bp, url_prefix="/api")


@app.route("/")
def root():
    return {"status": "API running"}


if __name__ == "__main__":
    app.run(debug=True)