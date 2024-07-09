import { type Plugin, normalizePath } from "vite";
import { readdirSync, lstat } from "fs";
import { join } from "path";

/**
 * Checks all units under path under condition if is:
 * * **file**
 * * **directory**
 * 
 * when has encountered **.svelte** file make on it analisis checking svelte syntax whether has **HyperLazy component** and if it is correctly reffered to Svelte file
 * @param pathToCheck - Location which you'd like to check
 */
/** TODO: return array with path to all svelte files */
function checkDir(pathToCheck: string) {
    const srcDir = readdirSync(pathToCheck);

    for (const subunit of srcDir) {
        // Check unit is file or directory
        const currentPath = join(pathToCheck, subunit);
        // TODO: Toward collection files and return them outside this function gonna be synchronous one
        lstat(
            currentPath, 
            (err, stats) => {
                if (err) {
                    console.error(err)
                    return;
                }
                
                if (stats.isFile()) {
                    // TODO: Check file is .svelte one
                    // TODO: Check syntax by svelte syntax parser
                } else if (stats.isDirectory()) {
                    checkDir(currentPath);
                }
            }
        )
    }
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

            checkDir(srcDir);

            
            console.log("Build finished!")
        }
    }
  }