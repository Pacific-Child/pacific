const Wrapper = require('./ContentWrapper.js')

module.exports = (content, {
	className = '',
	width = 'default'
} = {}) => {
	return Wrapper(content, { width, className: `c-flow ${className}` })
}
