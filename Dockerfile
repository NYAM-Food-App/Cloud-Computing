# Gunakan Python base image
FROM python:3.12.7

# Atur working directory di dalam container
WORKDIR /app

# Salin semua file proyek ke container
COPY . /app

# Instal dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variable untuk Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose port Flask
EXPOSE 8080

# Jalankan aplikasi Flask
CMD ["flask", "run", "--port=8080"]