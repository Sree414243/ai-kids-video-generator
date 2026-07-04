import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Project } from '../../../model/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  project = input.required<Project>();

  edit = output<Project>();
  delete = output<Project>();

  onDelete() {
    this.delete.emit(this.project());
  }

  onEdit() {
    this.edit.emit(this.project());
  }
}
