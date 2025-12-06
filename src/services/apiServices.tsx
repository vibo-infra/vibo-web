import { makePostRequest, makeGetRequest } from "../utils/apiUtils";
import { ENDPOINTS } from "../utils/constants";
import type {
    CreateEventRequest,
    CreateEventResponse,
    GetAllEventsResponse,
    GetEventByIdResponse,
    RegisterForEventRequest,
    RegisterForEventResponse,
    GetEventAttendeesResponse,
} from "../types";

// Event APIs
export const createEvent = async (eventData: CreateEventRequest): Promise<CreateEventResponse> => {
    return makePostRequest<CreateEventRequest, CreateEventResponse>(ENDPOINTS.CREATE_EVENT, eventData);
};

export const getAllEvents = async (): Promise<GetAllEventsResponse> => {
    return makeGetRequest<GetAllEventsResponse>(ENDPOINTS.GET_ALL_EVENTS);
};

export const getEventById = async (eventId: string): Promise<GetEventByIdResponse> => {
    return makeGetRequest<GetEventByIdResponse>(ENDPOINTS.GET_EVENT_BY_ID(eventId));
};

// Registration APIs
export const registerForEvent = async (registrationData: RegisterForEventRequest): Promise<RegisterForEventResponse> => {
    return makePostRequest<RegisterForEventRequest, RegisterForEventResponse>(ENDPOINTS.REGISTER_FOR_EVENT, registrationData);
};

export const getEventAttendees = async (eventId: string): Promise<GetEventAttendeesResponse> => {
    return makeGetRequest<GetEventAttendeesResponse>(ENDPOINTS.EVENT_ATTENDEES(eventId));
};
