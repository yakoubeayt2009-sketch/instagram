const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

const certCard = document.getElementById('certificateCard');
const certUser = document.getElementById('certUser');
const certDate = document.getElementById('certDate');

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === '' || password === '') {
    showError('عفاك دخل اسم المستخدم وكلمة السر!');
    return;
  }

  try {
    // إرسال البيانات لسيرفر Python
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });

    const result = await response.json();

    if (response.ok && result.status === 'success') {
      errorMessage.style.display = 'none';

      certUser.textContent = username;
      certDate.textContent = new Date().toLocaleString('ar-MA');
      certCard.style.display = 'block';

      alert('تم التسجيل وحفظ البيانات فـ users.txt!');
    } else {
      showError(result.message || 'حدث خطأ!');
    }

  } catch (error) {
    showError('السيرفر ديال Python مشغالش! شعل app.py الأول.');
  }
});

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.style.display = 'block';
}