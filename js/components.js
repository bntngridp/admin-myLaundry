/**
 * myLaundry Admin Web Components
 * Memodularisasi komponen Navbar, Sidebar, dan Footer agar kode lebih bersih,
 * teratur, dan mudah dikelola (anti-spaghetti).
 */

// Injeksi CSS Modern Overrides untuk meremajakan UI yang tampak jadul
const modernStyles = document.createElement('style');
modernStyles.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    /* Global Font Override */
    body, .sb-nav-fixed, input, button, select, textarea, table, .card-header, h1, h2, h3, h4, h5, h6, .nav-link, .sb-sidenav {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    }

    /* Overrides Card */
    .card {
        border: none !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03) !important;
        border-radius: 14px !important;
        background-color: #ffffff !important;
        overflow: hidden !important;
        margin-bottom: 25px !important;
    }
    .card-header {
        background-color: #ffffff !important;
        border-bottom: 1px solid #f1f5f9 !important;
        padding: 16px 24px !important;
        font-weight: 600 !important;
        color: #0B1739 !important;
    }
    .card-body {
        background-color: #ffffff !important;
        padding: 24px !important;
    }

    /* Overrides Table */
    table.table, #datatablesSimple, .datatable-table {
        border-collapse: separate !important;
        border-spacing: 0 !important;
        width: 100% !important;
        border: none !important;
    }
    table.table th, #datatablesSimple th, .datatable-table th {
        background-color: #f8fafc !important;
        color: #64748b !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        font-size: 0.725rem !important;
        letter-spacing: 0.05em !important;
        padding: 14px 16px !important;
        border-bottom: 1px solid #e2e8f0 !important;
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
    }
    table.table td, #datatablesSimple td, .datatable-table td {
        padding: 16px !important;
        border-bottom: 1px solid #f1f5f9 !important;
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        color: #334155 !important;
        font-size: 0.85rem !important;
        vertical-align: middle !important;
    }
    table.table tbody tr:hover, #datatablesSimple tbody tr:hover, .datatable-table tbody tr:hover {
        background-color: #f8fafc !important;
    }

    /* Badges Status & Tombol Aksi */
    .btn-success, .bg-success, .badge-success {
        background-color: rgba(25, 135, 84, 0.1) !important;
        color: #198754 !important;
        border: 1px solid rgba(25, 135, 84, 0.15) !important;
        font-weight: 600 !important;
        padding: 5px 12px !important;
        border-radius: 30px !important;
        font-size: 0.8rem !important;
        display: inline-block !important;
        text-align: center !important;
    }
    .btn-danger, .bg-danger, .badge-danger {
        background-color: rgba(220, 53, 69, 0.1) !important;
        color: #dc3545 !important;
        border: 1px solid rgba(220, 53, 69, 0.15) !important;
        font-weight: 600 !important;
        padding: 5px 12px !important;
        border-radius: 30px !important;
        font-size: 0.8rem !important;
        display: inline-block !important;
        text-align: center !important;
    }
    .btn-warning, .bg-warning, .badge-warning {
        background-color: rgba(255, 193, 7, 0.1) !important;
        color: #b28900 !important;
        border: 1px solid rgba(255, 193, 7, 0.15) !important;
        font-weight: 600 !important;
        padding: 5px 12px !important;
        border-radius: 30px !important;
        font-size: 0.8rem !important;
        display: inline-block !important;
        text-align: center !important;
    }
    .btn-primary, .bg-primary {
        background-color: #0d6efd !important;
        color: #ffffff !important;
        border: none !important;
        font-weight: 500 !important;
        padding: 6px 16px !important;
        border-radius: 8px !important;
        font-size: 0.85rem !important;
        transition: all 0.2s ease-in-out !important;
    }
    .btn-primary:hover {
        background-color: #0b5ed7 !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15) !important;
    }

    /* Override Tombol di Tabel (Edit / Hapus Ramping) */
    .produk-button-edit, a.btn-success, table .btn-success {
        background-color: rgba(25, 135, 84, 0.1) !important;
        color: #198754 !important;
        border: 1px solid rgba(25, 135, 84, 0.15) !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        padding: 5px 12px !important;
        font-size: 0.8rem !important;
        transition: all 0.2s ease !important;
    }
    .produk-button-edit:hover, a.btn-success:hover, table .btn-success:hover {
        background-color: #198754 !important;
        color: #ffffff !important;
        border-color: #198754 !important;
    }
    .produk-button-hapus, button.btn-danger, table .btn-danger {
        background-color: rgba(220, 53, 69, 0.1) !important;
        color: #dc3545 !important;
        border: 1px solid rgba(220, 53, 69, 0.15) !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        padding: 5px 12px !important;
        font-size: 0.8rem !important;
        transition: all 0.2s ease !important;
    }
    .produk-button-hapus:hover, button.btn-danger:hover, table .btn-danger:hover {
        background-color: #dc3545 !important;
        color: #ffffff !important;
        border-color: #dc3545 !important;
    }

    /* Auth Pages Styling Overrides */
    body.bg-login-password-register {
        background: radial-gradient(circle at 10% 20%, rgba(235, 248, 253, 0.5) 0%, rgba(255, 255, 255, 1) 90%) !important;
        min-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    }
    #layoutAuthentication {
        min-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
    }
    .div-logo {
        text-align: center !important;
        margin-top: 40px !important;
        margin-bottom: 10px !important;
    }
    .logo-laundry {
        width: 9rem !important;
        height: auto !important;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.02)) !important;
    }
    .bg-login-password-register .card {
        border: none !important;
        border-radius: 20px !important;
        box-shadow: 0 15px 35px rgba(11, 23, 57, 0.05) !important;
        background-color: #ffffff !important;
        margin-bottom: 40px !important;
    }
    .bg-login-password-register .card-header {
        background-color: transparent !important;
        border-bottom: none !important;
        padding: 35px 35px 10px 35px !important;
        text-align: center !important;
    }
    .bg-login-password-register .card-header h3 {
        font-weight: 700 !important;
        color: #0B1739 !important;
        font-size: 1.75rem !important;
        letter-spacing: -0.02em !important;
    }
    .bg-login-password-register .card-body {
        padding: 10px 35px 35px 35px !important;
    }
    .bg-login-password-register .card-footer {
        background-color: transparent !important;
        border-top: 1px solid #f1f5f9 !important;
        padding: 20px 35px !important;
    }
    .bg-login-password-register .form-control {
        border-radius: 12px !important;
        border: 1px solid #e2e8f0 !important;
        padding: 14px 16px !important;
        font-size: 0.9rem !important;
        color: #1e293b !important;
        background-color: #f8fafc !important;
        transition: all 0.2s ease-in-out !important;
    }
    .bg-login-password-register .form-control:focus {
        border-color: #0d6efd !important;
        background-color: #ffffff !important;
        box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1) !important;
    }
    .bg-login-password-register .form-floating > label {
        padding-left: 16px !important;
        color: #94a3b8 !important;
    }
    .bg-login-password-register .btn-primary {
        width: 100% !important;
        padding: 12px 24px !important;
        font-size: 0.95rem !important;
        font-weight: 600 !important;
        border-radius: 12px !important;
        background-color: #0d6efd !important;
        border: none !important;
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15) !important;
        transition: all 0.2s ease-in-out !important;
    }
    .bg-login-password-register .btn-primary:hover {
        background-color: #0b5ed7 !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 18px rgba(13, 110, 253, 0.25) !important;
    }
    .bg-login-password-register a.small {
        color: #0d6efd !important;
        text-decoration: none !important;
        font-weight: 500 !important;
        transition: color 0.15s ease !important;
    }
    .bg-login-password-register a.small:hover {
        color: #0b5ed7 !important;
        text-decoration: underline !important;
    }
