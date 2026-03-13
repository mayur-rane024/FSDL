const API = '/api/listings';

const grid = document.getElementById('listingsGrid');
const resultsInfo = document.getElementById('resultsInfo');

function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN');
}

function getCategoryIcon(category) {
  if (category === 'car') return '🚗';
  if (category === 'bike') return '🏍️';
  return '📦';
}

function renderCard(item) {
  const badgeClass = `badge-${item.category}`;
  const soldBadge = item.isSold
    ? '<span class="badge badge-sold">Sold</span>'
    : '<span class="badge badge-available">Available</span>';

  const imgHtml = item.imageUrl
    ? `<img class="card-img" src="${item.imageUrl}" alt="${item.title}" onerror="this.parentElement.innerHTML='<div class=card-img-placeholder>${getCategoryIcon(item.category)}</div>'" />`
    : `<div class="card-img-placeholder">${getCategoryIcon(item.category)}</div>`;

  const year = item.year ? `${item.year} · ` : '';
  const km = item.kmDriven != null ? `${item.kmDriven.toLocaleString('en-IN')} km` : '';

  return `
    <div class="card" onclick="window.location='/listing.html?id=${item._id}'">
      ${imgHtml}
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-price">${formatPrice(item.price)}</div>
        <div class="card-meta">
          <span class="badge ${badgeClass}">${item.category}</span>
          <span class="badge badge-condition">${item.condition}</span>
          ${soldBadge}
        </div>
        <div class="card-location">${year}${km}${item.location ? ' · ' + item.location : ''}</div>
      </div>
    </div>
  `;
}

async function fetchListings(params = {}) {
  grid.innerHTML = '<div class="loading">Loading listings...</div>';
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${API}?${query}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    resultsInfo.textContent = `${data.count} listing${data.count !== 1 ? 's' : ''} found`;

    if (data.count === 0) {
      grid.innerHTML = `<div class="empty-state"><h3>No listings found</h3><p>Try adjusting your search filters.</p></div>`;
      return;
    }
    grid.innerHTML = data.data.map(renderCard).join('');
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><h3>Failed to load listings</h3><p>${err.message}</p></div>`;
  }
}

function getFilters() {
  return {
    search: document.getElementById('searchInput').value.trim(),
    category: document.getElementById('categoryFilter').value,
    condition: document.getElementById('conditionFilter').value,
    minPrice: document.getElementById('minPrice').value,
    maxPrice: document.getElementById('maxPrice').value,
  };
}

document.getElementById('searchBtn').addEventListener('click', () => {
  fetchListings(getFilters());
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('conditionFilter').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  fetchListings();
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchListings(getFilters());
});

// Initial load
fetchListings();
