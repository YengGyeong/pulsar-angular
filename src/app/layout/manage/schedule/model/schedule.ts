import { ConnectionInterface } from "./connection-interface";

export class Schedule {
    trgId: string;
    trgGroup: string;
    cron: string;
    conInterface: ConnectionInterface;

    public Schedule() {
        this.conInterface = new ConnectionInterface();
    }
}
