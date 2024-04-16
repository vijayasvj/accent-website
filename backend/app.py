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
    audio1 = np.array(data['audio1'])
    audio2 = np.array(data['audio2'])

    # Get the maximum length of the two audio arrays
    max_length = max(len(audio1), len(audio2))

    # Pad the arrays if their lengths are different
    audio1 = pad_array(audio1, max_length)
    audio2 = pad_array(audio2, max_length)

    # Calculate cosine similarity
    similarity_score = 1 - cosine(audio1, audio2)

    return jsonify({'similarity_score': similarity_score})

if __name__ == '__main__':
    app.run(debug=True)
