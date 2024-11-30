import os
import tempfile
from flask import Flask, request, jsonify
from PIL import Image
import tensorflow as tf
import numpy as np
from google.cloud import storage
from dotenv import load_dotenv


# Load variabel dari file .env
load_dotenv()

# Set kredensial Google Cloud Storage
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")


# Konfigurasi dari .env
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
FOOD_MODEL_BLOB_NAME = os.getenv("FOOD_MODEL_BLOB_NAME")
BMR_MODEL_BLOB_NAME = os.getenv("BMR_MODEL_BLOB_NAME")

# Tentukan direktori sementara
temp_dir = tempfile.gettempdir()
LOCAL_FOOD_MODEL_PATH = os.path.join(temp_dir, FOOD_MODEL_BLOB_NAME)
LOCAL_BMR_MODEL_PATH = os.path.join(temp_dir, BMR_MODEL_BLOB_NAME)

# Inisialisasi Flask
app = Flask(__name__)

# ===========================
# Fungsi untuk Unduh Model
# ===========================
def download_model_from_gcs(bucket_name, source_blob_name, destination_file_name):
    """Unduh file dari Google Cloud Storage ke lokal."""
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    print(f"Model {source_blob_name} downloaded to {destination_file_name}.")

# Unduh model dari GCS ke lokal
download_model_from_gcs(GCS_BUCKET_NAME, FOOD_MODEL_BLOB_NAME, LOCAL_FOOD_MODEL_PATH)
download_model_from_gcs(GCS_BUCKET_NAME, BMR_MODEL_BLOB_NAME, LOCAL_BMR_MODEL_PATH)

# Memuat model
food_model = tf.keras.models.load_model(LOCAL_FOOD_MODEL_PATH)
bmr_model = tf.keras.models.load_model(LOCAL_BMR_MODEL_PATH)

# ===========================
# Fungsi Pendukung
# ===========================
def prepare_image(file):
    """Mempersiapkan gambar untuk input model."""
    img = Image.open(file)
    img = img.resize((224, 224))  # Ukuran input yang sesuai dengan model
    img_array = np.array(img)     # Mengubah gambar ke array numpy
    img_array = np.expand_dims(img_array, axis=0)  # Menambahkan batch dimension
    img_array = img_array / 255.0  # Normalisasi manual (pembagian dengan 255)
    return img_array

# ===========================
# Endpoint API
# ===========================
@app.route('/food', methods=['POST'])
def predict_food():
    """Endpoint untuk prediksi bahan makanan."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Persiapkan gambar untuk prediksi
    img_array = prepare_image(file)
    prediction = food_model.predict(img_array)

    # Ambil label dengan probabilitas tertinggi
    class_names = [
        'ayam', 'brokoli', 'ikan', 'kambing', 'kembang kol', 'kentang',
        'kol', 'labu', 'mentimun', 'paprika', 'sapi', 'tahu', 'telur',
        'tempe', 'tomat', 'udang', 'wortel'
    ]
    predicted_index = np.argmax(prediction[0])  
    predicted_prob = np.max(prediction[0])     
    predicted_class_name = class_names[predicted_index]

    return jsonify({
        "predicted_class": predicted_class_name,
        "predicted_prob": float(predicted_prob),
        "all_probabilities": prediction[0].tolist()
    })


@app.route('/bmr', methods=['POST'])
def predict_bmr():
    """Endpoint untuk prediksi BMR."""
    data = request.get_json()

    # Validasi input
    if not all(key in data for key in ['gender', 'height', 'weight', 'bmi']):
        return jsonify({"error": "Data input harus memiliki 'gender', 'height', 'weight' dan 'BMI'"}), 400

    gender = int(data['gender'])  
    height = int(data['height'])  
    weight = int(data['weight'])  
    bmi = int(data['bmi'])

    input_data = np.array([gender, height, weight, bmi]).reshape(1, -1)
    prediction = bmr_model.predict(input_data).flatten()
    predicted_index = int(np.argmax(prediction))

    return jsonify({
        "input": {
            "gender": gender,
            "height": height,
            "weight": weight,
            "bmi": bmi
        },
        "prediction": {
            "probabilities": prediction.tolist(),
            "predicted_index": predicted_index
        }
    })

# Jalankan aplikasi
if __name__ == '__main__':
    app.run(debug=True)
    app.run(host="0.0.0.0", port=8080)
