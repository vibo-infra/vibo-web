const BASE_URL_V0 = import.meta.env.VITE_BASE_URL_V0 as string;


export const makePostRequest = async <T, R>(
    url: string,
    data: T
): Promise<R> => {
    const response = await fetch(`${BASE_URL_V0}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error in ${url}: ${response.statusText}`);
    }

    const result = await response.json() as R;
    return result;
};

export const makeGetRequest = async <R>(url: string): Promise<R> => {
    const response = await fetch(`${BASE_URL_V0}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error in ${url}: ${response.statusText}`);
    }

    const result = await response.json() as R;
    return result;
};