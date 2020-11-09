import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "@nativescript/core";
import { EmpresaService} from "./empresa.service";

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html"
})
export class listarEmpresasComponent implements OnInit {
    empresas:[];
    constructor(private _listaService: EmpresaService) { }

    ngOnInit(): void {
        this._listaService.getEmpresas().subscribe(data => {
            this.empresas = data.Customer;
            console.log(data.Customer);
       });
    }
}
