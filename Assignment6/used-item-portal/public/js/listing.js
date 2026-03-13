const API = '/api/listings';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('listingDetail');

function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN');
}

function getCategoryIcon(category) {
  if (category === 'car') return '🚗';
  if (category === 'bike') return '🏍️';
  return '📦';
}

async function loadListing() {
  if (!id) {
    container.innerHTML = '<p>Invalid listing ID.</p>';
    return;
  }

  try {
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const item = data.data;
    document.title = `${item.title} | V - Mart`;

    const imgHtml = item.imageUrl
      ? `<img class="detail-img" src="${item.imageUrl}" alt="${item.title}" onerror="this.outerHTML='<div class=detail-img-placeholder>${getCategoryIcon(item.category)}</div>'" />`
      : `<div class="detail-img-placeholder">${getCategoryIcon(item.category)}</div>`;

    const specs = [
      { label: 'Category', value: item.category || '-' },
      { label: 'Brand', value: item.brand || '-' },
      { label: 'Year', value: item.year || '-' },
      { label: 'KM Driven', value: item.kmDriven != null ? item.kmDriven.toLocaleString('en-IN') + ' km' : '-' },
      { label: 'Condition', value: item.condition || '-' },
      { label: 'Fuel Type', value: item.fuelType || '-' },
      { label: 'Location', value: item.location || '-' },
      { label: 'Status', value: item.isSold ? 'Sold' : 'Available' },
    ];

    const specsHtml = specs.map(s => `
      <div class="spec-item">
        <label>${s.label}</label>
        <span>${s.value}</span>
      </div>
    `).join('');

    const postedDate = new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    container.innerHTML = `
      <div class="detail-grid">
        <div>${imgHtml}</div>
        <div class="detail-info">
          <h1>${item.title}</h1>
          <div class="detail-price">${formatPrice(item.price)}</div>
          <div class="detail-specs">${specsHtml}</div>
          <div class="detail-description">
            <h3>Description</h3>
            <p>${item.description}</p>
          </div>
          <div class="seller-card">
            <h3>Seller Details</h3>
            <p>${item.sellerName}</p>
            <p class="contact">${item.sellerContact}</p>
            <p style="font-size:.8rem;color:var(--text-muted);margin-top:.4rem">Posted on ${postedDate}</p>
          </div>
          <div class="detail-actions">
            <a href="/edit-listing.html?id=${item._id}" class="btn-primary">Edit Listing</a>
            <button class="btn-danger" id="deleteBtn">Delete Listing</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('deleteBtn').addEventListener('click', deleteListing);
  } catch (err) {
    container.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}

async function deleteListing() {
  if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return;
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    alert('Listing deleted successfully.');
    window.location.href = '/';
  } catch (err) {
    alert('Failed to delete: ' + err.message);
  }
}

loadListing();
