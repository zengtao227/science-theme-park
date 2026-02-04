
import os
from AppKit import NSData, NSPDFImageRep, NSBitmapImageRep, NSColor, NSRectFill, NSGraphicsContext, NSImage
from Quartz import NSRect, NSPoint, NSSize

def pdf_to_images(pdf_path, output_dir):
    data = NSData.dataWithContentsOfFile_(pdf_path)
    pdf_rep = NSPDFImageRep.imageRepWithData_(data)
    page_count = pdf_rep.pageCount()
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    for i in range(page_count):
        pdf_rep.setCurrentPage_(i)
        
        # Scaling factor for better OCR
        scale = 2.0
        width = pdf_rep.size().width * scale
        height = pdf_rep.size().height * scale
        
        bitmap = NSBitmapImageRep.alloc().initWith some specific args... 
        # Actually, let's use a simpler way
        
        size = NSSize(width, height)
        image = NSImage.alloc().initWithSize_(size)
        image.lockFocus()
        
        # Draw background
        NSColor.whiteColor().set()
        NSRectFill(NSRect(NSPoint(0,0), size))
        
        # Draw PDF page
        pdf_rep.drawInRect_(NSRect(NSPoint(0,0), size))
        
        # Get representation
        rep = NSBitmapImageRep.alloc().initWithFocusedViewRect_(NSRect(NSPoint(0,0), size))
        image.unlockFocus()
        
        png_data = rep.representationUsingType_properties_(4, None) # 4 is NSPNGFileType
        png_data.writeToFile_atomically_(os.path.join(output_dir, f"page_{i+1}.png"), True)
        print(f"Exported page {i+1}")

pdf_to_images("/Users/zengtao/science-theme-park/2026_02_02 21_35 Office Lens.pdf", "/Users/zengtao/science-theme-park/pdf_pages")
