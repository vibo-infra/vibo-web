import type { EventLatLong, BaseSuccessResponse } from './common';

// Create Event Types
export interface CreateEventRequest {
    eventName: string;
    eventSubheading: string;
    eventDescription: string;
    eventCost: string;
    eventLatLong: EventLatLong;
    eventDate: string;
    eventTime: string;
}

export interface Event {
    eventId: string;
    eventName: string;
    eventSubheading: string;
    eventDescription: string;
    eventCost: string;
    eventLatLong: EventLatLong;
    eventDate: string;
    eventTime: string;
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateEventResponse extends BaseSuccessResponse {
    event: Event;
}

// Get All Events Types
export interface GetAllEventsResponse extends BaseSuccessResponse {
    events: Event[];
}

// Get Event By ID Types
export interface GetEventByIdResponse extends BaseSuccessResponse {
    event: Event;
}

