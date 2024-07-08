# **This is the idea next we should iderate over cases how to make this and discuss what we can modify to make thing better for each side**

## Goals
1. Allow on page to load HTML content dynamically by REST API bounded to **sveltekit**,
2. Make this content secure by checking html svelte content toward including script tags (Content cannot),
3. Minimum dependency apparoach (we can make own even complicated in WASM),
4. Minimum code approach - user don't have to make additional lines to use effectively our project

## Example: (by **kotekpsotek**)

1. On a consumer production this should look in this way:
```svelte
    <h1>Hi we're making something really different on a world of frontend</h1>
    <HyperLazy content="general"/> // general -> /hlazy/General.svelte (user can change main folder or add more than one) // Here content is loading from backend after when the basic webpage content has been loaded
    // Additional configuration can be anchored like:
    <HyperLazy content="content_id" behaviour="user_see"/> // Load only when user see behaviour
```

**Description for this above:** The idea is that target user should make a files containing this **content_id** (files with names following specific pattern) and these files have a Svelte code and this svelte code should be delivering by REST API in placed in referring `<HyperLazy/>` element. Example:

# !!How to achieve these orders?
- We can make this through vite-plugin  [Vite Plugin API](https://vitejs.dev/guide/api-plugin)
