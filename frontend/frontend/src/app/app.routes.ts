import { Routes } from '@angular/router';
import { ProjectListComponent } from './features/projects/pages/project-list/project-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
];
