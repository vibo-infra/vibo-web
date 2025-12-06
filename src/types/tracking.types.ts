import type { BaseSuccessResponse } from './common';

// Location Schema
export interface LocationSchema {
    latitude: number;
    longitude: number;
    address?: string;
}

// User Schema (optional, only for registration)
export interface UserSchema {
    phone: string;
    instagram: string;
}

// Event Types
export type EventType = 'VIEW' | 'CLICK';

// User Access Info Request
export interface UserAccessInfoRequest {
    visitedAt: string; // ISO 8601 date string
    page: string; // Current route/URL
    duration: number; // Time spent in milliseconds
    eventType: EventType; // 'VIEW' or 'CLICK'
    location: LocationSchema;
    user?: UserSchema; // Optional, only for registration clicks
}

// User Access Info Response
export interface UserAccessInfoResponse extends BaseSuccessResponse {
    message?: string;
}

