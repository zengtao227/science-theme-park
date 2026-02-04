#!/bin/bash
PDF_PATH="/Users/zengtao/science-theme-park/2026_02_02 21_35 Office Lens.pdf"
OUTPUT_DIR="/Users/zengtao/science-theme-park/pdf_pages"
mkdir -p "$OUTPUT_DIR"

osascript <<EOF
use framework "Foundation"
use framework "Quartz"
use framework "AppKit"

set thePDFPath to (current application's NSString's stringWithString:"$PDF_PATH")
set theOutputDir to (current application's NSString's stringWithString:"$OUTPUT_DIR")
set theURL to current application's |NSURL|'s fileURLWithPath:thePDFPath
set thePDF to current application's PDFDocument's alloc()'s initWithURL:theURL
set pageCount to thePDF's pageCount()

repeat with i from 0 to (pageCount - 1)
    set thePage to (thePDF's pageAtIndex:i)
    set rect to (thePage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    -- Use record for NSSize
    set theSize to {width:750.0, height:1000.0} -- Default high res thumb
    set theImage to (thePage's thumbnailOfSize:theSize forBox:(current application's kPDFDisplayBoxMediaBox))
    set theTIFF to theImage's TIFFRepresentation()
    set theBitmap to (current application's NSBitmapImageRep's imageRepWithData:theTIFF)
    set thePNG to (theBitmap's representationUsingType:(current application's NSPNGFileType) properties:(missing value))
    
    set outputName to "page_" & (i + 1) & ".png"
    set outputPath to theOutputDir & "/" & outputName
    thePNG's writeToFile:outputPath atomically:true
end repeat
EOF
echo "Extraction completed."
