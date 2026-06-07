![React](https://img.shields.io/badge/Frontend-React-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-black)
![XGBoost](https://img.shields.io/badge/ML-XGBoost-green)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%2B%20Render-purple)

#  Laptop Price Prediction System

> End-to-end ML system with real-time prediction, deployed using Vercel and Render.

A full-stack machine learning web application that predicts laptop prices based on user specifications. It integrates a trained ML model with a responsive web interface to deliver real-time predictions, insights, and performance metrics.

---

##  Live Demo

Frontend: https://laptop-price-prediction-amber.vercel.app <br>
Backend API: https://laptoppriceprediction-5tom.onrender.com

---

##  Project Overview

This project allows users to input laptop specifications such as RAM, CPU, GPU, storage, and more, and get an estimated price instantly.

This project simulates a real-world machine learning deployment pipeline, including:

* Data preprocessing
* Model training
* Backend API integration
* Frontend UI interaction
* Deployment to cloud platforms

---

##  Features

*  Predict laptop price using ML model
*  Display model performance metrics (RMSE, MAE, R²)
*  Insights dashboard for data understanding
*  Fast API responses using Flask
*  Fully deployed frontend and backend
*  Real-time interaction between frontend and backend

---

##  Tech Stack

###  Frontend

* React (Vite)
* HTML, CSS, JavaScript

###  Backend

* Python
* Flask
* Flask-CORS

###  Machine Learning

* Scikit-learn
* XGBoost
* Pandas, NumPy

###  Deployment

* Frontend: Vercel
* Backend: Render

---

##  Project Structure

```
backend/
├── app/
│   ├── routes/
│   ├── services/
│   └── app.py
├── models/
├── scripts/
├── requirements.txt

frontend/
├── src/
├── components/
├── pages/
```

---

##  How It Works

1. User enters laptop specifications on frontend
2. Frontend sends data to Flask API
3. Backend preprocesses input data
4. ML model predicts log(price)
5. Output is converted back using exponential
6. Final price is returned to frontend
7. UI displays prediction and insights

---

##  Model Details

* Algorithm: XGBoost Regressor
* Target: Log-transformed price

### Feature Engineering:

* PPI (Pixels Per Inch)
* CPU classification
* GPU tiering
* Storage breakdown (SSD/HDD)
* Power score (combined feature)

**Note:** The model is trained on a cleaned dataset with engineered features and deployed without retraining in production.

---

##  Dataset

This project uses the publicly available dataset:

🔗 https://www.kaggle.com/datasets/mohidabdulrehman/laptop-price-dataset

** Limitation:**
The model is trained on a relatively limited dataset with a fixed set of features.
Predictions may not generalize perfectly to newer laptop models or unseen configurations.

---

##  API Endpoints

* POST `/api/predict` → Predict laptop price
* GET `/api/metrics` → Model performance metrics
* GET `/api/insights` → Dataset insights
* GET `/api/options` → Dropdown options for frontend

---

##  Local Setup

###  1. Clone the repository

```bash
git clone https://github.com/KhalidDoc/laptop-price-prediction.git
cd laptop-price-prediction
```

---

###  2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Run backend:

```bash
python -m app.app
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

###  3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://127.0.0.1:5000
```

Run frontend:

```bash
npm run dev
```

---

##  Deployment

### Frontend (Vercel)

Set environment variable:

```
VITE_API_URL=https://laptoppriceprediction-5tom.onrender.com
```

---

### Backend (Render)

Ensure model files exist:

```
models/
  ├── price_model.pkl
  ├── feature_columns.pkl
  ├── metrics.json
```

---

##  Important Notes

* Model training scripts are in `/scripts` and are NOT used in production
* Backend only loads pre-trained models
* Feature alignment between training and inference is critical
* Environment variables must be set before build in Vite

---

##  Screenshots

<img width="1823" height="929" alt="image" src="https://github.com/user-attachments/assets/f3461d1d-9f0f-41e0-a2b5-a9879419bb5b" />
<img width="1896" height="964" alt="image" src="https://github.com/user-attachments/assets/bb043e55-4231-47f3-9232-2958e52fca8a" />
<img width="1903" height="970" alt="image" src="https://github.com/user-attachments/assets/c51657a8-fe33-4002-bb29-681a1009fe47" />
<img width="1897" height="967" alt="image" src="https://github.com/user-attachments/assets/68151df1-eb5d-42ec-b05c-7e272db4f898" />
<img width="1906" height="976" alt="image" src="https://github.com/user-attachments/assets/ff1fdcb1-8d63-4cb8-a3bb-d356208e7217" />
<img width="1897" height="962" alt="image" src="https://github.com/user-attachments/assets/2d8d2e12-d9c1-42a4-a04f-1f722a640c57" />



---

##  Future Improvements

* Add user authentication
* Save prediction history
* Improve UI/UX design
* Add more ML models for comparison
* Containerize with Docker

---

##  Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

##  License

This project is for educational purposes.

---

##  Contributors

* Khalid Doctor (Project Lead) — Backend development, API integration, deployment, debugging, system design
* Neel Diwani — Frontend development, model fine-tuning, classification model development

---

##  Final Note

This project demonstrates end-to-end ML deployment including preprocessing, model training, API development, frontend integration, and cloud deployment.

---
