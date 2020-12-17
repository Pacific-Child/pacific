// Main header nav

const NavItem = (item, currentPage) => {
	return `
		<li class="u-display-inline-block u-no-padding-top u-type-scale-zero">
			<a
				class="
					u-type-scale-epsilon u-type-font-display u-type-link-undecorated
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
	breakpoint = 'medium'
} = {}) => {
	return `
		<header class="u-padding-y-narrow u-padding-x-outside">
			<div class="c-bookend horizontal | c-gutter narrow | u-type-scale-zero">
				<a
					class="
						c-bookend-item
						c-gutter-item
						u-display-inline-block
						u-type-scale-epsilon u-type-font-display u-type-weight-bold u-type-link-undecorated
						u-no-margin
					"
					href="/"
				>
					<img
						class="u-display-inline-block u-position-vertical-align-middle u-padding-right-narrow"
						src="/images/pacific-logo-icon.svg"
						alt="Pacific Regional Council for Early Childhood Development"
						style="max-width: 4.5rem;"
					>
					<span class="u-hide-below@${breakpoint}">Pacific Regional Council for Early Childhood Development</span>
				</a>
				<nav class="c-bookend-item | c-gutter-item | u-display-inline-block">
					<ul class="
						u-display-inline-block
						u-hide-visually u-show-visually-above@${breakpoint}
						u-margin-x-flow
					">
						${items.map(item => NavItem(item, currentPage)).join('')}
					</ul>
					<a
						@click.prevent="navOpen = true"
						x-show.transition.opacity="!navOpen"
						class="u-display-inline-block | u-hide-above@${breakpoint} | u-type-font-display u-type-scale-epsilon u-type-link-undecorated"
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
