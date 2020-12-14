// Main header nav

const NavItem = (item, currentPage) => {
	return `
		<li class="u-display-inline-block u-no-padding-top u-type-scale-zero">
			<a
				class="
					u-type-scale-zeta u-type-font-display u-type-weight-bold u-type-link-undecorated
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
	currentPage = '/'
} = {}) => {
	return `
		<header class="
			u-color-fg-bg u-color-bg-primary
			u-padding-y-narrow u-padding-x-outside
		">
			<div class="c-bookend horizontal | c-gutter narrow | u-type-scale-zero">
				<a
					class="
						c-bookend-item
						c-gutter-item
						u-display-inline-block
						u-type-scale-zeta u-type-font-display u-type-weight-bold u-type-link-undecorated
						u-no-margin
					"
					href="/"
				>
					Pacific Regional Council for Early Childhood Development
				</a>
				<nav class="c-bookend-item | c-gutter-item | u-display-inline-block">
					<ul class="
						u-display-inline-block
						u-hide-visually u-show-visually-above@xsmall
						u-margin-x-flow
					">
						${items.map(item => NavItem(item, currentPage)).join('')}
					</ul>
				</nav>
			</div>
		</header>
	`
}
