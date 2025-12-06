
export interface EventLatLong {
    address: string;
    latitude: number;
    longitude: number;
}

export interface BaseSuccessResponse {
    success: true;
}

export interface BaseErrorResponse {
    success: false;
    message: string;
}

