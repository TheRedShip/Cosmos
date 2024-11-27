import { Injectable } from '@angular/core';
import {Planet} from '../models/planet';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
	private api_url: string = "http://localhost:8080/api/"

	constructor(private http: HttpClient) {}

	getPlanets(): Observable<Planet[]>
	{
		return this.http.get<Planet[]>(this.api_url + 'planets');
	}

	getSmallestPlanet(): Observable<Planet> {
		return this.http.get<Planet[]>(this.api_url + 'planets').pipe(
			map(planets => planets.reduce((smallest, current) =>
				current.diameter < smallest.diameter ? current : smallest))
		);
	}

	getBiggestPlanet(): Observable<Planet> {
		return this.http.get<Planet[]>(this.api_url + 'planets').pipe(
			map(planets => planets.reduce((biggest, current) =>
				current.diameter > biggest.diameter ? current : biggest))
		);
	}
}


