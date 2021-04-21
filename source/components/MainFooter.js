const ContentWrapper = require('./blocks/ContentWrapper.js')
const Passage = require('./blocks/Passage.js')

function NewsletterSignup (strings) {
	return `
			<div class="u-theme-wash u-padding-x-outside u-padding-y-xwide u-border-bottom">
				${ContentWrapper(`

					<!-- Begin Mailchimp Signup Form -->
					<div id="mc_embed_signup">
						<form
							action="https://unicef.us1.list-manage.com/subscribe/post?u=22fe753684dc9e88cb85c387b&amp;id=0413af538b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
							novalidate
						>
							<label
								for="mce-EMAIL"
								class="u-type-heading u-scale-gamma | u-display-block | u-padding-bottom-narrow"
							>
								${strings.newsletterLabel}
							</label>
							<div
								id="mc_embed_signup_scroll"
								class="c-bookend horizontal@xsmall | c-gutter narrow"
							>
								<div class="mc-field-group | c-bookend-item left fill | c-gutter-item">
									<input
										type="email"
										value=""
										name="EMAIL"
										class="required email" id="mce-EMAIL"
										placeholder="${strings.newsletterInputPlaceholder}"
									>
									<div id="mce-responses" class="clear">
										<div class="response" id="mce-error-response" style="display:none"></div>
										<div class="response" id="mce-success-response" style="display:none"></div>
									</div>
									<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups -->
									<div style="position: absolute; left: -5000px;" aria-hidden="true">
										<input type="text" name="b_34a32d9d669cfa4d1d45bfa19_33e8ddb123" tabindex="-1" value="">
									</div>
								</div>
								<div class="c-bookend-item right | c-gutter-item">
									<input
										type="submit"
										value="${strings.newsletterButton}"
										name="subscribe"
										id="mc-embedded-subscribe"
										class="b-button large"
									>
								</div>
							</div>
						</form>
					</div>
					<!-- End mc_embed_signup -->

					${Passage(`
						<p>${strings.newsletterBlurb}</p>
					`, {
						className: 'u-padding-top-narrow u-color-fg-secondary u-type-style-italic'
					})}
				`)}
			</div>
		</div>
	`
}

function NavItem ({ link, label, currentPage }) {
	return `
		<li>
			<a
				class="
					u-type-scale-delta u-type-font-display u-type-link-undecorated
					u-display-inline-block
					${currentPage.includes(link.slug) ? 'u-color-fg-highlight' : ''}
				"
				href="/${link.slug}"
			>
				${label}
			</a>
		</li>
	`
}

function Nav (menu, currentPage) {
	return `
		<nav
			x-show.transition.opacity="navOpen"
			class="
				c-overlay centered
				u-type-align-center
				u-border-bottom
				u-position-z-high
			"
			id="footer-nav"
		>
			<button
				@click="navOpen = false"
				class="
					c-overlay-close
					u-margin u-no-padding
					u-no-border
					u-type-link u-type-link-undecorated u-type-scale-gamma u-type-font-display
					u-color-fg-primary u-color-bg-transparent
					u-display-inline-block
				"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="b-icon large" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <line x1="18" y1="6" x2="6" y2="18" />
				  <line x1="6" y1="6" x2="18" y2="18" />
				</svg>
				<span class="u-hide-visually">Close</span>
			</button>
			<div class="c-overlay-content | u-padding-x-outside u-padding-y">
				<ul class="u-list-undecorated | u-padding-y-flow">
					${menu.map((item) => NavItem({ currentPage, ...item })).join('')}
				</ul>
			</div>
		</nav>
	`
}

module.exports = ({
	logo = '',
	title = '',
	menu,
	currentPage,
	strings
} = {}) => {
	return `
		<footer
			class="u-border-top"
			role="contentinfo"
		>
			<!-- Subscribe callout -->
			${NewsletterSignup(strings)}

			<!-- footer nav -->
			${menu ? Nav(menu, currentPage) : ''}

			<!-- copyright & contact -->
			<aside class="u-position-relative | u-padding-x-outside u-padding-y-xwide">
				<div class="u-position-relative u-position-z-middle | u-type-align-center">
					<div class="b-logo icon large | u-margin-right-narrow">
						<img src="${logo}" alt="${title}">
					</div>
					<p class="u-type-font-display | u-padding-top-narrow">
						${strings.footer_organization_name}
					</p>
					<small class="
						u-display-inline-block
						u-padding-top-narrow
						u-type-font-display u-type-scale-epsilon
						u-color-fg-secondary
					">
						${strings.copyright}
					</small>
					</p>
					<a class="b-button large | u-margin-top" href="/contact">
						Contact us
					</a>
				</div>

				<!-- Seascape graphics -->
				<div class="b-seascape | u-color-bg-water | u-position-z-low">
					<img
						class="b-seascape-ripple left"
						src="/images/seascape/ripples/left.svg"
						alt="Seascape ripples"
					>
					<img
						class="b-seascape-ripple right"
						src="/images/seascape/ripples/right.svg"
						alt="Seascape ripples"
					>
				</div>
			</aside>
		</footer>
	`
}
