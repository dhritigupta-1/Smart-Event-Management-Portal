// App State Management (Version 2.0 - Features Upgrade)
let currentVersion = 'v2.0';
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentCategoryFilter = 'all';
let searchQuery = '';

// Built-in System Admin Account
const SYSTEM_ADMIN = {
  name: 'System Admin',
  email: 'admin@event.com',
  password: 'admin123',
  role: 'admin'
};

// Default Sample Reviews (New in v2)
let defaultReviews = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    rating: '5',
    comment: 'The DevOps Summit was organized flawlessly! Instant ticket delivery and crystal-clear event schedules.',
    date: '2026-07-20'
  },
  {
    id: 2,
    author: 'Marcus Vance',
    rating: '5',
    comment: 'Booking tickets took under 10 seconds. The seat selector and modern interface are top-notch!',
    date: '2026-07-22'
  },
  {
    id: 3,
    author: 'Elena Rostova',
    rating: '4',
    comment: 'Great selection of tech and design summits. Really impressed by the seamless containerized platform.',
    date: '2026-07-25'
  }
];

let userReviews = JSON.parse(localStorage.getItem('userReviews')) || defaultReviews;

// 8 Events across 6 Distinct Categories
let defaultEvents = [
  {
    id: 1,
    title: 'Global AI & Cloud DevOps Summit 2026',
    category: 'tech',
    price: 149,
    seats: 45,
    date: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Cybersecurity & Kubernetes Expo',
    category: 'security',
    price: 199,
    seats: 20,
    date: '2026-10-02',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Neon Pulse Electronic Music Festival',
    category: 'music',
    price: 89,
    seats: 120,
    date: '2026-08-20',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'UI/UX Design Systems Workshop',
    category: 'design',
    price: 75,
    seats: 15,
    date: '2026-09-01',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Fintech Leadership & Startup Forum',
    category: 'business',
    price: 250,
    seats: 30,
    date: '2026-11-10',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Web3 & Decentralized Future Conference',
    category: 'crypto',
    price: 180,
    seats: 50,
    date: '2026-09-28',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    title: 'International Jazz & Symphony Night',
    category: 'music',
    price: 95,
    seats: 80,
    date: '2026-10-15',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    title: 'Creative Branding & Graphic Design Masterclass',
    category: 'design',
    price: 110,
    seats: 25,
    date: '2026-11-05',
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=800&q=80'
  }
];

// Refresh cache for v2
if (!localStorage.getItem('eventsVersion_v2')) {
  localStorage.removeItem('eventsData');
  localStorage.setItem('eventsVersion_v2', 'true');
}

let eventsData = JSON.parse(localStorage.getItem('eventsData')) || defaultEvents;
let userBookings = JSON.parse(localStorage.getItem('userBookings')) || [];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  fetchAppVersion();
  renderUserSession();
  renderEvents();
  renderReviews();
});

// Fetch Version from Express Server Endpoint
async function fetchAppVersion() {
  try {
    const response = await fetch('/api/version');
    const data = await response.json();
    currentVersion = data.version || 'v2.0';
    const badge = document.getElementById('versionBadge');
    if (badge) badge.innerText = currentVersion.toUpperCase();
  } catch (err) {
    console.log('Running standalone mode (v2 default)');
  }
}

