/**
 * myLaundry Admin Web Components
 * Memodularisasi komponen Navbar, Sidebar, dan Footer agar kode lebih bersih,
 * teratur, dan mudah dikelola (anti-spaghetti).
 */

// 1. TOPBAR NAVBAR COMPONENT
class AdminNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <!-- Navbar Brand-->
                <a id="foto" href="dashboard.html" class="ps-3">
                    <img src="assets/img/logo-mylaundry.png" alt="myLaundry" style="width: 7rem;">
                </a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                    <i class="fas fa-bars"></i>
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
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user fa-fw"></i>
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

        // Inisialisasi Event Listener Toggle Sidebar secara internal
        const sidebarToggle = this.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }
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
