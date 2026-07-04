import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../enviorment/environment';
import { Project } from '../../features/model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  private api = `${environment.apiUrl}/projects`;

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.api);
  }

  createProject(data: Partial<Project>) {
    return this.http.post<Project>(this.api, data);
  }
}
