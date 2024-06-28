export class Identifier {
    id?: number;

    public getNewId() {
        const base = sessionStorage.getItem("lazy#id") || undefined;

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
        sessionStorage.setItem("lazy#id", String(this.id || 0))
    }
}