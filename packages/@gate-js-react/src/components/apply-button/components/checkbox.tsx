import { useState } from 'react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { SlButton, SlCheckbox, SlDialog } from '../shoelace';

function CheckboxFn({
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

CheckboxFn.displayName = 'Checkbox';

export { CheckboxFn as Checkbox };
