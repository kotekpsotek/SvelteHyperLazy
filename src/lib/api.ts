export class Identifier {
    id?: number;

    public getNewId() {
        const base = sessionStorage.getItem("lazy#id") || undefined;
        console.log("a1", base)

        if (!base) {
            this.id = 1;
            this.save();

            return this.id;
        }

        this.id = Number(base) + 1;
        this.save()

        return this.id;
    }

    public reset() {
        sessionStorage.removeItem("lazy#id")
    }

    protected save() {
        const id = this.id;
        sessionStorage.setItem("lazy#id", String(id || 0))
    }
}