import { Component, OnInit } from "@angular/core";
import { ItemEventData, SearchBar } from "@nativescript/core";
import { listaEmpresasService, Item } from "./lista-empresas.service";

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html",
})
export class listarEmpresasComponent implements OnInit {
    public model: any;

    description = "";
    searchPhrase: string;
    items: Array<Item>;

    constructor(private _listaService: listaEmpresasService) {}

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        console.log(`buscar : ${searchBar.text}`);
    }

    onTextChanged(args) {
        const searchBar = args.object as SearchBar;
        this.description = searchBar.text;

        const values = this._listaService.getItems();

        const valuesFiltered = values.filter((word) =>
            word.name.includes(this.description)
        ); //fitter list with text of searchbar

        console.log(`Valor Input! value: ${searchBar.text}`);

        console.log(valuesFiltered);

        this.items = valuesFiltered; //upload list
    }

    onClear(args) {
        const searchBar = args.object as SearchBar;
        console.log(`Borrando Input`);
    }

    ngOnInit(): void {
        this.items = this._listaService.getItems();
    }

    onItemTap(args: ItemEventData) {
        console.log(
            `Index: ${args.index}; View: ${args.view} ; Item: ${
                this.items[args.index].name
            }`
        );
    }
}
