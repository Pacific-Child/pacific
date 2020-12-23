// Main header nav

const NavItem = (item, currentPage) => {
	return `
		<li class="u-display-inline-block u-no-padding-top u-type-scale-zero">
			<a
				class="
					u-type-scale-delta u-type-font-display u-type-link-undecorated
					u-display-inline-block
					${item.link.slug.includes(currentPage) ? 'u-border-bottom' : ''}
				"
				href="/${item.link.slug}/"
			>
				${item.label}
			</a>
		</li>
	`
}

module.exports = ({
	logo = '',
	items = [],
	currentPage = '/',
	breakpoint = 'medium',
	strings
} = {}) => {
	return `
		<header class="
			u-padding-y-narrow u-padding-x-outside
			u-position-absolute u-position-top-full u-position-z-middle
		">
			<div class="c-bookend horizontal | c-gutter | u-type-scale-zero">
				${currentPage !== '/'
					? `<!-- logo -->
						<a
							class="
								c-bookend-item left
								c-gutter-item
								u-type-scale-delta u-type-font-display u-type-weight-bold u-type-link-undecorated
								u-no-margin
							"
							href="/"
						>
							<img
								class="b-logo icon | u-margin-right-narrow"
								src="/images/pacific-logo-icon.svg"
								alt="${strings.header_organization_name}"
								style="max-width: 4.5rem;"
							>
							<span class="u-hide-below@${breakpoint}">${strings.header_organization_name}</span>
						</a>`
					: ''
				}

				<!-- main nav -->
				<nav class="c-bookend-item right | c-gutter-item | u-display-inline-block">
					<ul class="
						u-display-inline-block
						u-hide-visually u-show-visually-above@large
						u-margin-x-flow
					">
						${items.map(item => NavItem(item, currentPage)).join('')}
					</ul>

					<!-- mobile nav button (links to footer nav w/o JS) -->
					<a
						@click.prevent="navOpen = true"
						x-show.transition.opacity="!navOpen"
						class="u-display-inline-block | u-hide-above@large | u-type-font-display u-type-scale-delta u-type-link-undecorated"
						href="#footer-nav"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="b-icon" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
						Menu
					</a>
				</nav>
			</div>
		</header>
	`
}
