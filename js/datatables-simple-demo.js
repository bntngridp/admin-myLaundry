window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        const dataTable = new simpleDatatables.DataTable(datatablesSimple, {
            perPageSelect: false
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                dataTable.search(this.value);
            });
        }
    }
});