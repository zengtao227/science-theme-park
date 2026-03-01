/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

let pageContent = fs.readFileSync('src/app/chamber/sm2-01/page.tsx', 'utf-8');
pageContent = pageContent.replace(/placeholder: "([^"]*)\^\{2\}([^"]*)"/g, 'placeholder: "$1²$2"');
pageContent = pageContent.replace(/placeholder="([^"]*)\^\{2\}([^"]*)"/g, 'placeholder="$1²$2"');
pageContent = pageContent.replace(/placeholder: "a\^\{2\}"/g, 'placeholder: "a²"');
pageContent = pageContent.replace(/placeholder: "b\^\{2\}"/g, 'placeholder: "b²"');
pageContent = pageContent.replace(/placeholder: "ax\^\{2\}"/g, 'placeholder: "ax²"');
pageContent = pageContent.replace(/placeholder: "by\^\{2\}"/g, 'placeholder: "by²"');
pageContent = pageContent.replace(/placeholder="a\^\{2\}"/g, 'placeholder="a²"');
pageContent = pageContent.replace(/placeholder="b\^\{2\}"/g, 'placeholder="b²"');

// Fix in SM2-01 page:
pageContent = pageContent.replace(/vA === "x\^\{2\}" \? "ax\^\{2\}" : "ax"/g, 'vA === "x^{2}" ? "ax²" : "ax"');
pageContent = pageContent.replace(/vB === "y\^\{2\}" \? "by\^\{2\}" : "by"/g, 'vB === "y^{2}" ? "by²" : "by"');

fs.writeFileSync('src/app/chamber/sm2-01/page.tsx', pageContent);

console.log('Fixed placeholders in page.tsx');
