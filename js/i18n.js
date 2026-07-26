/**
 * myLaundry Admin — Comprehensive Internationalization (i18n) Engine
 * Supports Bahasa Indonesia (id) & English (en)
 * Automatic DOM translation via data-i18n, data-i18n-placeholder, data-i18n-title, data-i18n-value
 */

(function() {
    const translations = {
        id: {
            // Navbar & General Header
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
            "menu_finance": "Keuangan & Setoran",
            "menu_reviews": "Ulasan & Rating",
            "menu_branches": "Cabang Outlet",
            "menu_sign_out": "Keluar",

            // Time Periods
            "period_today": "Hari Ini",
            "period_weekly": "Minggu Ini",
            "period_monthly": "Bulan Ini",
            "period_yearly": "Tahun Ini",

            // Dashboard Page
            "dash_title": "Dashboard",
            "dash_subtitle": "Ringkasan performa dan statistik bisnis myLaundry",
            "dash_total_orders": "Total Pesanan",
            "dash_active_couriers": "Kurir Aktif",
            "dash_revenue": "Total Pendapatan",
            "dash_services_count": "Layanan Aktif",
            "dash_recent_orders": "Pesanan Hari Ini",
            "dash_chart_sales": "Penjualan",
            "dash_chart_visitors": "Pengunjung Aplikasi",
            "dash_chart_status": "Distribusi Status Pesanan",
            "dash_view_all": "Lihat Semua",
            "dash_empty_title": "Belum Ada Pesanan",
            "dash_empty_desc": "Semua pesanan baru yang masuk akan muncul di sini secara otomatis.",
            "dash_loading_orders": "Memuat data pesanan...",
            "dash_reports": "Laporan",

            // Couriers Page
            "courier_title": "Kurir",
            "courier_dispatched": "Total {busy} kurir bertugas dan {available} kurir bersiap (tersedia)",
            "courier_list": "Daftar Kurir Antar-Jemput",
            "courier_add_btn": "Tambah Kurir Baru",
            "courier_id": "ID Kurir",
            "courier_name": "Nama Kurir",
            "courier_status": "Status",
            "courier_schedule": "Jadwal Tugas",
            "courier_total_orders": "Total Antaran",
            "courier_action": "Aksi",
            "courier_status_available": "Tersedia",
            "courier_status_delivering": "Sedang Mengantar",
            "courier_status_picking": "Sedang Menjemput",
            "courier_status_offline": "Offline • Istirahat",
            "courier_edit": "Edit Kurir",
            "courier_login_history": "Riwayat Login",
            "courier_delete": "Hapus Kurir",

            // Orders Page
            "orders_title": "Kelola Pesanan",
            "orders_subtitle": "Kelola seluruh pesanan masuk dan alur pencucian",
            "orders_list": "Daftar Pesanan Aktif",
            "orders_search": "Cari pesanan...",
            "orders_col_id": "ID Pesanan",
            "orders_col_customer": "Pelanggan",
            "orders_col_date": "Tanggal",
            "orders_col_address": "Alamat",
            "orders_col_service": "Layanan",
            "orders_col_weight": "Berat (kg)",
            "orders_col_price": "Total Harga",
            "orders_col_status": "Status Pesanan",
            "orders_col_action": "Aksi",
            "orders_detail_btn": "Lihat Detail",

            // Order History Page
            "history_title": "Riwayat Pesanan",
            "history_subtitle": "Daftar pesanan yang telah selesai atau dibatalkan",
            "history_list": "Tabel Riwayat Pesanan",
            "history_filter_date": "Filter Tanggal",
            "history_export": "Ekspor PDF/Excel",

            // Products Page
            "products_title": "Produk & Layanan",
            "products_subtitle": "Kelola paket cuci, dry clean, dan daftar harga",
            "products_list": "Katalog Produk",
            "products_add_btn": "Tambah Produk Baru",
            "products_col_id": "ID Produk",
            "products_col_category": "Kategori",
            "products_col_name": "Nama Produk",
            "products_col_duration": "Durasi",
            "products_col_price": "Harga",
            "products_col_edit": "Edit",
            "products_col_delete": "Hapus",
            "products_col_desc": "Deskripsi",
            "products_col_action": "Aksi",
            "products_delete_modal_title": "Hapus Produk",
            "products_delete_modal_desc": "Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.",
            "unit_hours": "jam",
            "unit_days": "hari",

            // Promo Page
            "promo_title": "Kelola Promo & Voucher",
            "promo_subtitle": "Tambah promo diskon, atur tanggal kedaluwarsa, dan status promo",
            "promo_list": "Daftar Kode Promo",
            "promo_add_btn": "Tambah Promo Baru",
            "promo_code": "Kode Promo",
            "promo_discount": "Diskon",
            "promo_max": "Maks",
            "promo_valid": "Masa Berlaku",
            "promo_expiry": "Batas Waktu",
            "promo_forever": "Berlaku Selamanya",
            "promo_active": "● Aktif",
            "promo_inactive": "○ Nonaktif",
            "promo_delete_confirm_title": "Hapus Promo Permanen?",
            "promo_delete_confirm_desc": "Apakah Anda yakin ingin menghapus promo ini?",
            "promo_delete_confirm_btn": "Ya, Hapus Promo",
            "promo_empty": "Belum ada promo tersedia.",

            // Branches Page
            "branches_title": "Cabang Outlet",
            "branches_subtitle": "Kelola jaringan outlet laundry",
            "branches_list": "Daftar Cabang",
            "branches_add_btn": "Tambah Cabang",

            // Activity Log & Settings Page
            "activity_title": "Log Aktivitas",
            "activity_subtitle": "Catatan aktivitas dan audit log admin",
            "settings_title": "Pengaturan Akun",
            "settings_subtitle": "Kelola profil dan preferensi keamanan",

            // Auth Pages (Login, Register, Forgot, Reset)
            "auth_signin_title": "Masuk ke myLaundry Admin",
            "auth_signin_subtitle": "Silakan masukkan email dan kata sandi Anda",
            "auth_email_label": "Alamat Email",
            "auth_email_placeholder": "nama@mylaundry.com",
            "auth_pass_label": "Kata Sandi",
            "auth_pass_placeholder": "Masukkan kata sandi...",
            "auth_remember": "Ingat saya",
            "auth_forgot": "Lupa Kata Sandi?",
            "auth_signin_btn": "Sign In",
            "auth_signup_title": "Buat Akun Admin Baru",
            "auth_first_name": "Nama Depan",
            "auth_last_name": "Nama Belakang",
            "auth_confirm_pass": "Konfirmasi Kata Sandi",
            "auth_signup_btn": "Daftar Sekarang",
            "auth_already_account": "Sudah punya akun? Masuk ke sini",
            "auth_need_account": "Belum punya akun? Daftar admin di sini",
            "auth_forgot_title": "Pemulihan Kata Sandi",
            "auth_forgot_desc": "Masukkan email Anda untuk menerima kode verifikasi OTP",
            "auth_send_otp_btn": "Kirim Kode OTP",
            "auth_enter_otp": "Masukkan Kode OTP",
            "auth_new_pass": "Kata Sandi Baru",

            // Status Labels
            "status_awaiting_payment": "Menunggu Pembayaran",
            "status_courier_en_route": "Kurir Dalam Perjalanan",
            "status_in_progress": "Sedang Diproses",
            "status_completed": "Selesai",
            "status_cancelled": "Dibatalkan",

            // Global Action Buttons & Indicators
            "btn_save": "Simpan Perubahan",
            "btn_cancel": "Batal",
            "btn_edit": "Edit",
            "btn_delete": "Hapus",
            "btn_confirm": "Konfirmasi",
            "btn_close": "Tutup",
            "btn_back": "Kembali",
            "btn_search": "Cari",
            "btn_view_details": "Lihat Detail",

            // Status Badges & States
            "state_loading": "Memuat data...",
            "state_no_data": "Belum ada data.",
            "state_success": "Berhasil!",
            "state_error": "Gagal memuat data."
        },
        en: {
            // Navbar & General Header
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
            "menu_finance": "Finance & Wallet",
            "menu_reviews": "Reviews & Ratings",
            "menu_branches": "Outlet Branches",
            "menu_sign_out": "Sign Out",

            // Time Periods
            "period_today": "Today",
            "period_weekly": "This Week",
            "period_monthly": "This Month",
            "period_yearly": "This Year",

            // Dashboard Page
            "dash_title": "Dashboard",
            "dash_subtitle": "myLaundry business performance summary and analytics",
            "dash_total_orders": "Total Orders",
            "dash_active_couriers": "Active Couriers",
            "dash_revenue": "Total Revenue",
            "dash_services_count": "Active Services",
            "dash_recent_orders": "Today's Orders",
            "dash_chart_sales": "Sales",
            "dash_chart_visitors": "App Visitors",
            "dash_chart_status": "Order Status Distribution",
            "dash_view_all": "View All",
            "dash_empty_title": "No Orders Yet",
            "dash_empty_desc": "All new incoming orders will automatically appear here.",
            "dash_loading_orders": "Loading orders data...",
            "dash_reports": "Reports",

            // Couriers Page
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
            "courier_edit": "Edit Courier",
            "courier_login_history": "Login History",
            "courier_delete": "Delete Courier",

            // Orders Page
            "orders_title": "Manage Orders",
            "orders_subtitle": "Manage all incoming orders and laundry workflow",
            "orders_list": "Active Orders List",
            "orders_search": "Search orders...",
            "orders_col_id": "Order ID",
            "orders_col_customer": "Customer",
            "orders_col_date": "Date",
            "orders_col_address": "Address",
            "orders_col_service": "Service",
            "orders_col_weight": "Weight (kg)",
            "orders_col_price": "Total Price",
            "orders_col_status": "Order Status",
            "orders_col_action": "Action",
            "orders_detail_btn": "View Details",

            // Order History Page
            "history_title": "Order History",
            "history_subtitle": "List of completed or cancelled orders",
            "history_list": "Order History Table",
            "history_filter_date": "Date Filter",
            "history_export": "Export PDF/Excel",

            // Products Page
            "products_title": "Products & Services",
            "products_subtitle": "Manage laundry packages, dry clean, and price list",
            "products_list": "Product Catalog",
            "products_add_btn": "Add New Product",
            "products_col_id": "Product ID",
            "products_col_category": "Category",
            "products_col_name": "Product Name",
            "products_col_duration": "Duration",
            "products_col_price": "Price",
            "products_col_edit": "Edit",
            "products_col_delete": "Delete",
            "products_col_desc": "Description",
            "products_col_action": "Action",
            "products_delete_modal_title": "Delete Product",
            "products_delete_modal_desc": "Are you sure you want to delete this product? This action cannot be undone.",
            "unit_hours": "hours",
            "unit_days": "days",

            // Promo Page
            "promo_title": "Manage Promo & Vouchers",
            "promo_subtitle": "Add discount promos, set expiry dates, and promo status",
            "promo_list": "Promo Codes List",
            "promo_add_btn": "Add New Promo",
            "promo_code": "Promo Code",
            "promo_discount": "Discount",
            "promo_max": "Max",
            "promo_valid": "Valid Until",
            "promo_expiry": "Expiry Date",
            "promo_forever": "Valid Forever",
            "promo_active": "● Active",
            "promo_inactive": "○ Inactive",
            "promo_delete_confirm_title": "Delete Promo Permanently?",
            "promo_delete_confirm_desc": "Are you sure you want to delete this promo?",
            "promo_delete_confirm_btn": "Yes, Delete Promo",
            "promo_empty": "No promos available.",

            // Branches Page
            "branches_title": "Outlet Branches",
            "branches_subtitle": "Manage laundry outlet store network",
            "branches_list": "Branches List",
            "branches_add_btn": "Add Branch",

            // Activity Log & Settings Page
            "activity_title": "Activity Log",
            "activity_subtitle": "Admin activity records and audit logs",
            "settings_title": "Account Settings",
            "settings_subtitle": "Manage admin profile and security preferences",

            // Auth Pages (Login, Register, Forgot, Reset)
            "auth_signin_title": "myLaundry Admin Sign In",
            "auth_signin_subtitle": "Please enter your registered email and password",
            "auth_email_label": "Email Address",
            "auth_email_placeholder": "name@mylaundry.com",
            "auth_pass_label": "Password",
            "auth_pass_placeholder": "Enter password...",
            "auth_remember": "Remember me",
            "auth_forgot": "Forgot Password?",
            "auth_signin_btn": "Sign In",
            "auth_signup_title": "Register New Admin",
            "auth_first_name": "First Name",
            "auth_last_name": "Last Name",
            "auth_confirm_pass": "Confirm Password",
            "auth_signup_btn": "Register Now",
            "auth_already_account": "Already have an account? Sign In here",
            "auth_need_account": "Need an account? Register admin here",
            "auth_forgot_title": "Password Recovery",
            "auth_forgot_desc": "Enter your email to receive an OTP verification code",
            "auth_send_otp_btn": "Send OTP Code",
            "auth_enter_otp": "Enter OTP Code",
            "auth_new_pass": "New Password",

            // Status Labels
            "status_awaiting_payment": "Awaiting Payment",
            "status_courier_en_route": "Courier En Route",
            "status_in_progress": "In Progress",
            "status_completed": "Completed",
            "status_cancelled": "Cancelled",

            // Global Action Buttons & Indicators
            "btn_save": "Save Changes",
            "btn_cancel": "Cancel",
            "btn_edit": "Edit",
            "btn_delete": "Delete",
            "btn_confirm": "Confirm",
            "btn_close": "Close",
            "btn_back": "Back",
            "btn_search": "Search",
            "btn_view_details": "View Details",

            // Status Badges & States
            "state_loading": "Loading data...",
            "state_no_data": "No data available.",
            "state_success": "Success!",
            "state_error": "Failed to load data."
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

        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (key) {
                el.setAttribute('title', t(key));
            }
        });

        // Translate input values (e.g. submit buttons)
        document.querySelectorAll('[data-i18n-value]').forEach(el => {
            const key = el.getAttribute('data-i18n-value');
            if (key) {
                el.value = t(key);
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
        
        // Dispatch custom event for page specific scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function getLanguage() {
        return currentLang;
    }

    // Expose API globally on window
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
