export function convertToDateOnly(isoString) {

    // Ensure the ISO string is normalized for JavaScript
    const normalizedIsoString = isoString.replace(/\.\d{3}\d*Z$/, (match) => match.slice(0, 4) + 'Z');
    const date = new Date(normalizedIsoString);
    // Format the date in YYYY-MM-DD
    return date.toISOString().split('T')[0];
}