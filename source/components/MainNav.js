// Main header nav

module.exports = ({
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
						${items.map(item => `
							<li class="u-display-inline-block u-no-padding-top u-type-scale-zero">
								<a
									class="
										u-type-scale-zeta u-type-font-display u-type-weight-bold u-type-link-undecorated
										u-display-inline-block
									"
									href="${item.url}"
								>
									${item.label}
								</a>
							</li>
						`).join('')}
					</ul>
				</nav>
			</div>
		</header>
	`
}
