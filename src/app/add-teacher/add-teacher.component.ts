import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { TeacherResponse, Subject } from '../shared/models/teacher.model';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.scss',
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  isEditMode = false;
  teacherId: number | null = null;
  subjects: Subject[] = [];
  selectedSubjectIds: number[] = [];

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
    this.loadSubjects();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.teacherId = +id;
      this.loadTeacher();
    }
  }

  loadSubjects(): void {
    this.teacherService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
      },
      error: (err) => {
        this.messageService.showError(err, 'Subject');
      },
    });
  }

  initForm() {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      subjects: [[], [Validators.required]],
    });
    
    // Custom validator for minimum 1 subject
    this.teacherForm.get('subjects')?.setValidators([
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value || !Array.isArray(value) || value.length < 1) {
          return { minSubjects: { required: 1, actual: Array.isArray(value) ? value.length : 0 } };
        }
        return null;
      }
    ]);
  }

  loadTeacher() {
    if (!this.teacherId) return;
    this.loadingService.show();
    this.teacherService.getTeacherById(this.teacherId).subscribe({
      next: (response: TeacherResponse) => {
        const subjectIds = response.subjects?.map(s => s.id) || [];
        this.teacherForm.patchValue({
          name: response.name,
          phone: response.phone,
          subjects: subjectIds,
        });
        this.selectedSubjectIds = subjectIds;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'Teacher');
        this.loadingService.hide();
        this.router.navigate(['/show-teachers']);
      },
    });
  }

  onSubmit() {
    if (this.teacherForm.invalid) {
      this.markFormGroupTouched();
      this.messageService.warning('لطفاً تمام فیلدهای الزامی را به درستی پر کنید');
      return;
    }

    const formValues = this.teacherForm.value;
    const formData = new FormData();
    formData.append('name', formValues.name.trim());
    formData.append('phone', formValues.phone.trim());
    
    // Add subjects as array
    if (formValues.subjects && formValues.subjects.length > 0) {
      formValues.subjects.forEach((subjectId: number) => {
        formData.append('subjects[]', String(subjectId));
      });
    }

    this.loadingService.show();
    const operation = this.isEditMode
      ? this.teacherService.updateTeacher(this.teacherId!, formData)
      : this.teacherService.addTeacher(formData);

    operation.subscribe({
      next: () => {
        this.messageService.success(this.isEditMode ? 'استاد با موفقیت به‌روزرسانی شد!' : 'استاد با موفقیت اضافه شد!');
        this.loadingService.hide();
        this.resetForm();
        this.router.navigate(['/show-teachers']);
      },
      error: (err) => {
        this.messageService.showError(err, 'Teacher');
        this.loadingService.hide();
      },
    });
  }

  toggleSubject(subjectId: number): void {
    const currentSubjects = [...(this.teacherForm.get('subjects')?.value || [])];
    const index = currentSubjects.indexOf(subjectId);
    
    if (index > -1) {
      currentSubjects.splice(index, 1);
    } else {
      currentSubjects.push(subjectId);
    }
    
    this.teacherForm.patchValue({ subjects: currentSubjects });
    this.selectedSubjectIds = currentSubjects;
    this.teacherForm.get('subjects')?.markAsTouched();
  }

  isSubjectSelected(subjectId: number): boolean {
    return this.selectedSubjectIds.includes(subjectId);
  }

  markFormGroupTouched() {
    Object.keys(this.teacherForm.controls).forEach((key) => {
      const control = this.teacherForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm() {
    this.teacherForm.reset();
    this.selectedSubjectIds = [];
    this.isEditMode = false;
    this.teacherId = null;
  }

  getFieldError(fieldName: string): string {
    const control = this.teacherForm.get(fieldName);
    const fieldNames: { [key: string]: string } = {
      'name': 'نام',
      'phone': 'شماره تماس',
      'subjects': 'مضامین'
    };
    const fieldLabel = fieldNames[fieldName] || fieldName;
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldLabel} الزامی است`;
      }
      if (control.errors['minlength']) {
        return `${fieldLabel} باید حداقل ${control.errors['minlength'].requiredLength} کاراکتر باشد`;
      }
      if (control.errors['pattern']) {
        if (fieldName === 'phone') {
          return 'شماره تماس باید 9 یا 10 رقم باشد';
        }
        return `فرمت ${fieldLabel} نامعتبر است`;
      }
      if (control.errors['minSubjects']) {
        return `لطفاً حداقل ${control.errors['minSubjects'].required} مضمون انتخاب کنید`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.teacherForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  onCancel() {
    this.router.navigate(['/show-teachers']);
  }
}

