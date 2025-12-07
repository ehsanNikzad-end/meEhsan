# Student Management System

A comprehensive Angular application for managing students, classes, and student-class registrations.

## 🚀 Features

- **Student Management**: Add, edit, view, and delete students
- **Class Management**: Add, edit, view, and delete classes
- **Registration**: Register students to classes
- **Search & Filter**: Real-time search across all entities
- **Pagination**: Efficient data display with pagination
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations
- **Toast Notifications**: Success and error notifications
- **Image Upload**: Student profile picture upload with preview

## 🛠️ Technology Stack

- **Angular**: 19.2.0
- **TypeScript**: 5.7.2
- **Bootstrap**: 5.3.3
- **RxJS**: 7.8.0
- **Standalone Components**: Modern Angular architecture

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI 19.2.4
- Backend API running on `http://localhost:8000`

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   - Update `src/environments/environment.ts` with your API URL if needed

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── shared/           # Shared components, services, models
│   ├── services/         # API services
│   ├── add-student/      # Add/Edit Student component
│   ├── add-class/        # Add/Edit Class component
│   ├── show-students/    # Students list component
│   ├── show-classes/    # Classes list component
│   ├── register-student/# Registration component
│   └── show-registered-students/ # Registered students list
├── environments/         # Environment configuration
└── assets/               # Static assets
```

## 🎯 Key Features

### Student Management
- Add new students with profile picture
- Edit existing students
- View all students with search and pagination
- Delete students

### Class Management
- Add new classes
- Edit existing classes
- View all classes with search and pagination
- Delete classes

### Registration
- Register students to classes
- View all registrations
- Remove students from classes
- Remove students from courses

### UI/UX
- Responsive design with Bootstrap
- Loading indicators
- Toast notifications
- Confirmation modals
- Form validation with error messages
- Search functionality
- Pagination

## 🔌 API Integration

The application expects a backend API running on `http://localhost:8000`. See `BACKEND_REQUIREMENTS.md` for complete API documentation.

### Required Endpoints:
- `POST /api/AddStudent` - Add new student
- `GET /api/ShowStudents` - Get all students
- `PUT /api/UpdateStudent/:id` - Update student
- `DELETE /api/DeleteStudent/:id` - Delete student
- `POST /api/AddClass` - Add new class
- `GET /api/ShowClasses` - Get all classes
- `PUT /api/UpdateClass/:id` - Update class
- `DELETE /api/DeleteClass/:id` - Delete class
- `POST /api/RegisterStudent` - Register student to class
- `GET /api/ShowRegisteredStudents` - Get all registrations
- And more...

## 🏗️ Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

## 📚 Documentation

- **BACKEND_REQUIREMENTS.md**: Complete API documentation for backend integration
- **IMPROVEMENTS_SUMMARY.md**: Detailed list of improvements and features

## 🎨 Code Quality

- ✅ Full TypeScript type safety
- ✅ Reactive forms with validation
- ✅ Proper error handling
- ✅ Memory leak prevention
- ✅ Performance optimizations (OnPush, trackBy)
- ✅ Clean code architecture

## 🚀 Development

### Code Scaffolding
```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name
```

### Linting
```bash
ng lint
```

## 📝 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Version**: 2.0.0  
**Last Updated**: 2024-01-01
