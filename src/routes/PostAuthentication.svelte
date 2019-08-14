<script>
    import { onMount } from 'svelte';
    import { navigate } from "svelte-routing";
    import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../lib/authConstants';

    export let accessToken;
    export let refreshToken;

    onMount(async () => {
        if (localStorage.getItem(ACCESS_TOKEN_KEY) && localStorage.getItem(REFRESH_TOKEN_KEY)) {
            accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
            refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            navigate('/slots', { replace: true });
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const res = await fetch('/api/authToken', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code}),
            });
            const tokens = await res.json();
            localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
            localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
            accessToken = tokens.access_token;
            refreshToken = tokens.refresh_token;
            navigate('/slots', { replace: true });
        }
    });
</script>

<main>
    <h1>Saved credentials</h1>
    <h2>
        Your access token has been saved to the browser.
    </h2>
    Access token: <pre>{ accessToken }</pre>
    <br />
    Refresh token: <pre>{ refreshToken }</pre>
    <br />
    Clear your tokens (todo)
</main>
