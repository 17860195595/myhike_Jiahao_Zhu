// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "/src/firebaseConfig.js";
import { logoutUser } from "/src/authentication.js";
class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.renderNavbar();
    this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
            <!-- Navbar: single source of truth -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light-brown">
                <div class="container-fluid">
                    <a class="navbar-brand d-flex align-items-center" href="/">
                        <!-- Inline hike/mountain SVG logo -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" class="me-2" aria-hidden="true">
                          <title>Hike logo</title>
                          <path d="M2 20h20L12 4 2 20z" fill="#ffffff" opacity="0.95"></path>
                          <path d="M7 15l2-3 3 4 4-6 3 8H7z" fill="#0d6efd"></path>
                        </svg>
                        <span class="fw-bold text-white">AnyWhereHikes</span>
                    </a>
          <button class="navbar-toggler btn-dark-brown" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                        </ul>
                        <div class="d-flex align-items-center gap-2 ms-lg-2" id="rightControls">
                            <form class="d-flex align-items-center gap-2 my-2 my-lg-0" id="navSearch" role="search">
                <input class="form-control d-none d-sm-block w-auto" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-dark-brown d-none d-sm-inline-block" type="submit">Search</button>
                            </form>
              <!-- small logged-in indicator in navbar -->
              <span id="navLoggedStatus" class="badge bg-success text-white d-none me-2">Logged in</span>
                            <div id="authControls" class="auth-controls d-flex align-items-center gap-2 my-2 my-lg-0">
                                <!-- populated by JS -->
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        `;
  }
  renderAuthControls() {
    const authControls = this.querySelector("#authControls");

    // Initialize with invisible placeholder to maintain layout space
    authControls.innerHTML = `
      <div class="btn btn-dark-brown" style="visibility: hidden; min-width: 80px;">Log out</div>
    `;

    onAuthStateChanged(auth, (user) => {
      let updatedAuthControl;
      if (user) {
        updatedAuthControl = `<button class="btn btn-dark-brown" id="signOutBtn" type="button" style="min-width: 80px;">Log out</button>`;
        authControls.innerHTML = updatedAuthControl;
        const signOutBtn = authControls.querySelector("#signOutBtn");
        signOutBtn?.addEventListener("click", logoutUser);
      } else {
        updatedAuthControl = `<a class="btn btn-dark-brown" id="loginBtn" href="/login.html" style="min-width: 80px; color: #fff;">Log in</a>`;
        authControls.innerHTML = updatedAuthControl;
      }
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
