import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class listaEmpresasService {

    private items = new Array<Item>(
        { id: 1, name: "x", role: "Goalkeeper" },
        { id: 3, name: "z", role: "Defender" },
        { id: 4, name: "t", role: "Midfielder" },
        { id: 5, name: "3", role: "Midfielder" },
        { id: 6, name: "Da", role: "Midfielder" },
        { id: 7, name: "Ars", role: "Midfielder" },
        { id: 8, name: "A", role: "Midfielder" },
    );

    getItems(): Array<Item> {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter((item) => item.id === id)[0];
    }
}

export class Item {
    constructor(public id: number, public name: string, public role: string) { }
}
