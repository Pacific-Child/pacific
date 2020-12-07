const Gallery = require('./blocks/Gallery.js')

// props for the navSection and navGrid components
const galleryConfig = {
	size: 'small',
	gutter: 'narrow'
}

// a section of the nav
function navSection(section) {
	return `
			<h2 class="u-type-scale-delta | u-padding-bottom-narrow">
				<a href="${section.url}">${section.heading}</a>
			</h2>
			${Gallery(
				section.links.map(link => `
					<li><a href="${link.url}">${link.label}</a></li>
				`).join(''),
				{
					size: 'small',
					gutter: 'narrow'
				}
			)}
	`
}

// footer nav and subscribe sections
function navGrid(menu) {
	return `
		${menu && `
			<nav class="c-gallery-item | u-color-bg-bg">
				<div class="u-padding-x-outside u-padding-y">
					<div class="u-padding-bottom u-margin-bottom | u-border-bottom">
						${navSection(menu.countries)}
					</div>
					${Gallery(
						menu.secondary.map((section) => `
							<li>
								${navSection(section)}
							</li>
						`,).join(''),
						{
							size: 'small',
							gutter: 'medium'
						}
					)}
				</div>
			</nav>
		`}
		<div class="c-gallery-item | u-color-bg-bg">
			<div class="u-padding-x-outside u-padding-y">
				<form action="">
					<label for="footer-subscribe">Subscribe</label>
					<input
						type="email"
						id="footer-subscribe"
						name="footer-subscribe"
					>
					<button>Subscribe</button>
				</form>
			</div>
		</div>
	`
}

module.exports = ({
	logo = '',
	title = '',
	contact = '',
	menu
} = {}) => {
	return `
		<footer
			class="u-border-top | u-type-scale-zeta"
			role="contentinfo"
		>

			<!-- logo and search -->
			<div class="u-padding-x-outside u-padding-y-narrow | u-border-bottom">
				<div class="c-bookend horizontal | c-gutter narrow">
					<div
						class="c-bookend-item left | c-gutter-item"
						style="max-width: 10rem;"
					>
						<img
							src="${logo}"
							alt="${title}"
						>
					</div>
					<form
						class="c-bookend-item right fill | c-gutter-item"
						action=""
					>
						<label
							class="u-hide-visually"
							for="footer-search"
						>
							Search
						</label>
						<input
							id="footer-search"
							name="footer-search"
							type="search"
							placeholder="Search"
						>
						<button class="u-hide-visually">Submit</button>
					</form>
				</div>
			</div>

			<!-- footer nav & subscribe -->
			${Gallery(navGrid(menu), {
				size: 'large',
				tag: 'div',
				gutter: 1,
				className: 'u-color-bg-border'
			})}

			<!-- copyright & contact -->
			<aside class="u-border-top | u-padding-x-outside u-padding-y-narrow">
				<div class="c-bookend horizontal@small | c-gutter narrow">
					<p class="c-bookend-item | c-gutter-item | u-type-font-display">
						<strong class="u-type-weight-bold">UNICEF</strong> Pacific Regional Council for Early Childhood Development
						<small>&copy; Copyright 2020. All rights reserved.</small>
					</p>
					<div class="c-bookend-item | c-gutter-item | u-type-font-display">
						<a class="u-color-fg-highlight" href="mailto:${ contact }">
							Contact us
						</a>
					</div>
				</div>
			</aside>
		</footer>
	`
}
