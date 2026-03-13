const API = '/api/listings';
const form = document.getElementById('addListingForm');
const msgEl = document.getElementById('formMessage');

function showMessage(text, type) {
  msgEl.textContent = text;
  msgEl.className = `form-message ${type}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgEl.className = 'form-message hidden';

  const formData = new FormData(form);
  const body = {};
  formData.forEach((val, key) => {
    if (val !== '') body[key] = val;
  });

  // Convert numeric fields
  if (body.price) body.price = Number(body.price);
  if (body.year) body.year = Number(body.year);
  if (body.kmDriven) body.kmDriven = Number(body.kmDriven);

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!data.success) {
      showMessage(data.message || 'Failed to create listing.', 'error');
      return;
    }

    showMessage('Listing created successfully! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = `/listing.html?id=${data.data._id}`;
    }, 1200);
  } catch (err) {
    showMessage('Network error: ' + err.message, 'error');
  }
});