// Render Events Grid with Search and Category Filtering (v2)
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';

  let filtered = eventsData.filter(event => {
    const matchesCategory = currentCategoryFilter === 'all' || event.category === currentCategoryFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  document.getElementById('eventCount').innerText = `Showing ${filtered.length} of ${eventsData.length} events`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);" class="glass-panel">
      <p style="font-size: 1.2rem;">🔍 No events found matching "${searchQuery}".</p>
    </div>`;
    return;
  }

  filtered.forEach((event, index) => {
    const card = document.createElement('div');
    card.className = 'event-card glass-panel';
    card.style.animationDelay = `${index * 0.08}s`;
    card.innerHTML = `
      <div class="event-image-wrapper">
        <img src="${event.image}" alt="${event.title}" class="event-image" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'">
        <span class="category-tag ${event.category}">${event.category}</span>
      </div>
      <div class="event-details">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <span>📅 Date: ${event.date}</span>
          <span>🎟️ Available Seats: ${event.seats}</span>
        </div>
        <div class="event-footer">
          <span class="event-price">$${event.price}</span>
          <button class="btn btn-primary" onclick="openBookingModal(${event.id})">Book Tickets</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Search & Filter Logic (v2)
function handleSearch() {
  searchQuery = document.getElementById('searchInput').value;
  renderEvents();
}

function filterCategory(category, pillBtn) {
  currentCategoryFilter = category;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  pillBtn.classList.add('active');
  renderEvents();
}

// Light / Dark Theme Switcher (v2)
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('themeIcon').innerText = newTheme === 'dark' ? '🌙' : '☀️';
}

