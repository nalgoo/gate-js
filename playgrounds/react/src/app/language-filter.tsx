'use client';

import { useJobs } from "@gate-js/react";

export function LanguageFilter() {
    const { setFilter } = useJobs();
    return (
        <select 
            onChange={(e) => {
                const value = e.target.value;
                switch (value) {
                    case '_all':
                        setFilter((prev) => ({ ...prev, language: undefined }));
                        break;
                    case '_none':
                        setFilter({ language: null });
                        break;
                    default:
                        setFilter({ language: value });
                    }
            }}
        >
            <option value="_all">All languages</option>
            <option value="_none">No language</option>
            <option value="sk">Slovak</option>
            <option value="en">English</option>
        </select>
    );
}