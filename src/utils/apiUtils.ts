const BASE_URL_V0 = import.meta.env.VITE_BASE_URL_V0 as string;

// Custom error class for API errors
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public statusText?: string,
        public url?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Helper to parse error response
const parseErrorResponse = async (response: Response): Promise<string> => {
    try {
        const errorData = await response.json();
        return errorData?.message || errorData?.error || response.statusText || 'An error occurred';
    } catch {
        return response.statusText || 'An error occurred';
    }
};

export const makePostRequest = async <T, R>(
    url: string,
    data: T
): Promise<R> => {
    try {
        const fullUrl = `${BASE_URL_V0}${url}`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorMessage = await parseErrorResponse(response);
            throw new ApiError(
                errorMessage,
                response.status,
                response.statusText,
                fullUrl
            );
        }

        const result = await response.json() as R;
        return result;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle network errors or other fetch failures
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new ApiError(
                'Network error: Unable to connect to the server. Please check your internet connection.',
                0,
                'Network Error',
                url
            );
        }
        throw new ApiError(
            error instanceof Error ? error.message : 'An unexpected error occurred',
            0,
            'Unknown Error',
            url
        );
    }
};

export const makeGetRequest = async <R>(url: string): Promise<R> => {
    try {
        const fullUrl = `${BASE_URL_V0}${url}`;
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await parseErrorResponse(response);
            throw new ApiError(
                errorMessage,
                response.status,
                response.statusText,
                fullUrl
            );
        }

        const result = await response.json() as R;
        return result;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Handle network errors or other fetch failures
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new ApiError(
                'Network error: Unable to connect to the server. Please check your internet connection.',
                0,
                'Network Error',
                url
            );
        }
        throw new ApiError(
            error instanceof Error ? error.message : 'An unexpected error occurred',
            0,
            'Unknown Error',
            url
        );
    }
};