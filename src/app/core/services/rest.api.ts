import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Observable, ObservableInput, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class RestAPIService {
    token?: string;

    constructor(
        private http: HttpClient,
        private keycloak: KeycloakService
    ) {
        this.init();
    }

    async init() {
        this.token = await this.keycloak.getToken();
    }

    get options() {
        return {
            reportProgress: true,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }
    }

    get generic(): string {
        return `${environment.api.uri}/generic`;
    }

    get businessOne(): string {
        return `${environment.api.uri}/business-one`;
    }

    retrieveGeneric(bson: string): Observable<any> {
        return this.http.get(`${this.generic}/${bson}`, this.options);
    }

    retrieveGenericList(): Observable<any> {
        return this.http.get(this.generic, this.options);
    }

    saveGeneric(data: { [key: string]: any }): Observable<any> {
        return this.http.post(this.generic, data, this.options);
    }

    retrieveBusinessOne(bson: string): Observable<any> {
        return this.http.get(`${this.businessOne}/${bson}`, this.options);
    }

    retrieveBusinessOneList(): Observable<any> {
        return this.http.get(this.businessOne, this.options);
    }

    saveBusinessOne(data: { [key: string]: any }): Observable<any> {
        return this.http.post(this.businessOne, data, this.options);
    }

    handleError(err: any, caught: Observable<any>): ObservableInput<any> {
        if (err.status === 401) {

        } else {
            console.log(err/*.error.details*/);
        }
        return of(true);
    }
}