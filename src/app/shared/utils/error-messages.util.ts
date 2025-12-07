export function getUserFriendlyErrorMessage(err: any, entityName: string = 'آیتم'): string {
  if (!err || !err.error) {
    return `ذخیره ${entityName} ناموفق بود. لطفاً دوباره تلاش کنید.`;
  }

  const error = err.error;
  
  // Backend now sends user-friendly messages directly in the 'message' field
  // Use it directly if available
  if (error.message && error.message.trim().length > 0) {
    return error.message.trim();
  }
  
  // Fallback: if no message, try to format from errors object
  if (error.errors && Object.keys(error.errors).length > 0) {
    return formatValidationErrors(error.errors, entityName);
  }
  
  // Final fallback
  return `ذخیره ${entityName} ناموفق بود. لطفاً دوباره تلاش کنید.`;
}

function formatValidationErrors(errors: any, entityName: string): string {
  const errorMessages: string[] = [];
  
  for (const [field, messages] of Object.entries(errors)) {
    const fieldName = getFieldDisplayName(field);
    const messageArray = Array.isArray(messages) ? messages : [messages];
    
    for (const msg of messageArray) {
      const friendlyMsg = convertErrorMessage(msg, fieldName);
      errorMessages.push(friendlyMsg);
    }
  }
  
  return errorMessages.join('\n') || `لطفاً فیلدهای فرم را بررسی کنید و دوباره تلاش کنید.`;
}

function getFieldDisplayName(field: string): string {
  const fieldMap: { [key: string]: string } = {
    'name': 'نام',
    'phone': 'شماره تماس',
    'classId': 'شناسه صنف',
    'subject': 'مضمون',
    'fee': 'قیمت',
    'time': 'وقت',
    'teacher': 'استاد',
    'age': 'سن',
    'country': 'کشور',
    'picture': 'عکس',
    'subjects': 'مضامین',
    'student_id': 'شاگرد',
    'class_id': 'صنف',
  };
  
  return fieldMap[field] || field;
}

function convertErrorMessage(message: string, fieldName: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('already been taken') || msg.includes('already exists')) {
    return `${fieldName} از قبل موجود است. لطفاً یکی دیگر انتخاب کنید.`;
  }
  
  if (msg.includes('required')) {
    return `${fieldName} الزامی است.`;
  }
  
  if (msg.includes('must be at least')) {
    return `${fieldName} باید حداقل مقدار مشخص شده باشد.`;
  }
  
  if (msg.includes('must be at most')) {
    return `${fieldName} باید حداکثر مقدار مشخص شده باشد.`;
  }
  
  if (msg.includes('invalid format') || msg.includes('invalid')) {
    return `فرمت ${fieldName} نامعتبر است.`;
  }
  
  if (msg.includes('must be unique')) {
    return `${fieldName} باید منحصر به فرد باشد.`;
  }
  
  // Return original message with field name if it's not a common pattern
  return `${fieldName}: ${message}`;
}

