import pandas as pd
import numpy as np

INPUT_PATH = "data/cleaned_laptop.csv"          # your original dataset
OUTPUT_PATH = "data/cleaned_laptop_good.csv"

def clean_dataset():

    df = pd.read_csv(INPUT_PATH)

    print("Original shape:", df.shape)

    # ---------------------------------
    # 1️⃣ Remove duplicates
    # ---------------------------------
    df = df.drop_duplicates()

    # ---------------------------------
    # 2️⃣ Drop useless columns
    # ---------------------------------
    df.drop(columns=["Unnamed: 0"], errors="ignore", inplace=True)

    # ---------------------------------
    # 3️⃣ Handle missing values
    # ---------------------------------
    df = df.dropna(subset=["Price"])

    # Fill categorical missing with mode
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].fillna(df[col].mode()[0])

    # Fill numeric missing with median
    for col in df.select_dtypes(include=np.number).columns:
        df[col] = df[col].fillna(df[col].median())

    # ---------------------------------
    # 4️⃣ Fix numeric formats
    # ---------------------------------
    df["Ram"] = df["Ram"].astype(str).str.replace("GB", "", regex=False).astype(int)
    df["Weight"] = df["Weight"].astype(str).str.replace("kg", "", regex=False).astype(float)

    # ---------------------------------
    # 5️⃣ Remove unrealistic values
    # ---------------------------------
    df = df[df["Price"] > 10000]        # remove extremely low price
    df = df[df["Price"] < 500000]       # remove unrealistic high price
    df = df[df["Inches"] > 10]
    df = df[df["Ram"] > 0]

    # ---------------------------------
    # 6️⃣ Remove extreme outliers (IQR method)
    # ---------------------------------
    Q1 = df["Price"].quantile(0.25)
    Q3 = df["Price"].quantile(0.75)
    IQR = Q3 - Q1

    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR

    df = df[(df["Price"] >= lower) & (df["Price"] <= upper)]

    # ---------------------------------
    # 7️⃣ Log transform target (recommended)
    # ---------------------------------
    df["Price"] = np.log1p(df["Price"])

    print("Cleaned shape:", df.shape)

    df.to_csv(OUTPUT_PATH, index=False)
    print("Dataset cleaned and saved.")

if __name__ == "__main__":
    clean_dataset()
