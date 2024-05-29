FROM python:3.11.8-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
COPY app.py .
COPY carreras.db .
COPY db/ db/
EXPOSE 5000
CMD ["python3", "app.py"]