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

// Muat i18n module secara dinamis
if (!document.querySelector('script[src*="js/i18n.js"]') && typeof window.i18n === 'undefined') {
    const i18nScript = document.createElement('script');
    i18nScript.src = 'js/i18n.js';
    i18nScript.onload = () => {
        if (window.i18n) window.i18n.applyTranslations();
    };
    document.head.appendChild(i18nScript);
}

// Muat API client secara dinamis (jika belum ada di DOM)
if (!document.querySelector('script[src*="js/api.js"]') && typeof window.apiFetch === 'undefined') {
    const apiScript = document.createElement('script');
    apiScript.src = 'js/api.js';
    document.head.appendChild(apiScript);
}

// Muat Favicon secara dinamis agar muncul di tab browser di semua halaman
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'assets/img/logo-nobg.png';
document.head.appendChild(favicon);


// 1. TOPBAR NAVBAR COMPONENT
class AdminNavbar extends HTMLElement {
    connectedCallback() {
        const currentLang = window.i18n ? window.i18n.getLanguage() : (localStorage.getItem('app_lang') || 'id');
        const langLabel = currentLang === 'en' ? 'English' : 'Indonesia';
        const searchPlaceholder = window.i18n ? window.i18n.t('nav_search_placeholder') : 'Cari sesuatu...';
        const allBranchesText = window.i18n ? window.i18n.t('nav_all_branches') : 'Semua Cabang';
        const settingsText = window.i18n ? window.i18n.t('nav_settings') : 'Settings';
        const activityLogText = window.i18n ? window.i18n.t('nav_activity_log') : 'Activity Log';
        const signOutText = window.i18n ? window.i18n.t('nav_sign_out') : 'Sign Out';

        this.innerHTML = `
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-white">
                <!-- Navbar Brand: logo visible when sidebar is collapsed or on mobile -->
                <a href="dashboard.html" class="navbar-brand navbar-brand-collapsed align-items-center">
                    <img src="assets/img/logo-mylaundry.png" alt="myLaundry" class="navbar-brand-logo-img" style="height: 32px; width: auto; max-width: 150px; object-fit: contain;">
                </a>
                <!-- Sidebar Toggle -->
                <button class="btn btn-link btn-sm ms-2 me-2" id="sidebarToggle" type="button" aria-label="Toggle sidebar">
                    <i class="fas fa-bars" style="color: #0B1739; font-size: 1.15rem;"></i>
                </button>
                
                <!-- Modern Minimalist Search Bar -->
                <div class="header-search-wrapper d-none d-md-block ms-auto me-3">
                    <i class="fas fa-search header-search-icon"></i>
                    <input class="header-search-input" id="searchInput" type="text" placeholder="${searchPlaceholder}" data-i18n-placeholder="nav_search_placeholder" aria-label="Search" />
                </div>
                
                <div class="d-flex align-items-center me-3 me-lg-4 gap-2">
                    <!-- Branch Selector Dropdown (Minimalist, Zero Emoticons) -->
                    <div>
                        <select id="globalBranchSelect" class="form-select form-select-sm header-branch-select" onchange="window.handleBranchChange(this.value)">
                            <option value="">${allBranchesText}</option>
                        </select>
                    </div>

                    <!-- Language Switcher Dropdown (Minimalist, Zero Emoticons) -->
                    <div class="dropdown">
                        <button class="btn btn-sm header-action-btn dropdown-toggle" id="dropdownLang" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-globe text-secondary me-1"></i>
                            <span>${langLabel}</span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end header-dropdown-menu" aria-labelledby="dropdownLang">
                            <li>
                                <a class="dropdown-item d-flex align-items-center justify-content-between py-2 ${currentLang === 'id' ? 'active' : ''}" href="#" onclick="event.preventDefault(); window.i18n.setLanguage('id');">
                                    <span>Bahasa Indonesia</span>
                                    ${currentLang === 'id' ? '<i class="fas fa-check text-primary ms-2"></i>' : ''}
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center justify-content-between py-2 ${currentLang === 'en' ? 'active' : ''}" href="#" onclick="event.preventDefault(); window.i18n.setLanguage('en');">
                                    <span>English</span>
                                    ${currentLang === 'en' ? '<i class="fas fa-check text-primary ms-2"></i>' : ''}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Modern Navbar Profile Avatar Dropdown -->
                    <div class="dropdown">
                        <button class="btn btn-sm header-profile-btn dropdown-toggle" id="navbarDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="User Profile">
                            <i class="fas fa-user text-secondary" style="font-size: 0.95rem;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end header-dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item py-2" href="settings.html" data-i18n="nav_settings">${settingsText}</a></li>
                            <li><a class="dropdown-item py-2" href="activity-log.html" data-i18n="nav_activity_log">${activityLogText}</a></li>
                            <li><hr class="dropdown-divider my-1" /></li>
                            <li><a class="dropdown-item text-danger py-2" href="login.html" onclick="event.preventDefault(); window.showLogoutConfirmation();" data-i18n="nav_sign_out">${signOutText}</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        setTimeout(() => loadBranchSelectorOptions(), 50);
    }
}
customElements.define('admin-navbar', AdminNavbar);


// 2. SIDEBAR COMPONENT
class AdminSidebar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";
        const t = (key, defaultStr) => (window.i18n ? window.i18n.t(key) : defaultStr);

        const menuItems = [
            { key: "menu_dashboard", defaultName: "Dashboard", href: "dashboard.html", icon: "fas fa-tachometer-alt" },
            { key: "menu_orders", defaultName: "Orders", href: "pesanan.html", icon: "fas fa-shopping-basket" },
            { key: "menu_couriers", defaultName: "Couriers", href: "kurir.html", icon: "fas fa-truck-moving" },
            { key: "menu_finance", defaultName: "Keuangan & Setoran", href: "keuangan.html", icon: "fas fa-wallet" },
            { key: "menu_order_history", defaultName: "Order History", href: "riwayat-pesanan.html", icon: "fas fa-history" },
            { key: "menu_products", defaultName: "Products", href: "produk.html", icon: "fas fa-tshirt" },
            { key: "menu_promo", defaultName: "Promo & Voucher", href: "promo.html", icon: "fas fa-tags" },
            { key: "menu_branches", defaultName: "Cabang", href: "cabang.html", icon: "fas fa-store" },
            { key: "menu_reviews", defaultName: "Ulasan & Rating", href: "ulasan.html", icon: "fas fa-star" }
        ];

        const menuListHTML = menuItems.map(item => {
            const isActive = currentPath === item.href || 
                             (item.href === "produk.html" && (currentPath === "tambahkan-produk-baru.html" || currentPath === "edit-produk.html")) ||
                             (item.href === "pesanan.html" && currentPath === "detail-pesanan.html");

            const activeStyle = isActive 
                ? 'background-color: #C2E9F9; border-left: 5px solid #0007B0; font-weight: bold;' 
                : 'background-color: rgb(235, 248, 253); opacity: 0.85;';

            const nameStr = t(item.key, item.defaultName);

            return `
                <div style="${activeStyle}" class="side-nav-menu-bar mb-2">
                    <a class="nav-link" href="${item.href}">
                        <div class="sb-nav-link-icon" style="color: #0B1739;"><i class="${item.icon}"></i></div>
                        <span style="color: #0B1739;" data-i18n="${item.key}">${nameStr}</span>
                    </a>
                </div>
            `;
        }).join('');

        const mainMenuHeading = t('menu_main', 'Main Menu');
        const signOutText = t('menu_sign_out', 'Sign Out');
        const loggedInAsText = t('nav_logged_in_as', 'Logged in as:');

        this.innerHTML = `
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sidebar-brand-header d-flex align-items-center justify-content-between px-3">
                        <a href="dashboard.html" class="d-flex align-items-center text-decoration-none">
                            <img src="assets/img/logo-mylaundry.png" alt="myLaundry" class="sidebar-brand-logo" style="height: 32px; width: auto; max-width: 155px; object-fit: contain;">
                        </a>
                        <button class="btn btn-link btn-sm p-0 d-lg-none" id="sidebarCloseMobile" type="button" aria-label="Close sidebar">
                            <i class="fas fa-times" style="color: #0B1739; font-size: 1.2rem;"></i>
                        </button>
                    </div>

                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading"> 
                                <span style="color: #0B1739;" data-i18n="menu_main">${mainMenuHeading}</span>
                            </div>
                            <hr class="dropdown-divider mx-3" style="margin-top: 0; margin-bottom: 10px;" />
                            
                            ${menuListHTML}

                            <div class="sb-sidenav-menu-heading"></div>
                            
                            <div class="side-nav-menu-bar-keluar">
                                <a class="nav-link" href="login.html" onclick="event.preventDefault(); window.showLogoutConfirmation();">
                                    <div class="sb-nav-link-icon" style="color: #ffffff;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 14 14">
                                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </div>
                                    <span style="color: #ffffff;" data-i18n="menu_sign_out">${signOutText}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small" data-i18n="nav_logged_in_as">${loggedInAsText}</div>
                        <span class="sb-sidenav-footer-user">Loading...</span>
                    </div>
                </nav>
            </div>
        `;

        // Load profile info dynamically from backend
        if (typeof apiFetch === 'function') {
            apiFetch('/auth/me')
                .then(response => {
                    if (response && response.success && response.data) {
                        const user = response.data;
                        const displayName = `${user.username} (${user.role.toUpperCase()})`;
                        const footerText = this.querySelector('.sb-sidenav-footer-user');
                        if (footerText) {
                            footerText.textContent = displayName;
                        }
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch user in sidebar:', err);
                    const footerText = this.querySelector('.sb-sidenav-footer-user');
                    if (footerText) {
                        const savedRole = localStorage.getItem('admin_role') || 'Admin';
                        footerText.textContent = `myLaundry ${savedRole.charAt(0).toUpperCase() + savedRole.slice(1)}`;
                    }
                });
        } else {
            // Immediate fallback to localStorage role if apiFetch is not yet initialized
            const savedRole = localStorage.getItem('admin_role') || 'Admin';
            const footerText = this.querySelector('.sb-sidenav-footer-user');
            if (footerText) {
                footerText.textContent = `myLaundry ${savedRole.charAt(0).toUpperCase() + savedRole.slice(1)}`;
            }
        }

        // Restore sidebar toggle state
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
    const publicPages = ['login.html', 'register.html', 'password.html', 'reset-password.html'];
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
        const form = loginButton.closest('form');
        const alertContainer = document.createElement('div');
        alertContainer.id = 'login-alert';
        alertContainer.style.display = 'none';
        alertContainer.className = 'alert alert-danger p-2 mb-3 text-center';
        alertContainer.style.fontSize = '14px';
        alertContainer.style.borderRadius = '6px';
        if (form) {
            form.insertBefore(alertContainer, form.firstChild);
        }

        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('inputEmail');
            const passwordInput = document.getElementById('inputPassword');
            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                alertContainer.innerText = 'Please enter both email and password!';
                alertContainer.style.display = 'block';
                return;
            }

            // Disable button and show loading state
            loginButton.classList.add('disabled');
            const originalText = loginButton.innerHTML;
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Signing In...';
            alertContainer.style.display = 'none';

            try {
                const response = await apiFetch('/auth/login', {
                    method: 'POST',
                    body: { email, password }
                });

                if (response && response.success && response.data) {
                    if (response.data.role !== 'admin') {
                        alertContainer.innerText = 'Access Denied: Only administrators can access this panel.';
                        alertContainer.style.display = 'block';
                        loginButton.classList.remove('disabled');
                        loginButton.innerHTML = originalText;
                        return;
                    }
                    
                    localStorage.setItem('admin_token', response.data.token);
                    localStorage.setItem('admin_role', response.data.role);
                    window.location.href = 'dashboard.html';
                }
            } catch (err) {
                alertContainer.innerText = err.message || 'Login failed. Please check your credentials.';
                alertContainer.style.display = 'block';
                loginButton.classList.remove('disabled');
                loginButton.innerHTML = originalText;
            }
        });
    }

    // Setup logout confirmation modal & interactions
    setupLogoutConfirmation();
}

// =============================================
// LOGOUT CONFIRMATION MODAL & INTERACTIONS
// =============================================
function ensureLogoutConfirmationModal() {
    if (document.getElementById('logoutConfirmModal')) return;

    const t = (key, fallback) => (window.i18n ? window.i18n.t(key) : fallback);

    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';
    modalDiv.id = 'logoutConfirmModal';
    modalDiv.tabIndex = -1;
    modalDiv.setAttribute('aria-labelledby', 'logoutConfirmModalLabel');
    modalDiv.setAttribute('aria-hidden', 'true');
    modalDiv.style.zIndex = '1090';

    modalDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered" style="max-width: 420px;">
            <div class="modal-content" style="border-radius: 20px; border: none; box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16); overflow: hidden; background: #ffffff;">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 10; font-size: 0.8rem;"></button>
                <div class="modal-body p-4 pt-4 text-center">
                    <!-- Danger / Sign Out Icon Circle -->
                    <div style="width: 58px; height: 58px; border-radius: 50%; background-color: #fef2f2; border: 1px solid #fee2e2; display: flex; align-items: center; justify-content: center; margin: 4px auto 16px;">
                        <i class="fas fa-sign-out-alt" style="color: #dc2626; font-size: 1.35rem; margin-left: 2px;"></i>
                    </div>
                    
                    <!-- Title & Subtitle -->
                    <h5 class="fw-bold mb-2" id="logoutConfirmModalLabel" style="color: #0f172a; font-size: 1.2rem;" data-i18n="modal_logout_title">
                        ${t('modal_logout_title', 'Konfirmasi Keluar')}
                    </h5>
                    <p class="text-muted mb-3" style="font-size: 0.9rem; line-height: 1.5;" data-i18n="modal_logout_desc">
                        ${t('modal_logout_desc', 'Apakah Anda yakin ingin keluar dari sesi admin myLaundry?')}
                    </p>
                    
                    <!-- Admin User Session Preview Card -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 16px; margin-bottom: 22px; display: flex; align-items: center; gap: 12px; text-align: left;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background-color: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div class="fw-bold text-dark text-truncate" id="logoutModalUserText" style="font-size: 0.92rem;">Administrator</div>
                            <div class="text-muted text-truncate" style="font-size: 0.78rem;" data-i18n="modal_logout_warn">
                                ${t('modal_logout_warn', 'Anda perlu masuk kembali untuk mengakses panel administrasi.')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="d-flex gap-2 w-100">
                        <button type="button" class="btn" data-bs-dismiss="modal" style="flex: 1; background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; font-weight: 600; border-radius: 10px; padding: 10px 16px; font-size: 0.9rem; transition: all 0.2s;" data-i18n="btn_cancel">
                            ${t('btn_cancel', 'Batal')}
                        </button>
                        <button type="button" class="btn" id="btnConfirmLogout" style="flex: 1.2; background: #dc2626 !important; border: 1px solid #dc2626 !important; color: #ffffff !important; font-weight: 600 !important; border-radius: 10px !important; padding: 10px 16px !important; font-size: 0.9rem !important; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);">
                            <i class="fas fa-sign-out-alt me-1"></i> <span data-i18n="modal_logout_btn_confirm">${t('modal_logout_btn_confirm', 'Ya, Keluar')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // Attach confirmation click
    const btnConfirm = modalDiv.querySelector('#btnConfirmLogout');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            btnConfirm.classList.add('disabled');
            btnConfirm.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>...';
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_role');
            localStorage.removeItem('selected_branch_id');
            window.location.href = 'login.html';
        });
    }

    if (window.i18n) {
        window.i18n.applyTranslations();
    }
}

window.showLogoutConfirmation = function() {
    ensureLogoutConfirmationModal();

    // Update username preview if available
    const sidebarUser = document.querySelector('.sb-sidenav-footer-user');
    const modalUserText = document.getElementById('logoutModalUserText');
    if (sidebarUser && modalUserText && sidebarUser.textContent.trim() && sidebarUser.textContent.trim() !== 'Loading...') {
        modalUserText.textContent = sidebarUser.textContent.trim();
    }

    const modalEl = document.getElementById('logoutConfirmModal');
    if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
        modalInstance.show();
    }
};

function setupLogoutConfirmation() {
    ensureLogoutConfirmationModal();

    // Event delegation to catch any logout clicks
    document.addEventListener('click', (e) => {
        const logoutTrigger = e.target.closest('a[href="login.html"], [data-action="logout"], [data-i18n="nav_sign_out"], [data-i18n="menu_sign_out"]');
        if (logoutTrigger) {
            const isInsideAuthPage = logoutTrigger.closest('#auth-login-container, .card-footer, form');
            const isInsideAdminLayout = logoutTrigger.closest('admin-navbar, admin-sidebar, #layoutSidenav, #layoutSidenav_nav, .sb-topnav');
            
            if (isInsideAdminLayout || (!isInsideAuthPage && localStorage.getItem('admin_token'))) {
                e.preventDefault();
                e.stopPropagation();
                window.showLogoutConfirmation();
            }
        }
    }, true);
}

window.handleBranchChange = function(val) {
    if (val) {
        localStorage.setItem('selected_branch_id', val);
    } else {
        localStorage.removeItem('selected_branch_id');
    }
    window.location.reload();
};

async function loadBranchSelectorOptions() {
    const select = document.getElementById('globalBranchSelect');
    if (!select) return;

    try {
        const res = await fetch('http://localhost:8083/api/branches');
        const result = await res.json();
        if (res.ok && result.success && Array.isArray(result.data)) {
            const allBranchesText = window.i18n ? window.i18n.t('nav_all_branches') : 'Semua Cabang';
            select.innerHTML = `<option value="">${allBranchesText}</option>` + 
                result.data.map(b => `<option value="${b.id}" ${String(b.id) === String(currentSelected) ? 'selected' : ''}>${b.name}</option>`).join('');
        }
    } catch (_) {}
}

// Run as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        attachSidebarToggle();
        initializeAuthInteractions();
        loadBranchSelectorOptions();
    });
} else {
    attachSidebarToggle();
    initializeAuthInteractions();
    loadBranchSelectorOptions();
}

window.addEventListener('languageChanged', () => {
    if (window.i18n) {
        window.i18n.applyTranslations();
    }
});

// =============================================
// ENTERPRISE ENTITY CODE FORMATTERS
// =============================================
window.formatOrderId = function(id) {
    if (!id && id !== 0) return '-';
    return `#ORD-${String(id).padStart(4, '0')}`;
};

window.formatCourierId = function(id) {
    if (!id && id !== 0) return '-';
    return `#KRR-${String(id).padStart(4, '0')}`;
};

window.formatProductId = function(id) {
    if (!id && id !== 0) return '-';
    return `#PRD-${String(id).padStart(4, '0')}`;
};

window.formatDepositId = function(id) {
    if (!id && id !== 0) return '-';
    return `#DEP-${String(id).padStart(4, '0')}`;
};

