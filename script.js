// State Architecture
let currentSlide = 1;
const totalSlides = 23;

const slideTitles = [
  "Cover",
  "Team Introduction",
  "Topics",
  "Pengertian & Kategori Baterai",
  "Parameter Baterai",
  "Karakteristik Elemen Aktif",
  "Sejarah Baterai",
  "Baterai ion litium (Li-ion)",
  "Baterai polimer litium (LiPo)",
  "Li-ion vs LiPo: Perbandingan Head-to-Head",
  "Komponen Penyusun Baterai Li-ion",
  "Kondisi Awal Sel Baru",
  "Proses Pengisian (Charging)",
  "Proses Pelepasan (Discharging)",
  "Reaksi Elektrokimia Sel",
  "Metode Pengisian CC",
  "Metode Pengisian CV",
  "Metode Tapper-Current",
  "Metode Pengisian CCCV",
  "Spesifikasi Variasi Katoda",
  "Karakteristik Hambatan Dalam",
  "Kesimpulan",
  "Penutup",
];

// Initialize Presentation Map Bento Grid
function initOverviewGrid() {
  const gridContainer = document.getElementById("bento-grid-items");
  gridContainer.innerHTML = "";
  
  for (let i = 1; i <= totalSlides; i++) {
    const itemHtml = `
      <div class="col">
        <div class="bento-overview-item p-3 w-100 ${i === currentSlide ? 'active-item' : ''}" onclick="jumpToSlide(${i})" id="bento-item-${i}">
          <div>
            <span class="fw-mono text-muted small">#${String(i).padStart(2, '0')}</span>
          </div>
          <div>
            <h6 class="fw-bold mb-1 text-truncate" style="font-size: 13px;">${slideTitles[i-1]}</h6>
            <span class="text-muted d-block" style="font-size: 10px; font-family: var(--font-mono)">Slide ${i}</span>
          </div>
        </div>
      </div>
    `;
    gridContainer.insertAdjacentHTML('beforeend', itemHtml);
  }
}

// Core Toggling Logic
function showSlide(slideIndex) {
  if (slideIndex < 1 || slideIndex > totalSlides) return;
  
  // Update Slide State
  const currentActive = document.querySelector(".slide-section.active");
  if (currentActive) {
    currentActive.classList.remove("active");
  }
  
  const targetSlide = document.getElementById(`slide-${slideIndex}`);
  if (targetSlide) {
    targetSlide.classList.add("active");
  }
  
  currentSlide = slideIndex;
  
  // Update Footer UI Elements
  document.getElementById("pagination-label").textContent = `Slide ${currentSlide} of ${totalSlides}`;
  const percentage = (currentSlide / totalSlides) * 100;
  document.getElementById("progress-bar").style.width = `${percentage}%`;
  
  // Navigation Buttons Limit Toggles
  document.getElementById("prev-btn").disabled = (currentSlide === 1);
  document.getElementById("next-btn").disabled = (currentSlide === totalSlides);
  
  // Sync Overview Grid Highlights
  document.querySelectorAll(".bento-overview-item").forEach((el, idx) => {
    if (idx + 1 === currentSlide) {
      el.classList.add("active-item");
    } else {
      el.classList.remove("active-item");
    }
  });
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    showSlide(currentSlide - 1);
  }
}

function jumpToSlide(index) {
  showSlide(index);
  toggleOverview(false);
}

// Toggle Overview Grid Map Modal
function toggleOverview(show) {
  const modal = document.getElementById("overview-modal");
  if (show) {
    modal.classList.add("show");
  } else {
    modal.classList.remove("show");
  }
}

// Toggle Zen Mode Presentation Viewport
function togglePresentationMode(presenting) {
  if (presenting) {
    document.body.classList.add("presentation-mode");
  } else {
    document.body.classList.remove("presentation-mode");
  }
}

// Accent Tabs Interactivity
function switchAccentTab(tabIdx) {
  const buttons = document.querySelectorAll("#accent-tab-list .btn-accent-tab");
  const panels = document.querySelectorAll("#accent-tab-content-container .accent-tab-panel");
  
  buttons.forEach((btn, idx) => {
    if (idx === tabIdx) {
      btn.classList.add("active-accent-tab", "fw-bold");
      btn.classList.remove("text-muted");
      btn.classList.replace("btn-white", "btn-light");
      btn.classList.replace("border-transparent", "border-dark");
    } else {
      btn.classList.remove("active-accent-tab", "fw-bold");
      btn.classList.add("text-muted");
      btn.classList.replace("btn-light", "btn-white");
      btn.classList.replace("border-dark", "border-transparent");
    }
  });
  
  panels.forEach((panel, idx) => {
    if (idx === tabIdx) {
      panel.classList.add("active-panel");
    } else {
      panel.classList.remove("active-panel");
    }
  });
}

// FAQ Accordion Interactivity
function toggleAccordion(idx) {
  const content = document.getElementById(`acc-content-${idx}`);
  const icon = document.getElementById(`acc-icon-${idx}`);
  
  // Close other accordions
  for (let i = 1; i <= 4; i++) {
    if (i !== idx) {
      document.getElementById(`acc-content-${i}`).classList.remove("show");
      document.getElementById(`acc-icon-${i}`).classList.remove("rotated");
    }
  }
  
  // Toggle targeted accordion
  content.classList.toggle("show");
  icon.classList.toggle("rotated");
}

// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Space" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevSlide();
  } else if (event.key === "Escape") {
    togglePresentationMode(false);
    toggleOverview(false);
  }
});

// Boot Initialization
window.addEventListener("DOMContentLoaded", () => {
  showSlide(1);
  initOverviewGrid();
  // Setup default active states
  switchAccentTab(0);
  toggleAccordion(1);
});
