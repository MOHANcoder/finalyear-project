const useFetch = async (url, body = {}, method = 'GET') => {
    try {
        if (url.startsWith('/')) {
            url = 'http://localhost:1000' + url;
        }
        if( typeof body === 'string'){
            method = body;
            body = {};
        }
        const response = await fetch(url, {
            method,
            ...(Object.keys(body).length === 0 ? {} : { body: JSON.stringify(body) }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
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