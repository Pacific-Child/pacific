const ContentWrapper = require('./blocks/ContentWrapper.js')
const Gallery = require('./blocks/Gallery.js')
const Passage = require('./blocks/Passage.js')

// a section of the nav
function navSection (section) {
	return `
		<h2 class="u-type-scale-delta | u-padding-bottom-narrow">
			<a href="${section.url}">${section.heading}</a>
		</h2>
		${Gallery(section.links.map(link => `
			<li><a href="${link.url}">${link.label}</a></li>
		`).join(''), {
			size: 'small',
			gutter: 'narrow'
		})}
	`
}

module.exports = ({
	logo = '',
	title = '',
	menu
} = {}) => {
	return `
		<footer
			class="u-border-top"
			role="contentinfo"
		>
			<!-- Subscribe callout -->
			<div class="u-padding-x-outside u-padding-y">
				${ContentWrapper(`
					<form action="">
						<label
							class="u-type-heading u-type-scale-delta | u-display-block | u-padding-bottom-narrow"
							for="footer-subscribe"
						>
							Subscribe
						</label>
						<div class="c-bookend horizontal@xsmall | c-gutter narrow">
							<div class="c-bookend-item left fill | c-gutter-item">
								<input
									type="email"
									id="footer-subscribe"
									name="footer-subscribe"
								>
							</div>
							<div class="c-bookend-item right | c-gutter-item">
								<button class="b-button">Subscribe</button>
							</div>
						</div>
					</form>
					${Passage(`
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tria genera bonorum; Eadem nunc mea adversum te oratio est.</p>
					`, { className: 'u-padding-top-narrow u-color-fg-secondary' })}
				`)}
			</div>

			<!-- footer nav -->
			${menu && `
				<nav>
					<div class="u-padding-x-outside u-padding-y">
						${ContentWrapper(`
							${Gallery(menu.secondary.map((section) => `
								<li>
									${navSection(section)}
								</li>
							`).join(''), {
								size: 'small',
								gutter: 'medium'
							})}
						`, { width: 'wide' })}
					</div>
				</nav>
			`}

			<!-- copyright & contact -->
			<aside class="u-border-top | u-padding-x-outside u-padding-y-narrow">
				<div class="c-bookend horizontal@small | c-gutter narrow">
					<p class="c-bookend-item | c-gutter-item | u-type-font-display">
						<span
							class="u-display-inline-block"
							style="max-width: 10rem;"
						>
							<img
								src="${logo}"
								alt="${title}"
							>
						</span>
						<strong class="u-type-weight-bold">UNICEF</strong> Pacific Regional Council for Early Childhood Development
						<small>&copy; Copyright 2020. All rights reserved.</small>
					</p>
					<div class="c-bookend-item | c-gutter-item | u-type-font-display">
						<a class="u-color-fg-highlight" href="/contact">
							Contact us
						</a>
					</div>
				</div>
			</aside>
		</footer>
	`
}
