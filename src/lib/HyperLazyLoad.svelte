<script lang="ts">
    import { onMount } from "svelte";
    import { Identifier } from "./api.js";

    type HTMLElementProperties = { [key: string]: string };
    
    export let type: "video" | "image" = "image";
    export let src: string;
    export let baseSrc: string | false;
    export let props: HTMLElementProperties = {};

    // TODO: Add root "src" load functionality
    let id: void | string = undefined

    function createFullVersionElement(id: string): HTMLVideoElement | HTMLImageElement {
        const same = (el: HTMLVideoElement | HTMLImageElement) => {
            el.setAttribute("data-lid", id);
            el.setAttribute("lz", "Lazy");
            
            // Add all sufficient attributes to defined as props
            if (Object.keys(props).length) {
                for (const entity of Object.entries(props)) {
                    const keyName = entity[0];
                    const value = entity[1] as string;
                    
                    el.setAttribute(keyName, value);
                }
            }
        }
        
        if (type == "video") {
            const vd = document.createElement("video");
            vd.src = src;

            same(vd);

            return vd;
        }
        else {
            const img = document.createElement("img");
            img.src = src;

            same(img);

            return img;
        }
    }

    onMount(() => {
        const identifierInstc = new Identifier();

        // Remove last Identifier when exists
        identifierInstc.reset();
        
        // Root functionality from here to bottom
        id = `lid-${identifierInstc.getNewId()}`;
        let fullElement: HTMLImageElement | HTMLVideoElement = createFullVersionElement(id);
        
        setTimeout(() => {
            const observerObs: IntersectionObserverCallback = (en) => {
                const el1 = en[0];
    
                if (el1.isIntersecting) {
                    const tg = el1.target as HTMLImageElement;     
                                    
                    // Unobserve observed element
                    observer.unobserve(tg);

                    // Replace on new element
                    tg.parentElement?.replaceChild(fullElement, tg);
                    tg.remove();
                }
            }
    
            const elSeek = type == "video" ? "video" : "img";
            const observer = new IntersectionObserver(observerObs)
    
            observer.observe(document.querySelector(`${elSeek}[data-lid="${id}"]`)!)
        })
    });
</script>

{#if type == "video"}
    <video {...props} src="{baseSrc ? baseSrc : ""}" data-lid={id}></video>
{:else}
    <img {...props} src="{baseSrc ? baseSrc : ""}" alt="" data-lid={id}>
{/if}
