<script>
    import { onMount } from "svelte";
    import { navigate } from 'svelte-routing';
    import moment from 'moment-timezone';
    import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../lib/authConstants'
    export let slots;

    onMount(async () => {
        if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
            navigate('/authorize');
        } else {
            const res = await fetch('/api/slots', {
                headers: {
                    'x-access-token': localStorage.getItem(ACCESS_TOKEN_KEY),
                    'x-refresh-token': localStorage.getItem(REFRESH_TOKEN_KEY)
                }
            });
            const newSlots = await res.json();
            slots = newSlots;
        }
    });
</script>

<main>
    <h1>Open time slots</h1>
    <h2>
        These are the times you are free
    </h2>
    <p>
    {#if slots}
        <ul>
        {#each slots as slot}
            <li>{moment(slot.start).format('LLL')} - {moment(slot.end).format('LLL')}</li>
        {/each}
        </ul>
    {:else}
        Loading...
    {/if}
    </p>
</main>
