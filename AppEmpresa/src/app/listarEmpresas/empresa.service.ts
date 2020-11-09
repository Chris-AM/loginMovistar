import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class EmpresaService {

    constructor(private http: HttpClient) { }

    getEmpresas(): Observable<any> {

        var token="XMz7jtybpskapXWnoUfat5by4MNlf6VMockxzugViQ6n9nq6V5Wtn2"
        return this.http.get('https://apix.movistar.cl/sitecorporate/V1/contact/127522790/customers',
        {
            headers: new HttpHeaders().set('Authorization', 'Bearer '+token)  
        }
        );
        
    }
}
