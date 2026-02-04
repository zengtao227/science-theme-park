
import Quartz
from AppKit import NSData, NSBitmapImageRep, NSPNGFileType
import os

pdf_path = "/Users/zengtao/science-theme-park/2026_02_02 21_35 Office Lens.pdf"
output_dir = "/Users/zengtao/science-theme-park/pdf_pages"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

url = Quartz.NSURL.fileURLWithPath_(pdf_path)
pdf = Quartz.PDFDocument.alloc().initWithURL_(url)

for i in range(pdf.pageCount()):
    page = pdf.pageAtIndex_(i)
    rect = page.boundsForBox_(Quartz.kPDFDisplayBoxMediaBox)
    
    # Scale for better quality
    scale = 3.0
    width = rect.size.width * scale
    height = rect.size.height * scale
    
    # Create image from page
    page_image = page.thumbnailOfSize_forBox_(Quartz.NSSize(width, height), Quartz.kPDFDisplayBoxMediaBox)
    
    # Convert to PNG
    tiff_data = page_image.TIFFRepresentation()
    bitmap = NSBitmapImageRep.imageRepWithData_(tiff_data)
    png_data = bitmap.representationUsingType_properties_(NSPNGFileType, None)
    
    output_path = os.path.join(output_dir, f"page_{i+1}.png")
    png_data.writeToFile_atomically_(output_path, True)
    print(f"Saved: {output_path}")
