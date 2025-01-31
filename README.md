# gate-js

## Core

low level utilities in vanilla JS and Typescript definitions to simplify calling Jobs API

### Installation

```shell
npm i @gate-js/core
```

### Usage

#### Get list of active jobs

```javascript
import { getJobList } from '@gate-js/core';

...

const options = {
	// required, assigned by Nalgoo
	organization: 'YOUR_ORGANIZATION_ID',

	// optionally filter jobs by language or location
	// each property is also optional or nullable, to include jobs in any language or with any location
	// each property also supports array, which acts as logical `OR`
	filter: {
		language: 'sk',
		location: ['Bratislava', 'Kosice'],
	},
};

// getJobList() is async function so you can use `await`:
const jobList = await getJobList(options);
jobList.map((item) => item.title);

// or you can use callbacks:
getJobList(options).then((items) => items.map(item.title));

```

#### Get details of single job

```javascript
import { getJobDetails } from '@gate-js/core';

...

const options = {
	// required, assigned by Nalgoo
	organization: 'YOUR_ORGANIZATION_ID',
}

// jobId returned by `getJobList()` function
const jobId = 123;

const jobDetails = await getJobDetails(jobId, options);
console.log(jobDetails.title);

// you can also use callbacks:
getJobDetails(jobId, options).then((details) => console.log(details.title));

```

#### Creating job application

```javascript
import { createJobApplication } from '@gate-js/core';

...

const options = {
	// required, assigned by Nalgoo
	organization: 'YOUR_ORGANIZATION_ID',
}

// id of job
const jobId = 123;

const applicationData = {
	applicant: {
		salutation: 'mr',
		givenName: 'Adam',
		familyName: 'Adamovič',
		email: 'adam@example.com',
		phoneNumber: '+421905555555',
	},

	// usually retrieved from a `FileList` object when selected using `input` element
	resume: new File(...),

	// other attachments, optional
	attachments: [
		new File(...),
	],

	// if GDPR consent was given
	gdpr: {
		contents: 'text of GDPR document',
		validUntil: '2026-01-01',
	},

	source: 'web',

	// either hostname or id as integer from existing source codelist
	origin: 'google.com',
};

// returns `true` if success, `false` otherwise
const result = await createJobApplication(jobId, applicationData, options);

// or use with callback
createJobApplication(jobId, applicationData, options).then((result) => result ? console.log('success') : console.log('error'));

```

## React

Customizable components to be used with React. Server-side rendering is also supported.

### Installation

```shell
npm i @gate-js/react
```

### Usage

you can also see example usage in `playgrounds/react` folder

#### Render job list

```javascript
import { ApplyButton, JobList } from '@gate-js/react';

const options = {
	// required, assigned by Nalgoo
	organization: 'YOUR_ORGANIZATION_ID',

	// optionally filter jobs by language or location
	// each property is also optional or nullable, to include jobs in any language or with any location
	// each property also supports array, which acts as logical `OR`
	filter: {
		language: 'sk',
		location: ['Bratislava', 'Kosice'],
	},
};

function RenderItem({ item, index }) {
	return (
		<li>
			{item.title}
			{/* ApplyButton component has current job available from context and will open application form on click */}
			<ApplyButton>Apply</ApplyButton>
		</li>
	);
}

function Page() {
	return (
		<ul>
			<JobList
				options={options}
				renderItem={RenderItem}
			/>
		</ul>
	);
}
```

#### Render job details

```javascript
import { ApplyButton, JobContent, JobDetails } from '@gate-js/react';

const options = {
	// required, assigned by Nalgoo
	organization: 'YOUR_ORGANIZATION_ID',
};

function RenderDetails({ job }) {
	return (
		<>
			<h2>{job.title}</h2>
			{/* component JobContent will render sanitized HTML content of Job */}
			<JobContent />
			{/* component ApplyButton will open application form on click */}
			<ApplyButton>Apply</ApplyButton>
		</>
	);
}

function Page() {
	const jobId = 1; // taken from job list

	return (
		<JobDetails
			options={options}
			jobId={jobId}
			renderDetails={RenderDetails}
		/>
	);
}
```

#### Apply button

`ApplyButton` component is a wrapper for native `button` and will open application form on click. Correct job is passed
with context. You can use all native `button` props, or you can change the type to another native or custom component
with `as` prop.

```javascript

<ApplyButton
	disabled
	style={{ color: 'red' }}
>
	Click me
</ApplyButton>
```

```javascript
function MySpecialButton({ mySpecialProp }) {
	return mySpecialProp;
}

...

// this will render "yes"
<ApplyButton
	as={MySpecialButton}
	mySpecialProp="yes"
/>
```
