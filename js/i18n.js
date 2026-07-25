/**
 * myLaundry Admin — Internationalization (i18n) Module
 * Supports Bahasa Indonesia (id) & English (en)
 * Automatic DOM translation via data-i18n & data-i18n-placeholder attributes.
 */

(function() {
    const translations = {
        id: {
            // Navbar & General
            "nav_search_placeholder": "Cari sesuatu...",
            "nav_settings": "Pengaturan",
            "nav_activity_log": "Log Aktivitas",
            "nav_sign_out": "Keluar",
            "nav_logged_in_as": "Masuk sebagai:",
            
            // Sidebar Menu
            "menu_main": "Menu Utama",
            "menu_dashboard": "Dashboard",
            "menu_orders": "Pesanan",
            "menu_couriers": "Kurir",
            "menu_order_history": "Riwayat Pesanan",
            "menu_products": "Produk",
            "menu_promo": "Promo & Voucher",
            "menu_branches": "Cabang Outlet",
            "menu_sign_out": "Keluar",

            // Pages — Dashboard
            "dash_title": "Dashboard",
            "dash_total_orders": "Total Pesanan",
            "dash_active_couriers": "Kurir Aktif",
            "dash_revenue": "Total Pendapatan",
            "dash_services_count": "Layanan Aktif",
            "dash_recent_orders": "Pesanan Terbaru",
            "dash_chart_sales": "Statistik Penjualan Harian",
            "dash_chart_status": "Distribusi Status Pesanan",

            // Pages — Couriers
            "courier_title": "Kurir",
            "courier_dispatched": "Total {busy} kurir bertugas dan {available} kurir bersiap (tersedia)",
            "courier_list": "Daftar Kurir Antar-Jemput",
            "courier_add_btn": "Tambah Kurir Baru",
            "courier_id": "ID Kurir",
            "courier_name": "Nama Kurir",
            "courier_status": "Status",
            "courier_schedule": "Jadwal Tugas",
            "courier_total_orders": "Total",
            "courier_action": "Aksi",
            "courier_status_available": "Tersedia",
            "courier_status_delivering": "Sedang Mengantar",
            "courier_status_picking": "Sedang Menjemput",
            "courier_status_offline": "Offline • Istirahat",

            // Pages — Orders
            "orders_title": "Kelola Pesanan",
            "orders_list": "Daftar Semua Pesanan",
            "orders_search": "Cari Pesanan...",
            "orders_customer": "Pelanggan",
            "orders_service": "Layanan",
            "orders_weight": "Berat (kg)",
            "orders_total_price": "Total Harga",
            "orders_status": "Status Pesanan",

            // Pages — Products
            "products_title": "Produk & Layanan",
            "products_add": "Tambah Produk Baru",
            "products_name": "Nama Produk",
            "products_category": "Kategori",
            "products_price": "Harga / kg",

            // Auth Pages
            "auth_signin": "Masuk ke Akun",
            "auth_signup": "Daftar Akun Admin",
            "auth_forgot": "Lupa Kata Sandi?",
            "auth_remember": "Ingat saya",
            "auth_back_to_login": "Kembali ke Login",
            "auth_create_account": "Buat Akun Baru",

            // Buttons & Actions
            "btn_save": "Simpan",
            "btn_cancel": "Batal",
            "btn_edit": "Edit",
            "btn_delete": "Hapus",
            "btn_confirm": "Konfirmasi",
            "btn_close": "Tutup",
            "btn_loading": "Memuat...",

            // Common States
            "state_loading": "Memuat data...",
            "state_no_data": "Belum ada data.",
            "state_success": "Berhasil!",
            "state_error": "Terjadi kesalahan."
        },
        en: {
            // Navbar & General
            "nav_search_placeholder": "Search for...",
            "nav_settings": "Settings",
            "nav_activity_log": "Activity Log",
            "nav_sign_out": "Sign Out",
            "nav_logged_in_as": "Logged in as:",

            // Sidebar Menu
            "menu_main": "Main Menu",
            "menu_dashboard": "Dashboard",
            "menu_orders": "Orders",
            "menu_couriers": "Couriers",
            "menu_order_history": "Order History",
            "menu_products": "Products",
            "menu_promo": "Promo & Voucher",
            "menu_branches": "Branches",
            "menu_sign_out": "Sign Out",

            // Pages — Dashboard
            "dash_title": "Dashboard",
            "dash_total_orders": "Total Orders",
            "dash_active_couriers": "Active Couriers",
            "dash_revenue": "Total Revenue",
            "dash_services_count": "Active Services",
            "dash_recent_orders": "Recent Orders",
            "dash_chart_sales": "Daily Sales Analytics",
            "dash_chart_status": "Order Status Distribution",

            // Pages — Couriers
            "courier_title": "Couriers",
            "courier_dispatched": "Total {busy} couriers busy and {available} couriers ready (available)",
            "courier_list": "Courier Delivery List",
            "courier_add_btn": "Add New Courier",
            "courier_id": "Courier ID",
            "courier_name": "Courier Name",
            "courier_status": "Status",
            "courier_schedule": "Delivery Schedule",
            "courier_total_orders": "Total",
            "courier_action": "Action",
            "courier_status_available": "Available",
            "courier_status_delivering": "Delivering",
            "courier_status_picking": "Picking Up",
            "courier_status_offline": "Offline • Off-duty",

            // Pages — Orders
            "orders_title": "Manage Orders",
            "orders_list": "All Orders List",
            "orders_search": "Search Orders...",
            "orders_customer": "Customer",
            "orders_service": "Service",
            "orders_weight": "Weight (kg)",
            "orders_total_price": "Total Price",
            "orders_status": "Order Status",

            // Pages — Products
            "products_title": "Products & Services",
            "products_add": "Add New Product",
            "products_name": "Product Name",
            "products_category": "Category",
            "products_price": "Price / kg",

            // Auth Pages
            "auth_signin": "Sign In",
            "auth_signup": "Create Admin Account",
            "auth_forgot": "Forgot Password?",
            "auth_remember": "Remember me",
            "auth_back_to_login": "Back to Sign In",
            "auth_create_account": "Create Account",

            // Buttons & Actions
            "btn_save": "Save Changes",
            "btn_cancel": "Cancel",
            "btn_edit": "Edit",
            "btn_delete": "Delete",
            "btn_confirm": "Confirm",
            "btn_close": "Close",
            "btn_loading": "Loading...",

            // Common States
            "state_loading": "Loading data...",
            "state_no_data": "No data available.",
            "state_success": "Success!",
            "state_error": "An error occurred."
        }
    };

    let currentLang = localStorage.getItem('app_lang') || 'id';

    function t(key, params = {}) {
        let text = (translations[currentLang] && translations[currentLang][key]) || 
                   (translations['id'] && translations['id'][key]) || key;
        
        Object.keys(params).forEach(p => {
            text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
        });
        return text;
    }

    function applyTranslations() {
        // Translate textContent
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                el.textContent = t(key);
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) {
                el.setAttribute('placeholder', t(key));
            }
        });

        // Update html lang attribute
        document.documentElement.lang = currentLang;
    }

    function setLanguage(lang) {
        if (lang !== 'id' && lang !== 'en') return;
        currentLang = lang;
        localStorage.setItem('app_lang', lang);
        
        // Re-render custom web components if they exist
        const navbar = document.querySelector('admin-navbar');
        if (navbar && typeof navbar.connectedCallback === 'function') {
            navbar.connectedCallback();
        }
        const sidebar = document.querySelector('admin-sidebar');
        if (sidebar && typeof sidebar.connectedCallback === 'function') {
            sidebar.connectedCallback();
        }

        applyTranslations();
        
        // Dispatch event for custom page handlers
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function getLanguage() {
        return currentLang;
    }

    // Expose API on window
    window.i18n = {
        t,
        setLanguage,
        getLanguage,
        applyTranslations
    };

    // Auto apply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTranslations);
    } else {
        applyTranslations();
    }
})();
