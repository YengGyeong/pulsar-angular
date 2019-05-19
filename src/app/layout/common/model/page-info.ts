export class PageInfo {
    pNo: number;
    pSize: number;
    dir: string;
    key: string;

    constructor(pNo: number, pSize:number, dir:string, key:string) {
        this.pNo = pNo;
        this.pSize = pSize;
        this.dir = dir;
        this.key = key;
    }
}