from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router
from app.routes.insights import router as insights_router
from app.routes.metrics import router as metrics_router

app = FastAPI(title="Laptop Price Prediction API")

# CORS (restrict later in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add prefix for clean API structure
app.include_router(predict_router, prefix="/api")

app.include_router(insights_router, prefix="/api", tags=["Insights"])

app.include_router(metrics_router, prefix="/api", tags=["Performance"])
