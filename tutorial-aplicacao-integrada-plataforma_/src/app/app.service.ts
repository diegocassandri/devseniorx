import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { service, user } from '@seniorsistemas/senior-platform-data';
import { Observable, forkJoin, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class PlatformClient {
    constructor(private http: HttpClient) { }

    getPlatformAPI(api: string): Observable {
        return forkJoin(
            from(service.getRestUrl()),
            from(user.getAuthHeader()),
        ).pipe(mergeMap((values: any) => {
            const [servicesUrl, restUrl, authHeader] = values;
            let headers = new HttpHeaders({
                "Authorization": authHeader
            });
            return this.http.get(`${restUrl}` + api, { headers });
        }));
    }
}

@Injectable()
export class UsuariosService {
    constructor(private client: PlatformClient) { }

    getDadosUsuario(): Observable {
        return this.client.getPlatformAPI('usuarios/userManager/queries/obterMeusDados');
    }
}