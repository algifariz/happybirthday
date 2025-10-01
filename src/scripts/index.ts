import Swal from 'sweetalert2';

const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;

loginForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === 'user' && password === 'user') {
    Swal.fire({
      icon: 'success',
      title: 'Login berhasil!',
      text: 'Selamat datang ayanggg',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = 'birthday.html';
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Login gagal!',
      text: 'Coba cek lagi username sama passwordnya ya:)',
      confirmButtonText: 'Coba lagi',
      confirmButtonColor: '#ff7675',
    });
  }
}