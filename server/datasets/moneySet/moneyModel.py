from roboflow import Roboflow
import json

rf = Roboflow(api_key="2X4JRhaChQhCtk06zZ9q")
project = rf.workspace().project("currency-v4f8j")
model = project.version(1).model

def predictMoney(imagePath)->json:
    return model.predict(imagePath, confidence=25, overlap=30).json()