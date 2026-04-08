from flask import Blueprint, jsonify
import pandas as pd
import os
import re

options_bp = Blueprint("options", __name__)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_PATH = os.path.join(BASE_DIR, "data", "laptop_data.csv")


# -----------------------------
# NORMALIZATION FUNCTIONS
# -----------------------------

def clean_text(val):
    return re.sub(r"\s+", " ", str(val)).strip()


def normalize_memory(mem):
    mem = clean_text(mem).upper()

    # Normalize TB format
    mem = mem.replace("1.0TB", "1TB")

    # Fix spacing around +
    mem = mem.replace(" + ", "+").replace(" +", "+").replace("+ ", "+")

    return mem


def normalize_cpu(cpu):
    cpu = clean_text(cpu)

    # Normalize GHz format (2.50 → 2.5)
    cpu = re.sub(r'(\d+\.\d)0GHz', r'\1GHz', cpu)

    return cpu


def normalize_gpu(gpu):
    return clean_text(gpu)


def normalize_screen(screen):
    screen = str(screen).lower()

    label = ""

    if "touch" in screen:
        label += "Touch "
    if "ips" in screen:
        label += "IPS "

    match = re.search(r'(\d+x\d+)', screen)
    res = match.group(1) if match else ""

    return (label + res).strip()


# -----------------------------
# ROUTE
# -----------------------------
@options_bp.route("/options", methods=["GET"])
def get_options():
    try:
        df = pd.read_csv(DATA_PATH)

        # Clean basic columns
        df["Ram"] = df["Ram"].astype(str).str.replace("GB", "")

        response = {
            "Company": sorted(df["Company"].dropna().unique().tolist()),

            "TypeName": sorted(df["TypeName"].dropna().unique().tolist()),

            "Ram": sorted(df["Ram"].astype(int).unique().tolist()),

            # CPU CLEANED
            "Cpu": sorted(
                df["Cpu"]
                .dropna()
                .apply(normalize_cpu)
                .value_counts()
                .head(30)
                .index
                .tolist()
            ),

            "Gpu": sorted(
                df["Gpu"]
                .dropna()
                .apply(normalize_gpu)
                .value_counts()
                .head(30)
                .index
                .tolist()
            ),

            # MEMORY CLEANED
            "Memory": sorted(
                df["Memory"]
                .dropna()
                .apply(normalize_memory)
                .unique()
                .tolist()
            ),

            # SCREEN CLEANED
            "ScreenResolution": sorted(
                df["ScreenResolution"]
                .dropna()
                .apply(normalize_screen)
                .unique()
                .tolist()
            ),

            "OpSys": sorted(df["OpSys"].dropna().unique().tolist()),
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500