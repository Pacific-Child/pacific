// Profile data gallery item
// -> use as a child of CountryProfileData/Gallery
const StatCard = require('../StatCard.js')

module.exports = ({ label, number, unit, context }) => {
	return `
		<li>${StatCard({ label, number, unit, context })}</li>
	`
}