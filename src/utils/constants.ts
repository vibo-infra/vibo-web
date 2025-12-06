// Get base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const RESOURCES = {
    eventService: '/v0/api/event',
}

// Helper function to build full URL
const buildUrl = (path: string): string => {
    const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
};

export const ENDPOINTS = {
    CREATE_EVENT: buildUrl(`${RESOURCES.eventService}/createEvent`),
    GET_ALL_EVENTS: buildUrl(`${RESOURCES.eventService}/getAllEvents`),
    GET_EVENT_BY_ID: (eventId: string) => buildUrl(`${RESOURCES.eventService}/getEventById/${eventId}`),
    REGISTER_FOR_EVENT: buildUrl(`${RESOURCES.eventService}/register`),
    EVENT_ATTENDEES: (eventId: string) => buildUrl(`${RESOURCES.eventService}/${eventId}/attendees`),
}