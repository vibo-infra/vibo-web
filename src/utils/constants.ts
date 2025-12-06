
const RESOURCES = {
    eventService: '/v0/api/event',
    visitorTraceService: '/v0/api/track',
}

export const ENDPOINTS = {
    CREATE_EVENT: `${RESOURCES.eventService}/createEvent`,
    GET_ALL_EVENTS: `${RESOURCES.eventService}/getAllEvents`,
    GET_EVENT_BY_ID: (eventId: string) => `${RESOURCES.eventService}/getEventById/${eventId}`,
    REGISTER_FOR_EVENT: `${RESOURCES.eventService}/register`,
    EVENT_ATTENDEES: (eventId: string) => `${RESOURCES.eventService}/${eventId}/attendees`,

    VISITOR_TRACE: `${RESOURCES.visitorTraceService}/userAccessInfo`
}