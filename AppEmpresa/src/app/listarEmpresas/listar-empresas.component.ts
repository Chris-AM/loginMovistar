import { Component, OnInit } from "@angular/core";
import { EmpresaService } from "./empresa.service";
import { ItemEventData, SearchBar, Page } from "@nativescript/core";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html",
    styleUrls: ["./listar-empresas.component.css"],
})
export class listarEmpresasComponent implements OnInit {
    tempEmpresas = [];
    //empresas: Empresas;
    arrayEmpresas = [];

    description = "";
    searchPhrase: string;
    name = "";
    lastName = "";

    public search: any;
    public lupa = String.fromCharCode(0xf002);

    constructor(
        private _listaService: EmpresaService,
        private route: ActivatedRoute,
        private page: Page,
        private nav: RouterExtensions
    ) {
        this.nav.navigate(['login.component'], { clearHistory: true });
        let rut = this.route.snapshot.params.rut;
        let access_token = this.route.snapshot.params.access_token;
        this.name = this.route.snapshot.params.name;
        this.lastName = this.route.snapshot.params.lastName;

        //Get list companies
        this._listaService.getEmpresas(rut, access_token).subscribe((data) => {
            for (let item of data.Customer) {
                this.arrayEmpresas.push(item);
            }
        });
    }

    ngOnInit(): void {
        //Init Temporal Array to search
        this.page.actionBarHidden = true;
        this.tempEmpresas = this.arrayEmpresas;

        this.search = this.lupa;
    }

    onSubmit(eventSearch) {
        const searchBar = eventSearch.object as SearchBar;
        console.log(`buscar : ${searchBar.text}`);
    }

    onTextChanged(eventSearch) {
        const searchBar = eventSearch.object as SearchBar;
        this.description = searchBar.text;

        this.description = this.description.toUpperCase();

        if (this.description === "") {
            this.arrayEmpresas = this.tempEmpresas;
        } else {
            const valuesFiltered = this.arrayEmpresas.filter((data) =>
                data.customerName.includes(this.description)
            ); //filter list with text of searchbar

            console.log(`Valor Input! value: ${searchBar.text}`);

            this.arrayEmpresas = valuesFiltered; //upload list
        }
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
