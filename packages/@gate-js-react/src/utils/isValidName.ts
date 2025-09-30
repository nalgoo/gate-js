const invalidRegexp = /[@#$%^&*()_=+\[\]{}|;:"<>,\/\\?~`!0-9]/;

export function isValidName(name: string): boolean {
    // Return true if NO special characters or numbers are found
    return !invalidRegexp.test(name);
}
