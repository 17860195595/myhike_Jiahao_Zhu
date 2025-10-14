import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import "/src/styles/style.css";

// Listen for authentication state and show username on main.html
import { onAuthReady } from "./authentication.js";

function initApp() {
  // Only run username logic on main.html
  if (window.location.pathname.endsWith("main.html")) {
    const usernameEl = document.getElementById("username");
    const mainPageAlert = document.getElementById("mainPageLoggedAlert");
    onAuthReady((user) => {
      if (user) {
        const name = user.displayName || user.email || "User";
        if (usernameEl) usernameEl.textContent = name;
        if (mainPageAlert)
          mainPageAlert.classList.remove("d-none"),
            mainPageAlert.classList.add("show");
      } else {
        // Not logged in -> redirect to login page
        if (mainPageAlert)
          mainPageAlert.classList.add("d-none"),
            mainPageAlert.classList.remove("show");
        window.location.href = "index.html";
      }
    });
  }

  // On index.html show a logged-in message when the user is authenticated
  if (
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("index.html")
  ) {
    const loggedMessage = document.getElementById("loggedMessage");
    const navLogged = document.getElementById("navLoggedStatus");
    const pageAlert = document.getElementById("pageLoggedAlert");

    onAuthReady((user) => {
      if (user) {
        if (loggedMessage) loggedMessage.classList.remove("d-none");
        if (navLogged) navLogged.classList.remove("d-none");
        if (pageAlert)
          pageAlert.classList.remove("d-none"), pageAlert.classList.add("show");
      } else {
        if (loggedMessage) loggedMessage.classList.add("d-none");
        if (navLogged) navLogged.classList.add("d-none");
        if (pageAlert)
          pageAlert.classList.add("d-none"), pageAlert.classList.remove("show");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initApp);
