'use client';

import {
	ElementType,
	Ref,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import {
	ApplicantPersonalDataType,
	ApplyOptionsType,
	hasApplicantApplied,
	getJobDetails,
} from '@gate-js/core';
import { IntlProvider } from 'react-intl';
import { registerIconLibrary, unregisterIconLibrary } from '@shoelace-style/shoelace';
import { forwardRefWithAs, render } from '../../utils/render';
import { NativeElementProps } from '../../types/types';
import { useJobContext } from '../../hooks/useJobContext';
import { registerGateJsIcons } from './components/icons';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import { translations } from '../../localization/translations';
import { Drawer } from './components/drawer';

const DEFAULT_TAG = 'button' as const;

type Steps = 'resume' | 'personal' | 'additional' | 'review' | 'confirmation';

type PersonalData = {
	givenName: string,
	familyName: string,
	email: string,
	phoneNumber: string,
	salutation: 'mr' | 'mrs' | undefined,
};

const EMPTY_PERSONAL_DATA:PersonalData = {
	givenName: '',
	familyName: '',
	email: '',
	phoneNumber: '',
	salutation: undefined,
};

function filterInputs<T, S>(next: S): (prev: T) => T {
	return (prev: T) => ({ ...prev, ...Object.fromEntries(Object.entries(next).filter(([,v]) => v !== undefined)) });
}

export type ApplyButtonProps<T> = NativeElementProps<T> & {
	preload?: boolean,

	options?: ApplyOptionsType,
};

const DEFAULTS = {
	language: 'sk',

	darkTheme: false,
};

function ApplyButtonFn<TTag extends ElementType = typeof DEFAULT_TAG>({
	// todo: redesign preloading
	preload = false,
	options = {},
	...theirProps
}: ApplyButtonProps<TTag>, ref: Ref<HTMLElement>) {
	const { jobId, config, applyOptions } = useJobContext();
	const { darkTheme, language } = { ...DEFAULTS, ...applyOptions, ...options };

	const [alreadyApplied, setAlreadyApplied] = useState<boolean>(false);

	const [personalData, setPersonalDataRaw] = useState<PersonalData>(EMPTY_PERSONAL_DATA);
	const { givenName, familyName, email } = personalData;

	const setPersonalData = useCallback((next: Partial<ApplicantPersonalDataType>) => {
		setPersonalDataRaw(filterInputs<PersonalData, Partial<ApplicantPersonalDataType>>(next));
	}, [setPersonalDataRaw]);

	useDebouncedEffect(() => {
		if (!givenName || !familyName || !email) {
			setAlreadyApplied(false);
			return undefined;
		}

		const controller = new AbortController();
		const doEffect = async () => {
			const hasApplied = await hasApplicantApplied(
				{ givenName, familyName, email },
				jobId,
				{ ...config, abortSignal: controller.signal },
			);
			setAlreadyApplied(hasApplied);
		};

		doEffect();

		return () => {
			controller.abort();
		};
	}, [givenName, familyName, email]);

	const [resume, setResume] = useState<File | undefined>(undefined);
	const [attachments, setAttachments] = useState<Record<string, File>>({});

	const [open, setOpen] = useState(false);

	const [step, setStep] = useState<Steps>('resume');

	const ourProps = {
		ref,
		// eslint-disable-next-line no-console
		onClick: () => setOpen(true),
	};

	const [prescreeningFormAnswers, setPrescreeningFormAnswersRaw] = useState({});
	const setPrescreeningFormAnswers = useCallback((next) => {
		setPrescreeningFormAnswersRaw(filterInputs(next));
	}, [setPrescreeningFormAnswersRaw]);

	const [{ requireCv, formUrl }, setJobDetails] = useState({});

	const [prescreeningFormIdentifier, setPrescreeningFormIdentifier] = useState<string | undefined>();
	const [prescreeningFormParts, setPrescreeningFormParts] = useState([]);
	const hasAdditional = !!formUrl;

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(true);

	const fetchStarted = useRef(false);
	const fetchComplete = useRef(false);

	const reset = () => {
		setOpen(false);
		setStep('resume');
		setPersonalDataRaw(EMPTY_PERSONAL_DATA);
		setResume(undefined);
		setAttachments({});
		setError(false);
		setPrescreeningFormAnswersRaw({});
	};

	useEffect(() => {
		registerIconLibrary('gate-js', registerGateJsIcons);
		return () => {
			unregisterIconLibrary('gate-js');
		};
	}, []);

	useEffect(() => {
		const shouldFetch = !fetchStarted.current && (preload || open);

		if (!shouldFetch) {
			return undefined;
		}

		fetchStarted.current = true;

		const controller = new AbortController();
		async function doEffect() {
			try {
				setLoading(true);
				const response = await getJobDetails(jobId, { ...config, abortSignal: controller.signal });
				setJobDetails(response);
			} catch (err) {
				if (controller.signal.aborted) {
					return;
				}
				console.log(err);
				setError(true);
			} finally {
				fetchComplete.current = true;
			}
		}
		doEffect();

		return () => {
			controller.abort();
			if (!fetchComplete.current) {
				fetchStarted.current = false;
			}
		};
	}, [preload, open, config, jobId]);

	useEffect(() => {
		if (!formUrl) {
			setLoading(false);
			return undefined;
		}

		const controller = new AbortController();

		async function doEffect() {
			try {
				const response = await fetch(formUrl, { signal: controller.signal });
				if (!response.ok) {
					throw new Error('Unexpected response code');
				}

				const json = await response.json();

				const formParts = json.formParts
					.filter((part) => !part.hidden)
					.sort((a, b) => a.order - b.order);

				setPrescreeningFormParts(formParts);
				setPrescreeningFormIdentifier(json.identifier);
				setLoading(false);
			} catch (err) {
				if (controller.signal.aborted) {
					return;
				}
				console.log(err);
				setError(true);
			}
		}

		doEffect();

		return () => {
			controller.abort();
		};
	}, [formUrl]);

	return (
		[
			render({
				ourProps,
				theirProps,
				slot: {}, // slot,
				defaultTag: DEFAULT_TAG,
				name: 'ApplyButton',
			}),
			<>
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
							margin: 0 2px;
						}
						.gate-js-drawer sl-checkbox::part(label) {
							margin-inline-start: 0.75em;
						}
						.gate-js-drawer sl-checkbox::part(form-control-help-text) {
							margin-top: var(--sl-spacing-small);
							margin-left: calc(18px + 4px + 0.75em);
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
				<IntlProvider locale={language} messages={translations[language]} fallbackOnEmptyString={false}>
					<div className={darkTheme ? 'sl-theme-dark' : ''}>
						<Drawer
							open={open}
							setPrescreeningFormAnswers={setPrescreeningFormAnswers}
							setPersonalData={setPersonalData}
							prescreeningFormAnswers={prescreeningFormAnswers}
							attachments={attachments}
							setAttachments={setAttachments}
							setResume={setResume}
							resume={resume}
							alreadyApplied={alreadyApplied}
							hasAdditional={hasAdditional}
							loading={loading}
							setOpen={setOpen}
							personalData={personalData}
							step={step}
							prescreeningFormIdentifier={prescreeningFormIdentifier}
							prescreeningFormParts={prescreeningFormParts}
							reset={reset}
							setStep={setStep}
							requireCv={requireCv}
						/>
					</div>
				</IntlProvider>
			</>,
		]
	);
}

export const ApplyButton = forwardRefWithAs(ApplyButtonFn);
