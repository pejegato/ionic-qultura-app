export class ScanData {
    
    info:string;
    tipo:string;

    constructor(texto:string) {
        this.tipo = 'no definido';
        
        if(texto.startsWith('http')){
            this.tipo = 'http';
            this.info = texto;
        }
    }
}