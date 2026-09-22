ArvestaDev Web Utility Platform
A high-performance, privacy-first PDF and web utility platform. This project utilizes a hybrid architecture: lightweight operations run entirely in the browser using WebAssembly and client-side JavaScript, while heavy document conversions are routed to an isolated Express.js backend.

Features
Client-Side Tools (Zero-Data Transfer)
Processed 100% locally in the browser using pdf-lib and pdfjs-dist. Files never hit a server.

Merge PDFs: Drag-and-drop reordering and multi-file merging.

JPG to PDF: Convert multiple images into a single PDF document.

PDF to JPG: Extract all pages of a PDF into a high-quality .zip archive.

Image Compressor: Client-side image optimization.

JSON Formatter & Word Counter: Instant local text processing.

Server-Side Tools (Secure Processing)
Heavy conversions are processed in an isolated backend queue with automatic immediate file destruction and IP-based rate limiting.

PDF to Word (DOCX): Utilizes Python and pdf2docx for layout preservation.

Scanned PDF to Word (OCR): Utilizes OCRmyPDF and Tesseract to extract text from image-only PDFs before conversion.

Word to PDF: Utilizes LibreOffice Headless for perfect document formatting preservation.

Architecture Overview
This project is split into two distinct environments to maximize performance and minimize hosting costs.

Frontend (Next.js): Hosted on Cloudflare Pages. Handles all routing, UI, local processing, and batch-job polling.

Backend (Express.js): Hosted on a Linux VPS. Acts as a conversion worker. Receives files via multer, processes them via Node's child_process, and immediately wipes the /tmp directory.

Prerequisites
To run the backend server, your operating system (Ubuntu/Debian recommended) must have the following system dependencies installed:

Bash
# Node.js environment
sudo apt install -y nodejs npm

# LibreOffice (Word -> PDF)
sudo apt install -y libreoffice

# OCRmyPDF & Tesseract (Scanned PDF support)
sudo apt install -y ocrmypdf tesseract-ocr tesseract-ocr-eng

# Python & pdf2docx (PDF -> Word)
sudo apt install -y python3 python3-pip
python3 -m pip install pdf2docx --break-system-packages
Installation & Setup
1. Backend (Express API)
Bash
# Clone the repository
git clone [https://github.com/yourusername/arvestadev-pdf.git](https://github.com/yourusername/arvestadev-pdf.git)
cd arvestadev-pdf/backend

# Install dependencies
npm install

# Start the server (Runs on port 8080 by default)
node server.js
2. Frontend (Next.js)
Bash
# Open a new terminal and navigate to the frontend directory
cd arvestadev-pdf/frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

# Start the development server
npm run dev
Open http://localhost:3000 in your browser to view the application.

Security Implementations
Zero-Trust Filenames: Uploaded filenames are ignored. The backend generates unique UUIDs for processing to prevent Path Traversal attacks.

Automatic Cleanup: Files are deleted via fs.unlink immediately after the Express res.download stream finishes. A fallback cron job deletes any orphaned files older than 1 hour.

Rate Limiting: In-memory request tracking limits users to 5 heavy conversions per minute.

Payload Limits: Strict 20MB file size limits enforced by multer.

Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS, Lucide Icons.

Client PDF Engine: pdf-lib, pdfjs-dist, jszip.

Backend: Node.js, Express.js, Multer.

Server Processing: Python (pdf2docx), LibreOffice, Tesseract OCR.
