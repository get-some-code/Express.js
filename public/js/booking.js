// Guest counter functions
let guestCounts = {
  adults: 2,
  children: 0,
  infants: 0
};

function incrementGuests(type) {
  guestCounts[type]++;
  updateGuestDisplay(type);
}

function decrementGuests(type) {
  if (type === 'adults' && guestCounts[type] <= 1) return;
  if (guestCounts[type] > 0) {
    guestCounts[type]--;
    updateGuestDisplay(type);
  }
}

function updateGuestDisplay(type) {
  document.getElementById(`${type}-count`).textContent = guestCounts[type];
  document.getElementById(`${type}-input`).value = guestCounts[type];
}

// Calculate price based on dates
function calculatePrice() {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  
  if (checkin && checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    if (nights > 0) {
      const basePrice = window.ratePerNight * nights;
      const serviceFee = Math.round(basePrice * 0.14);
      const cleaningFee = 500;
      const subtotal = basePrice + serviceFee + cleaningFee;
      const taxes = Math.round(subtotal * 0.12);
      const total = subtotal + taxes;
      
      document.getElementById('nights-display').textContent = nights;
      document.getElementById('nights-plural').textContent = nights > 1 ? 's' : '';
      document.getElementById('base-price').textContent = `₹${basePrice.toLocaleString('en-IN')}`;
      document.getElementById('service-fee').textContent = `₹${serviceFee.toLocaleString('en-IN')}`;
      document.getElementById('taxes').textContent = `₹${taxes.toLocaleString('en-IN')}`;
      document.getElementById('total-price').textContent = `₹${total.toLocaleString('en-IN')}`;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set minimum check-in date to today
  const today = new Date().toISOString().split('T')[0];
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  
  if (checkinInput) {
    checkinInput.setAttribute('min', today);
    
    // Update minimum checkout date when checkin changes
    checkinInput.addEventListener('change', function() {
      const checkinDate = new Date(this.value);
      checkinDate.setDate(checkinDate.getDate() + 1);
      const minCheckout = checkinDate.toISOString().split('T')[0];
      checkoutInput.setAttribute('min', minCheckout);
      calculatePrice();
    });
  }

  if (checkoutInput) {
    checkoutInput.addEventListener('change', calculatePrice);
  }
});