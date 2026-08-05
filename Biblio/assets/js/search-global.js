/* ==========================================================
   Recherche globale dans le catalogue (Bibliothèque Libris)
   Lit ?q= dans l'URL, filtre data.js, affiche les résultats.
   ========================================================== */
(function () {
    function getParam(name) {
        var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return m ? decodeURIComponent(m[1]) : '';
    }

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    var prefix = '../';
    var q = getParam('q').trim();

    function build() {
        var input = document.getElementById('searchInput');
        var info = document.getElementById('resultsInfo');
        var grid = document.getElementById('resultsGrid');

        input.value = q;

        var form = document.getElementById('searchForm');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var v = input.value.trim();
            window.location.href = 'recherche/?q=' + encodeURIComponent(v);
        });

        if (!q) {
            info.innerHTML = 'Saisissez un mot-clé pour rechercher un livre ou un auteur dans notre catalogue.';
            return;
        }

        var results = [];
        var needle = q.toLowerCase();
        Object.keys(LIBRIS_BOOKS).forEach(function (cat) {
            LIBRIS_BOOKS[cat].forEach(function (b) {
                var hay = (b.t + ' ' + (b.a || '') + ' ' + LIBRIS_CATEGORIES[cat].title).toLowerCase();
                if (hay.indexOf(needle) !== -1) {
                    results.push({ cat: cat, book: b });
                }
            });
        });

        info.innerHTML = '<strong>' + results.length + '</strong> résultat' + (results.length > 1 ? 's' : '') + ' pour « <strong>' + esc(q) + '</strong> »';

        if (!results.length) {
            grid.innerHTML = '<div class="no-results">' +
                '<i class="fa-solid fa-magnifying-glass"></i>' +
                '<h3>Aucun résultat</h3>' +
                '<p>Aucun livre ne correspond à « ' + esc(q) + ' ». Essayez un autre mot-clé.</p>' +
                '</div>';
            return;
        }

        var cards = results.map(function (r) {
            var b = r.book;
            var cover = b.c
                ? '<img class="res-cover" src="' + prefix + 'assets/images/' + esc(b.c) + '" alt="Couverture de ' + esc(b.t) + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
                  '<div class="res-cover-ph" style="display:none;"><i class="fa-solid fa-book-open"></i>Couverture</div>'
                : '<div class="res-cover-ph"><i class="fa-solid fa-book-open"></i>Couverture</div>';
            return '' +
                '<div class="res-card">' +
                cover +
                '<div class="res-body">' +
                '<span class="res-cat">' + esc(LIBRIS_CATEGORIES[r.cat].title) + '</span>' +
                '<div class="res-title">' + esc(b.t) + '</div>' +
                '<div class="res-author">' + (b.a ? 'par ' + esc(b.a) : '') + '</div>' +
                '<button class="btn-reserve" data-title="' + esc(b.t) + '" data-author="' + esc(b.a) + '">Réserver</button>' +
                '</div>' +
                '</div>';
        }).join('');

        grid.innerHTML = cards;

        grid.querySelectorAll('.btn-reserve').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openModal(btn.getAttribute('data-title'), btn.getAttribute('data-author'));
            });
        });
    }

    build();
})();