// Customer Reviews Logic (v2)
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  userReviews.forEach(r => {
    const card = document.createElement('div');
    card.className = 'glass-panel review-card';
    const stars = '⭐'.repeat(parseInt(r.rating));
    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar">${r.author.charAt(0)}</div>
        <div>
          <div class="review-author">${r.author}</div>
          <div class="review-rating">${stars}</div>
        </div>
      </div>
      <p class="review-comment">"${r.comment}"</p>
      <small style="color: var(--text-muted);">${r.date}</small>
    `;
    grid.appendChild(card);
  });
}

function handleAddReview(e) {
  e.preventDefault();
  const author = document.getElementById('reviewAuthorInput').value.trim();
  const rating = document.getElementById('reviewRatingInput').value;
  const comment = document.getElementById('reviewTextInput').value.trim();

  const newReview = {
    id: Date.now(),
    author,
    rating,
    comment,
    date: new Date().toLocaleDateString()
  };

  userReviews.unshift(newReview);
  localStorage.setItem('userReviews', JSON.stringify(userReviews));
  renderReviews();
  closeModal('addReviewModal');
  alert('Thank you! Your review has been published.');
}

// FAQ Accordion Toggle Logic (v2)
function toggleFaq(faqElement) {
  const isActive = faqElement.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    const icon = item.querySelector('.faq-icon');
    if (icon) icon.innerText = '+';
  });

  if (!isActive) {
    faqElement.classList.add('active');
    const icon = faqElement.querySelector('.faq-icon');
    if (icon) icon.innerText = '−';
  }
}

// User Auth Handling
function renderUserSession() {
  const authContainer = document.getElementById('authContainer');
  const userProfile = document.getElementById('userProfile');
  const adminNavBtn = document.getElementById('adminNavBtn');

  if (currentUser) {
    authContainer.classList.add('hidden');
    userProfile.classList.remove('hidden');
    document.getElementById('userName').innerText = `${currentUser.name}`;

    if (currentUser.role === 'admin') {
      adminNavBtn.classList.remove('hidden');
    } else {
      adminNavBtn.classList.add('hidden');
    }
  } else {
    authContainer.classList.remove('hidden');
    userProfile.classList.add('hidden');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;

  if (email === SYSTEM_ADMIN.email) {
    alert('This email is reserved for System Admin! Please login using Admin credentials.');
    closeModal('registerModal');
    openModal('loginModal');
    return;
  }

  const existing = registeredUsers.find(u => u.email === email);
  if (existing) {
    alert('An account with this email already exists! Please login.');
    closeModal('registerModal');
    openModal('loginModal');
    return;
  }

  const newUser = { name, email, password, role: 'user' };
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  alert(`Account registered successfully for ${name}! Please login.`);
  closeModal('registerModal');
  openModal('loginModal');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  if (email === SYSTEM_ADMIN.email && password === SYSTEM_ADMIN.password) {
    currentUser = SYSTEM_ADMIN;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    renderUserSession();
    closeModal('loginModal');
    alert('Welcome System Admin! Admin privileges activated.');
    return;
  }

  const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

  if (!foundUser) {
    alert('Invalid credentials or account not registered! Please register an account first.');
    return;
  }

  currentUser = foundUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  renderUserSession();
  closeModal('loginModal');
  alert(`Welcome back, ${currentUser.name}!`);
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  renderUserSession();
  showSection('eventsSection');
  alert('Logged out successfully.');
}

// Section Switcher with Active Link Highlighting (v2)
function showSection(sectionId, clickedBtn) {
  if (sectionId === 'adminSection') {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('Access Denied: Only Admin can access the Admin Panel!');
      return;
    }
  }

  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(sectionId);
  if (target) target.classList.remove('hidden');

  if (clickedBtn && clickedBtn.classList.contains('nav-link-btn')) {
    document.querySelectorAll('.nav-link-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
  }

  if (sectionId === 'myBookingsSection') renderBookingsList();
  if (sectionId === 'adminSection') renderAdminTable();
  if (sectionId === 'reviewsSection') renderReviews();
}

// Booking Management
let activeBookingEvent = null;

function openBookingModal(eventId) {
  if (!currentUser) {
    openModal('loginModal');
    const loginCard = document.querySelector('#loginModal .modal-card');
    loginCard.classList.remove('shake-modal');
    void loginCard.offsetWidth;
    loginCard.classList.add('shake-modal');
    setTimeout(() => loginCard.classList.remove('shake-modal'), 600);
    return;
  }

  activeBookingEvent = eventsData.find(e => e.id === eventId);
  if (!activeBookingEvent || activeBookingEvent.seats <= 0) {
    alert('Sorry, this event is sold out!');
    return;
  }

  document.getElementById('bookingEventId').value = activeBookingEvent.id;
  document.getElementById('ticketCount').value = 1;
  document.getElementById('bookingSummary').innerHTML = `
    <h4>${activeBookingEvent.title}</h4>
    <p>Price per ticket: <strong>$${activeBookingEvent.price}</strong></p>
  `;
  calculateTotal();
  openModal('bookingModal');
}

function calculateTotal() {
  const count = parseInt(document.getElementById('ticketCount').value) || 1;
  const total = count * activeBookingEvent.price;
  document.getElementById('totalBookingPrice').innerText = `$${total}`;
}

function confirmBooking(e) {
  e.preventDefault();
  const count = parseInt(document.getElementById('ticketCount').value);
  
  if (count > activeBookingEvent.seats) {
    alert('Not enough seats available.');
    return;
  }

  activeBookingEvent.seats -= count;
  localStorage.setItem('eventsData', JSON.stringify(eventsData));

  const bookingRecord = {
    id: Date.now(),
    eventTitle: activeBookingEvent.title,
    tickets: count,
    totalPaid: count * activeBookingEvent.price,
    date: new Date().toLocaleDateString(),
    userEmail: currentUser.email
  };

  userBookings.push(bookingRecord);
  localStorage.setItem('userBookings', JSON.stringify(userBookings));

  renderEvents();
  closeModal('bookingModal');

  document.getElementById('successOverlayMessage').innerText = `You have successfully reserved ${count} ticket(s) for "${activeBookingEvent.title}".`;
  document.getElementById('successOverlay').classList.remove('hidden');
}

function closeSuccessOverlay() {
  document.getElementById('successOverlay').classList.add('hidden');
  showSection('myBookingsSection');
}

function renderBookingsList() {
  const container = document.getElementById('bookingsList');
  container.innerHTML = '';

  const myBookings = userBookings.filter(b => b.userEmail === currentUser.email);

  if (myBookings.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);" class="glass-panel">
      <p style="font-size: 1.2rem;">🎟️ You have no ticket bookings yet.</p>
    </div>`;
    return;
  }

  myBookings.forEach((b, index) => {
    const card = document.createElement('div');
    card.className = 'glass-panel booking-ticket-card';
    card.style.animationDelay = `${index * 0.08}s`;
    card.innerHTML = `
      <div class="booking-ticket-header">
        <span class="booking-badge">Confirmed Ticket</span>
        <span class="booking-id">#${b.id.toString().slice(-6)}</span>
      </div>
      <h3 class="booking-event-title">${b.eventTitle}</h3>
      <div class="booking-details-row">
        <div class="detail-item">
          <span class="detail-label">TICKETS</span>
          <strong class="detail-value">🎟️ ${b.tickets} Ticket(s)</strong>
        </div>
        <div class="detail-item">
          <span class="detail-label">TOTAL PAID</span>
          <strong class="detail-value price-text">$${b.totalPaid}</strong>
        </div>
        <div class="detail-item">
          <span class="detail-label">BOOKED ON</span>
          <span class="detail-value">${b.date}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Admin Operations
function renderAdminTable() {
  if (!currentUser || currentUser.role !== 'admin') return;

  const tbody = document.getElementById('adminEventTable');
  tbody.innerHTML = '';

  eventsData.forEach(event => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${event.title}</strong></td>
      <td><span class="category-tag ${event.category}">${event.category}</span></td>
      <td>${event.date}</td>
      <td>$${event.price}</td>
      <td>${event.seats}</td>
      <td>
        <button class="btn btn-sm btn-outline" style="margin-right: 0.4rem;" onclick="openEditEventModal(${event.id})">✏️ Edit</button>
        <button class="btn btn-sm btn-outline" style="border-color: #ef4444; color: #ef4444;" onclick="deleteEvent(${event.id})">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openAddEventModal() {
  document.getElementById('editEventId').value = '';
  document.getElementById('modalTitleText').innerText = 'Add New Event';
  document.getElementById('eventTitleInput').value = '';
  document.getElementById('eventCategoryInput').value = 'tech';
  document.getElementById('eventPriceInput').value = '';
  document.getElementById('eventSeatsInput').value = '';
  document.getElementById('eventDateInput').value = '';
  document.getElementById('eventImageInput').value = '';
  document.getElementById('saveEventBtn').innerText = 'Create Event';
  openModal('eventModal');
}

function openEditEventModal(id) {
  const eventToEdit = eventsData.find(e => e.id === id);
  if (!eventToEdit) return;

  document.getElementById('editEventId').value = eventToEdit.id;
  document.getElementById('modalTitleText').innerText = 'Edit Event Details';
  document.getElementById('eventTitleInput').value = eventToEdit.title;
  document.getElementById('eventCategoryInput').value = eventToEdit.category;
  document.getElementById('eventPriceInput').value = eventToEdit.price;
  document.getElementById('eventSeatsInput').value = eventToEdit.seats;
  document.getElementById('eventDateInput').value = eventToEdit.date;
  document.getElementById('eventImageInput').value = eventToEdit.image;
  document.getElementById('saveEventBtn').innerText = 'Update Event';
  openModal('eventModal');
}

function handleSaveEvent(e) {
  e.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Access Denied: Only Admin can modify events!');
    return;
  }

  const editId = document.getElementById('editEventId').value;
  const title = document.getElementById('eventTitleInput').value;
  const category = document.getElementById('eventCategoryInput').value;
  const price = parseFloat(document.getElementById('eventPriceInput').value);
  const seats = parseInt(document.getElementById('eventSeatsInput').value);
  const date = document.getElementById('eventDateInput').value;
  const image = document.getElementById('eventImageInput').value || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

  if (editId) {
    const index = eventsData.findIndex(e => e.id == editId);
    if (index !== -1) {
      eventsData[index] = { id: Number(editId), title, category, price, seats, date, image };
      alert('Event updated successfully!');
    }
  } else {
    const newEvent = { id: Date.now(), title, category, price, seats, date, image };
    eventsData.push(newEvent);
    alert('Event created successfully!');
  }

  localStorage.setItem('eventsData', JSON.stringify(eventsData));
  renderEvents();
  renderAdminTable();
  closeModal('eventModal');
}

function deleteEvent(id) {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Access Denied: Only Admin can delete events!');
    return;
  }

  if (confirm('Are you sure you want to delete this event?')) {
    eventsData = eventsData.filter(e => e.id !== id);
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    renderEvents();
    renderAdminTable();
    alert('Event deleted.');
  }
}

// Modal Helpers
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}
