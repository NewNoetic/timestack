<script>
    import css from 'svelte-css-vars';

    export let direction = undefined;
    export let wrap = undefined;
    export let order = undefined;
    export let grow = undefined;
    export let shrink = undefined;
    export let basis = undefined;
    export let justifyContent = undefined;
    export let alignSelf = undefined;
    export let alignItems = undefined;
    export let alignContent = undefined;

    $: style = {
        direction,
        justifyContent,
        wrap,
        order,
        grow,
        shrink,
        basis,
        alignSelf,
        alignItems,
        alignContent,
    };
</script>

<style>
    .flexbox {
        display: flex;
        flex-direction: var(--direction, row);
        flex-wrap: var(--wrap, nowrap);
        order: var(--order, 0);
        flex-grow: var(--grow, 0);
        flex-shrink: var(--shrink, 1);
        flex-basis: var(--basis, auto);
        justify-content: var(--justifyContent, flex-start);
        align-self: var(--alignSelf, auto);
        align-items: var(--alignItems, stretch);
        align-content: var(--alignContent, stretch);
    }
</style>

<div use:css={style} class='flexbox'>
    <slot />
</div>