const validateField = (fieldName, value) => {
    const currentDate = new Date();
    const minDate = new Date('1970-01-01');

    switch (fieldName) {
        case 'emp_id':
            return value ? '' : 'Employee ID is required.';
        case 'name':
            return value ? '' : 'Name is required.';
        case 'email':
            return /\S+@\S+\.\S+/.test(value) ? '' : 'A valid email is required.';
        case 'phone':
            return /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits.';
        case 'dept':
            return value ? '' : 'Department is required.';
        case 'd_join': {
            const enteredDate = new Date(value);
            if (!value) {
                return 'Date of joining is required.';
            } else if (enteredDate > currentDate) {
                return 'Date of joining cannot be in the future.';
            } else if (enteredDate < minDate) {
                return 'Date of joining cannot be before 01-01-1970.';
            } else {
                return '';
            }
        }
        case 'role':
            return value ? '' : 'Role is required.';
        default:
            return '';
    }
};

export const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
};


export default validateField;
