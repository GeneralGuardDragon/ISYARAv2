# gesture-backend/main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import mediapipe as mp

# Inisialisasi FastAPI
app = FastAPI()

# Izinkan CORS untuk akses dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Sebaiknya ganti dengan domain frontend kamu di produksi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inisialisasi MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1)
mp_drawing = mp.solutions.drawing_utils


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Baca gambar dari file
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Proses gambar dengan MediaPipe
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks:
        # Kalau tangan terdeteksi → kirim teks dummy
        return {"gesture": "halo"}
    else:
        return {"gesture": "tidak terdeteksi"}
