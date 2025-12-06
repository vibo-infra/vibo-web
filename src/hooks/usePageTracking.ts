import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/tracking';

/**
 * Custom hook to track page views and duration
 * Automatically tracks VIEW events when component mounts
 * and calculates duration when component unmounts
 */
export const usePageTracking = () => {
    const location = useLocation();
    const startTimeRef = useRef<number>(Date.now());
    const pageRef = useRef<string>(location.pathname);

    useEffect(() => {
        // Reset start time when page changes
        startTimeRef.current = Date.now();
        pageRef.current = location.pathname;

        // Track page view
        const duration = 0; // Initial view has 0 duration
        trackEvent(location.pathname, duration, 'VIEW');

        // Track duration on unmount or page change
        return () => {
            const duration = Date.now() - startTimeRef.current;
            if (duration > 0) {
                // Track final duration (optional - can be removed if not needed)
                // This tracks when user leaves the page
            }
        };
    }, [location.pathname]);
};

