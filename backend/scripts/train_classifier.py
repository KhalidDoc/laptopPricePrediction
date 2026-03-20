import pandas as pd
import joblib
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

DATA_PATH = "data/cleaned_laptop_good.csv"
MODEL_PATH = "models/category_model.pkl"

df = pd.read_csv(DATA_PATH)

# -----------------------
# CREATE CATEGORY LABEL
# -----------------------

def create_category(price):

    price = np.expm1(price)

    if price < 40000:
        return 0
    elif price < 80000:
        return 1
    else:
        return 2

df["Category"] = df["Price"].apply(create_category)

X = df.drop(["Price","Category"], axis=1)
y = df["Category"]

X = pd.get_dummies(X, drop_first=True)

X_train, X_test, y_train, y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

model = LogisticRegression(max_iter=2000)

model.fit(X_train,y_train)

pred = model.predict(X_test)

print("Accuracy:",accuracy_score(y_test,pred))

joblib.dump(model, MODEL_PATH)