const ContentWrapper = require('./blocks/ContentWrapper.js')
const Passage = require('./blocks/Passage.js')

function NewsletterSignup (strings) {
	return `
			<div class="u-padding-x-outside u-padding-y-wide u-border-bottom">
				${ContentWrapper(`

					<!-- Begin Mailchimp Signup Form -->
					<div id="mc_embed_signup">
						<form
							action="https://host-creative.us7.list-manage.com/subscribe/post?u=34a32d9d669cfa4d1d45bfa19&amp;id=33e8ddb123" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
							novalidate
						>
							<label
								for="mce-EMAIL"
								class="u-type-heading u-scale-delta | u-display-block | u-padding-bottom-narrow"
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
										class="button | b-button"
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
			${menu && `
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
			`}

			<!-- copyright & contact -->
			<aside class="u-padding-x-outside u-padding-y">
				<div class="c-bookend horizontal@large | c-gutter">
					<p class="c-bookend-item | c-gutter-item | u-type-font-display">
						<span class="b-logo icon u-margin-right-narrow">
							<img src="${logo}" alt="${title}">
						</span>
						<span class="u-display-inline-block">${strings.footer_organization_name}</span>
						<small class="u-display-inline-block"> ${strings.copyright}</small>
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
