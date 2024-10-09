import { GateOptions, JobDetails } from '@gate-js/react';
import { options } from '@/gateConfig';
import { Details } from '@/components/details';
import { ErrorMessage } from '@/components/error-message';

export default function Page({ params }: { params: { id: number } }) {
	return (
		<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<GateOptions options={{ refId: 'asdasd', origin: 'https://zoznam.sk' }}>
				<div className="mx-auto max-w-none">
					<div className="overflow-hidden bg-white sm:rounded-lg sm:shadow px-6 py-8">
						<JobDetails
							options={options}
							jobId={params.id}
							renderDetails={Details}
							renderError={ErrorMessage}
						/>
					</div>
				</div>
			</GateOptions>
		</main>
	);
}
