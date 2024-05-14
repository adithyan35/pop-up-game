import { IBalloon } from "./balloon.interface";


const colors =['red','blue','pink','orange','purple','black']

export class Balloon implements IBalloon{
    id:string;
    color:string;
    constructor()  {
        this.id = window.crypto.randomUUID();
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
}