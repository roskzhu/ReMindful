# app.py

from flask import Flask, request, jsonify
from transcribe import transcribe_streaming
import os

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def handle_transcription():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        audio_stream = file.stream
        transcription = transcribe_streaming(audio_stream)
        return jsonify({'transcription': transcription})

    return jsonify({'error': 'Error processing the file'}), 500

if __name__ == '__main__':
    app.run(debug=True)
