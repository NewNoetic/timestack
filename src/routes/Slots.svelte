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
        } else if (true) {
            slots = {"2019-08-15":[{"start":"2019-08-15T16:00:00.000Z","end":"2019-08-15T16:30:00.000Z"},{"start":"2019-08-15T16:30:00.000Z","end":"2019-08-15T17:00:00.000Z"},{"start":"2019-08-15T17:00:00.000Z","end":"2019-08-15T17:30:00.000Z"},{"start":"2019-08-15T17:30:00.000Z","end":"2019-08-15T18:00:00.000Z"},{"start":"2019-08-15T18:00:00.000Z","end":"2019-08-15T18:30:00.000Z"},{"start":"2019-08-15T18:30:00.000Z","end":"2019-08-15T19:00:00.000Z"},{"start":"2019-08-15T19:00:00.000Z","end":"2019-08-15T19:30:00.000Z"},{"start":"2019-08-15T19:30:00.000Z","end":"2019-08-15T20:00:00.000Z"},{"start":"2019-08-15T20:00:00.000Z","end":"2019-08-15T20:30:00.000Z"},{"start":"2019-08-15T20:30:00.000Z","end":"2019-08-15T21:00:00.000Z"},{"start":"2019-08-15T21:00:00.000Z","end":"2019-08-15T21:30:00.000Z"},{"start":"2019-08-15T21:30:00.000Z","end":"2019-08-15T22:00:00.000Z"},{"start":"2019-08-15T22:00:00.000Z","end":"2019-08-15T22:30:00.000Z"},{"start":"2019-08-15T22:30:00.000Z","end":"2019-08-15T23:00:00.000Z"},{"start":"2019-08-15T23:00:00.000Z","end":"2019-08-15T23:30:00.000Z"},{"start":"2019-08-15T23:30:00.000Z","end":"2019-08-16T00:00:00.000Z"}],"2019-08-16":[{"start":"2019-08-16T16:00:00.000Z","end":"2019-08-16T16:30:00.000Z"},{"start":"2019-08-16T16:30:00.000Z","end":"2019-08-16T17:00:00.000Z"},{"start":"2019-08-16T17:00:00.000Z","end":"2019-08-16T17:30:00.000Z"},{"start":"2019-08-16T17:30:00.000Z","end":"2019-08-16T18:00:00.000Z"},{"start":"2019-08-16T18:00:00.000Z","end":"2019-08-16T18:30:00.000Z"},{"start":"2019-08-16T18:30:00.000Z","end":"2019-08-16T19:00:00.000Z"},{"start":"2019-08-16T19:00:00.000Z","end":"2019-08-16T19:30:00.000Z"},{"start":"2019-08-16T19:30:00.000Z","end":"2019-08-16T20:00:00.000Z"},{"start":"2019-08-16T20:00:00.000Z","end":"2019-08-16T20:30:00.000Z"},{"start":"2019-08-16T20:30:00.000Z","end":"2019-08-16T21:00:00.000Z"},{"start":"2019-08-16T21:00:00.000Z","end":"2019-08-16T21:30:00.000Z"},{"start":"2019-08-16T21:30:00.000Z","end":"2019-08-16T22:00:00.000Z"},{"start":"2019-08-16T22:00:00.000Z","end":"2019-08-16T22:30:00.000Z"},{"start":"2019-08-16T22:30:00.000Z","end":"2019-08-16T23:00:00.000Z"},{"start":"2019-08-16T23:00:00.000Z","end":"2019-08-16T23:30:00.000Z"},{"start":"2019-08-16T23:30:00.000Z","end":"2019-08-17T00:00:00.000Z"}]};
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
    .day-container {
        background: lavender;
    }
    .day {
        border: 1px lightcoral solid;
    }
    .slot {
        background: coral;
        border: 1px lavender solid;
        padding: .5rem;
    }
</style>

<main>
    <h1>Open time slots</h1>
    <h2>These are the times you are free</h2>
    <p>
    {#if slots}
        <div class='day-container' width='100%'>
            <Flexbox wrap={'wrap'} justifyContent={'flex-start'} direction={'row'}>
            {#each Object.keys(slots) as slotDate}
                <Flexbox direction={'column'}>
                    <div class='day'>
                        <h3>{slotDate}</h3>
                        {#each slots[slotDate] as slot}
                            <Flexbox>
                                <div class='slot'>
                                    {moment(slot.start).format('LT')} - {moment(slot.end).format('LT')}
                                </div>
                            </Flexbox>
                        {/each}
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
