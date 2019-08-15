<script>
    import { onMount } from "svelte";
    import { navigate } from 'svelte-routing';
    import moment from 'moment-timezone';
    import Flexbox from '../components/Flexbox.svelte';
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

<style>
    .slot-container {
        background: lavender;
    }
    .slot {
        background: coral;
        padding: 1rem;
    }
</style>

<main>
    <h1>Open time slots</h1>
    <h2>These are the times you are free</h2>
    <p>
    {#if slots}
        <div class='slot-container' width='100%'>
            <Flexbox wrap={'wrap'} justifyContent={'space-evenly'}>
            {#each slots as slot}
                <Flexbox>
                    <div class='slot'>
                        {moment(slot.start).format('l LT')} - {moment(slot.end).format('l LT')}
                    </div>
                </Flexbox>
            {/each}
            </Flexbox>
        </div>
    {:else}
        Loading...
    {/if}
    </p>
</main>
