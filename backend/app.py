from flask import Flask, jsonify, request
import numpy as np
from scipy.spatial.distance import cosine
import random

app = Flask(__name__)

@app.route('/generate_random_number', methods=['GET'])
def generate_random_number():
    random_number = random.randint(0, 100)  # Generating a random number between 0 and 100
    return jsonify({'score': random_number})

def pad_array(arr, length):
    """Pad the array with zeros to the specified length."""
    if len(arr) < length:
        padding = np.zeros(length - len(arr))
        arr = np.concatenate((arr, padding))
    return arr

@app.route('/compare_audios', methods=['POST'])
def compare_audios():
    # Get the audio arrays from the request
    data = request.json
    audio1 = data['audio1']
    id = data['id']
    enc=audio1.b64encode(open("file.wav").read())
    random_number = random.randint(0, 10)  # Generating a random number between 0 and 10
    return jsonify({'score':random_number})
                    
if __name__ == '__main__':
    app.run(debug=True)
