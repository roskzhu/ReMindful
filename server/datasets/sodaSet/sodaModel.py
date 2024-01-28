from roboflow import Roboflow
import json

rf = Roboflow(api_key="2X4JRhaChQhCtk06zZ9q")
project = rf.workspace().project("soda-bottles")
model = project.version(3).model

def predictSoda(imagePath)->json:
    return model.predict(imagePath, confidence=25, overlap=30).json()