export function Styles() {
	return (
		<style>
			{`
					/*
						this will "unset" font style for buttons, which is set to system fonts in shoelace
						but is causing troubles, when there is global font set in eg. "body"
					 */
					.gate-js-drawer {
						--sl-input-font-family: initial;
						color: var(--sl-color-neutral-700);
					}

					/*
						workaround for unwanted borders
					*/
					.gate-js-drawer :where(sl-input, sl-select) {
						display: contents;
					}

					.gate-js-drawer:not(:defined) {
						display: none;
					}

					.gate-js-drawer::part(footer) {
						/* text-align: left; */
					}

					.gate-js-drawer h2 {
						font-size: var(--sl-font-size-large);
						line-height: var(--sl-line-height-normal);
						margin-bottom: var(--sl-spacing-medium);
						margin-top: var(--sl-spacing-medium);
					}

					.gate-js-drawer .step-list {
						margin:
							calc(-1 * var(--body-spacing))
							calc(-1 * var(--body-spacing))
							var(--body-spacing)
							calc(-1 * var(--body-spacing));
						border-top: 1px solid var(--sl-color-gray-200);
						border-bottom: 1px solid var(--sl-color-gray-200);
						padding: 0.95rem var(--body-spacing);

						display: flex;
						justify-content: space-between;
						font-size: 0.85rem;
						list-style-type: decimal;
						list-style-position: inside;
						align-items: center;
					}
					.gate-js-drawer .step-list li {
						border-radius: 9999px;
						padding: 2px 10px;
						box-shadow: inset 0 0 0 1px rgb(229 231 235 / 1);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.gate-js-drawer .step-list li.complete {
						background: var(--sl-color-success-50);
						color: var(--sl-color-success-700);
						box-shadow: inset 0 0 0 1px hsl(from var(--sl-color-success-600) h s l / 0.2);
					}
					.gate-js-drawer .step-list li.complete::marker {
						content: "✓\\A0" / "complete";
					}
					.gate-js-drawer .step-list li.active {
						background: var(--sl-color-primary-50);
						color: var(--sl-color-primary-700);
						font-weight: 500;
						box-shadow: inset 0 0 0 1px hsl(from var(--sl-color-primary-600) h s l / 0.2);
						overflow: unset;
					}

					.gate-js-drawer .form-field + .form-field {
						margin-top: var(--sl-spacing-medium);
					}

					.gate-js-drawer form sl-input[data-user-invalid]::part(base),
					.gate-js-drawer form sl-select[data-user-invalid]::part(combobox) {
						border-color: var(--sl-color-danger-600);
					}

					.gate-js-drawer form sl-input:focus-within[data-user-invalid]::part(base),
					.gate-js-drawer form sl-select:focus-within[data-user-invalid]::part(combobox) {
						border-color: var(--sl-color-danger-600);
						box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
					}

					.gate-js-drawer form [data-user-invalid]::part(form-control-label),
                    .gate-js-drawer form [data-user-invalid]::part(form-control-help-text) {
						color: var(--sl-color-danger-700);
					}

					.gate-js-drawer sl-divider {
						border-width: revert-layer;
						border-style: revert-layer;
						border-color: revert-layer;
					}

					.gate-js-drawer sl-checkbox::part(control) {
						border-color: var(--sl-color-neutral-400);
					}
					.gate-js-drawer sl-checkbox::part(control control--checked) {
						border-color: var(--sl-color-primary-500);
					}
					.gate-js-drawer sl-checkbox::part(label) {
						margin-inline-start: var(--sl-spacing-small);
					}
					.gate-js-drawer sl-checkbox::part(form-control-help-text) {
						margin-top: var(--sl-spacing-small);
						margin-left: calc(var(--sl-toggle-size-medium) + var(--sl-spacing-small));
					}

					.gate-js-drawer .information {
						display: flex;
						gap: var(--sl-spacing-small);
						line-height: var(--sl-toggle-size-medium);
					}
					.gate-js-drawer .information > div {
						flex: 1;
					}
					.gate-js-drawer .information > .icon {
						flex: 0 0 var(--sl-toggle-size-medium);
						text-align: center;
					}
					.gate-js-drawer .information sl-button {
						margin-top: var(--sl-spacing-small);
					}

					.gate-js-drawer input[type=file] {
						display: none;
						X-visibility: hidden;
						X-pointer-events: none;
						X-font-size: 1px;
					}
					.X-gate-js-drawer input[type=file]::file-selector-button {
						visibility: visible;
						/* display: block; */
						pointer-events: all;

					    background-color: var(--sl-color-neutral-0);
                        border-color: var(--sl-color-neutral-300);
                        color: var(--sl-color-neutral-700);

						height: auto;
                        min-height: var(--sl-input-height-medium);
                        font-size: var(--sl-button-font-size-medium);
                        line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width)* 2);
                        border-radius: var(--sl-input-border-radius-medium);

					    /* display: inline-flex; */
					    align-items: stretch;
					    justify-content: center;
					    width: 100%;
					    border-style: solid;
					    border-width: var(--sl-input-border-width);
					    font-family: var(--sl-input-font-family);
					    font-weight: var(--sl-font-weight-semibold);
					    text-decoration: none;
					    user-select: none;
					    -webkit-user-select: none;
					    white-space: nowrap;
					    vertical-align: middle;
					    /* padding: 0; */
					    padding: 0 var(--sl-spacing-medium);
					    transition: var(--sl-transition-x-fast) background-color,
					        var(--sl-transition-x-fast) color,
					        var(--sl-transition-x-fast) border,
					        var(--sl-transition-x-fast) box-shadow;
					    cursor: pointer;
					}
					.gate-js-drawer input[type=file]:hover::file-selector-button {
						background-color: var(--sl-color-primary-50);
                        border-color: var(--sl-color-primary-300);
                        color: var(--sl-color-primary-700);
					}

					.gate-js-drawer ul.file-list {
						margin: 0;
						padding: 0;
						list-style: none;
						border-radius: var(--sl-input-border-radius-medium);
						border: solid var(--sl-input-border-width) var(--sl-input-border-color);
					}
					.gate-js-drawer ul.file-list > li {
						display: flex;
						align-items: center;
						padding-left: var(--sl-spacing-medium);
						height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
						font-size: var(--sl-input-label-font-size-medium);
						color: var(--sl-input-color);
					}
					.gate-js-drawer ul.file-list > li + li {
						border-top: solid var(--sl-input-border-width) var(--sl-input-border-color);
					}
					.gate-js-drawer ul.file-list > li > div.name {
						margin-left: var(--sl-spacing-x-small);
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.gate-js-drawer ul.file-list > li > div.name > small {
						font-size: var(--sl-font-size-small);
						color: var(--sl-color-neutral-400);
						padding-inline-start: 1ch;
					}

					.gate-js-drawer dl.file-list {
						display: flex;
						flex-direction: column;
						border-radius: var(--sl-input-border-radius-medium);
						background: var(--sl-input-filled-background-color);
						padding: 0 var(--sl-spacing-medium);
						height: var(--sl-input-height-large);
					}
					.gate-js-drawer dl.file-list > div {
						flex: 1;
						/* border: solid var(--sl-input-border-width) var(--sl-input-border-color); */
						display: flex;
						flex-direction: column;
						color: var(--sl-input-color);
						justify-content: center;
					}
					.gate-js-drawer dl.file-list > div + div {
						margin-top: var(--sl-spacing-small);
					}
					.gate-js-drawer dl.file-list dt {
						font-size: var(--sl-font-size-small);
						font-weight: var(--sl-font-weight-semibold);
					}
					.gate-js-drawer dl.file-list dd {
						font-size: var(--sl-font-size-x-small);
					}

					.gate-js-drawer .review-list {
						list-style: none;
						margin: var(--sl-spacing-medium) 0;
					}

					.gate-js-drawer .review-list > li {
						display: flex;
					}

					.gate-js-drawer .typography * {
						color: var(--sl-color-neutral-700);
					}
					.gate-js-drawer .typography :where(h1, h2, h3, h4, h5, h6, p, ul, ol) {
						margin-bottom: var(--sl-spacing-medium);
					}
					.gate-js-drawer .typography h1 {
						font-size: var(--sl-font-size-x-large);
						font-weight: var(--sl-font-weight-semibold);
						line-height: var(--sl-line-height-dense);
					}
					.gate-js-drawer .typography h2 {
						font-size: var(--sl-font-size-large);
						text-transform: uppercase;
						font-weight: var(--sl-font-weight-normal);
						line-height: var(--sl-line-height-dense);
					}
					.gate-js-drawer .typography h3 {
						font-size: var(--sl-font-size-large);
						font-weight: var(--sl-font-weight-normal);
						line-height: var(--sl-line-height-dense);
					}
					.gate-js-drawer .typography h4 {
						font-size: var(--sl-font-size-medium);
						font-weight: var(--sl-font-weight-bold);
						line-height: var(--sl-line-height-normal);
					}
					.gate-js-drawer .typography p {
						font-size: var(--sl-font-size-medium);
						font-weight: var(--sl-font-weight-normal);
						line-height: var(--sl-line-height-normal);
					}
					.gate-js-drawer .typography ol {
						list-style-type: decimal;
						padding-inline-start: var(--sl-spacing-x-large);
					}
					.gate-js-drawer .typography ul {
						list-style-type: disc;
						padding-inline-start: var(--sl-spacing-x-large);
					}
					.gate-js-drawer .typography li {
						padding-inline-start: var(--sl-spacing-2x-small);
						margin: var(--sl-spacing-2x-small) 0;
					}
				`}
		</style>
	);
}
