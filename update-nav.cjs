const fs = require('fs');
const path = require('path');

const files = [
  'index.html', 'about.html', 'cocoa.html', 'coffee.html', 
  'contact.html', 'logistics.html', 'qa-pack.html', 'quality.html', 'wholesale.html'
];

const newHeader = `  <div class="scroll-progress"></div>
  <header class="site-header">
    <div class="container nav-container">
      <a href="/index.html" class="logo">
        <span class="logo__primary">Zarruq</span>
        <span class="logo__secondary">Origins</span>
      </a>
      <nav class="nav-links" aria-label="Main Navigation">
        <div class="nav-item-dropdown">
          <button class="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="menu" aria-controls="products-dropdown">
            Products <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="dropdown-menu" id="products-dropdown" role="menu" aria-label="Products">
            <a href="/cocoa.html" class="dropdown-card" role="menuitem">
              <h4>Ghana Natural Cocoa</h4>
              <p>Non-alkalized, 10-12% fat, food-grade.</p>
            </a>
            <a href="/coffee.html" class="dropdown-card" role="menuitem">
              <h4>Ghana Single-Origin Coffee</h4>
              <p>Green & roasted. Washed & natural.</p>
            </a>
          </div>
        </div>
        <a href="/quality.html" class="nav-link">Sourcing</a>
        <a href="/about.html" class="nav-link">About</a>
        <a href="/wholesale.html" class="nav-link">Wholesale</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>
      <div class="nav-actions">
        <a href="/qa-pack.html" class="btn btn--qa">QA Pack Access</a>
        <a href="/portal.html" class="btn btn--portal">Client Portal</a>
      </div>
      <div class="mobile-actions">
        <a href="/cocoa.html" class="nav-link mobile-only-link">Products</a>
        <a href="/portal.html" class="btn btn--portal mobile-only-btn">Client Portal</a>
        <button class="mobile-toggle" aria-label="Toggle Menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <a href="/index.html" class="nav-link">Home</a>
    <a href="/cocoa.html" class="nav-link">Cocoa Powder</a>
    <a href="/coffee.html" class="nav-link">Single-Origin Coffee</a>
    <a href="/quality.html" class="nav-link">Sourcing</a>
    <a href="/about.html" class="nav-link">About</a>
    <a href="/wholesale.html" class="nav-link">Wholesale</a>
    <a href="/contact.html" class="nav-link">Contact</a>
    <div class="nav-actions-mobile">
      <a href="/qa-pack.html" class="btn btn--qa" style="width: 100%; text-align: center; margin-bottom: 12px;">QA Pack Access</a>
      <a href="/portal.html" class="btn btn--portal" style="width: 100%; text-align: center;">Client Portal</a>
    </div>
  </div>`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const startIdx = content.indexOf('<div class="scroll-progress"></div>');
    const mobileMenuStart = content.indexOf('<div class="mobile-menu"');
    
    if (startIdx !== -1 && mobileMenuStart !== -1) {
      let openDivs = 0;
      let i = mobileMenuStart;
      let foundEnd = false;
      while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') {
          openDivs++;
        } else if (content.substring(i, i + 5) === '</div') {
          openDivs--;
          if (openDivs === 0) {
            foundEnd = true;
            i += 6; // include closing tag
            break;
          }
        }
        i++;
      }
      if (foundEnd) {
        content = content.substring(0, startIdx) + newHeader + content.substring(i);
        fs.writeFileSync(filePath, content);
        console.log('Updated ' + file);
      }
    }
  }
});
