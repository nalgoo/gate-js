import {
	CSSProperties,
	forwardRef, Ref,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useIntl } from 'react-intl';
import { registerIconLibrary, unregisterIconLibrary } from '@shoelace-style/shoelace';
import type { SlDrawer as SlDrawerType } from '@shoelace-style/shoelace';
import { SlDrawer, SlProgressBar } from '@shoelace-style/shoelace/dist/react';
import {
	ApplicantPersonalDataType,
	logError,
	FormPartDefinition,
	getFormDefinition,
	getJobDetails,
	hasApplicantApplied,
} from '@gate-js/core';
import { useJobContext } from '../../../hooks/useJobContext';
import { useDebouncedEffect } from '../../../hooks/useDebouncedEffect';
import { registerGateJsIcons } from './icons';
import { messages } from '../../../localization/messages';
import { StepList } from './step-list';
import { ResumeStep } from '../steps/resume-step';
import { PersonalStep } from '../steps/personal-step';
import { AdditionalStep } from '../steps/additional-step';
import { ReviewStep } from '../steps/review-step';
import { Confirmation } from '../steps/confirmation';

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

type DrawerProps = {
	open: boolean,

	setOpen: (open: boolean) => void,
};

function DrawerNewFn({
	// todo: do not use, refactor later
	preload = false,
	open,
	setOpen,
}: DrawerProps, ref: Ref<SlDrawerType>) {
	const { jobId, config, applyOptions } = useJobContext();

	const {
		darkTheme, source, origin, refId, addons,
	} = applyOptions;

	const idCounter = useRef(0);

	const memoizedAddons = useMemo(() => addons.map((addon) => {
		idCounter.current += 1;
		return { ...addon, id: `a${idCounter.current}` };
	}), [addons]);

	const [activeAddons, setActiveAddons] = useState([]);

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

	const [step, setStep] = useState<Steps>('resume');

	const [prescreeningFormAnswers, setPrescreeningFormAnswersRaw] = useState({});
	const setPrescreeningFormAnswers = useCallback((next) => {
		setPrescreeningFormAnswersRaw(filterInputs(next));
	}, [setPrescreeningFormAnswersRaw]);

	const [{ requireCv, formUrl }, setJobDetails] = useState({});

	const [prescreeningFormIdentifier, setPrescreeningFormIdentifier] = useState<string | undefined>();
	const [prescreeningFormParts, setPrescreeningFormParts] = useState<Array<FormPartDefinition>>([]);
	const hasAdditional = !!formUrl;

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(true);

	const fetchStarted = useRef(false);
	const fetchComplete = useRef(false);

	const reset = () => {
		setStep('resume');
		setPersonalDataRaw(EMPTY_PERSONAL_DATA);
		setResume(undefined);
		setAttachments({});
		setError(false);
		setPrescreeningFormAnswersRaw({});
		setActiveAddons([]);
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
				logError(err);
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
				const response = await getFormDefinition(formUrl, controller.signal);

				const formParts = response.formParts
					.filter((part) => !part.hidden)
					.sort((a, b) => a.order - b.order);

				setPrescreeningFormParts(formParts);
				setPrescreeningFormIdentifier(response.identifier);
				setLoading(false);
			} catch (err) {
				if (controller.signal.aborted) {
					return;
				}
				logError(err);
				setError(true);
			}
		}

		doEffect();

		return () => {
			controller.abort();
		};
	}, [formUrl]);

	const { formatMessage } = useIntl();

	const drawerStyle = { '--size': '500px' } as CSSProperties;

	return (
		<>
			<div className={darkTheme ? 'sl-theme-dark' : ''}>
				<SlDrawer
					ref={ref}
					className="gate-js-drawer"
					open={open}
					onSlHide={(e) => {
						if ((e.target as SlDrawerType).nodeName === 'SL-DRAWER') {
							setOpen(false);
						}
					}}
					label={formatMessage(messages['drawer.heading'])}
					style={drawerStyle}
				>
					{loading ? (
						<>
							<SlProgressBar indeterminate />
							<div>
								{formatMessage(messages['drawer.loading.message'])}
							</div>
						</>
					) : (
						<>
							<StepList active={step} showAdditional={hasAdditional} />

							{step === 'resume' && (
								<ResumeStep
									onNext={() => setStep('personal')}
									setResume={setResume}
									setPersonalData={setPersonalData}
									resumeRequired={requireCv}
								/>
							)}

							{step === 'personal' && (
								<PersonalStep
									onBack={() => setStep('resume')}
									onNext={() => setStep(hasAdditional ? 'additional' : 'review')}
									personalData={personalData}
									setPersonalData={setPersonalData}
									resume={resume}
									attachments={attachments}
									setAttachments={setAttachments}
									alreadyApplied={alreadyApplied}
								/>
							)}

							{step === 'additional' && (
								<AdditionalStep
									onBack={() => setStep('personal')}
									onNext={() => setStep('review')}
									prescreeningFormParts={prescreeningFormParts}
									prescreeningFormAnswers={prescreeningFormAnswers}
									setPrescreeningFormAnswers={setPrescreeningFormAnswers}
								/>
							)}

							{step === 'review' && (
								<ReviewStep
									onBack={() => setStep(hasAdditional ? 'additional' : 'personal')}
									onNext={() => setStep('confirmation')}
									personalData={personalData}
									resume={resume}
									attachments={attachments}
									prescreeningFormIdentifier={prescreeningFormIdentifier}
									prescreeningFormParts={prescreeningFormParts}
									prescreeningFormAnswers={prescreeningFormAnswers}
									source={source}
									origin={origin}
									refId={refId}
									addons={memoizedAddons}
									activeAddons={activeAddons}
									setActiveAddons={setActiveAddons}
								/>
							)}

							{step === 'confirmation' && (
								<Confirmation onClose={reset} />
							)}
						</>
					)}
				</SlDrawer>
			</div>
		</>
	);
}

export const Drawer = forwardRef(DrawerNewFn);
