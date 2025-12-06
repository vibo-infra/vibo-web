import type { BaseSuccessResponse } from './common';

// Register for Event Types
export interface RegisterForEventRequest {
    eventId: string;
    mobileNumber: string;
    instagram: string;
}

export interface Registration {
    eventRef: string;
    mobileNumber: string;
    instagram: string;
    _id: string; 
    createdAt: string;
    updatedAt: string;
}

export interface RegisterForEventResponse extends BaseSuccessResponse {
    registration: Registration;
}

// Get Event Attendees Types
export interface Attendee {
    mobileNumber: string;
    instagram: string;
    createdAt: string;
}

export interface GetEventAttendeesResponse extends BaseSuccessResponse {
    attendees: Attendee[];
}

