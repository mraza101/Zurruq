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
    content = content.replace(/For Cafés & SMEs/g, 'Wholesale');
    content = content.replace(/For Cafés &amp; SMEs/g, 'Wholesale');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
