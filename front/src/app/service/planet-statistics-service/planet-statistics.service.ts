import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PlanetStats} from '../../models/planet-stats';

@Injectable({
	providedIn: 'root'
})
export class PlanetStatsService {
	private api_url: string = "http://localhost:8080/api/planets/stats"

	constructor(private http: HttpClient) {}

	getPlanetStatsById(id: number): Observable<PlanetStats>
	{
		return this.http.get<PlanetStats>(`${this.api_url}/${id}`);
	}
}

