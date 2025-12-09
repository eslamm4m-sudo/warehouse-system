// -----------------------------------------------------------------
// وظيفة إظهار/إخفاء لوحات تسجيل الدخول مع إضافة حركة الانتقال للأزرار
// -----------------------------------------------------------------
function showLogin(panelId) {
    const mainSelection = document.getElementById('main-selection');
    const employeePanel = document.getElementById('employee-panel');
    const adminPanel = document.getElementById('admin-panel');

    // 1. إخفاء جميع اللوحات أولاً
    mainSelection.classList.add('hidden');
    employeePanel.classList.add('hidden');
    adminPanel.classList.add('hidden');

    // 2. إدارة حركة الأزرار الرئيسية (.move-up)
    if (panelId === 'main') {
        // إذا كنا في الواجهة الرئيسية: إزالة الحركة وإظهار الأزرار
        mainSelection.classList.remove('move-up'); 
        
        // تأخير بسيط لإظهارها بشكل سليم بعد انتهاء الحركة
        setTimeout(() => {
            mainSelection.classList.remove('hidden');
        }, 300); 

    } else {
        // إذا كنا ننتقل لصفحة تسجيل الدخول: تحريك الأزرار وإخفاؤها
        mainSelection.classList.add('move-up');
    }

    // 3. إظهار اللوحة المطلوبة
    if (panelId === 'employee') {
        employeePanel.classList.remove('hidden');
    } else if (panelId === 'admin') {
        adminPanel.classList.remove('hidden');
    }
}


// -----------------------------------------------------------------
// منطق التحقق من تسجيل الدخول باستخدام ملف users.xlsx
// -----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // إظهار الواجهة الرئيسية عند تحميل الصفحة
    showLogin('main');
    
    const EMPLOYEE_FORM = document.getElementById('employee-form');
    const ADMIN_FORM = document.getElementById('admin-form');

    // دالة معالجة تسجيل الدخول (Fetch & Read XLSX)
    function handleLogin(event, requiredRole) {
        event.preventDefault(); 

        const form = event.target;
        const username = form.elements['username'].value;
        const password = form.elements['password'].value;

        // Fetch the XLSX file
        fetch('users.xlsx')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load users.xlsx file. Check file path.');
                }
                return response.arrayBuffer();
            })
            .then(data => {
                // Read the workbook using SheetJS
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0]; 
                const worksheet = workbook.Sheets[sheetName];

                // Convert sheet to JSON array
                const userData = XLSX.utils.sheet_to_json(worksheet);

                // Verify user credentials
                const foundUser = userData.find(user => 
                    user.Username === username && 
                    String(user.Password) === password && 
                    user.Role === requiredRole 
                );

                if (foundUser) {
                    alert(`تم تسجيل الدخول بنجاح كـ ${foundUser.Role}!`);
                    // TO DO: Redirect the user to the appropriate dashboard page
                    if (requiredRole === 'Employee') {
                        window.location.href = 'employee-dashboard.html'; 
                    } else if (requiredRole === 'Admin') {
                        window.location.href = 'admin-dashboard.html'; 
                    }
                } else {
                    alert('خطأ في اسم المستخدم أو كلمة المرور أو الصلاحيات.');
                }
            })
            .catch(error => {
                console.error('XLSX Reading Error:', error);
                alert('حدث خطأ أثناء تحميل بيانات المستخدمين. الرجاء مراجعة ملف users.xlsx.');
            });
    }

    // ربط الدالة بحدث إرسال النموذج (Submit)
    EMPLOYEE_FORM.addEventListener('submit', (e) => handleLogin(e, 'Employee'));
    ADMIN_FORM.addEventListener('submit', (e) => handleLogin(e, 'Admin'));
});