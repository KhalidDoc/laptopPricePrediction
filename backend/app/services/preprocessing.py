import pandas as pd
import numpy as np

def load_and_clean_data(data):

    # Allow both file path and dataframe
    if isinstance(data, str):
        df = pd.read_csv(data)
    else:
        df = data.copy()



    # --- basic cleaning ---
    df.drop(columns=["Unnamed: 0"], errors="ignore", inplace=True)
    df["Ram"] = df["Ram"].str.replace("GB","", regex=False).astype(int)
    df["Weight"] = df["Weight"].str.replace("kg","", regex=False).astype(float)

    # --- screen features ---
    df["Touchscreen"] = df["ScreenResolution"].str.contains("Touch", case=False).astype(int)
    df["IPS"] = df["ScreenResolution"].str.contains("IPS", case=False).astype(int)

    res = df["ScreenResolution"].str.extract(r'(\d+)x(\d+)')
    df["X_res"] = res[0].astype(int)
    df["Y_res"] = res[1].astype(int)
    df["PPI"] = ((df["X_res"]**2 + df["Y_res"]**2)**0.5) / df["Inches"]

    # --- storage ---   
    df["SSD"] = 0
    df["HDD"] = 0
    df["Flash"] = 0
    df["Hybrid"] = df["Memory"].str.contains("Hybrid", case=False).astype(int)

    ssd_gb = df["Memory"].str.extract(r'(\d+)GB SSD')[0]
    hdd_gb = df["Memory"].str.extract(r'(\d+)GB HDD')[0]
    flash_gb = df["Memory"].str.extract(r'(\d+)GB Flash')[0]

    ssd_tb = df["Memory"].str.extract(r'(\d+)TB SSD')[0]
    hdd_tb = df["Memory"].str.extract(r'(\d+)TB HDD')[0]

    df["SSD"] += ssd_gb.fillna(0).astype(int)
    df["HDD"] += hdd_gb.fillna(0).astype(int)
    df["Flash"] += flash_gb.fillna(0).astype(int)
    df["SSD"] += ssd_tb.fillna(0).astype(int) * 1024
    df["HDD"] += hdd_tb.fillna(0).astype(int) * 1024

    # --- cpu ---
    df["Cpu_brand"] = df["Cpu"].apply(lambda x: x.split()[0])

    def cpu_tier(text):
        text = text.lower()
        if "i3" in text: return "i3"
        if "i5" in text: return "i5"
        if "i7" in text: return "i7"
        if "i9" in text: return "i9"
        if "ryzen 3" in text: return "ryzen3"
        if "ryzen 5" in text: return "ryzen5"
        if "ryzen 7" in text: return "ryzen7"
        if "celeron" in text: return "celeron"
        if "atom" in text: return "atom"
        return "other"

    df["Cpu_tier"] = df["Cpu"].apply(cpu_tier)
    df["Cpu_speed"] = df["Cpu"].str.extract(r'(\d+\.\d+)GHz')[0].astype(float)
    df["Cpu_speed"] = df["Cpu_speed"].fillna(df["Cpu_speed"].median())

    # --- gpu ---
    def gpu_brand(text):
        text = text.lower()
        if "nvidia" in text: return "nvidia"
        if "amd" in text: return "amd"
        if "intel" in text: return "intel"
        return "other"

    df["Gpu_brand"] = df["Gpu"].apply(gpu_brand)
    df["Dedicated_gpu"] = df["Gpu"].str.contains("nvidia|amd", case=False).astype(int)

    # --- drop raw columns ---
    df.drop(columns=["Cpu","Gpu","Memory","ScreenResolution"], inplace=True)

    return df
