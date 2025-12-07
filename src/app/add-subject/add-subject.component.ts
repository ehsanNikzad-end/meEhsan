import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { Subject } from '../shared/models/teacher.model';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.scss',
})
export class AddSubjectComponent implements OnInit {
  subjectForm!: FormGroup;
  isEditMode = false;
  subjectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.subjectId = +id;
      this.loadSubject();
    }
  }

  initForm() {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  loadSubject() {
    if (!this.subjectId) return;
    this.loadingService.show();
    this.teacherService.getSubjectById(this.subjectId).subscribe({
      next: (response: Subject) => {
        this.subjectForm.patchValue({
          name: response.name,
        });
        this.loadingService.hide();
      },
      error: () => {
        this.messageService.error('بارگذاری اطلاعات مضمون ناموفق بود');
        this.loadingService.hide();
        this.router.navigate(['/show-subjects']);
      },
    });
  }

  onSubmit() {
    if (this.subjectForm.invalid) {
      this.markFormGroupTouched();
      this.messageService.warning('لطفاً تمام فیلدهای الزامی را به درستی پر کنید');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.subjectForm.value.name.trim());

    this.loadingService.show();
    const operation = this.isEditMode
      ? this.teacherService.updateSubject(this.subjectId!, formData)
      : this.teacherService.addSubject(formData);

    operation.subscribe({
      next: () => {
        this.messageService.success(this.isEditMode ? 'مضمون با موفقیت به‌روزرسانی شد!' : 'مضمون با موفقیت اضافه شد!');
        this.loadingService.hide();
        this.resetForm();
        this.router.navigate(['/show-subjects']);
      },
      error: (err) => {
        this.messageService.showError(err, 'مضمون');
        this.loadingService.hide();
      },
    });
  }

  markFormGroupTouched() {
    Object.keys(this.subjectForm.controls).forEach((key) => {
      const control = this.subjectForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm() {
    this.subjectForm.reset();
    this.isEditMode = false;
    this.subjectId = null;
  }

  getFieldError(fieldName: string): string {
    const control = this.subjectForm.get(fieldName);
    const fieldNames: { [key: string]: string } = {
      'name': 'نام مضمون'
    };
    const fieldLabel = fieldNames[fieldName] || fieldName;
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldLabel} الزامی است`;
      }
      if (control.errors['minlength']) {
        return `${fieldLabel} باید حداقل ${control.errors['minlength'].requiredLength} کاراکتر باشد`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.subjectForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  onCancel() {
    this.router.navigate(['/show-subjects']);
  }
}

