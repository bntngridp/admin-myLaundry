# myLaundry Admin Panel 🖥️

Modern, responsive administrative web dashboard built with HTML5, CSS3, JavaScript (ES6), and Bootstrap 5. It consumes the `myLaundry Backend API` to manage orders, couriers, customers, products/services, and view real-time data analytics.

---

## 🛠️ Tech Stack & Dependencies

*   **Markup & Layout**: HTML5, Bootstrap 5.2.3 (via CDN)
*   **Styling**: Custom CSS variables for clean modern design matching HSL palettes (Dark Mode UI panels, modern typography)
*   **Logic**: Vanilla JavaScript (ES6), using `Fetch API` for asynchronous calls
*   **Modularity**: Custom Web Components (`admin-navbar`, `admin-sidebar`, `admin-footer`) registered dynamically via `js/components.js` for layout reuse
*   **Visualizations**: [Chart.js](https://www.chartjs.org/) for real-time Sales line chart and Courier status pie chart
*   **Tables**: [Simple DataTables](https://github.com/fiduswriter/Simple-DataTables) for interactive sorting and filtering

---

## ⚙️ Key Features

1.  **Overview Dashboard**:
    *   Dynamic statistical cards showing total sales, active orders, and active couriers.
    *   Dynamic revenue and sales trend line graph plotted from database data.
    *   Today's Orders table showing real-time active customer orders.
2.  **Order Management**:
    *   Active Orders table (`pesanan.html`) listing orders currently in progress or awaiting courier.
    *   Custom-built Bootstrap Modal popup (`#confirmCompleteModal`) for secure order completion (replacing old browser-native dialogs).
    *   Automatic redirection back to list with session-stored Alert toast notifications.
3.  **Order History & Receipts**:
    *   Historical orders list (`riwayat-pesanan.html`) linked to a dedicated history detail page (`detail-riwayat-pesanan.html`) with no completion actions.
    *   **Printable Receipts**: Optimized printing stylesheets (`@media print`) that automatically hide sidebar/navbar and format details into a high-end corporate receipt with brand headers/footers.
4.  **Couriers & Customers**:
    *   Courier status dashboard with a reactive pie chart (Chart.js) showing working status.
5.  **Product CRUD**:
    *   Dynamic products listing with category filters.
    *   Create, Edit, and Delete workflows with Bootstrap modal confirmation alerts.

---

## 🚀 Getting Started (Local Development)

### Running the Dashboard
Since the admin panel consists of static files using JavaScript Modules and APIs, it must be run through a lightweight web server (not by double-clicking the files directly).

1.  Navigate to the repository folder:
    ```bash
    cd admin-myLaundry
    ```
2.  Launch a python local server:
    ```bash
    python3 -m http.server 3000
    ```
3.  Open your browser and navigate to `http://localhost:3000`.

### 💡 Tip: Disable Browser Caching
Modern browsers aggressively cache static assets. During development:
1.  Open Chrome Developer Tools (`Cmd + Option + I` or `F12`).
2.  Navigate to the **Network** tab.
3.  Check the **Disable Cache** checkbox.
4.  Keep the DevTools panel open to ensure the latest changes to HTML/CSS/JS load immediately on page refresh.

---

## 📂 Folder Structure

```
├── css/
│   ├── styles.css              # Core layout styling (Bootstrap theme overrides)
│   └── custom-components.css   # Custom dashboard design tokens, glassmorphism cards
├── js/
│   ├── scripts.js              # Template sidebar & layout control logic
│   ├── components.js           # Reusable HTML web components (navbar, sidebar)
│   └── api.js                  # Shared API fetch wrappers (authentication headers, base URL)
├── assets/                     # UI icons and graphic assets
├── dashboard.html              # Landing dashboard containing sales chart and overview stats
├── pesanan.html                # Active orders management
├── riwayat-pesanan.html        # Historical orders log
├── detail-pesanan.html         # Detailed view & completion actions for active orders
└── detail-riwayat-pesanan.html # Clean printable receipt view for historical orders
```
