import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { Student } from '../shared/models/student.model';
import { Class } from '../shared/models/class.model';
import { RegisterStudentPageResponse } from '../shared/models/registration.model';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss',
})
export class RegisterStudentComponent implements OnInit {
  students: Student[] = [];
  classes: Class[] = [];
  registrationForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadRegistrationPage();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      student_id: [null, [Validators.required]],
      class_id: [null, [Validators.required]],
    });
  }

  loadRegistrationPage(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.studentService.registerStudentPage().subscribe({
      next: (response: RegisterStudentPageResponse) => {
        this.students = response.students;
        this.classes = response.classes;
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'Registration');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched();
      this.messageService.warning('لطفاً هم شاگرد و هم صنف را انتخاب کنید');
      return;
    }

    const formData = new FormData();
    formData.append('student_id', String(this.registrationForm.value.student_id));
    formData.append('class_id', String(this.registrationForm.value.class_id));

    this.isLoading = true;
    this.loadingService.show();
    this.studentService.registerStudent(formData).subscribe({
      next: () => {
        this.messageService.success('شاگرد با موفقیت ثبت شد!');
        this.loadingService.hide();
        this.registrationForm.reset();
        this.router.navigate(['/show-students']);
      },
      error: (err) => {
        this.messageService.showError(err, 'Registration');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  markFormGroupTouched() {
    Object.keys(this.registrationForm.controls).forEach((key) => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registrationForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  onCancel() {
    this.router.navigate(['/show-students']);
  }

  // Helper methods for formatted display text
  getClassDisplayText(classItem: Class): string {
    const parts: string[] = [];
    parts.push(`📚 ${classItem.subject}`);
    if (classItem.teacher) {
      parts.push(`👨‍🏫 ${classItem.teacher}`);
    }
    if (classItem.classId && classItem.time) {
      parts.push(`🆔 ${classItem.classId} ⏰ ${classItem.time}`);
    } else if (classItem.classId) {
      parts.push(`🆔 ${classItem.classId}`);
    } else if (classItem.time) {
      parts.push(`⏰ ${classItem.time}`);
    }
    // Add fee/price if available
    if (classItem.fee) {
      const fee = typeof classItem.fee === 'string' ? parseFloat(classItem.fee) : classItem.fee;
      const formattedFee = fee.toLocaleString('en-US');
      parts.push(`💰 ${formattedFee} Af`);
    }
    return parts.join('   •   ');
  }

  getStudentDisplayText(student: Student): string {
    const parts: string[] = [];
    parts.push(`👤 ${student.name}`);
    if (student.phone) {
      parts.push(`📞 ${student.phone}`);
    }
    if (student.age) {
      parts.push(`🎂 ${student.age} سال`);
    }
    return parts.join('   •   ');
  }
}
