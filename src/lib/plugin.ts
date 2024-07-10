import { type Plugin, normalizePath } from "vite";
import { readdirSync, lstatSync } from "fs";
import { join, extname } from "path";

type SvelteFilesList = string[]

// TODO: Check syntax by svelte syntax parser as function

/**
 * Checks all units under path under condition if is:
 * * **.svelte file**
 * * **directory**
 * 
 * Returns each encountered Svelte file as array with path to it
 * @param pathToCheck - Location which you'd like to check
 */
function checkDir(pathToCheck: string): SvelteFilesList {
    const srcDir = readdirSync(pathToCheck);
    let filesList: SvelteFilesList = []

    for (const subunit of srcDir) {
        // Check unit is file or directory
        const currentPath = join(pathToCheck, subunit);
        const stat = lstatSync(currentPath);
        
        if (stat.isFile()) {
            if (extname(currentPath) == ".svelte") {
                filesList = [...filesList, currentPath]
            }
        } else if (stat.isDirectory()) {
            filesList = [...filesList, ...checkDir(currentPath)];
        }
    }

    return filesList;
}

export default function svelteHyperLazyPlugin(): Plugin<any> {
    return {
        name: 'svelteHyperLazy-plugin',
        buildStart() {
            const dir = normalizePath(process.cwd());
            
            // Check all svelte files syntax under conditions whether contains "HyperLazy" module name and whether the Svelte file to which
            // ... HyperLazy is refferring exists
            // * Make check only within src directory and all subdirs within
            // * Minimal dependency approach
            const srcDir = join(dir, "src");
            const svelteFiles = checkDir(srcDir);
            console.log(svelteFiles)

            
            console.log("Build finished!")
        }
    }
  }