import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ProjectService } from '../../../../core/services/projects.service';
import { AppMessageService } from '../../../../core/services/messsage.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    Dialog,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private message = inject(AppMessageService);

  @Input() visible = false;

  close = output<void>();
  created = output<any>();

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  submit() {
    if (this.form.invalid) return;

    this.projectService.createProject(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.created.emit(res);
        this.message.success('Project Created Successfully');
        this.form.reset();
      },
      error: () => {
        this.message.error('Failed to create project');
      },
    });
  }

  hide() {
    this.close.emit();
  }
}
