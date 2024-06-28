<script lang="ts">
    import HyperLazyLoad from "$lib/HyperLazyLoad.svelte";
</script>

<div style="height: 150vh; display: flex; alignItems: flex-end;">
    <HyperLazyLoad type="image" src="/img.jpg" baseSrc="/img-com.jpg" props={{class: "flex-end"}}/>
</div>
