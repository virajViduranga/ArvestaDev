import * as pdfjsLib from 'pdfjs-dist';

const pdfjsVersion = pdfjsLib.version;
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;


export async function analyzeDocument(file) {
  const arrayBuffer = await file.arrayBuffer();
const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  
  let hasText = false;
  let hasImages = false;
  const numPages = pdf.numPages;
  
  // Analyze up to the first 3 pages to save memory/time
  const pagesToAnalyze = Math.min(3, numPages);
  
  for (let i = 1; i <= pagesToAnalyze; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    if (textContent.items.length > 10) {
      hasText = true;
    }
    
    const opList = await page.getOperatorList();
    // Check if the page contains painting operations typical of scanned images
    if (opList.fnArray.includes(pdfjsLib.OPS.paintImageXObject) || 
        opList.fnArray.includes(pdfjsLib.OPS.paintJpegXObject)) {
      hasImages = true;
    }
  }

  const isLikelyScanned = !hasText && hasImages;

  return {
    numPages,
    isLikelyScanned,
    hasText,
    sizeBytes: file.size,
    isComplex: numPages > 50 || file.size > 20 * 1024 * 1024 // arbitrary complexity threshold
  };
}