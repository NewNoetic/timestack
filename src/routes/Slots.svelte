<script>
    import { onMount } from "svelte";
    import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../lib/authConstants'
    export let slots;

    onMount(async () => {
        const res = await fetch('/api/slots', {
            headers: {
                'x-access-token': localStorage.getItem(ACCESS_TOKEN_KEY),
                'x-refresh-token': localStorage.getItem(REFRESH_TOKEN_KEY)
            }
        });
        const newSlots = await res.json();
        slots = newSlots;
    });
</script>

<main>
    <h1>Open time slots</h1>
    <h2>
        These are the times you are busy
    </h2>
    <p>
    {#if slots}
        <ul>
        {#each slots as slot}
            <li>{slot.summary}</li>
        {/each}
        </ul>
    {:else}
        Loading...
    {/if}
    </p>
</main>
