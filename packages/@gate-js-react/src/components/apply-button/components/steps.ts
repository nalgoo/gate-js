export const steps = ['prologue', 'resume', 'personal', 'additional', 'review', 'confirmation'] as const;

export type Step = typeof steps[number];

export function isBeforeStep(thisStep: Step, otherStep: Step): boolean {
	return steps.indexOf(thisStep) < steps.indexOf(otherStep);
}
