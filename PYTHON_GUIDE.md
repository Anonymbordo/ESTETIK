# Python Architecture Guide for Rhinoplasty AI

Since this environment allows for Frontend/React development, I have built the **Web Interface** for your application. 

However, to help you with the **Python Backend** you requested, here is the recommended architecture and file structure you can use when deploying the backend server (e.g., on a GPU-enabled local machine or cloud instance).

## Project Structure

```
rhinoplasty-ai/
├── src/
│   ├── main.py                 # Entry point (FastAPI or PyQt app)
│   ├── config.py               # Configuration (Camera ID, Model paths)
│   ├── core/
│   │   ├── camera.py           # OpenCV VideoCapture wrapper
│   │   ├── face_mesh.py        # MediaPipe FaceMesh wrapper
│   │   └── warper.py           # Geometric warping logic (TPS/Affine)
│   ├── ui/                     # For Desktop (PyQt) or Web (Gradio/Streamlit)
│   │   ├── main_window.py
│   │   └── controls.py
│   └── utils/
│       ├── math_utils.py       # Helper functions for landmarks
│       └── image_utils.py      # Image processing helpers
├── models/                     # Saved models (if any custom ones)
├── tests/                      # Unit tests
├── requirements.txt
└── README.md
```

## Key Modules Explained

### 1. `src/core/face_mesh.py`
Uses `mediapipe` to detect landmarks.
- **Key Landmarks for Nose:**
  - Tip: 1
  - Bridge: 6, 168, 197
  - Nostrils: 2, 328, 279
  - Nasal Base: 94

### 2. `src/core/warper.py`
Implements the deformation logic.
- **Technique:** Thin Plate Spline (TPS) or Piecewise Affine Warp.
- **Libraries:** `cv2`, `numpy`, `scipy.interpolate.Rbf` (for TPS).
- **Logic:**
  1. Define source points (original nose landmarks).
  2. Define target points (modified based on slider values).
  3. Calculate warp matrix.
  4. Apply warp to the ROI (Region of Interest) of the nose.
  5. Blend back into the original frame using Poisson Blending (`cv2.seamlessClone`) to preserve skin texture.

### 3. `src/main.py` (FastAPI Example)
If building a web backend to connect with the React Frontend I created:
```python
from fastapi import FastAPI, WebSocket
from src.core.face_mesh import FaceMeshDetector
from src.core.warper import NoseWarper

app = FastAPI()

@app.websocket("/ws/video")
async def video_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        frame_bytes = await websocket.receive_bytes()
        # 1. Decode frame
        # 2. Detect landmarks
        # 3. Warp nose
        # 4. Encode and send back
```

This structure separates concerns and allows for modular development of the Computer Vision components.
