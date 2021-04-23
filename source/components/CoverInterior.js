// Interior Cover component
// -> composes the Cover into a more opinionated layout for interior pages
// -> includes the seascape bg at the bottom
const Cover = require('./Cover.js')

module.exports = (content, seascape, { centered = true } = {}) => {
	return Cover(content, {
		short: true,
		centered,
		className: 'u-padding-x-outside u-padding-y-xxxlarge u-margin-y-flow | u-hide-overflow | u-color-bg-sky-horizon'
	})
}
