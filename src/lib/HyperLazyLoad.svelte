<script lang="ts">
    type HTMLElementProperties = any;
    
    export let type: "video" | "image" = "image";
    export let src: string;
    export let baseSrc: string | false;
    export let props: HTMLElementProperties;

    // TODO: Add root "src" load functionality
</script>

{#if type == "video"}
    <video src="{baseSrc ? baseSrc : ""}"></video>
{:else}
    <img {...props} src="{baseSrc ? baseSrc : ""}" alt="">
{/if}
