// Simple client-side login logic for demo purposes
(() => {
  const form = document.getElementById('loginForm');
  const identifier = document.getElementById('identifier');
  const password = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const alertPlaceholder = document.getElementById('alertPlaceholder');

  function showAlert(message, type = 'danger'){
    alertPlaceholder.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
  }

  function validateIdentifier(val){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/; // basic international phone
    return emailRegex.test(val) || phoneRegex.test(val);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    alertPlaceholder.innerHTML = '';

    // basic validation
    const idVal = identifier.value.trim();
    const pwVal = password.value;
    let valid = true;

    if(!validateIdentifier(idVal)){
      identifier.classList.add('is-invalid');
      valid = false;
    } else { identifier.classList.remove('is-invalid'); }

    if(pwVal.length < 6){
      password.classList.add('is-invalid');
      valid = false;
    } else { password.classList.remove('is-invalid'); }

    if(!valid) return;

    // simulate server call
    submitBtn.disabled = true;
    const origText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...';

    setTimeout(() => {
      // Mock credentials for demo: user@example.com / password123
      const demoEmail = 'user@example.com';
      const demoPass = 'password123';

      const success = (idVal === demoEmail && pwVal === demoPass);

      if(success){
        localStorage.setItem('foodie_logged_in', '1');
        showAlert('Signed in successfully — redirecting...', 'success');
        // In a real app redirect to dashboard
        setTimeout(()=>{
          // For the demo we just clear the form and show a confirmation state
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
          form.reset();
          alertPlaceholder.innerHTML = `<div class="alert alert-success">Welcome back! You are now signed in.</div>`;
        },800);
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
        showAlert('Invalid credentials. For demo use <strong>user@example.com</strong> / <strong>password123</strong>.', 'danger');
      }
    }, 900);
  });

})();
