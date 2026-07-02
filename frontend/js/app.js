import { getState, initState, updateState } from "./state.js";
import { renderDashboard } from "./views/dashboard.js";
import { renderPlan } from "./views/plan.js";
import { renderVocab } from "./views/vocab.js";
import { renderPractice } from "./views/practice.js";
import { renderNotebook } from "./views/notebook.js";
import { renderMock } from "./views/mock.js";
import { renderSettings } from "./views/settings.js";

const NAV_ITEMS = [
  { id: "dashboard", label: "总览", icon: "📊", render: renderDashboard, mobile: true },
  { id: "plan", label: "计划", icon: "📅", render: renderPlan, mobile: true },
  { id: "vocab", label: "词汇", icon: "📚", render: renderVocab, mobile: true },
  { id: "practice", label: "练习", icon: "🎯", render: renderPractice, mobile: true },
  { id: "notebook", label: "错题本", icon: "❌", render: renderNotebook, mobile: false },
  { id: "mock", label: "模考", icon: "📝", render: renderMock, mobile: false },
  { id: "settings", label: "设置", icon: "⚙️", render: renderSettings, mobile: true },
];

let currentView = "dashboard";

document.addEventListener("DOMContentLoaded", () => {
  initState();
  renderNavigation();
  currentView = getInitialView();
  renderCurrentView();

  window.addEventListener("hashchange", () => {
    currentView = getInitialView();
    updateState({ activeView: currentView });
    renderCurrentView();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(err => {
      console.warn("Service worker registration failed:", err);
    });
  }
});

function getInitialView() {
  const hashView = window.location.hash.replace("#", "");
  const savedView = getState().activeView;
  const candidate = hashView || savedView || "dashboard";
  return NAV_ITEMS.some(item => item.id === candidate) ? candidate : "dashboard";
}

function renderNavigation() {
  const sidebarNav = document.getElementById("sidebarNav");
  const bottomNav = document.getElementById("bottomNavList");

  sidebarNav.innerHTML = NAV_ITEMS.map(item => `
    <li>
      <button class="nav-item" data-nav="${item.id}" type="button">
        <span class="nav-item-icon">${item.icon}</span>
        <span>${item.label}</span>
      </button>
    </li>
  `).join("");

  bottomNav.innerHTML = NAV_ITEMS.filter(item => item.mobile).map(item => `
    <li class="bottomnav-item-wrap">
      <button class="bottomnav-item" data-nav="${item.id}" type="button">
        <span class="nav-icon">${item.icon}</span>
        <span>${item.label}</span>
      </button>
    </li>
  `).join("");

  document.body.addEventListener("click", event => {
    const button = event.target.closest("[data-nav]");
    if (!button) return;
    navigate(button.dataset.nav);
  });
}

function navigate(viewId) {
  if (!NAV_ITEMS.some(item => item.id === viewId)) return;
  if (window.location.hash !== `#${viewId}`) {
    window.location.hash = viewId;
    return;
  }
  currentView = viewId;
  updateState({ activeView: viewId });
  renderCurrentView();
}

function renderCurrentView() {
  const item = NAV_ITEMS.find(nav => nav.id === currentView) || NAV_ITEMS[0];
  const container = document.getElementById("viewContainer");
  const title = document.getElementById("topbarTitle");
  const footer = document.getElementById("sidebarFooter");
  const state = getState();

  title.textContent = item.label;
  footer.innerHTML = `<span class="badge badge-blue">本地优先</span>`;
  setActiveNav(item.id);

  const context = {
    refresh: renderCurrentView,
    navigate,
  };

  container.innerHTML = item.render.html(state);
  item.render.mount?.(container, context);
}

function setActiveNav(viewId) {
  document.querySelectorAll("[data-nav]").forEach(button => {
    button.classList.toggle("active", button.dataset.nav === viewId);
  });
}
