const Gallery = require('./Gallery.js')

module.exports = (countries, {
	className = ''
} = {}) => {
	console.log(countries[0].flag.url)

	return Gallery(
		countries.map(country => `
			<li>
				<a 
					class="u-position-flex-fill | u-shadow | u-border-radius | u-padding-narrow"
					href="/countries/${country.slug}/"
					>
					<div class="c-bookend horizontal | c-gutter narrow">
						<div class="c-bookend-item left | c-gutter-item">
							<img 
								class="u-border-round | u-display-inline-block" 
								style="width: 2rem;"
								src="${country.flag.url}"
							>
						</div>
						<h3 class="c-bookend-item right fill | c-gutter-item | u-type-scale-delta | u-type-align-left">
							${country.name || country.countryName}
						</h3>
					</div>
				</a>
			</li>
		`).join(''),
		{
			className,
			flex: true
		}
	)
}
