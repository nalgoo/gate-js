'use client';

import {
	CSSProperties,
	forwardRef,
	Ref,
	useCallback,
	useEffect, useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
	ApplicantPersonalDataType,
	FormPartDefinitionType,
	getFormDefinition,
	getGlobalSettings,
	getJobDetails,
	hasApplicantApplied,
	logError,
} from '@gate-js/core';
import { useDebouncedEffect } from '../../../hooks/useDebouncedEffect';
import { registerGateJsIcons } from './icons';
import { messages } from '../../../localization/messages';
import { StepList } from './step-list';
import { ResumeStep } from '../steps/resume-step';
import { PersonalStep } from '../steps/personal-step';
import { AdditionalStep } from '../steps/additional-step';
import { ReviewStep } from '../steps/review-step';
import { Confirmation } from '../steps/confirmation';
import { useApplyContext } from '../../../hooks/useApplyContext';
import { isBeforeStep, Step } from './steps';
import { Prologue } from '../steps/prologue';
import {
	registerIconLibrary, SlDrawer, SlDrawerType, SlProgressBar, unregisterIconLibrary,
} from '../shoelace';

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

function DrawerFn({
	open,
	setOpen,
}: DrawerProps, ref: Ref<SlDrawerType>) {
	const { jobId, options } = useApplyContext();

	const {
		source, origin, refId, addons, parse, thankYou,
	} = options;

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
		// do not check global registration
		// todo: maybe later?
		if (!jobId) {
			return undefined;
		}

		if (!givenName || !familyName || !email) {
			setAlreadyApplied(false);
			return undefined;
		}

		const controller = new AbortController();
		const doEffect = async () => {
			const hasApplied = await hasApplicantApplied(
				{ givenName, familyName, email },
				jobId,
				{ ...options, abortSignal: controller.signal },
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

	const firstStep = addons.filter((addon) => addon.showOnStart === true).length > 0
		? 'prologue'
		: 'resume';

	const [step, setStepRaw] = useState<Step>(firstStep);
	const [maxStep, setMaxStep] = useState<Step>(firstStep);

	const setStep = useCallback((newStep: Step) => {
		setStepRaw(newStep);
		if (!isBeforeStep(newStep, maxStep)) {
			setMaxStep(newStep);
		}
	}, [setStepRaw, setMaxStep, maxStep]);

	const [prescreeningFormAnswers, setPrescreeningFormAnswersRaw] = useState({});
	const setPrescreeningFormAnswers = useCallback((next) => {
		setPrescreeningFormAnswersRaw(filterInputs(next));
	}, [setPrescreeningFormAnswersRaw]);

	const [requireCv, setRequireCv] = useState<boolean>(false);

	const [prescreeningFormIdentifier, setPrescreeningFormIdentifier] = useState<string | undefined>();
	const [prescreeningFormParts, setPrescreeningFormParts] = useState<Array<FormPartDefinitionType>>([]);
	const hasAdditional = prescreeningFormParts.length > 0;

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(true);

	const fetchStarted = useRef(false);
	const fetchComplete = useRef(false);

	const reset = () => {
		setStep(firstStep);
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
		const shouldFetch = !fetchStarted.current && open;

		if (!shouldFetch) {
			return undefined;
		}

		fetchStarted.current = true;

		const controller = new AbortController();

		async function doEffect() {
			try {
				setLoading(true);

				const response = jobId
					? await getJobDetails(jobId, { ...options, abortSignal: controller.signal })
					: await getGlobalSettings({ ...options, abortSignal: controller.signal });

				const { formUrl, requireCv: requireCvFromResponse } = response;

				setRequireCv(requireCvFromResponse);

				if (formUrl) {
					const formResponse = await getFormDefinition((formUrl as string), controller.signal);

					const formParts = formResponse.formParts
						.filter((part) => !part.hidden)
						.sort((a, b) => a.order - b.order);

					setPrescreeningFormParts(formParts);
					setPrescreeningFormIdentifier(formResponse.identifier);
				}

				setLoading(false);
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
	}, [open, options, jobId]);

	const { formatMessage } = useIntl();

	const drawerStyle = { '--size': '500px' } as CSSProperties;

	const ourRef = useRef<SlDrawerType>(null);

	useImperativeHandle(ref, () => ourRef.current!, []);

	const preventDefault = useCallback((e: Event) => { e.preventDefault(); }, []);

	const handleClose = () => {
		ourRef.current?.hide();
	};

	const handleHide = (e) => {
		if ((e.target as SlDrawerType).nodeName === 'SL-DRAWER') {
			setOpen(false);
		}
	};

	const handleAfterHide = (e) => {
		if ((e.target as SlDrawerType).nodeName === 'SL-DRAWER') {
			if (step === 'confirmation') {
				reset();
			}

			const overlay = ourRef.current?.shadowRoot?.querySelector('.drawer__overlay');
			const panel = ourRef.current?.shadowRoot?.querySelector('.drawer__panel');

			if (overlay) {
				overlay.removeEventListener('drop', preventDefault);
				overlay.removeEventListener('dragover', preventDefault);
			}

			if (panel) {
				panel.removeEventListener('drop', preventDefault);
				panel.removeEventListener('dragover', preventDefault);
			}
		}
	};

	const handleAfterShow = () => {
		const overlay = ourRef.current?.shadowRoot?.querySelector('.drawer__overlay');
		const panel = ourRef.current?.shadowRoot?.querySelector('.drawer__panel');

		if (overlay) {
			overlay.addEventListener('drop', preventDefault);
			overlay.addEventListener('dragover', preventDefault);
		}

		if (panel) {
			panel.addEventListener('drop', preventDefault);
			panel.addEventListener('dragover', preventDefault);
		}
	};

	return (
		<SlDrawer
			ref={ourRef}
			className="gate-js-drawer"
			open={open}
			onSlAfterShow={handleAfterShow}
			onSlHide={handleHide}
			onSlAfterHide={handleAfterHide}
			label={
				formatMessage(
					jobId
						? messages['drawer.heading.applyForJob']
						: messages['drawer.heading.registerToDatabase'],
				)
			}
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
					{step !== 'prologue' && (
						<StepList active={step} showAdditional={hasAdditional} setStep={setStep} maxStep={maxStep}/>
					)}

					{step === 'prologue' && (
						<Prologue
							onNext={() => setStep('resume')}
							addons={addons}
							activeAddons={activeAddons}
							setActiveAddons={setActiveAddons}
						/>
					)}

					{step === 'resume' && (
						<ResumeStep
							onNext={() => setStep('personal')}
							setResume={setResume}
							setPersonalData={setPersonalData}
							resumeRequired={requireCv}
							parse={parse}
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
						<Confirmation
							onClose={handleClose}
							thankYouHeading={typeof thankYou === 'string' ? thankYou : thankYou?.heading}
							thankYouMessage={typeof thankYou === 'string' ? null : thankYou?.message}
						/>
					)}
				</>
			)}
		</SlDrawer>
	);
}

DrawerFn.displayName = 'Drawer';

export const Drawer = forwardRef(DrawerFn);
