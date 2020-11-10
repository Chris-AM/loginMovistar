import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class EmpresaService {

    constructor(private http: HttpClient) { }

    getEmpresas(rut, access_token): Observable<any> {

        var token=access_token;
        let uri = `https://apix.movistar.cl/sitecorporate/V1/contact/${rut}/customers`
        return this.http.get(uri,
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer '+token)  
        }
        );
        
    }
}
