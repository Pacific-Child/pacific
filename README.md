# Pacific Regional Council for Early Childhood Development

The web platform of UNICEF's Pacific Regional Council for Early Childhood Development.

## How to run this site locally

### Development
1. Install Node.js if needed
2. Run `npm install`
3. Run `npm start` to start a development server and build on code changes

### Deployment
The deploy command is `npm run build`. This site is hosted on Netlify; push or merge your changes to the remote `main` branch and it will automatically deploy.

## Code style
- This site is built on [Eleventy](http://11ty.dev), a Node static site generator, using the "[Shortcode components](https://github.com/adamduncan/eleventy-shortcomps)" pattern
- The CSS is written in [Sass](https://sass-lang.com) (the [Dart version](https://sass-lang.com/dart-sass)), and follows [Cube CSS](https://piccalil.li/cube-css/) conventions.
	- Class naming format: `.[category prefix]-[partial name]-[variation]`, e.g. `.u-border-top`
	- Category prefixes are:
		- `c` for _composition_, e.g. `.c-bookend`
		- `u` for _utility_, e.g. `.u-padding-top`
		- `b` for _block_, e.g. `.b-button`
- Tabs not spaces

### Linters
- Javascript is linted using [ESlint](http://eslint.org), in the [Standard](https://standardjs.com) style
- CSS is linted using [Stylelint](http://stylelint.io)
- Config files for linters are in the project root (e.g. `.eslintrc.json`)
	
