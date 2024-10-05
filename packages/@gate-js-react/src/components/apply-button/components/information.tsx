import { useState } from 'react';
import { useIntl } from 'react-intl';
import SlDialog from '@shoelace-style/shoelace/dist/react/dialog';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import { messages } from '../../../localization/messages';

export function Information({
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
