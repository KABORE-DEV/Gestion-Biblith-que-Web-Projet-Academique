/* ==========================================================
   Acquisitions de la page Nouveautés — rendues depuis data.js
   Injecte dans #newbooksGrid.
   ========================================================== */
(function () {
    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function render() {
        var grid = document.getElementById('newbooksGrid');
        if (!grid) return;

        var html = LIBRIS_NEWBOOKS.map(function (b) {
            return '' +
                '<div class="book-card">' +
                '<div class="book-cover-placeholder"><i class="fa-solid fa-book-open"></i></div>' +
                '<div class="book-info">' +
                '<span class="book-category">' + esc(b.tag) + '</span>' +
                '<h3 class="book-title">' + esc(b.t) + '</h3>' +
                '<p class="book-author">' + esc(b.a) + '</p>' +
                '<p class="book-desc">' + esc(b.d) + '</p>' +
                '<span class="book-badge new">Nouveau</span>' +
                '<button class="btn-reserve" data-title="' + esc(b.t) + '" data-author="' + esc(b.a) + '">Réserver</button>' +
                '</div>' +
                '</div>';
        }).join('');

        grid.innerHTML = html;

        grid.querySelectorAll('.btn-reserve').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openModal(btn.getAttribute('data-title'), btn.getAttribute('data-author'));
            });
        });
    }

    render();
})();
