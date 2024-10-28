import { RenderErrorProps } from '../../types/types';

export function Alert({
	type,
}: RenderErrorProps) {
	const message = type === 'not-found'
		? 'The job offer has been closed'
		: 'There was an error while connecting to job service';

	return (
		<div>
			{message}
		</div>
	);
}
