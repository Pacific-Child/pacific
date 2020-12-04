// Passage block
// -> display a chunk of formatted text content
const Wrapper = require('../ContentWrapper.js')

module.exports = (content, {
	className = '',
	width = 'default'
} = {}) => {
	return Wrapper(content, { width, className: `c-flow ${className}` })
}
