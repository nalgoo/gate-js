import { test, expect } from 'vitest';
import { filterField, filterJobs, normalizeFieldValue } from "../_internal";
import type { JobListItemType } from '../../types';

test('normalizeFieldValue', () => {
    expect(normalizeFieldValue(undefined)).toEqual([]);
    expect(normalizeFieldValue(null)).toEqual([]);
    expect(normalizeFieldValue([])).toEqual([]);
    expect(normalizeFieldValue('test')).toEqual(['test']);
    expect(normalizeFieldValue({ label: 'test' })).toEqual(['test']);
    expect(normalizeFieldValue([{ label: 'test' }])).toEqual(['test']);
});

const filter = ['a', 'b', 'c'];

test('filterField empty', () => {
    expect(filterField([], filter)).toBe(false);
});

test('filterField match', () => {
    expect(filterField(['a'], filter)).toBe(true);
    expect(filterField(filter, filter)).toBe(true);
    expect(filterField(['d', 'a'], filter)).toBe(true);
});

test('filterField no match', () => {
    expect(filterField([], filter)).toBe(false);
    expect(filterField(['d'], filter)).toBe(false);
    expect(filterField(['d', 'e', 'f'], filter)).toBe(false);
});


const mockJob: JobListItemType = {
    // Required properties from JobListItemType
    id: 1,
    title: 'Senior Software Engineer',
    updatedOn: new Date('2024-01-15T10:30:00Z'),
    publishedOn: new Date('2024-01-10T09:00:00Z'),
    
    // Optional properties (can be null)
    language: 'en',
    location: 'New York, NY',
    salary: '$80,000 - $120,000',
    salaryInfo: 'Annual salary based on experience',
    file: null,
    
    // Boolean property
    featured: true,
    
    // Array of employment forms
    employmentForms: [
        { id: 1, name: 'Full-time' },
        { id: 2, name: 'Remote' }
    ],
    
    // Dynamic fields object
    fields: {
        department: 'Engineering',
        level: { label: 'Senior' },
        tags: [{ label: 'Remote' }, { label: 'Full-time' }],
        experience: '5+ years'
    },
    
    // User profile
    user: {
        displayName: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1-555-123-4567',
        picture: 'https://example.com/avatar.jpg',
        position: 'Technical Recruiter'
    },
    
    // Properties from ApplicationFormSettingsType
    requireCv: true,
    formUrl: 'https://company.com/apply/senior-engineer'
};

test('filterJobs empty', () => {
    expect(filterJobs([mockJob], undefined)).toEqual([mockJob]);
    expect(filterJobs([mockJob], {})).toEqual([mockJob]);
});

test('filterJobs match', () => {
    expect(filterJobs([mockJob], { language: 'en' })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { language: ['en', 'whatever'] })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { location: 'New York, NY' })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { location: ['New York, NY', 'whatever'] })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { custom: { department: 'Engineering' } })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { custom: { level: ['Junior', 'Senior'] } })).toEqual([mockJob]);
    expect(filterJobs([mockJob], { custom: { tags: ['Remote'] } })).toEqual([mockJob]);
});

test('filterJobs no match', () => {
    expect(filterJobs([mockJob], { language: 'de' })).toEqual([]);
    expect(filterJobs([mockJob], { language: ['de', 'whatever'] })).toEqual([]);
    expect(filterJobs([mockJob], { location: 'Bratiska' })).toEqual([]);
    expect(filterJobs([mockJob], { location: ['Bratiska', 'whatever'] })).toEqual([]);
    expect(filterJobs([mockJob], { custom: { department: 'Something' } })).toEqual([]);
    expect(filterJobs([mockJob], { custom: { level: ['Junior', 'Medior'] } })).toEqual([]);
    expect(filterJobs([mockJob], { custom: { tags: ['On-site'] } })).toEqual([]);
});
