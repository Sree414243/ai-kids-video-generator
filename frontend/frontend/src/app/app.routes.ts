import { Routes } from '@angular/router';
import { ProjectPageComponent } from './features/projects/pages/project-page/project-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    component: ProjectPageComponent,
  },
];
