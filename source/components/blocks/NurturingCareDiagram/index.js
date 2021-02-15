// Diagram Tabs section
// -> create a clickable graphic from the "Nurturing Care" diagram/logo svg
const icons = require('./icons.js')

function Icon ({ id, fill, svg }) {
	return `
		<a
			@click.prevent="tab = '${id}'"
			xlink:href="#${id}"
		>
			<g 
				:class="{
					'current': tab === '${id}',
					'icon': tab !== 'none'
				}"
				fill="${fill}"
			>
				${svg}
			</g>
		</a>
	`
}

module.exports = () => {
	return `
		<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
			<style>
				.icon:not(.current) {
					transition: fill 0.25s ease;
					fill: #333;
					fill: var(--color-secondary);
				}
			</style>

			<!-- icons -->
			${icons.map(icon => Icon(icon)).join('')}

			<!-- title -->
			<path id="title" d="M296.802 325.053v-1.174c-.761.92-2.071 1.449-3.52 1.449-1.768 0-3.836-1.195-3.836-3.678 0-2.622 2.068-3.588 3.836-3.588 1.496 0 2.783.485 3.52 1.359v-1.403c0-1.127-.966-1.863-2.437-1.863-1.173 0-2.278.458-3.197 1.31l-1.149-2.047c1.356-1.217 3.102-1.746 4.851-1.746 2.552 0 4.874 1.012 4.874 4.207v7.174h-2.942zm13.388-5.564c0-3.22 2.391-5.818 5.747-5.818 3.334 0 5.563 2.483 5.563 6.093v.69h-8.253c.209 1.357 1.312 2.483 3.195 2.483.944 0 2.231-.39 2.944-1.08l1.31 1.932c-1.103 1.01-2.849 1.539-4.576 1.539-3.378 0-5.93-2.276-5.93-5.839zm-32.246 0c0-3.403 2.483-5.818 5.885-5.818 2.276 0 3.654.99 4.391 2l-1.908 1.795c-.529-.782-1.334-1.197-2.344-1.197-1.771 0-3.014 1.288-3.014 3.22 0 1.931 1.243 3.241 3.014 3.241 1.01 0 1.815-.459 2.344-1.219l1.908 1.795c-.737 1.012-2.115 2.022-4.391 2.022-3.402 0-5.885-2.415-5.885-5.839zm24.679 5.564v-11.106h2.919v1.496c.805-.966 2.161-1.771 3.542-1.771v2.851a3.717 3.717 0 00-.805-.071c-.966 0-2.254.554-2.737 1.266v7.335h-2.919zm-5.821-2.666v-1.381c-.483-.644-1.403-.988-2.346-.988-1.149 0-2.091.62-2.091 1.678 0 1.057.942 1.656 2.091 1.656.943 0 1.863-.322 2.346-.965zm19.135-6.323c-1.817 0-2.598 1.263-2.712 2.366h5.47c-.09-1.056-.826-2.366-2.758-2.366zm33.285-7.875l1.31-2.093c.895.966 2.092 1.356 3.471 1.356 1.402 0 3.08-.597 3.08-2.849v-1.08c-.873 1.102-2.068 1.724-3.446 1.724-2.761 0-4.898-1.932-4.898-5.634 0-3.632 2.093-5.656 4.898-5.656 1.331 0 2.551.551 3.446 1.702v-1.427h2.922v10.371c0 4.208-3.266 5.242-6.002 5.242-1.886 0-3.379-.437-4.781-1.656zm-47.681-5.633v-5.771h-1.839v-2.551h1.839v-3.037h2.92v3.037h2.253v2.551h-2.253v4.99c0 .713.368 1.24 1.012 1.24.437 0 .851-.161 1.012-.344l.62 2.229c-.437.393-1.22.715-2.437.715-2.046 0-3.127-1.059-3.127-3.059zm14.671 2.782v-1.402a5.28 5.28 0 01-3.907 1.678c-2.439 0-3.588-1.334-3.588-3.495v-7.886h2.92v6.737c0 1.541.805 2.046 2.046 2.046 1.127 0 2.025-.622 2.529-1.264v-7.519h2.92v11.105h-2.92zm-29.37 0v-1.402a5.282 5.282 0 01-3.907 1.678c-2.439 0-3.588-1.334-3.588-3.495v-7.886h2.919v6.737c0 1.541.805 2.046 2.047 2.046 1.127 0 2.024-.622 2.529-1.264v-7.519h2.92v11.105h-2.92zm-48.183-5.564c0-3.149 2.207-5.817 5.863-5.817 3.678 0 5.886 2.668 5.886 5.817 0 3.151-2.208 5.839-5.886 5.839-3.656 0-5.863-2.688-5.863-5.839zm91.655-5.54h2.92v11.105h-2.92v-11.105zm-8.279 11.104v-11.105h2.919v1.495c.805-.966 2.161-1.771 3.542-1.771v2.852a3.66 3.66 0 00-.805-.071c-.966 0-2.254.553-2.737 1.266v7.334h-2.919zm-29.371 0v-11.105h2.92v1.495c.805-.966 2.161-1.771 3.539-1.771v2.852a3.612 3.612 0 00-.802-.071c-.966 0-2.254.553-2.737 1.266v7.334h-2.92zm-19.139 0v-6.715c0-1.539-.805-2.068-2.045-2.068-1.151 0-2.024.644-2.531 1.288v7.495h-2.92v-11.105h2.92v1.424c.714-.826 2.093-1.7 3.885-1.7 2.461 0 3.634 1.379 3.634 3.542v7.839h-2.943zm70.103 0v-6.715c0-1.539-.805-2.068-2.044-2.068-1.151 0-2.024.644-2.531 1.288v7.495h-2.92v-11.105h2.92v1.424c.714-.826 2.092-1.7 3.887-1.7 2.459 0 3.632 1.379 3.632 3.542v7.839h-2.944zm-90.365 0v-8.552h-1.837v-2.553h1.837v-.461c0-2.505 1.495-4 3.727-4 1.078 0 2.229.3 2.895 1.058l-1.102 1.771c-.3-.276-.691-.436-1.22-.436-.827 0-1.38.529-1.38 1.607v.461h2.253v2.553h-2.253v8.552h-2.92zm-5.89-5.564c0-1.724-1.012-3.219-2.851-3.219-1.817 0-2.827 1.495-2.827 3.219 0 1.747 1.01 3.242 2.827 3.242 1.839 0 2.851-1.495 2.851-3.242zm109.71 1.632v-3.61c-.505-.712-1.563-1.242-2.505-1.242-1.678 0-2.829 1.151-2.829 3.059 0 1.909 1.151 3.058 2.829 3.058.942 0 2-.553 2.505-1.265zm-27.044-10.116c0-.966.78-1.724 1.724-1.724.964 0 1.747.758 1.747 1.724s-.783 1.747-1.747 1.747c-.944 0-1.724-.781-1.724-1.747zm-44.023-7.093v5.656h-2.922v-15.335h2.922v1.403c.849-1.081 2.068-1.68 3.424-1.68 2.852 0 4.92 2.117 4.92 5.817 0 3.702-2.068 5.841-4.92 5.841-1.309 0-2.505-.553-3.424-1.702zm63.666-1.356v-5.771h-1.84v-2.551h1.84v-3.037h2.921v3.037h2.252v2.551h-2.252v4.99c0 .713.366 1.24 1.01 1.24.437 0 .852-.161 1.013-.344l.619 2.229c-.436.393-1.217.714-2.437.714-2.046 0-3.126-1.058-3.126-3.058zm6.21 1.333l1.264-2.114c.827.78 2.461 1.539 3.841 1.539 1.264 0 1.861-.481 1.861-1.171 0-1.817-6.576-.322-6.576-4.693 0-1.861 1.61-3.493 4.554-3.493 1.861 0 3.356.644 4.461 1.518l-1.173 2.068c-.668-.688-1.932-1.288-3.288-1.288-1.058 0-1.749.461-1.749 1.081 0 1.634 6.598.253 6.598 4.736 0 2.047-1.746 3.542-4.827 3.542-1.932 0-3.793-.644-4.966-1.725zm-122.11-6.207c0-4.737 3.565-7.932 8.185-7.932 3.356 0 5.312 1.815 6.391 3.746l-2.805 1.381c-.644-1.242-2.022-2.232-3.586-2.232-2.805 0-4.827 2.139-4.827 5.037 0 2.897 2.022 5.034 4.827 5.034 1.564 0 2.942-.988 3.586-2.229l2.805 1.356c-1.079 1.907-3.035 3.771-6.391 3.771-4.62 0-8.185-3.22-8.185-7.932zm62.009 2.092c0-3.149 2.208-5.817 5.864-5.817 3.678 0 5.886 2.668 5.886 5.817 0 3.151-2.208 5.839-5.886 5.839-3.656 0-5.864-2.688-5.864-5.839zm-46.254 0c0-3.149 2.208-5.817 5.864-5.817 3.678 0 5.885 2.668 5.885 5.817 0 3.151-2.207 5.839-5.885 5.839-3.656 0-5.864-2.688-5.864-5.839zm72.796 0c0-3.22 2.393-5.817 5.749-5.817 3.334 0 5.564 2.483 5.564 6.093v.69h-8.254c.207 1.356 1.312 2.483 3.195 2.483.942 0 2.232-.391 2.944-1.081l1.31 1.93c-1.103 1.012-2.849 1.541-4.576 1.541-3.378 0-5.932-2.276-5.932-5.839zm-45.086 5.563v-7.012c0-1.034-.458-1.771-1.656-1.771-1.032 0-1.883.691-2.298 1.288v7.495h-2.943v-7.012c0-1.034-.459-1.771-1.656-1.771-1.01 0-1.862.691-2.298 1.288v7.495h-2.92v-11.105h2.92v1.425c.483-.642 1.931-1.7 3.632-1.7 1.631 0 2.69.758 3.08 2 .646-.988 2.117-2 3.817-2 2.047 0 3.266 1.08 3.266 3.356v8.024h-2.944zm66.015 0v-6.712c0-1.541-.805-2.071-2.045-2.071-1.151 0-2.024.644-2.531 1.288v7.495h-2.92v-11.105h2.92v1.425c.714-.827 2.093-1.7 3.888-1.7 2.458 0 3.631 1.378 3.631 3.541v7.839h-2.943zm-26.038 0v-6.712c0-1.541-.804-2.071-2.046-2.071-1.149 0-2.022.644-2.529 1.288v7.495h-2.92v-11.105h2.92v1.425c.714-.827 2.092-1.7 3.887-1.7 2.459 0 3.632 1.378 3.632 3.541v7.839h-2.944zm-58.972-5.563c0-1.725-1.012-3.22-2.851-3.22-1.817 0-2.827 1.495-2.827 3.22 0 1.746 1.01 3.241 2.827 3.241 1.839 0 2.851-1.495 2.851-3.241zm46.254 0c0-1.725-1.012-3.22-2.851-3.22-1.817 0-2.827 1.495-2.827 3.22 0 1.746 1.01 3.241 2.827 3.241 1.839 0 2.851-1.495 2.851-3.241zm-13.156-.001c0-1.908-1.151-3.218-2.829-3.218-.942 0-2 .53-2.505 1.264v3.91c.483.712 1.563 1.285 2.505 1.285 1.678 0 2.829-1.309 2.829-3.241zm36.732-3.426c-1.817 0-2.598 1.266-2.712 2.368h5.471c-.093-1.056-.827-2.368-2.759-2.368z" fill="#010202" fill-rule="nonzero"/>
		</svg>
	`
}