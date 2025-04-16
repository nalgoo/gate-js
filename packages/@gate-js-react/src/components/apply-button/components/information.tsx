import { useState } from 'react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { SlButton, SlDialog, SlIcon } from '../shoelace';

function InformationFn({
	label,
	content,
}) {
	const { formatMessage } = useIntl();
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			{content && (
				<SlDialog
					label=""
					className="dialog-overview"
					open={dialogOpen}
					onSlHide={() => setDialogOpen(false)}
					style={{ '--width': '800px' }}
				>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<SlButton
						slot="footer"
						variant="primary"
						onClick={() => setDialogOpen(false)}
					>
						{formatMessage(messages['drawer.closeButton.label'])}
					</SlButton>
				</SlDialog>
			)}
			<div className="information">
				<div className="icon">
					<SlIcon library="gate-js" name="information" />
				</div>
				<div>
					<div className="label">{label}</div>
					{content && (
						<SlButton
							slot="help-text"
							size="small"
							onClick={() => setDialogOpen(true)}
						>
							{formatMessage(messages['steps.review.viewFullButton.label'])}
						</SlButton>
					)}
				</div>
			</div>
		</>
	);
}

InformationFn.displayName = 'Information';

export { InformationFn as Information };
