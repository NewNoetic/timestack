<script>
    import { onMount } from "svelte";
    export let authUrl;

    onMount(async () => {
        const res = await fetch("/api/authUrl");
        const newAuthUrl = await res.text();
        authUrl = newAuthUrl;
    });
</script>

<main>
    <h1>Authenticate with Google</h1>
    <h2>
        Timestack needs access to your Google Calendars to display open time slots.
    </h2>
    <p>
    {#if authUrl}
        <a href={ authUrl } onclick="window.open(this.href, 'auth', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" >Authenticate</a>
    {:else}
        Loading...
    {/if}
    </p>
</main>
