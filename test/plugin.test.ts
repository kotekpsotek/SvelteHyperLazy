import { describe, test, expect } from "vitest";
import { checkDir, svelteSyntaxParser } from "../src/lib/plugin";
import { join } from "path";

describe("#1 Testing utility functions", () => {
    const fundamentalFolder = "test_dir"
    
    test("Finding Svelte files", () => {
        const path = join(__dirname, fundamentalFolder);
        expect(path.length).toBeGreaterThan(fundamentalFolder.length);
        
        const run = checkDir(path);
        expect(run).toHaveLength(1);
    })

    test("Finding all Hyperlazy tags", () => {
        const path = checkDir(join(__dirname, fundamentalFolder))[0];
        const parsed = svelteSyntaxParser(path);

        expect(parsed.length).toBeGreaterThan(1);
    })
})
