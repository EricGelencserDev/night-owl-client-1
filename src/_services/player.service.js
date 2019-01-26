import config from 'config';

export const playerService = {
    registerOne
};

async function registerOne(player) {
    const requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
    };

    let resp = await fetch(`${config.apiUrl}/player_account/register`, requestOptions);
    let user = await handleResponse(resp);
    console.log(`Player: ${JSON.stringify(player, null, 2)}`)
    // Register successful
    console.log(`Player registered: ${JSON.stringify(player, null, 2)}`);
    return player;
}


async function handleResponse(response) {
    let json = await response.text();
    const data = json && JSON.parse(json);
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        throw error;
    }
    return data;
}