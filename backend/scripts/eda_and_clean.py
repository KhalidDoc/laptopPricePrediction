import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

INPUT_PATH = "data/cleaned_laptop.csv"
OUTPUT_PATH = "data/cleaned_laptop_perfect_1.csv"


def eda_and_clean():

    df = pd.read_csv(INPUT_PATH)

    print("\n============================")
    print("INITIAL DATA OVERVIEW")
    print("============================")

    print("Shape:", df.shape)
    print("\nMissing values:\n", df.isnull().sum())
    print("\nDuplicate rows:", df.duplicated().sum())

    # ---------------------------------
    # 1️⃣ Remove duplicates
    # ---------------------------------
    df = df.drop_duplicates()

    # ---------------------------------
    # 2️⃣ Remove rows with missing target
    # ---------------------------------
    df = df.dropna(subset=["Price"])

    # ---------------------------------
    # 3️⃣ Fix Data Types
    # ---------------------------------
    df["Ram"] = (
        df["Ram"]
        .astype(str)
        .str.replace("GB", "", regex=False)
        .astype(float)
        .astype(int)
    )

    df["Weight"] = (
        df["Weight"]
        .astype(str)
        .str.replace("kg", "", regex=False)
        .astype(float)
    )

    # ---------------------------------
    # 4️⃣ Remove unrealistic records
    # ---------------------------------
    df = df[(df["Price"] > 15000) & (df["Price"] < 400000)]
    df = df[(df["Ram"] >= 2) & (df["Ram"] <= 64)]
    df = df[(df["Inches"] >= 11) & (df["Inches"] <= 18)]

    # ---------------------------------
    # 📊 Chart 1 — Price Distribution
    # ---------------------------------
    plt.figure(figsize=(8,5))
    sns.histplot(df["Price"], bins=40, kde=True)
    plt.title("Laptop Price Distribution")
    plt.xlabel("Price")
    plt.ylabel("Frequency")
    plt.show()

    # ---------------------------------
    # 5️⃣ Target Distribution Before Log
    # ---------------------------------
    print("\nPrice skewness before log:", df["Price"].skew())

    # ---------------------------------
    # 6️⃣ Remove Extreme Price Outliers (Stronger IQR)
    # ---------------------------------
    Q1 = df["Price"].quantile(0.10)
    Q3 = df["Price"].quantile(0.90)
    IQR = Q3 - Q1

    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR

    df = df[(df["Price"] >= lower) & (df["Price"] <= upper)]

    print("\nShape after outlier removal:", df.shape)

    # ---------------------------------
    # 📊 Chart 2 — RAM vs Price
    # ---------------------------------
    plt.figure(figsize=(8,5))
    sns.boxplot(x="Ram", y="Price", data=df)
    plt.title("RAM vs Laptop Price")
    plt.xlabel("RAM (GB)")
    plt.ylabel("Price")
    plt.show()

    # ---------------------------------
    # 📊 Chart 3 — Company vs Price
    # ---------------------------------
    plt.figure(figsize=(10,6))
    sns.boxplot(x="Company", y="Price", data=df)
    plt.xticks(rotation=45)
    plt.title("Laptop Price by Company")
    plt.show()

    # ---------------------------------
    # 7️⃣ Log Transform Target
    # ---------------------------------
    df["Price"] = np.log1p(df["Price"])

    print("Price skewness after log:", df["Price"].skew())

    # ---------------------------------
    # 8️⃣ Remove Weak / Noisy Features
    # ---------------------------------
    low_signal_cols = ["Flash"]

    df.drop(columns=[c for c in low_signal_cols if c in df.columns], inplace=True)

    # ---------------------------------
    # 9️⃣ Correlation Check
    # ---------------------------------
    numeric_df = df.select_dtypes(include=np.number)

    corr = numeric_df.corr()["Price"].sort_values(ascending=False)

    print("\nTop Correlated Features with Price:\n")
    print(corr.head(10))

    print("\nLowest Correlated Features:\n")
    print(corr.tail(5))

    # ---------------------------------
    # 📊 Chart 4 — Correlation Heatmap
    # ---------------------------------
    plt.figure(figsize=(10,6))

    sns.heatmap(
        numeric_df.corr(),
        annot=True,
        cmap="coolwarm",
        fmt=".2f"
    )

    plt.title("Feature Correlation Heatmap")

    plt.show()

    # ---------------------------------
    # 🔟 Multicollinearity Check
    # ---------------------------------
    corr_matrix = numeric_df.corr().abs()

    upper_triangle = corr_matrix.where(
        np.triu(np.ones(corr_matrix.shape), k=1).astype(bool)
    )

    to_drop = [
        column for column in upper_triangle.columns
        if any(upper_triangle[column] > 0.95)
    ]

    if to_drop:
        print("\nDropping highly correlated features:", to_drop)
        df.drop(columns=to_drop, inplace=True)

    # ---------------------------------
    # 11️⃣ Final Dataset Summary
    # ---------------------------------
    print("\nFinal shape:", df.shape)
    print("Final missing values:\n", df.isnull().sum())

    df.to_csv(OUTPUT_PATH, index=False)

    print("\nDataset cleaned and saved to:", OUTPUT_PATH)


if __name__ == "__main__":
    eda_and_clean()