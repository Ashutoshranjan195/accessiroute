// State & Global Scored Routes Cache
window.__scored = [];

// DOM Element References
const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");
const btnFind = document.getElementById("btn-find");
const resultsContainer = document.getElementById("results-container");
const resultsCount = document.getElementById("results-count");

const checkWheelchair = document.getElementById("need-wheelchair");
const checkElderly = document.getElementById("need-elderly");
const checkLowVision = document.getElementById("need-lowvision");

const hcToggle = document.getElementById("hc-toggle");
const modal = document.getElementById("gate-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalContent = document.getElementById("modal-content");
const modalTitle = document.getElementById("modal-title");

// 1. Populate Dropdowns from PLACES
function populateDropdowns() {
  selectFrom.innerHTML = "";
  selectTo.innerHTML = "";

  PLACES.forEach((place, index) => {
    const optFrom = document.createElement("option");
    optFrom.value = place;
    optFrom.textContent = place;
    if (index === 0) optFrom.selected = true;
    selectFrom.appendChild(optFrom);

    const optTo = document.createElement("option");
    optTo.value = place;
    optTo.textContent = place;
    if (index === 1) optTo.selected = true; // Default second place
    selectTo.appendChild(optTo);
  });
}

// 2. Score Route Calculation (0 - 10)
function scoreRoute(route, needs) {
  let score = 0;

  // Base facility points
  if (route.stepFree) score += 3.0;
  if (route.elevator) score += 2.5;
  if (route.lowFloor) score += 2.5;
  if (route.tactile) score += 2.0;

  // Personalized penalty/boost based on user need checks
  if (needs.wheelchair) {
    if (!route.stepFree || !route.elevator) {
      score = Math.max(1.0, score - 3.5);
    } else {
      score = Math.min(10.0, score + 1.0);
    }
  }

  if (needs.elderly) {
    if (!route.lowFloor && !route.elevator) {
      score = Math.max(1.0, score - 2.5);
    }
  }

  if (needs.lowvision) {
    if (!route.tactile) {
      score = Math.max(1.0, score - 3.0);
    } else {
      score = Math.min(10.0, score + 1.0);
    }
  }

  return Math.round(score * 10) / 10;
}

// 3. Find and Render Scored Routes
function findRoutes() {
  const fromVal = selectFrom.value;
  const toVal = selectTo.value;

  // Guard Clause: Same origin and destination
  if (fromVal === toVal) {
    resultsCount.textContent = "0 routes found";
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <p>⚠️ Origin and destination cannot be identical. Please select different transit hubs.</p>
      </div>
    `;
    return;
  }

  const needs = {
    wheelchair: checkWheelchair.checked,
    elderly: checkElderly.checked,
    lowvision: checkLowVision.checked
  };

  // Filter routes by origin & destination (or fallback all matching connected routes)
  let matching = ROUTES.filter(r => r.from === fromVal && r.to === toVal);

  // If no direct corridor exists in demo dataset, show available routes matching origin or general demo corridor
  if (matching.length === 0) {
    matching = ROUTES.filter(r => r.from === fromVal || r.to === toVal);
  }
  if (matching.length === 0) {
    matching = [...ROUTES];
  }

  // Score & Sort descending
  const scored = matching.map(r => ({
    ...r,
    calculatedScore: scoreRoute(r, needs)
  }));

  scored.sort((a, b) => b.calculatedScore - a.calculatedScore);
  window.__scored = scored;

  resultsCount.textContent = `${scored.length} route(s) found`;
  renderCards(scored);
}

// 4. Render Route Cards
function renderCards(routes) {
  resultsContainer.innerHTML = "";

  routes.forEach((route, idx) => {
    let badgeClass = "badge-green";
    if (route.calculatedScore < 4) {
      badgeClass = "badge-red";
    } else if (route.calculatedScore < 7) {
      badgeClass = "badge-amber";
    }

    const card = document.createElement("article");
    card.className = "route-card";
    card.innerHTML = `
      <div class="route-top">
        <div>
          <h3 class="route-mode-title">${route.mode}</h3>
          <p class="route-meta">⏱️ ${route.time} • 💰 ${route.cost} • Route: ${route.from} ➔ ${route.to}</p>
        </div>
        <div class="score-badge ${badgeClass}" aria-label="Accessibility score: ${route.calculatedScore} out of 10">
          ★ ${route.calculatedScore} / 10
        </div>
      </div>

      <div class="tags-cluster">
        <span class="tag ${route.stepFree ? 'tag-yes' : 'tag-no'}">${route.stepFree ? '✓ Step-free' : '✗ No Ramp'}</span>
        <span class="tag ${route.elevator ? 'tag-yes' : 'tag-no'}">${route.elevator ? '✓ Functional Lift' : '✗ No Lift'}</span>
        <span class="tag ${route.lowFloor ? 'tag-yes' : 'tag-no'}">${route.lowFloor ? '✓ Level Boarding' : '✗ High Steps'}</span>
        <span class="tag ${route.tactile ? 'tag-yes' : 'tag-no'}">${route.tactile ? '✓ Tactile Paving' : '✗ No Tactile Path'}</span>
      </div>

      <p class="route-notes">${route.notes}</p>

      <div class="card-actions">
        <button type="button" class="btn btn-secondary" onclick="openGateDetails('${route.id}')">
          📋 View Gate Details
        </button>
        <button type="button" class="btn btn-primary" onclick="readAloudRoute('${route.id}')">
          🔊 Read Aloud
        </button>
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}

// 5. Gate Details Modal
window.openGateDetails = function(routeId) {
  const route = window.__scored.find(r => r.id === routeId);
  if (!route) return;

  modalTitle.textContent = `${route.mode} — Accessibility Gate Audit`;

  const gatesRows = (route.gates || []).map(g => `
    <tr>
      <td><strong>${g.name}</strong></td>
      <td>${g.ramp ? '✅ Yes' : '❌ No'}</td>
      <td>${g.lift ? '✅ Yes' : '❌ No'}</td>
      <td>${g.tactilePath ? '✅ Yes' : '❌ No'}</td>
      <td>${g.status}</td>
    </tr>
  `).join("");

  modalContent.innerHTML = `
    <div>
      <p><strong>Corridor:</strong> ${route.from} ➔ ${route.to}</p>
      <p><strong>Overall Accessibility Rating:</strong> ${route.calculatedScore} / 10</p>
    </div>
    <div>
      <strong>Gate-Level Facility Breakdown:</strong>
      <table class="facility-table">
        <thead>
          <tr>
            <th>Entrance / Gate</th>
            <th>Ramp</th>
            <th>Lift</th>
            <th>Tactile</th>
            <th>Live Status</th>
          </tr>
        </thead>
        <tbody>
          ${gatesRows}
        </tbody>
      </table>
    </div>
    <div>
      <strong>Commuter Recommendation:</strong>
      <p style="margin-top:0.25rem; font-size:0.85rem; color:var(--text-secondary);">${route.notes}</p>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.focus();
};

function closeModal() {
  modal.classList.add("hidden");
}

// 6. Web Speech API (Read Aloud)
window.readAloudRoute = function(routeId) {
  const route = window.__scored.find(r => r.id === routeId);
  if (!route) return;

  if (!("speechSynthesis" in window)) {
    alert("Speech synthesis is not supported on this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const textToRead = `Route option: ${route.mode}. Estimated time: ${route.time}. Cost: ${route.cost}. Accessibility score: ${route.calculatedScore} out of 10. ${route.stepFree ? "This route is step-free." : "Caution: This route contains steps."} ${route.elevator ? "Functional elevators are available." : "No elevator available."} Summary: ${route.notes}`;

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.rate = 1.0;
  utterance.lang = "en-IN";
  window.speechSynthesis.speak(utterance);
};

// 7. Event Listeners & Modals
btnFind.addEventListener("click", findRoutes);

// High Contrast Mode Toggle
hcToggle.addEventListener("click", () => {
  const isHC = document.body.classList.toggle("hc");
  hcToggle.setAttribute("aria-pressed", isHC.toString());
});

// Modal Close Listeners (Button + Backdrop + Escape)
modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// 8. Initial Load
document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  findRoutes();
});
