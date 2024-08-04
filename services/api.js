const API_URL = 'https://adamix.net/minerd/';

export const getMotivos = async () => {
    try {
        let response = await fetch(`${API_URL}/motivos`);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


