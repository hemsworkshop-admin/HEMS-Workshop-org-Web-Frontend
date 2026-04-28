import sys
import os
import fitz  # PyMuPDF
import re

def generate_preview(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: File not found {pdf_path}")
        sys.exit(1)

    filename = os.path.basename(pdf_path)
    
    try:
        doc = fitz.open(pdf_path)
        if len(doc) == 0:
            print("Error: Empty PDF")
            sys.exit(1)
            
        page = doc.load_page(0)
        
        if "_Abstract" in filename:
            # Extract text
            text = page.get_text()
            # Clean up whitespace and get first 100 words
            words = [w for w in re.split(r'\s+', text) if w]
            first_100 = " ".join(words[:100])
            if len(words) > 100:
                first_100 += "..."
                
            out_path = pdf_path.replace('.pdf', '_preview.txt')
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(first_100)
            print(f"Success: Wrote text preview to {out_path}")
            
        else:
            # Extract image (Presentation or Poster)
            # Scale to roughly 600px width to keep file size small
            zoom = 600.0 / page.rect.width
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
            out_path = pdf_path.replace('.pdf', '_preview.png')
            pix.save(out_path)
            print(f"Success: Wrote image preview to {out_path}")
            
    except Exception as e:
        print(f"Error processing {pdf_path}: {e}")
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python preview_generator.py <path_to_pdf>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    generate_preview(pdf_path)
