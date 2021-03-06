import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule, NativeScriptHttpClientModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from "./Login/login.component";

import { listarEmpresasComponent } from "./listarEmpresas/listar-empresas.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        HttpClientModule,
        NativeScriptHttpClientModule
        
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        listarEmpresasComponent,
        
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
