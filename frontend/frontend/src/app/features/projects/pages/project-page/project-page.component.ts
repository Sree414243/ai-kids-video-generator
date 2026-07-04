import { Component, inject, signal } from '@angular/core';

import { Project } from '../../../model/project.model';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { ProjectService } from '../../../../core/services/projects.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectToolbarComponent } from '../../components/project-toolbar/project-toolbar.component';
import { ConfirmationService } from 'primeng/api';
import { AppMessageService } from '../../../../core/services/messsage.service';

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
  private confirmationService = inject(ConfirmationService);
  private message = inject(AppMessageService);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly dialogVisible = signal(false);
  readonly selectedProject = signal<Project | null>(null);

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
    this.selectedProject.set(null);
    this.dialogVisible.set(true);
  }

  closeDialog() {
    this.dialogVisible.set(false);
    this.selectedProject.set(null);
  }

  onProjectCreated(project: Project) {
    this.projects.update((list) => [project, ...list]);
    this.closeDialog();
  }

  onProjectUpdated(project: Project) {
    this.projects.update((list) =>
      list.map((item) => (item._id === project._id ? project : item)),
    );
    this.closeDialog();
  }

  confirmDelete(project: Project) {
    this.confirmationService.confirm({
      header: 'Delete project',
      message: `Are you sure you want to delete "${project.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.projectService.deleteProject(project._id).subscribe({
          next: () => {
            this.projects.update((list) =>
              list.filter((item) => item._id !== project._id),
            );
            this.message.success('Project Deleted Successfully');
          },
        });
      },
    });
  }

  onEdit(project: Project) {
    this.selectedProject.set(project);
    this.dialogVisible.set(true);
  }
}
