# Use the official Node.js 20 Debian environment
FROM node:20-bookworm

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install LibreOffice, OCRmyPDF, Tesseract, and Python
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice \
    ocrmypdf \
    tesseract-ocr \
    tesseract-ocr-eng \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install the Python pdf2docx library
RUN python3 -m pip install pdf2docx --break-system-packages

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port defined by Render
EXPOSE 8080

# Start the Express server
CMD ["node", "server.js"]