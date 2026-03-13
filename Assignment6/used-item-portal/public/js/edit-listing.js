const API = '/api/listings';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const form = document.getElementById('editListingForm');
const msgEl = document.getElementById('formMessage');

function showMessage(text, type) {
  msgEl.textContent = text;
  msgEl.className = `form-message ${type}`;
}

function setFieldValue(name, value) {
  const el = form.elements[name];
  if (!el || value == null) return;
  el.value = value;
}

async function loadListing() {
  if (!id) { showMessage('No listing ID provided.', 'error'); return; }

  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const item = data.data;
    document.getElementById('cancelBtn').href = `/listing.html?id=${id}`;

    setFieldValue('title', item.title);
    setFieldValue('category', item.category);
    setFieldValue('brand', item.brand);
    setFieldValue('year', item.year);
    setFieldValue('price', item.price);
    setFieldValue('kmDriven', item.kmDriven);
    setFieldValue('condition', item.condition);
    setFieldValue('fuelType', item.fuelType);
    setFieldValue('location', item.location);
    setFieldValue('imageUrl', item.imageUrl);
    setFieldValue('sellerName', item.sellerName);
    setFieldValue('sellerContact', item.sellerContact);
    setFieldValue('description', item.description);
    setFieldValue('isSold', item.isSold ? 'true' : 'false');
  } catch (err) {
    showMessage('Failed to load listing: ' + err.message, 'error');
  }
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
  if (body.isSold !== undefined) body.isSold = body.isSold === 'true';

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!data.success) {
      showMessage(data.message || 'Update failed.', 'error');
      return;
    }

    showMessage('Listing updated successfully! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = `/listing.html?id=${id}`;
    }, 1200);
  } catch (err) {
    showMessage('Network error: ' + err.message, 'error');
  }
});

loadListing();
