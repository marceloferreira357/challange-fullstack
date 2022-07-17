import Module from "@modules/module";

class Core {
    private modules: Map<String, Module>;

    constructor() {
        this.modules = new Map<String, Module>();
    }

    initModules(): void {
        Array.from(this.modules.entries())
            .forEach((entry: [String, Module]) => entry[1].init());
    }

    disposeModules(): void {
        Array.from(this.modules.entries())
            .forEach((entry: [String, Module]) => entry[1].dispose());
    }

    getModule(name: string): Module | undefined {
        return this.modules.get(name);
    }

    addModule(name: string, module: Module) {
        if (!this.modules.has(name)) {
            this.modules.set(name, module);
        } else {
            throw new Error(`Modulo com nome ${name} ja existe!`);
        }
    }
}

const core: Core = new Core();
export default core;