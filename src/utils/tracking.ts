import { userAccessInfo } from '../services/apiServices';
import { ApiError } from './apiUtils';
import type { LocationSchema, UserSchema, EventType } from '../types';

// Get user's geolocation
export const getUserLocation = (): Promise<LocationSchema> => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            // Fallback to default location if geolocation is not supported
            resolve({
                latitude: 0,
                longitude: 0,
                address: 'Location not available',
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                // Fallback on error
                console.warn('Geolocation error:', error);
                resolve({
                    latitude: 0,
                    longitude: 0,
                    address: 'Location access denied',
                });
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 300000, // Cache for 5 minutes
            }
        );
    });
};

// Track page view or click event
export const trackEvent = async (
    page: string,
    duration: number,
    eventType: EventType,
    user?: UserSchema,
    buttonName?: string
): Promise<void> => {
    try {
        const location = await getUserLocation();
        
        // Append button identifier to page if provided
        const pageWithButton = buttonName ? `${page}#${buttonName}` : page;
        
        const traceData = {
            visitedAt: new Date().toISOString(),
            page: pageWithButton,
            duration,
            eventType,
            location,
            ...(user && { user }),
        };

        // Fire and forget - don't block UI
        userAccessInfo(traceData).catch((error) => {
            // Silently fail - tracking should never break the app
            if (error instanceof ApiError) {
                console.warn('Tracking API error:', error.message);
            } else {
                console.warn('Tracking error:', error);
            }
        });
    } catch (error) {
        console.warn('Tracking error:', error);
    }
};

// Track click event with user info (for registration)
export const trackClickWithUser = async (
    page: string,
    duration: number,
    user: UserSchema,
    buttonName: string
): Promise<void> => {
    await trackEvent(page, duration, 'CLICK', user, buttonName);
};

// Track click event without user info
export const trackClick = async (
    page: string,
    duration: number,
    buttonName: string
): Promise<void> => {
    await trackEvent(page, duration, 'CLICK', undefined, buttonName);
};

