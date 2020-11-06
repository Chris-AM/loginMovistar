import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "@nativescript/core";
import { listaEmpresasService, Item } from "./lista-empresas.service";
import { ItemService } from '../item/item.service'

@Component({
    moduleId: module.id,
    templateUrl: "./listar-empresas.component.html"
})
export class listarEmpresasComponent implements OnInit {
    items: Array<Item>;
    headers:any;
    
    constructor(private _listaService: listaEmpresasService, public json: ItemService) { 

        
      
        this.json.postLoginP1('https://apix.movistar.cl/oauth2/login-app/loginCajetin?apikey=d01d4fb6-de04-4662-9aa9-7a3fa06cb5c6').subscribe((res:any) =>{
            this.items = res;
            console.log(res);
        }, (err:any) =>{
            console.error("error ====>", err);
        })
        
    }

    ngOnInit(): void {
        //this.items = this._listaService.getItems();
    }

    onItemTap(args: ItemEventData) {
        console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    }
}
