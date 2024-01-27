from flask import Flask, request, jsonify, send_file
from flask_pymongo import PyMongo
from bson import Binary
import base64
import io
import logging

app = Flask(__name__)

# Enable CORS for all domains on all routes
CORS(app, origins=["http://localhost:3000"])
# app = Flask(__name__)

# Memories database containing images, description, and object keywords
app.config['MONGO_URI'] = 'mongodb://localhost:27017/memories'
mongo = PyMongo(app)

@app.route('/print_transcript', methods=['POST'])
def print_transcript():
    data = request.json
    transcript = data.get('transcript', '')

# POST endpoint to add images, descriptions, and keywords to the database
@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.json:
            raise ValueError("'image' key not found in the request JSON")

        image_data = request.json['image']  # Assuming you send the image as base64-encoded string in the request JSON
        description = request.json.get('description', '')
        keywords = request.json.get('keywords', '')

        image_binary = Binary(base64.b64decode(image_data))
        image_collection = mongo.db.images

        image_document = {
            'keywords' : keywords,
            'description': description,
            'image_data': image_binary
        }

        inserted_image = image_collection.insert_one(image_document)
        return jsonify({'message': 'Image uploaded successfully', 'image_id': str(inserted_image.inserted_id)})

    except Exception as e:
        return jsonify({'error': str(e)})
    
# GET endpoint to retrieve images and keywords from memories database
@app.route('/retrieve', methods=['GET'])
def retrieve_image():
    try:
        # Find a random image document in the database
        image_collection = mongo.db.images
        random_image_document = image_collection.aggregate([{ '$sample': { 'size': 1 } }]).next()

        if random_image_document:
            # Decode the base64 image data
            image_data = random_image_document['image_data']
            decoded_image = base64.b64decode(image_data)

            # Create an in-memory file-like object
            image_stream = io.BytesIO(decoded_image)

            # Send the file as a response
            return send_file(image_stream, mimetype='image/jpeg')  # Adjust mimetype based on your image type

        else:
            return jsonify({'error': 'No images found'})
    
    except Exception as e:
        return jsonify({'error': str(e)})

    if not transcript:
        return jsonify({'error': 'Missing "transcript" parameter'}), 400

    print(f"Transcript received: {transcript}")
    
    return jsonify({'message': 'Transcript received and printed'})

if __name__ == '__main__':
    app.run(debug=True)
