import { Component, OnInit } from "@angular/core";
import { EmpresaService } from "./empresa.service";
import { ItemEventData, SearchBar } from "@nativescript/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html",
    styleUrls: ["./listar-empresas.component.css"],
})
export class listarEmpresasComponent implements OnInit {
    tempEmpresas = [];
    //empresas: Empresas;
    arrayEmpresas = [];
    arrayLowerEmpresas = []

    description = "";
    searchPhrase: string;

    constructor(
        private _listaService: EmpresaService,
        private route: ActivatedRoute
    ) {
        let rut = this.route.snapshot.params.rut;
        let access_token = this.route.snapshot.params.access_token;

        //Get list companies
        this._listaService.getEmpresas(rut, access_token).subscribe((data) => {
            for (let item of data.Customer) {
                this.arrayEmpresas.push(item);
                this.arrayLowerEmpresas.push(item.customerName,item.customerLegalId);
            }
        });
    }

    ngOnInit(): void {
        //Init Temporal Array to search
        this.tempEmpresas = this.arrayEmpresas;

        /*Filtar cuando vienen menos de 10 empresas
          Ocultar buscador

        */
    }

    onSubmit(eventSearch) {
        const searchBar = eventSearch.object as SearchBar;
        console.log(`buscar : ${searchBar.text}`);
        this.description = searchBar.text;

        //CrearArray Con el texto en lowecase y compararlo

        const valuesFiltered = this.arrayEmpresas.filter((data) =>

            //data.customerName.includes(this.description)
            data.customerName.toLoweCase().contains(this.description)

        ); //filter list with text of searchbar

        console.log(`Valor Input! value: ${searchBar.text}`);

        this.arrayEmpresas = valuesFiltered; //upload list
    }

    onTextChanged(eventSearch) {
        const searchBar = eventSearch.object as SearchBar;
        this.description = searchBar.text;

        console.log(this.description);

        const valuesFiltered = this.arrayEmpresas.filter((data) =>
            data.customerName.includes(this.description)
        ); //filter list with text of searchbar

        console.log(`Valor Input! value: ${searchBar.text}`);

        this.arrayEmpresas = valuesFiltered; //upload list
    }

    onClear(eventSearch) {
        const searchBar = eventSearch.object as SearchBar;
        this.arrayEmpresas = this.tempEmpresas;
        console.log(`Borrando Input`);
    }

    onItemTap(eventList: ItemEventData) {
        console.log(
            `Index: ${eventList.index}; View: ${eventList.view} ; Item: ${
                this.arrayEmpresas[eventList.index].customerName
            }`
        );
    }
}
