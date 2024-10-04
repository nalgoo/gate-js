import SlDialog from '@shoelace-style/shoelace/dist/react/dialog';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';

export function Checkbox({
	onChange,
	required,
	label,
	content,
	checked,
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
			<SlCheckbox required={required} checked={checked} onSlChange={onChange}>
				{label}
				{content && (
					<SlButton
						slot="help-text"
						size="small"
						onClick={() => setDialogOpen(true)}
					>
						{formatMessage(messages['steps.review.viewFullButton.label'])}
					</SlButton>
				)}
			</SlCheckbox>
		</>
	);
}
