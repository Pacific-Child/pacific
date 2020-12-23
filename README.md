# Pacific Regional Council for Early Childhood Development

The web platform of UNICEF's Pacific Regional Council for Early Childhood Development.

## How to run this site locally

### Development
1. Install Node.js if needed
2. Run `npm install`
3. Get the [Read-only authentication token](https://www.datocms.com/docs/content-delivery-api/authentication) from DatoCMS and copy it into an `.env` file: `DATO_API_TOKEN=[paste here]`
3. Run `npm run setup` to pull content from Dato CMS.
3. Run `npm start` to start a development server and build on code changes

### Steps to do when setting up new site
- Clone Pacific
- Replicate Dato
	- Set up `.env` file with Dato key (see above)
	- Update content
- Set up Mailchimp
	- Update code in `/source/components/MainFooter.js`
- Set up Netlify
- Update Albatross url in Dato => Content => Resources => Resources index => Search => Endpoint
- Update `package.json`
- Update colors
	- `/source/stylesheets/tokens/_color.scss`
- Update fonts
	- `/source/stylesheets/_fonts.scss`
	- `/source/stylesheets/tokens/_type.scss`
- Update logos
	- `/source/assets/images/`
		- `*-logo-icon.svg`
		- `*-logo-vertical.svg`
		- `*-logo-horizontal.svg`
		- `*-logo-horizontal-small.svg`
	- `/source/layouts/default.njk`
	- `/source/index.njk`
	- `/source/components/MainNav.js`
- Update favicons using realfavicongenerator.net
	- `/source/assets/images/favicons/`

### Deployment
The deploy command is `npm run build`. This site is hosted on Netlify; push or merge your changes to the remote `main` branch and it will automatically deploy.

### Code style
- This site is built on [Eleventy](http://11ty.dev), a Node static site generator, using the "[Shortcode components](https://github.com/adamduncan/eleventy-shortcomps)" pattern. We are using [Nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) templates for pages, and [Javascript functions](https://www.11ty.dev/docs/languages/javascript/) for components.
- The CSS is written in [Sass](https://sass-lang.com) (the [Dart version](https://sass-lang.com/dart-sass)), and follows [Cube CSS](https://piccalil.li/cube-css/) conventions.
	- Class naming format: `.[category prefix]-[partial name]-[variation]`, e.g. `.u-border-top`
	- Category prefixes are:
		- `c` for _composition_, e.g. `.c-bookend`
		- `u` for _utility_, e.g. `.u-padding-top`
		- `b` for _block_, e.g. `.b-button`
- [Tabs not spaces](https://alexandersandberg.com/tabs-for-accessibility/). There's an [`.editorconfig` file](https://editorconfig.org) if you use that.

### Linters
- Javascript is linted using [ESlint](http://eslint.org), in the [Standard](https://standardjs.com) style
- CSS is linted using [Stylelint](http://stylelint.io)
- Config files for linters are in the project root (e.g. `.eslintrc.json`)
