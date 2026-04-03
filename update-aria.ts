import fs from 'fs';

const files = [
  'index.html', 'about.html', 'cocoa.html', 'coffee.html', 
  'contact.html', 'logistics.html', 'qa-pack.html', 
  'quality.html', 'wholesale.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/<nav class="nav-links">/g, '<nav class="nav-links" aria-label="Main Navigation">');
  content = content.replace(/<a href="#" class="nav-link">Products ▾<\/a>/g, '<a href="#" class="nav-link dropdown-trigger" role="button" aria-expanded="false" aria-haspopup="true" aria-controls="products-dropdown">Products <span aria-hidden="true">▾</span></a>');
  content = content.replace(/<div class="dropdown-menu">/g, '<div class="dropdown-menu" id="products-dropdown">');
  content = content.replace(/<button class="mobile-toggle" aria-label="Toggle Menu">/g, '<button class="mobile-toggle" aria-label="Toggle Mobile Menu" aria-expanded="false" aria-controls="mobile-menu">');
  content = content.replace(/<div class="mobile-menu">/g, '<div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile Navigation">');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
