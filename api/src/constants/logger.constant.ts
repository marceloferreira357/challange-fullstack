import log4js from "log4js";

class Logger {
    private instance: log4js.Logger;

    constructor() {
        this.configure();
        this.instance = log4js.getLogger();
    }

    private generateLayout(colored: boolean): {} {
        return {
            type: "pattern",
            pattern: colored
                ? "[%d] %[[%p] - %m%]"
                : "[%d] [%p] - %m"
        }
    }

    private configure(): void {
        log4js.configure({
            appenders: {
                out: { type: "stdout", layout: this.generateLayout(true) },
                app: {
                    type: "dateFile",
                    layout: this.generateLayout(false),
                    filename: "logs/api.log",
                    pattern: "yyyy-MM-dd-hh",
                    compress: true,
                }
            },
            categories: {
                default: { appenders: ["out", "app"], level: "all" }
            },
        });
    }

    shutdown(): void {
        log4js.shutdown();
    }

    getInstance(): log4js.Logger {
        return this.instance;
    }
}

const logger: log4js.Logger = new Logger().getInstance();
export default logger;