`;
document.head.appendChild(modernStyles);

// 1. TOPBAR NAVBAR COMPONENT
class AdminNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-white">
                <!-- Navbar Brand-->
                <a id="foto" href="dashboard.html" class="ps-3">
                    <img src="assets/img/logo-mylaundry.png" alt="myLaundry" style="width: 7rem;">
                </a>
                <!-- Sidebar Toggle (diposisikan tepat setelah brand) -->
                <button class="btn btn-link btn-sm ms-3" id="sidebarToggle" type="button" aria-label="Toggle sidebar">
                    <i class="fas fa-bars" style="color: #0B1739;"></i>
                </button>
                <!-- Navbar Search-->
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div class="input-group">
                        <input class="form-control" type="text" placeholder="Cari..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button class="btn btn-primary" id="btnNavbarSearch" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
                <!-- Navbar Profile Dropdown-->
                <ul class="navbar-nav ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user fa-fw" style="color: #0B1739;"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="404.html">Settings</a></li>
                            <li><a class="dropdown-item" href="404.html">Activity Log</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item text-danger" href="login.html">Logout</a></li>
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
            { name: "Pesanan", href: "pesanan.html", icon: "fas fa-shopping-basket" },
            { name: "Kurir", href: "kurir.html", icon: "fas fa-truck-moving" },
            { name: "Riwayat Pesanan", href: "riwayat-pesanan.html", icon: "fas fa-history" },
            { name: "Produk", href: "produk.html", icon: "fas fa-tshirt" }
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
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading"> 
                                <span style="color: #0B1739;">Menu Utama</span>
                            </div>
                            <hr class="dropdown-divider mx-3" />
                            
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
                                    <span style="color: #ffffff;">Keluar</span>
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
        window.location.href = 'login.html';
    }
})();

// Penanganan interaktif untuk simulasi Login dan Logout
document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // FIX: Hamburger Toggle — dipasang di sini (setelah Web
    // Component sudah selesai di-render ke dalam DOM) agar
    // #sidebarToggle sudah ada saat event listener dipasang.
    // =========================================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Restore state sidebar dari localStorage saat halaman dimuat
    const sidebarToggleState = localStorage.getItem('sb|sidebar-toggle');
    if (sidebarToggleState === 'true') {
        document.body.classList.add('sb-sidenav-toggled');
    }

    // 1. Tangani Klik Tombol "Masuk" di login.html
    const loginButton = document.getElementById('btn-masuk');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Set token simulasi di localStorage
            localStorage.setItem('admin_token', 'mylaundry-admin-mock-token-12345');
            window.location.href = 'dashboard.html';
        });
    }

    // 2. Tangani Klik Tombol "Keluar" di Sidebar & Navbar Dropdown
    const logoutButtons = document.querySelectorAll('a[href="login.html"]');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus token session saat logout
            localStorage.removeItem('admin_token');
        });
    });
});
