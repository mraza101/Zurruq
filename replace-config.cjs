module.exports = {
  files: '*.html',
  from: [
    /<nav class="nav-links">/g,
    /<a href="#" class="nav-link">Products ▾<\/a>/g,
    /<div class="dropdown-menu">/g,
    /<button class="mobile-toggle" aria-label="Toggle Menu">/g,
    /<div class="mobile-menu">/g
  ],
  to: [
    '<nav class="nav-links" aria-label="Main Navigation">',
    '<a href="#" class="nav-link dropdown-trigger" role="button" aria-expanded="false" aria-haspopup="true" aria-controls="products-dropdown">Products <span aria-hidden="true">▾</span></a>',
    '<div class="dropdown-menu" id="products-dropdown">',
    '<button class="mobile-toggle" aria-label="Toggle Mobile Menu" aria-expanded="false" aria-controls="mobile-menu">',
    '<div class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Mobile Navigation">'
  ],
};
