# Webpack/Tailwind boilerplate
This configuration provides a quick and ready to use boilerplate for any project using TailwindCSS. At the core, a few things are already configured such as autoprefixer, postcss and postcss-importer, purging of unused css, babel for transpiling ES6 to ES5, css and js minification,image loader and image optimization.

Compiled assets are moved into `/public/assets/css/` and `/public/assets/js/` for css and js bundles, respectively. 

Processed images are moved into `/public/assets/img/`, with no subdirectories. Images' path linked inside any css is automatically converted to match the new public destination.

## Installation
> `npm install`