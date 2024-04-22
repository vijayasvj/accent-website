from flask import Flask, jsonify, request
import numpy as np
from scipy.spatial.distance import cosine
import random
from flask_cors import CORS
import os
import base64
import soundfile as sf
from time import sleep


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

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
    # Get the audio array and test ID from the request
    data = request.json
    audio_base64 = data['audio']
    test_id = data['testId']

    # Convert base64 audio to a file
    audio_bytes = base64.b64decode(audio_base64)
    with open("input_audio.wav", "wb") as audio_file:
        audio_file.write(audio_bytes)
    sleep(3)
    # Load the reference audio file based on the test ID
    reference_audio_path = f"/Users/apple/Documents/College-Projects/accent/american_audios/{test_id}.wav"
    if not os.path.exists(reference_audio_path):
        return jsonify({'error': 'Reference audio not found'}), 404

    # Load audio files
    try:
        input_audio, _ = sf.read("input_audio.wav")
        reference_audio, _ = sf.read(reference_audio_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Ensure both audio arrays are of the same length
    max_length = max(len(input_audio), len(reference_audio))
    input_audio = pad_array(input_audio, max_length)
    reference_audio = pad_array(reference_audio, max_length)

    # Calculate cosine similarity
    similarity_score = 1 - cosine(input_audio, reference_audio)

    # You can return any score you like based on the comparison
    return jsonify({'score': similarity_score})

                    
if __name__ == '__main__':
    app.run(debug=True, port = 3001)
