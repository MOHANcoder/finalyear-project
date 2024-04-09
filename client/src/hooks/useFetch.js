const useFetch = async (url, body = {}, method = 'GET', onlyResponse = false, dontStringify = false) => {
    try {
        if (url.startsWith('/')) {
            url = 'http://192.168.177.112:1000' + url;
        }
        if (typeof body === 'string') {
            method = body;
            body = {};
        }
        const response = await fetch(url, {
            method,
            ...(dontStringify ? { body } : (Object.keys(body).length === 0 ? {} : { body: JSON.stringify(body) })),
            ...(dontStringify ? {} : {
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            credentials: 'include'
        });
        if (onlyResponse) {
            return response;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Error during fetch'
        }
    }
};

export default useFetch;