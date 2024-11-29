import { Injectable } from '@angular/core';
import {Planet} from '../../models/planet';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
	private api_url: string = "http://localhost:8080/api/planets"

	constructor(private http: HttpClient) {}

	getPlanets(): Observable<Planet[]>
	{
		return this.http.get<Planet[]>(this.api_url);
	}

	getSmallestPlanet(): Observable<Planet> {
		return this.http.get<Planet[]>(this.api_url).pipe(
			map(planets => planets.reduce((smallest, current) =>
				current.diameter < smallest.diameter ? current : smallest))
		);
	}

	getBiggestPlanet(): Observable<Planet> {
		return this.http.get<Planet[]>(this.api_url).pipe(
			map(planets => planets.reduce((biggest, current) =>
				current.diameter > biggest.diameter ? current : biggest))
		);
	}

	patchPlanet(id: number, planet: Object): Observable<Planet>
	{
		return this.http.patch<Planet>(this.api_url + `/${id}`, planet);
	}

	postPlanet(planet: Object): Observable<Planet>
	{
		return this.http.post<Planet>(this.api_url, planet);
	}
}


