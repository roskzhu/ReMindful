from flask import Flask, request, jsonify, send_file
from flask_pymongo import PyMongo
from bson import Binary
import base64, binascii
import io
from datasets.moneySet.moneyModel import predictMoney
from datasets.sodaSet.sodaModel import predictSoda
from datasets.phoneSet.phoneModel import predictPhone
from PIL import Image


app = Flask(__name__)

# print(predictMoney('./datasets/moneySet/money2.jpg'))

# Memories database containing images, description, and object keywords
app.config['MONGO_URI'] = 'mongodb://localhost:27017/memories'
mongo = PyMongo(app)

# POST endpoint to add images, descriptions, and keywords to the database
@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.json:
            raise ValueError("'image' key not found in the request JSON")

        image_data = request.json['image']  # Assuming you send the image as base64-encoded string in the request JSON
        description = request.json.get('description', '')
        keywords = request.json.get('keywords', '')

        # image_binary = Binary(base64.b64decode(image_data))
        image_collection = mongo.db.images

        image_document = {
            'keywords' : keywords,
            'description': description,
            'image_data': image_data  # image binary before
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

            # Save the image locally to retrieved_images
            img = Image.open(image_stream)
            output_path = './retrieved_images/img' + image_data[5:10]+ '.jpeg'
            img.save(output_path)

            # Run each model in that image
            # objects_detected = []

            # Store the image, coordinates, width, height, objects in a list of dicts (for each object) to return
            models = [predictMoney, predictSoda, predictPhone]
            objects_detected = {}  # return value

            for model in models:
                # add each object in the dic, where the key is the object and the value is a list of detected locations
                curr_object = model(output_path)['predictions']
                objects_detected[model.__name__] = curr_object

                # print(model.__name__, objects_detected[model.__name__])
                # print("length: ", len(objects_detected[model.__name__]))

                # Pop unnecessary information
                for i in range(len(objects_detected[model.__name__])):
                    # print(model.__name__, objects_detected[model.__name__][i])
                    objects_detected[model.__name__][i].pop('confidence')
                    objects_detected[model.__name__][i].pop('class')
                    objects_detected[model.__name__][i].pop('class_id')
                    objects_detected[model.__name__][i].pop('image_path')
                    objects_detected[model.__name__][i].pop('prediction_type')

                # Save to a result output
                # objects_detected.append(prediction)

            print('org json', objects_detected)

            # Send the file as a response
            # return send_file('', mimetype='image/jpeg')  # Adjust mimetype based on your image type
            return jsonify({'message': 'Models ran successfully', 'objects_detected' : objects_detected, 'img_path': output_path})

        else:
            return jsonify({'error': 'No images found'})
    
    except Exception as e:
        return jsonify({'error': str(e)})




if __name__ == '__main__':
    app.run(debug=True)

