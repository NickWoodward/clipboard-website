
function indexTemplate({ htmlAttrs, cssTags, jsTags, title }) {
  return /*html*/`<!DOCTYPE html>
  <html${htmlAttrs}>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600&display=swap" rel="stylesheet">
      <title>${title}</title>
      ${cssTags}
    </head>
    <body>
      <!-- Hero Section -->
      <section id="hero">
          <div class="max-w-6xl mx-auto text-center mb-40 px-10 pt-16">
            <svg class="mx-auto my-16"><use xlink:href="svg/spritesheet.svg#logo" /></svg>
            <h3 class="mb-8 text-4xl font-bold md:text-5xl">
              A history of everything you copy
            </h3>
          </div>

      </section>
      ${jsTags}
    </body>
  </html>`;
}

module.exports = { indexTemplate };