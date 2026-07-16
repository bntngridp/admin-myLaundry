/**
 * myLaundry Admin Web Components & Layout Middleware
 * Handles Navbar, Sidebar, Footer modular Web Components, Route Guard, 
 * and Sidebar Toggle interactions.
 */

// Sembunyikan body segera untuk mencegah kedipan konten (content flash) sebelum dialihkan atau di-render
const hideStyle = document.createElement('style');
hideStyle.id = 'auth-hide-body';
hideStyle.innerHTML = 'body { display: none !important; }';
document.head.appendChild(hideStyle);

// Muat Custom Components stylesheet secara dinamis agar terpisah dari file JavaScript
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = 'css/custom-components.css';
document.head.appendChild(cssLink);


// 1. TOPBAR NAVBAR COMPONENT
class AdminNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-white">
                <!-- Navbar Brand: logo always visible in navbar -->
                <a href="dashboard.html" class="navbar-brand ps-3 d-flex align-items-center">
                    <img src="assets/img/logo-mylaundry.png" alt="myLaundry" style="width: 7rem;">
                </a>
                <!-- Sidebar Toggle -->
                <button class="btn btn-link btn-sm ms-3" id="sidebarToggle" type="button" aria-label="Toggle sidebar">
                    <i class="fas fa-bars" style="color: #0B1739; font-size: 1.25rem;"></i>
                </button>
                <!-- Navbar Search -->
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" id="searchInput" type="text" placeholder="Search..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
                <!-- Navbar Profile Dropdown -->
                <ul class="navbar-nav ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user fa-fw" style="color: #0B1739;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                            <li><a class="dropdown-item" href="activity-log.html">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item text-danger" href="login.html">Sign Out</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        `;
    }
}
customElements.define('admin-navbar', AdminNavbar);


// 2. SIDEBAR COMPONENT
class AdminSidebar extends HTMLElement {
    connectedCallback() {
        // Ambil nama file html saat ini (misal: "produk.html")
        const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";

        // Daftar menu sidebar
        const menuItems = [
            { name: "Dashboard", href: "dashboard.html", icon: "fas fa-tachometer-alt" },
            { name: "Orders", href: "pesanan.html", icon: "fas fa-shopping-basket" },
            { name: "Couriers", href: "kurir.html", icon: "fas fa-truck-moving" },
            { name: "Order History", href: "riwayat-pesanan.html", icon: "fas fa-history" },
            { name: "Products", href: "produk.html", icon: "fas fa-tshirt" }
        ];

        // Buat list HTML menu dengan deteksi menu yang sedang aktif
        const menuListHTML = menuItems.map(item => {
            // Deteksi apakah path saat ini cocok dengan href menu
            const isActive = currentPath === item.href || 
                             (item.href === "produk.html" && (currentPath === "tambahkan-produk-baru.html" || currentPath === "edit-produk.html")) ||
                             (item.href === "pesanan.html" && currentPath === "detail-pesanan.html");

            // Tentukan style berdasarkan status aktif
            const activeStyle = isActive 
                ? 'background-color: #C2E9F9; border-left: 5px solid #0007B0; font-weight: bold;' 
                : 'background-color: rgb(235, 248, 253); opacity: 0.85;';

            return `
                <div style="${activeStyle}" class="side-nav-menu-bar mb-2">
                    <a class="nav-link" href="${item.href}">
                        <div class="sb-nav-link-icon" style="color: #0B1739;"><i class="${item.icon}"></i></div>
                        <span style="color: #0B1739;">${item.name}</span>
                    </a>
                </div>
            `;
        }).join('');

        this.innerHTML = `
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <!-- Sidebar Header with Logo and Mobile Close Button -->
                    <div class="d-flex align-items-center justify-content-between px-3" style="height: 56px; border-bottom: 1px solid #f1f5f9; background-color: #ffffff;">
                        <a href="dashboard.html" class="d-flex align-items-center">
                            <img src="assets/img/logo-mylaundry.png" alt="myLaundry" style="width: 7rem;">
                        </a>
                        <button class="btn btn-link btn-sm p-0 d-lg-none" id="sidebarCloseMobile" type="button" aria-label="Close sidebar">
                            <i class="fas fa-times" style="color: #0B1739; font-size: 1.2rem;"></i>
                        </button>
                    </div>

                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading"> 
                                <span style="color: #0B1739;">Main Menu</span>
                            </div>
                            <hr class="dropdown-divider mx-3" style="margin-top: 0; margin-bottom: 10px;" />
                            
                            <!-- Menu List Dinamis -->
                            ${menuListHTML}

                            <div class="sb-sidenav-menu-heading"></div>
                            
                            <!-- Menu Keluar -->
                            <div class="side-nav-menu-bar-keluar">
                                <a class="nav-link" href="login.html">
                                    <div class="sb-nav-link-icon" style="color: #ffffff;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 14 14">
                                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </div>
                                    <span style="color: #ffffff;">Sign Out</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                        myLaundry Admin
                    </div>
                </nav>
            </div>
        `;

        // Restore sidebar toggle state setelah komponen selesai di-render.
        // Ini penting karena connectedCallback bisa dipanggil sebelum
        // DOMContentLoaded, jadi kita set state di sini agar langsung berlaku.
        const sidebarToggleState = localStorage.getItem('sb|sidebar-toggle');
        if (sidebarToggleState === 'true') {
            document.body.classList.add('sb-sidenav-toggled');
        }
    }
}
customElements.define('admin-sidebar', AdminSidebar);


// 3. FOOTER COMPONENT
class AdminFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; myLaundry 2026</div>
                        <div>
                            <a href="#" style="color: #6c757d; text-decoration: none;">Privacy Policy</a>
                            &middot;
                            <a href="#" style="color: #6c757d; text-decoration: none;">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}
customElements.define('admin-footer', AdminFooter);

// 4. CLIENT-SIDE MIDDLEWARE (ROUTE GUARD)
(function() {
    const publicPages = ['login.html', 'register.html', 'password.html'];
    const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";
    const isPublicPage = publicPages.includes(currentPath);
    
    // Periksa token otentikasi
    const token = localStorage.getItem('admin_token');

    if (!isPublicPage && !token) {
        // Jika masuk halaman privat tanpa login, arahkan ke login.html
        window.location.replace('login.html');
    } else if (isPublicPage && token) {
        // Jika sudah login tetapi mencoba masuk ke halaman auth, arahkan ke dashboard.html
        window.location.replace('dashboard.html');
    } else {
        // Otentikasi valid, hapus filter penyembunyian body setelah DOM siap
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                const style = document.getElementById('auth-hide-body');
                if (style) style.remove();
            });
        } else {
            const style = document.getElementById('auth-hide-body');
            if (style) style.remove();
        }
    }
})();

// =============================================
// SIDEBAR TOGGLE — Bulletproof Implementation
// Uses MutationObserver to watch for the toggle
// button rendered inside Web Components, then
// attaches onclick directly so no event delegation
// chain can break it.
// =============================================
function attachSidebarToggle() {
    const toggleSidebar = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
        const isCollapsed = document.body.classList.contains('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', String(isCollapsed));
    };

    // Restore saved state
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        document.body.classList.add('sb-sidenav-toggled');
    }

    // Attach to buttons if they already exist
    const tryAttach = () => {
        const mainToggle = document.getElementById('sidebarToggle');
        const closeToggle = document.getElementById('sidebarCloseMobile');

        if (mainToggle && !mainToggle.dataset.toggleBound) {
            mainToggle.dataset.toggleBound = 'true';
            mainToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleSidebar();
            });
        }
        if (closeToggle && !closeToggle.dataset.toggleBound) {
            closeToggle.dataset.toggleBound = 'true';
            closeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleSidebar();
            });
        }
    };

    // Run immediately in case elements are already in the DOM
    tryAttach();

    // Watch for Web Components rendering their content asynchronously
    const observer = new MutationObserver(() => {
        tryAttach();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// =============================================
// LOGIN / LOGOUT INTERACTIONS
// =============================================
function initializeAuthInteractions() {
    // Login button
    const loginButton = document.getElementById('btn-masuk');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('admin_token', 'mylaundry-admin-mock-token-12345');
            window.location.href = 'dashboard.html';
        });
    }

    // Logout buttons
    document.querySelectorAll('a[href="login.html"]').forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('admin_token');
        });
    });
}

// Run as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        attachSidebarToggle();
        initializeAuthInteractions();
    });
} else {
    attachSidebarToggle();
    initializeAuthInteractions();
}
