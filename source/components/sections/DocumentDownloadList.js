// Document Download List
// -> A list of documents with download links.

const IconDown = () => {
	return `
		<svg class="b-button-icon" viewBox="0 0 24 24">
			<path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
		</svg>
	`
}

const DocIcon = () => {
	return `
		<svg class="b-icon" style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
		</svg>
	`
}

const DocItem = (link, albatrossUrl, docIcon, sepBorder) => {
	let docTitle = DocIcon() + link.title
	if (!docIcon) {
		docTitle = link.title
	}
	return `
		<!-- This calls out to a function in page.njk -->
		<li
			class="
				c-bookend horizontal | u-padding-bottom-xnarrow
				${sepBorder ? 'u-border-inherit-flow' : ''}
			"
			x-data="getDocumentDownloadURL(${link.albatrossId})"
			x-init="() => {
				fetchDocumentDownloadURL()
			}"
		>
			<div class="c-bookend-item left">
				<a
					href="${albatrossUrl}en/document_uploads/${link.albatrossId}"
					class="u-display-block u-type-link-undecorated"
					x-show="downloadLink !== ''"
				>${docTitle}</a>
				<span
					class="u-display-block"
					x-show="downloadLink === ''"
				>${docTitle}</span>
			</div>
			<div class="c-bookend-item right | u-padding-left-xxxnarrow">
				<span class="b-button has-icon left | u-no-padding-right u-padding-y-wide" x-show="isLoading">
					<svg class="b-button-icon" x-cloak version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
						<animateTransform
							attributeType="xml"
							attributeName="transform"
							type="rotate"
							from="0 25 25"
							to="360 25 25"
							dur="0.6s"
							repeatCount="indefinite"
						>
						</path>
					</svg>
				</span>
				<a
					x-bind:href="downloadLink"
					x-show="!isLoading && downloadLink !== ''"
					class="b-button has-icon right"
				>${link.buttonText}${IconDown()}</a>
				<span
					x-show="!isLoading && downloadLink === ''"
					class="b-button has-icon right disabled"
				>${link.buttonText}${IconDown()}</span>
			</div>
		</li>
	`
}

module.exports = (
	documentLinks,
	albatrossUrl,
	{
		docIcon = true,
		sepBorder = true
	}
) => {
	return `
		<ul class="u-list-undecorated">
			${documentLinks.map(link => DocItem(link, albatrossUrl, docIcon, sepBorder)).join('')}
		</ul>
	`
}
