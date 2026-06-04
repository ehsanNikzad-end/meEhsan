import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassService } from '../services/class.service';
import { TeacherService } from '../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { ClassResponse } from '../shared/models/class.model';
import { TeacherResponse, Subject } from '../shared/models/teacher.model';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss',
})
export class AddClassComponent implements OnInit {
  classForm!: FormGroup;
  isEditMode = false;
  classId: number | null = null;
  allTeachers: TeacherResponse[] = []; // Store all teachers
  filteredTeachers: TeacherResponse[] = []; // Teachers filtered by selected subject
  subjects: Subject[] = []; // All subjects
  teachersLoaded = false;
  subjectsLoaded = false;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit() {
    // Force fresh data load on component initialization
    this.loadTeachers();
    this.loadSubjects();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.classId = +id;
      this.loadClass();
    }
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        this.allTeachers = response;
        this.teachersLoaded = true;
        
        // If a subject is already selected, re-filter
        const currentSubject = this.classForm.get('subject')?.value;
        if (currentSubject) {
          this.onSubjectChange(currentSubject);
        } else {
          // Initially show all teachers if no subject is selected
          this.filteredTeachers = response;
        }
      },
      error: (err) => {
        this.messageService.showError(err, 'Teacher');
        // Fallback to empty array if API fails
        this.allTeachers = [];
        this.filteredTeachers = [];
        this.teachersLoaded = true;
      },
    });
  }

  loadSubjects(): void {
    this.teacherService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
        this.subjectsLoaded = true;
      },
      error: (err) => {
        this.messageService.showError(err, 'Subject');
        // Fallback to empty array if API fails
        this.subjects = [];
        this.subjectsLoaded = true;
      },
    });
  }

  onSubjectChange(subjectName: string): void {
    if (!subjectName || subjectName === '' || subjectName === null || subjectName === undefined) {
      // No subject selected, show all teachers
      this.filteredTeachers = [...this.allTeachers];
      // Clear teacher selection
      this.classForm.patchValue({ teacher: '' }, { emitEvent: false });
      return;
    }

    // Wait for teachers to be loaded
    if (!this.teachersLoaded || this.allTeachers.length === 0) {
      // Retry after a short delay
      setTimeout(() => {
        if (this.teachersLoaded && this.allTeachers.length > 0) {
          this.onSubjectChange(subjectName);
        }
      }, 100);
      return;
    }

    // Normalize the selected subject name (trim and lowercase for comparison)
    const normalizedSubjectName = String(subjectName).trim().toLowerCase();

    // Filter teachers to only show those who teach the selected subject
    this.filteredTeachers = this.allTeachers.filter((teacher) => {
      if (!teacher.subjects || teacher.subjects.length === 0) {
        return false;
      }
      
      // Check if teacher teaches the selected subject (case-insensitive, trimmed)
      return teacher.subjects.some((subject) => {
        if (!subject || !subject.name) {
          return false;
        }
        const normalizedSubject = String(subject.name).trim().toLowerCase();
        return normalizedSubject === normalizedSubjectName;
      });
    });

    // If current teacher is not in the filtered list, clear it
    const currentTeacher = this.classForm.get('teacher')?.value;
    if (currentTeacher) {
      const teacherStillValid = this.filteredTeachers.some(
        (t) => t.name === currentTeacher
      );
      if (!teacherStillValid) {
        this.classForm.patchValue({ teacher: '' }, { emitEvent: false });
      }
    }
  }

  initForm() {
    this.classForm = this.fb.group({
      classId: ['', [Validators.required, Validators.minLength(1)]],
      subject: ['', [Validators.required, Validators.minLength(2)]],
      fee: [null, [Validators.required, Validators.min(0)]],
      time: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
    });

    // Listen to subject changes and filter teachers
    this.classForm.get('subject')?.valueChanges.subscribe((subjectName) => {
      this.onSubjectChange(subjectName);
    });
  }

  loadClass() {
    if (!this.classId) return;
    this.loadingService.show();
    this.classService.getClassById(this.classId).subscribe({
      next: (response) => {
        // Set subject first to trigger teacher filtering
        this.classForm.patchValue({
          subject: response.subject,
        }, { emitEvent: false });
        
        // Then set other fields
        this.classForm.patchValue({
          classId: response.classId,
          fee: typeof response.fee === 'string' ? parseFloat(response.fee) : response.fee,
          time: response.time,
          teacher: response.teacher,
        });
        
        // Manually trigger subject change to filter teachers
        this.onSubjectChange(response.subject);
        
        this.loadingService.hide();
      },
      error: () => {
        this.messageService.error('بارگذاری اطلاعات صنف ناموفق بود');
        this.loadingService.hide();
        this.router.navigate(['/show-classes']);
      },
    });
  }

  onSubmit() {
    if (this.classForm.invalid) {
      this.markFormGroupTouched();
      this.messageService.warning('لطفاً تمام فیلدهای الزامی را به درستی پر کنید');
      return;
    }

    const formData = new FormData();
    formData.append('classId', this.classForm.value.classId);
    formData.append('subject', this.classForm.value.subject);
    formData.append('fee', String(this.classForm.value.fee));
    formData.append('time', this.classForm.value.time);
    formData.append('teacher', this.classForm.value.teacher);

    this.loadingService.show();
    const operation = this.isEditMode
      ? this.classService.updateClass(this.classId!, formData)
      : this.classService.addClass(formData);

    operation.subscribe({
      next: () => {
        this.messageService.success(this.isEditMode ? 'صنف با موفقیت به‌روزرسانی شد!' : 'صنف با موفقیت اضافه شد!');
        this.loadingService.hide();
        this.resetForm();
        this.router.navigate(['/show-classes']);
      },
      error: (err) => {
        this.messageService.showError(err, 'Class');
        this.loadingService.hide();
      },
    });
  }

  markFormGroupTouched() {
    Object.keys(this.classForm.controls).forEach((key) => {
      const control = this.classForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm() {
    this.classForm.reset();
    this.isEditMode = false;
    this.classId = null;
  }

  getFieldError(fieldName: string): string {
    const control = this.classForm.get(fieldName);
    const fieldNames: { [key: string]: string } = {
      'classId': 'شناسه صنف',
      'subject': 'مضمون',
      'fee': 'قیمت',
      'time': 'وقت',
      'teacher': 'استاد'
    };
    const fieldLabel = fieldNames[fieldName] || fieldName;
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldLabel} الزامی است`;
      }
      if (control.errors['minlength']) {
        return `${fieldLabel} باید حداقل ${control.errors['minlength'].requiredLength} کاراکتر باشد`;
      }
      if (control.errors['min']) {
        return `${fieldLabel} باید حداقل ${control.errors['min'].min} باشد`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.classForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  onCancel() {
    this.router.navigate(['/show-classes']);
  }
}
