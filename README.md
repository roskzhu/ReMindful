<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px; font-size:60pt;">ReMindful</h1></summary>
      </ul>
    </div>
    <h3>you used to recall me on my cell phone</h3>
<!--     <h4><i>🏅 1st Place SheHacks Winner</i></h4> -->
   <br>
    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <br><br>
</div>

![image](https://github.com/roskzhu/ReMindful/assets/110139243/c6f373ef-67cf-43c4-91f8-71bc7f24f96a)

From experiencing moments of forgetfulness to facing the challenges of dementia, the loss of cherished memories can bring unimaginable pain. For individuals with Alzheimer's and other conditions that affect memory, losing recollections of loved ones can feel like losing a part of their identity. We want to provide support for those experiencing memory loss, no matter how severe it is. Our goal is to offer a tool that can assist in memory recall and enhance cognitive abilities. Remindful is designed to complement existing dementia treatments (not replace them!!), providing a non-invasive, accessible, and enjoyable supplemental aid.

## Features
### Active Recall Memory Game:

Remindful engages users in an interactive game using active recall strategies and reminiscence therapy to improve cognitive skills.
Users explore memories through pictures, starting with a partially obscured image that gradually unveils key details as they recall and describe elements.
### Example-Based Memory Trigger:

Utilizes past events, like participation in UofTHacks, as memory triggers for users.
Users mentally reconstruct scenes by recalling objects and activities related to the depicted event.
### Voice-Activated Interaction:

Users speak into the microphone, making guesses and describing their memories aloud.
The system responds to keywords, such as "laptop," revealing hidden objects and prompting users to continue piecing together the memory.
### Scoring and Evaluation:

The game concludes with a comprehensive score based on factors like accuracy, completion time, and the ability to remember all key objects.
Provides a structured feedback mechanism, encouraging users to reflect on their memory recall performance and track improvements over time.

## Built with
- Flask backend
- Python, YoloV8 & Roboflow to train the model for object detection
- MongoDB to store images
- Web Speech API to transcribe your voice into text in real-time
- Typescript React frontend
  
### How we trained the model
To train our object detection model using Roboflow and YOLOv8, we began by curating a diverse dataset representing various scenarios, including instances from UofTHacks and other comparable events. We fine-tuned YOLOv8's parameters and configurations using Jupyter Notebook for optimal performance in detecting and identifying objects crucial to the memory recall game in Remindful.


## Architecture Overview
![pasta(remindful) drawio](https://github.com/roskzhu/ReMindful/assets/110139243/e13a5f11-4162-47ef-91ed-41207cccad25)


## Getting Started

### Prerequisites
1. Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Python](https://www.python.org/) and [pip](https://pip.pypa.io/en/stable/) installed for the backend.

2. Install required dependencies in root folder and both frontend and backend folders
```
npm install
```

### Starting the server

_(127.0.0.1:5000 by default)_

1. `cd server`
2. `python3 -m venv venv`
3. `source venv/bin/activate` (MacOS)
4. `venv\Scripts\activate` (Windows Powershell)
5. `pip install -r requirements.txt`
6. `python3 app.py`

### Starting the app

_(localhost:3000 by default)_

1. `cd client`
2. `npm install`
3. `npm start`


### Sneak Peak

![image](https://github.com/roskzhu/ReMindful/assets/110139243/8a68ddae-5890-4911-aac1-c6d96b13d103)

![image](https://github.com/roskzhu/ReMindful/assets/110139243/77f8f15e-4360-43e0-a282-90419b940ad3)

## Next Steps
- [ ] Stable diffusion to erase objects instead of blurring them out (to replicate Adobe's generative fill tool)
- [ ] Build a model that determines the "importance" of an item such as frequency, identifiability, user feedback, etc...
- [ ] Optimize for faster response times
- [ ] More accurate object detection models

