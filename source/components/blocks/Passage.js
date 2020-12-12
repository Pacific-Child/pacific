// Passage block
// -> display a chunk of formatted text content
const Wrapper = require('./ContentWrapper.js')

module.exports = (content, {
	className = '',
	width = 'default',
	centered = true
} = {}) => {
	return Wrapper(content, { width, centered, className: `c-flow ${className}` })
}
