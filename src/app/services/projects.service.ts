import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = environment.API_URL;
  private path = '/projects';

  constructor(private httpService: HttpService) {}

  getProjects() {
    return this.httpService.get(this.apiUrl + this.path);
  }
}
