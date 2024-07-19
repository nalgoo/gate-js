import { ApplyButton, JobDetails } from '@gate-js/react';
import { apiConfig } from '@/apiConfig';
import { Details } from '@/components/details';
import { ErrorMessage } from '@/components/error-message';

export default function Page({ params }: { params: { id: number } }) {
	return (
		<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-none">
				<div className="overflow-hidden bg-white sm:rounded-lg sm:shadow px-6 py-8">
					<JobDetails
						config={apiConfig}
						jobId={params.id}
						renderDetails={Details}
						renderError={ErrorMessage}
					/>
				</div>
			</div>
		</main>
	);
}
