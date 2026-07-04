import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ProjectService } from '../../../../core/services/projects.service';
import { AppMessageService } from '../../../../core/services/messsage.service';
import { Project } from '../../../../features/model/project.model';

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
export class ProjectFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private message = inject(AppMessageService);

  @Input() visible = false;
  @Input() project: Project | null = null;

  close = output<void>();
  created = output<Project>();
  updated = output<Project>();

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      if (this.project) {
        this.form.patchValue({
          title: this.project.title,
          description: this.project.description ?? '',
        });
      } else {
        this.form.reset({ title: '', description: '' });
      }
    }
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();

    if (this.project) {
      this.projectService
        .updateProject(this.project._id, payload)
        .subscribe({
          next: (res) => {
            this.updated.emit(res as Project);
            this.message.success('Project Updated Successfully');
            this.form.reset({ title: '', description: '' });
          },
          error: () => {
            this.message.error('Failed to update project');
          },
        });
    } else {
      this.projectService.createProject(payload).subscribe({
        next: (res) => {
          this.created.emit(res);
          this.message.success('Project Created Successfully');
          this.form.reset({ title: '', description: '' });
        },
        error: () => {
          this.message.error('Failed to create project');
        },
      });
    }
  }

  hide() {
    this.close.emit();
    this.form.reset({ title: '', description: '' });
  }
}
