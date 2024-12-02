const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { bucket } = require('../services/firebaseService'); // Pastikan mengimpor bucket dari service

// Fungsi untuk mengunduh gambar dari URL dan menyimpannya ke Google Cloud Storage
const downloadImageAndUpload = async (imageUrl, fileName) => {
    try {
        // Tentukan path untuk file sementara yang akan diunduh
        const tempDir = path.join(__dirname, 'temp'); // Lokasi direktori sementara

        // Pastikan direktori 'temp' ada, jika tidak buat
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true }); // Buat folder jika belum ada
            console.log('Temp directory created');
        }

        // Tentukan path file untuk menyimpan gambar sementara
        const filePath = path.join(tempDir, fileName);

        // Mengunduh gambar dari URL
        const response = await axios({
            url: imageUrl,
            responseType: 'stream',  // Membaca gambar dalam bentuk stream
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', async () => {
                try {
                    // Upload gambar ke Google Cloud Storage
                    const uploadedFile = await bucket.upload(filePath, {
                        destination: `images/${fileName}`,
                        metadata: {
                            contentType: 'image/jpeg',  // Tentukan jenis konten sesuai gambar
                        },
                    });

                    // Menghapus file sementara setelah diupload
                    fs.unlinkSync(filePath);

                    // Mendapatkan URL publik file yang diupload
                    const publicUrl = uploadedFile[0].metadata.mediaLink;
                    resolve(publicUrl);  // Mengembalikan URL gambar yang telah diupload
                } catch (err) {
                    console.error('Error uploading image to Cloud Storage:', err);
                    reject('Error uploading image to Cloud Storage');
                }
            });

            writer.on('error', (err) => {
                console.error('Error writing file:', err);
                reject('Error writing file');
            }); // Tangani error saat menulis file
        });
    } catch (error) {
        console.error('Error downloading image:', error.message);
        throw new Error('Error downloading or uploading image: ' + error.message);
    }
};

module.exports = { downloadImageAndUpload };
