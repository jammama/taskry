<script>
    export let percentage = 0;
    export let color = "#00f0ff";

    const radius = 30;
    const stroke = 4;
    const circumference = 2 * Math.PI * radius;

    $: dashoffset = circumference - (percentage / 100) * circumference;
</script>

<div class="progress-wrapper">
    <svg height={radius * 2 + 10} width={radius * 2 + 10}>
        <circle
                stroke="rgba(255,255,255,0.1)"
                stroke-width={stroke}
                fill="transparent"
                r={radius}
                cx={radius + 5}
                cy={radius + 5}
        />
        <circle
                class="progress-ring"
                stroke={color}
                stroke-width={stroke}
                fill="transparent"
                r={radius}
                cx={radius + 5}
                cy={radius + 5}
                style="stroke-dasharray: {circumference}; stroke-dashoffset: {dashoffset};"
        />
    </svg>
    <span class="label">{percentage}%</span>
</div>

<style>
    .progress-wrapper { position: relative; display: flex; justify-content: center; align-items: center; }
    .progress-ring {
        transition: stroke-dashoffset 1s ease-in-out;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        filter: drop-shadow(0 0 4px currentColor);
    }
    .label { position: absolute; font-size: 0.8rem; font-weight: bold; }
</style>