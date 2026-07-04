import { Component, inject, signal } from '@angular/core';

import { Project } from '../../../model/project.model';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { ProjectService } from '../../../../core/services/projects.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectToolbarComponent } from '../../components/project-toolbar/project-toolbar.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  templateUrl: './project-page.component.html',
  imports: [
    ProjectFormComponent,
    ProjectCardComponent,
    ProjectToolbarComponent,
  ],
})
export class ProjectPageComponent {
  private projectService = inject(ProjectService);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly dialogVisible = signal(false);

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  openDialog() {
    this.dialogVisible.set(true);
  }

  closeDialog() {
    this.dialogVisible.set(false);
  }

  onProjectCreated(project: Project) {
    this.projects.update((list) => [project, ...list]);
    this.closeDialog();
  }
}
