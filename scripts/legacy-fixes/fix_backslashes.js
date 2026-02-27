const fs = require('fs');

let p1 = 'src/app/chamber/sm2-01/page.tsx';
let c1 = fs.readFileSync(p1, 'utf-8');

// replace \\\\sqrt with \\sqrt
c1 = c1.replace(/\\\\\\\\sqrt/g, '\\\\sqrt');
c1 = c1.replace(/\\\\\\\\quad/g, '\\\\quad');
c1 = c1.replace(/\\\\\\\\text/g, '\\\\text');
c1 = c1.replace(/\\\\\\\\Delta/g, '\\\\Delta');

fs.writeFileSync(p1, c1);
console.log('Fixed backslashes in SM2-01');

// No issues found in SM2-02 regarding \\\\sqrt according to grep
