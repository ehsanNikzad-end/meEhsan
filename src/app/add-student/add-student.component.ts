import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { StudentResponse } from '../shared/models/student.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId: number | null = null;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
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
      this.studentId = +id;
      this.loadStudent();
    }
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      picture: [null],
    });
  }

  loadStudent() {
    if (!this.studentId) return;
    this.loadingService.show();
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: StudentResponse) => {
        // Ensure all values are properly set
        this.studentForm.patchValue({
          name: response.name || '',
          age: response.age || null,
          country: response.country || '',
          phone: response.phone || null,
        });
        
        // Mark form as pristine after loading
        this.studentForm.markAsPristine();
        
        if (response.picture) {
          this.imagePreview = `${environment.imageUrl}/students/${response.picture}`;
        }
        this.loadingService.hide();
      },
      error: () => {
        this.messageService.error('بارگذاری اطلاعات شاگرد ناموفق بود');
        this.loadingService.hide();
        this.router.navigate(['/show-students']);
      },
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.messageService.warning('لطفاً یک فایل تصویری معتبر انتخاب کنید');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.warning('حجم عکس باید کمتر از 5 مگابایت باشد');
        return;
      }

      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.studentForm.patchValue({ picture: null });
  }

  onSubmit() {
    // Mark all fields as touched to show validation errors
    this.markFormGroupTouched();
    
    if (this.studentForm.invalid) {
      this.messageService.warning('لطفاً تمام فیلدهای الزامی را به درستی پر کنید');
      return;
    }

    // Get form values directly from form controls to ensure we get the actual values
    const name = this.studentForm.get('name')?.value?.trim() || '';
    const age = this.studentForm.get('age')?.value;
    const country = this.studentForm.get('country')?.value?.trim() || '';
    const phone = this.studentForm.get('phone')?.value ? String(this.studentForm.get('phone')?.value).trim() : '';

    // Validate required fields are not empty
    if (!name || age === null || age === undefined || !country || !phone) {
      this.messageService.warning('لطفاً تمام فیلدهای الزامی را به درستی پر کنید');
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', String(age));
    formData.append('country', country);
    formData.append('phone', phone);

    // Only append picture if a new file is selected
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }


    this.loadingService.show();
    const operation = this.isEditMode
      ? this.studentService.updateStudent(this.studentId!, formData)
      : this.studentService.addStudent(formData);

    operation.subscribe({
      next: () => {
        this.messageService.success(this.isEditMode ? 'شاگرد با موفقیت به‌روزرسانی شد!' : 'شاگرد با موفقیت اضافه شد!');
        this.loadingService.hide();
        this.resetForm();
        this.router.navigate(['/show-students']);
      },
      error: (err) => {
        this.messageService.showError(err, 'Student');
        this.loadingService.hide();
      },
    });
  }

  markFormGroupTouched() {
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm() {
    this.studentForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
    this.isEditMode = false;
    this.studentId = null;
  }

  getFieldError(fieldName: string): string {
    const control = this.studentForm.get(fieldName);
    const fieldNames: { [key: string]: string } = {
      'name': 'نام',
      'age': 'سن',
      'country': 'کشور',
      'phone': 'شماره تماس',
      'picture': 'عکس'
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
      if (control.errors['max']) {
        return `${fieldLabel} باید حداکثر ${control.errors['max'].max} باشد`;
      }
      if (control.errors['pattern']) {
        return `فرمت ${fieldLabel} نامعتبر است`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.studentForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  onCancel() {
    this.router.navigate(['/show-students']);
  }
}
