import { Component, output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './project-toolbar.component.html',
})
export class ProjectToolbarComponent {
  create = output<void>();

  onCreate() {
    this.create.emit();
  }
}
