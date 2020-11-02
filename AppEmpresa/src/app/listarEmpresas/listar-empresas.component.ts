import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "@nativescript/core";
import { listaEmpresasService, Item } from "./lista-empresas.service";

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html"
})
export class listarEmpresasComponent implements OnInit {
    items: Array<Item>;

    constructor(private _listaService: listaEmpresasService) { }

    ngOnInit(): void {
        this.items = this._listaService.getItems();
    }

    onItemTap(args: ItemEventData) {
        console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    }
}
