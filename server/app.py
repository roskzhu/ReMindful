from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all domains on all routes
CORS(app)

@app.route('/print_transcript', methods=['POST'])
def print_transcript():
    data = request.json
    transcript = data.get('transcript', '')

    if not transcript:
        return jsonify({'error': 'Missing "transcript" parameter'}), 400

    print(f"Transcript received: {transcript}")
    return jsonify({'message': 'Transcript received and printed'})

if __name__ == '__main__':
    app.run(debug=True)
