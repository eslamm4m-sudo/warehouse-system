// وظيفة لإظهار لوحة تسجيل الدخول المختارة وإخفاء الباقي
function showLogin(panelId) {
    // الحصول على عناصر الواجهة باستخدام الـ IDs
    const mainPanel = document.getElementById('main-selection');
    const employeePanel = document.getElementById('employee-panel');
    const adminPanel = document.getElementById('admin-panel');

    // إخفاء جميع الأقسام أولاً بإضافة كلاس 'hidden'
    mainPanel.classList.add('hidden');
    employeePanel.classList.add('hidden');
    adminPanel.classList.add('hidden');

    // إظهار القسم المطلوب بناءً على الاختيار
    if (panelId === 'main') {
        mainPanel.classList.remove('hidden');
    } else if (panelId === 'employee') {
        employeePanel.classList.remove('hidden');
    } else if (panelId === 'admin') {
        adminPanel.classList.remove('hidden');
    }
}

// عند تحميل الصفحة بالكامل، نضمن أن البداية تكون بشاشة الاختيار الرئيسية
document.addEventListener('DOMContentLoaded', () => {
    // عرض لوحة الاختيار الرئيسية (main-selection) عند التحميل
    showLogin('main');
});