// Store selected program
let selectedProgram = null;

// Function to handle program selection
function joinProgram(program) {
  selectedProgram = program;
  
  // Remove active class from all cards
  document.querySelectorAll('.join-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Add active class to selected card
  event.currentTarget.classList.add('active');
}

// Function to show join form modal
function showJoinForm() {
  if (!selectedProgram) {
    showModal('Please Select a Program', 'Please select one of the options above before joining.');
    return;
  }
  
  let title = '';
  let message = '';
  
  switch(selectedProgram) {
    case 'volunteer':
      title = 'Volunteer Opportunities';
      message = 'Thank you for your interest in volunteering! You\'ll make a real difference in our community. We\'ll connect you with opportunities that match your skills and passion.';
      break;
    case 'fundraising':
      title = 'Fundraising Challenges';
      message = 'Ready to take on a challenge? Join our fundraising initiatives and help us reach our goals while having fun. Every contribution counts!';
      break;
    case 'ambassador':
      title = 'Campus Ambassador Program';
      message = 'Become a leader on your campus! As an ambassador, you\'ll represent our cause, organize events, and inspire others to make a difference.';
      break;
  }
  
  showModal(title, message);
}

// Function to create and show modal
function showModal(title, message) {
  // Create modal HTML
  const modalHTML = `
    <div id="joinModal" class="modal-overlay">
      <div class="modal-content">
        <span class="modal-close" onclick="closeModal()">&times;</span>
        <h3 class="modal-title">${title}</h3>
        <p class="modal-message">${message}</p>
        <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Trigger animation
  setTimeout(() => {
    document.getElementById('joinModal').classList.add('show');
  }, 10);
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById('joinModal');
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.remove();
  }, 300);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('joinModal');
  if (modal && event.target === modal) {
    closeModal();
  }
});

// Function for member join (you can customize this)
function joinAsMember() {
  // This will be handled by the link navigation
  console.log('Redirecting to member page...');
}