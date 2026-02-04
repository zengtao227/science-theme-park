const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/Users/zengtao/science-theme-park/2026_02_02 21_35 Office Lens.pdf');

pdf(dataBuffer).then(function (data) {
    console.log("PDF Text Content:");
    console.log(data.text);
    console.log("\nMetadata:");
    console.log(data.info);
});
