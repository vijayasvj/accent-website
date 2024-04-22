from flask import Flask, jsonify, request
import numpy as np
from scipy.spatial.distance import cosine
import random
from flask_cors import CORS
import os
import base64
import soundfile as sf
from time import sleep
import joblib
import librosa
import wave
from sklearn.preprocessing import MinMaxScaler

# Load the KNN classifier
knn_classifier = joblib.load('knn_classifier_model.pkl')


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

@app.route('/predict', methods=['POST'])
def predict_accent():
    # Get the audio array and test ID from the request
    data = request.json
    audio_base64 = data['audio']
    test_id = data['testId']

    pcmfile = "input_audio.pcm"
    wavfile = "input_pred_audio.wav"
    decoded_data = base64.b64decode(audio_base64, ' /')
    with open(pcmfile, 'wb') as pcm:
        pcm.write(decoded_data)
    with open(pcmfile, 'rb') as pcm:
        pcmdata = pcm.read()
    with wave.open(wavfile, 'wb') as wav:
        wav.setparams((1, 2, 16000, 0, 'NONE', 'NONE'))
        wav.writeframes(pcmdata)
    

    # Extract MFCC features from the audio
    y, sr = librosa.load('input_pred_audio.wav')
    mfcc_features = librosa.feature.mfcc(y=y, sr=sr)
    mfcc_features_processed = np.mean(mfcc_features.T, axis=0)
    
    # Predict accent using the loaded KNN classifier
    prediction = knn_classifier.predict([mfcc_features_processed])[0]
    if prediction > 0.5:
        score = 10
    else:
        score = 0
    # Return prediction result
    return jsonify({'predicted_accent': score})

@app.route('/compare_audios', methods=['POST'])
def compare_audios():
    # Get the audio array and test ID from the request
    data = request.json
    audio_base64 = data['audio']
    test_id = data['testId']

    pcmfile = "input_audio.pcm"
    wavfile = "input_audio.wav"
    decoded_data = base64.b64decode(audio_base64, ' /')
    with open(pcmfile, 'wb') as pcm:
        pcm.write(decoded_data)
    with open(pcmfile, 'rb') as pcm:
        pcmdata = pcm.read()
    with wave.open(wavfile, 'wb') as wav:
        wav.setparams((1, 2, 16000, 0, 'NONE', 'NONE'))
        wav.writeframes(pcmdata)

    '''wav_file = open("input_audio.wav", "wb")
    decode_string = base64.b64decode(audio_base64)
    wav_file.write(decode_string)'''

    # Load the reference audio file based on the test ID
    reference_audio_path = f"/Users/apple/Documents/College-Projects/accent/american_audios/{test_id}.wav"
    if not os.path.exists(reference_audio_path):
        return jsonify({'error': 'Reference audio not found'}), 404
    if not os.path.exists("/Users/apple/Documents/College-Projects/accent/website/accent/backend/input_audio.wav"):
        return jsonify({'error': 'actual audio not found'}), 404
    reference_audio, _ = sf.read(reference_audio_path)
    input_audio, _ = sf.read("input_audio.wav")
    

    # Ensure both audio arrays are of the same length
    max_length = max(len(input_audio), len(reference_audio))
    input_audio = pad_array(input_audio, max_length)
    reference_audio = pad_array(reference_audio, max_length)

    # Calculate cosine similarity
    similarity_score = 1 - cosine(input_audio, reference_audio)
    if similarity_score > 0:
        similarity_score = similarity_score * 10
    else:
        similarity_score = -1 * similarity_score
        similarity_score = similarity_score * 10
    
    '''# Scale similarity score to the range [0, 10]
    scaler = MinMaxScaler(feature_range=(0, 10))
    similarity_score_scaled = scaler.fit_transform([[similarity_score]])[0][0]'''

    # Return the scaled similarity score
    return jsonify({'score': similarity_score})

                    
if __name__ == '__main__':
    app.run(debug=True, port = 3002)
