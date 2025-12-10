<script>
    export let width = 20;
    export let height = 20;
    export let collapsed = false;
    export let cssClass = '';
</script>

<svg 
    class="collapse-icon {cssClass}"
    class:collapsed
    {width} 
    {height} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
>
    <polyline points="6 9 12 15 18 9"></polyline>
</svg>

<style>
    .collapse-icon {
        transition: transform 0.3s ease;
    }
    .collapse-icon.collapsed {
        transform: rotate(-90deg);
    }
</style>
