## **1st:** Create Vite Plugin which:

(Purpose) Load page content only when necessary from server through REST API

    1st: Analizes the all svelte code located in the customer project (within "src" folder):
        - When in file is detected component named as: HyperLazy with attached content_id, plugin seeks file in directory: project_main/hyperlazy with exact same name
            - When don't exists durning build gonna be warning
    2nd: Creates http server to deliver through rest api the mentioned content_id by reading Svelte file
        - content will be to supply as svelte content, will be rendered on client side
        -  REST API route need to be same for whole HyperLazy functionality but query URL section should change itself: /hyperlazy?cid=filename
    3rd: In HyperLazy is perform call to REST API for content and rendering content from response as svelte
        - Rendering is perform on client side
    4th: After all 3 steps will be achived we should retreat ourselfs to make when content should be loaded. This are proposals:
        1. When user see element placed as indicator of should be loaded here,
        2. When user see element indicated as triger to load another side of page