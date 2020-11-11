import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Endpoints } from '../shared/endpoints/endpoints';
@Injectable({
    providedIn: "root"
})
export class EmpresaService {

    private url = new Endpoints();

    constructor(private http: HttpClient) { }

    getEmpresas(rut, access_token): Observable<any> {

        var token=access_token;
        let uri = `${this.url.url_base}`+`${this.url.access}`+`${rut}`+`${this.url.customers}`
        return this.http.get(uri,
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer '+token)  
        }
        );
        
    }
}
