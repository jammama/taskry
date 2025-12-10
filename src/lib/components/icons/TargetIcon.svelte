<script>
    export let width = 18;
    export let height = 18;
    export let cssClass = '';
</script>

<svg 
    {width} 
    {height} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="1.5" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    class="category-icon {cssClass}"
>
    <!-- 외부 원 -->
    <circle cx="12" cy="12" r="9" />
    <!-- 내부 원 -->
    <circle cx="12" cy="12" r="5" />
    <!-- 중심 점 -->
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
</svg>
