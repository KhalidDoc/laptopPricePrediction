import pandas as pd
import numpy as np


def load_and_clean_data(data):

    if isinstance(data, str):
        df = pd.read_csv(data)
    else:
        df = data.copy()

    df.drop(columns=["Unnamed: 0"], errors="ignore", inplace=True)

    # -----------------------------
    # BASIC CLEANING
    # -----------------------------
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

    # -----------------------------
    # SCREEN
    # -----------------------------
    df["Touchscreen"] = df["ScreenResolution"].str.contains(
        "Touch", case=False, na=False
    ).astype(int)

    df["IPS"] = df["ScreenResolution"].str.contains(
        "IPS", case=False, na=False
    ).astype(int)

    res = df["ScreenResolution"].str.extract(r"(\d+)x(\d+)")
    df["X_res"] = res[0].astype(float)
    df["Y_res"] = res[1].astype(float)

    df["PPI"] = np.sqrt(df["X_res"]**2 + df["Y_res"]**2) / df["Inches"]

    # -----------------------------
    # STORAGE
    # -----------------------------
    df["Memory"] = df["Memory"].astype(str)

    df["SSD"] = df["Memory"].str.extract(r"(\d+)GB SSD")[0].fillna(0).astype(float)
    df["HDD"] = df["Memory"].str.extract(r"(\d+)GB HDD")[0].fillna(0).astype(float)

    df["Storage_total"] = df["SSD"] + df["HDD"]

    # -----------------------------
    # CPU FEATURES
    # -----------------------------
    df["Cpu"] = df["Cpu"].astype(str)

    # CPU generation (strong signal)
    df["Cpu_gen"] = (
        df["Cpu"]
        .str.extract(r'i[3579]-(\d{4})')[0]
        .fillna(0)
        .astype(float)
    )

    # CPU speed
    df["Cpu_speed"] = (
        df["Cpu"]
        .str.extract(r"(\d+\.\d+)GHz")[0]
        .fillna(0)
        .astype(float)
    )

    # CPU tier
    df["Cpu_tier"] = (
        df["Cpu"]
        .str.extract(r'(i3|i5|i7|i9|Ryzen 3|Ryzen 5|Ryzen 7)', expand=False)
        .fillna("other")
    )

    # -----------------------------
    # GPU FEATURES (VERY IMPORTANT)
    # -----------------------------
    df["Gpu"] = df["Gpu"].astype(str)

    # Extract GPU numeric power (huge signal)
    df["Gpu_model_num"] = (
        df["Gpu"]
        .str.extract(r'(\d{3,4})')[0]
        .fillna(0)
        .astype(float)
    )

    # Dedicated GPU flag
    df["Dedicated_gpu"] = df["Gpu"].str.contains(
        "nvidia|amd|rtx|gtx", case=False, na=False
    ).astype(int)

    # RTX premium flag
    df["RTX_flag"] = df["Gpu"].str.contains(
        "rtx", case=False, na=False
    ).astype(int)

    # -----------------------------
    # OS
    # -----------------------------
    df["MacOS"] = df["OpSys"].str.contains(
        "mac", case=False, na=False
    ).astype(int)

    # -----------------------------
    # INTERACTIONS
    # -----------------------------
    df["Ram_per_inch"] = df["Ram"] / df["Inches"]
    df["CpuGpu_combo"] = df["Cpu_gen"] * df["Gpu_model_num"]

    # -----------------------------
    # DROP RAW COLUMNS
    # -----------------------------
    df.drop(columns=["Cpu", "Gpu", "Memory", "ScreenResolution"], inplace=True)

    return df
