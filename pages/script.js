// 🌐 Nepali/English Toggle
function toggleLanguage() {
  const elements = document.querySelectorAll('[data-en][data-ne]');
  elements.forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.ne : el.dataset.en;
  });
}

// 💸 Tier Selection
function selectTier(amount) {
  document.getElementById('customAmount').value = amount;
}

// 🔁 Process Donation
function processDonation() {
  const amount = parseInt(document.getElementById('customAmount').value);
  const recurring = document.querySelector('input[name="recurring"]:checked').value;

  if (!amount || amount < 100) {
    alert("Please enter a valid amount (minimum Rs.100).");
    return;
  }

  const donation = {
    amount,
    recurring,
    date: new Date().toLocaleDateString()
  };

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem('donations') || '[]');
  history.push(donation);
  localStorage.setItem('donations', JSON.stringify(history));

  // Generate QR Code
  const qrText = `https://kindredflame.org/donate?amount=${amount}&recurring=${recurring}`;
  QRCode.toCanvas(document.getElementById('qrCode'), qrText, { width: 200 }, err => {
    if (err) console.error(err);
  });

  alert(`Thank you for your ${recurring} donation of Rs.${amount}!`);
  updateDashboard();
}

// 🧾 Update Donor Dashboard
function updateDashboard() {
  const history = JSON.parse(localStorage.getItem('donations') || '[]');
  const list = document.getElementById('donationHistory');
  const badge = document.getElementById('badgeDisplay');
  list.innerHTML = '';

  let total = 0;
  history.forEach(d => {
    const li = document.createElement('li');
    li.innerText = `${d.date} – Rs.${d.amount} (${d.recurring})`;
    list.appendChild(li);
    total += d.amount;
  });

  // 🧠 Badge Logic
  if (total >= 10000) {
    badge.innerText = '🔥 Wildfire Donor';
  } else if (total >= 3000) {
    badge.innerText = '🔆 Beacon Donor';
  } else if (total >= 500) {
    badge.innerText = '✨ Spark Donor';
  } else {
    badge.innerText = '';
  }
}

// 📊 Impact Chart
const impactCtx = document.getElementById('impactChart')?.getContext('2d');
if (impactCtx) {
  new Chart(impactCtx, {
    type: 'line',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        label: 'Families Helped',
        data: [500, 1200, 2500, 3800, 5400],
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        borderColor: '#FFA500',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#FFA500',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#fff' } },
        title: {
          display: true,
          text: 'Impact Growth Over the Years',
          color: '#fff',
          font: { size: 18 }
        }
      },
      scales: {
        x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        y: { beginAtZero: true, ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
      }
    }
  });
}

// 🧠 Load Dashboard on Page Load
window.onload = updateDashboard;