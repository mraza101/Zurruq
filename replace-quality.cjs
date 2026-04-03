const fs = require('fs');
const path = require('path');

const files = [
  'index.html', 'about.html', 'cocoa.html', 'coffee.html', 
  'contact.html', 'logistics.html', 'qa-pack.html', 'sourcing.html', 'wholesale.html',
  'vite.config.ts'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/quality\.html/g, 'sourcing.html');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
