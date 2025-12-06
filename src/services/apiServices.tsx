import { makePostRequest, makeGetRequest, ApiError } from "../utils/apiUtils";
import { ENDPOINTS } from "../utils/constants";
import type {
    CreateEventRequest,
    CreateEventResponse,
    GetAllEventsResponse,
    GetEventByIdResponse,
    RegisterForEventRequest,
    RegisterForEventResponse,
    GetEventAttendeesResponse,
    UserAccessInfoRequest,
    UserAccessInfoResponse,
} from "../types";

// Event APIs
export const createEvent = async (eventData: CreateEventRequest): Promise<CreateEventResponse> => {
    try {
        return await makePostRequest<CreateEventRequest, CreateEventResponse>(ENDPOINTS.CREATE_EVENT, eventData);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to create event. Please try again later.');
    }
};

export const getAllEvents = async (): Promise<GetAllEventsResponse> => {
    try {
        return await makeGetRequest<GetAllEventsResponse>(ENDPOINTS.GET_ALL_EVENTS);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to load events. Please try again later.');
    }
};

export const getEventById = async (eventId: string): Promise<GetEventByIdResponse> => {
    try {
        if (!eventId) {
            throw new ApiError('Event ID is required');
        }
        return await makeGetRequest<GetEventByIdResponse>(ENDPOINTS.GET_EVENT_BY_ID(eventId));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to load event details. Please try again later.');
    }
};

export const registerForEvent = async (registrationData: RegisterForEventRequest): Promise<RegisterForEventResponse> => {
    try {
        if (!registrationData.eventId || !registrationData.mobileNumber || !registrationData.instagram) {
            throw new ApiError('All registration fields are required');
        }
        return await makePostRequest<RegisterForEventRequest, RegisterForEventResponse>(ENDPOINTS.REGISTER_FOR_EVENT, registrationData);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to register for event. Please try again later.');
    }
};

export const getEventAttendees = async (eventId: string): Promise<GetEventAttendeesResponse> => {
    try {
        if (!eventId) {
            throw new ApiError('Event ID is required');
        }
        return await makeGetRequest<GetEventAttendeesResponse>(ENDPOINTS.EVENT_ATTENDEES(eventId));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to load attendees. Please try again later.');
    }
};

// Tracking APIs
export const userAccessInfo = async (traceData: UserAccessInfoRequest): Promise<UserAccessInfoResponse> => {
    try {
        return await makePostRequest<UserAccessInfoRequest, UserAccessInfoResponse>(ENDPOINTS.VISITOR_TRACE, traceData);
    } catch (error) {
        // Silently fail for tracking - don't break the app
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Tracking failed');
    }
};