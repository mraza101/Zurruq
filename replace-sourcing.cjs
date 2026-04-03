const fs = require('fs');
const path = require('path');

const files = [
  'index.html', 'about.html', 'cocoa.html', 'coffee.html', 
  'contact.html', 'logistics.html', 'qa-pack.html', 'sourcing.html', 'wholesale.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/Quality & Traceability/g, 'Sourcing');
    content = content.replace(/Quality &amp; Traceability/g, 'Sourcing');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
