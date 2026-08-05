/* ==========================================================
   Page "Mes réservations" (Bibliothèque Libris)
   Liste les réservations du compte connecté (libris_user),
   stockées dans localStorage sous libris_reservations.
   ========================================================== */
(function () {
    var prefix = '../../';

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function readUser() {
        try {
            return JSON.parse(localStorage.getItem('libris_user') || 'null');
        } catch (e) {
            return null;
        }
    }

    function readReservations() {
        try {
            return JSON.parse(localStorage.getItem('libris_reservations') || '[]');
        } catch (e) {
            return [];
        }
    }

    function findBook(title) {
        for (var key in LIBRIS_BOOKS) {
            if (!LIBRIS_BOOKS.hasOwnProperty(key)) continue;
            for (var i = 0; i < LIBRIS_BOOKS[key].length; i++) {
                if (LIBRIS_BOOKS[key][i].t === title) {
                    return { cat: key, book: LIBRIS_BOOKS[key][i] };
                }
            }
        }
        return null;
    }

    function formatDate(iso) {
        if (!iso) return '';
        var d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function durationLabel(v) {
        if (v === '7') return '7 jours';
        if (v === '14') return '14 jours';
        if (v === '30') return '1 mois';
        return v;
    }

    function build() {
        var app = document.getElementById('app');
        if (!app) return;

        var user = readUser();

        if (!user || !user.nom) {
            app.innerHTML =
                '<div class="empty-state">' +
                '<i class="fa-solid fa-user-lock"></i>' +
                '<h3>Connectez-vous pour voir vos réservations</h3>' +
                '<p>Vos réservations sont liées à votre compte.</p>' +
                '<a class="btn" href="' + prefix + 'compte/connexion/">Se connecter</a>' +
                '</div>';
            return;
        }

        var all = readReservations();
        var email = user.email || '';
        var mine = all.filter(function (r) { return !r.email || r.email === email; });

        if (!mine.length) {
            app.innerHTML =
                '<div class="empty-state">' +
                '<i class="fa-solid fa-book-open"></i>' +
                '<h3>Aucune réservation pour le moment</h3>' +
                '<p>Explorez le catalogue et réservez votre premier livre.</p>' +
                '<a class="btn" href="' + prefix + 'catalogue/">Parcourir le catalogue</a>' +
                '</div>';
            return;
        }

        var items = mine.map(function (r) {
            var found = findBook(r.livre);
            var catLabel = found ? esc(LIBRIS_CATEGORIES[found.cat].title) : 'Livre';
            var cover = '';
            if (found && found.book.c) {
                cover = '<img class="res-cover" src="' + prefix + 'assets/images/' + esc(found.book.c) +
                    '" alt="Couverture" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
                    '<div class="res-cover-ph" style="display:none;"><i class="fa-solid fa-book-open"></i></div>';
            } else {
                cover = '<div class="res-cover-ph"><i class="fa-solid fa-book-open"></i></div>';
            }
            return '' +
                '<div class="res-item">' +
                cover +
                '<div class="res-body">' +
                '<div class="res-title">' + esc(r.livre) + '</div>' +
                '<div class="res-meta">' +
                '<span><i class="fa-solid fa-tag"></i> ' + catLabel + '</span>' +
                '<span><i class="fa-solid fa-calendar-day"></i> Retrait : ' + esc(formatDate(r.date)) + '</span>' +
                '<span><i class="fa-solid fa-clock"></i> ' + esc(durationLabel(r.duree)) + '</span>' +
                '<span><i class="fa-solid fa-hashtag"></i> <span class="res-ref">' + esc(r.reference) + '</span></span>' +
                '</div>' +
                '</div>' +
                '<button class="res-delete" data-ref="' + esc(r.reference) + '">Annuler</button>' +
                '</div>';
        }).join('');

        app.innerHTML = '<div class="res-list">' + items + '</div>';

        app.querySelectorAll('.res-delete').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var ref = btn.getAttribute('data-ref');
                var keep = all.filter(function (r) { return r.reference !== ref; });
                localStorage.setItem('libris_reservations', JSON.stringify(keep));
                build();
            });
        });
    }

    if (typeof LIBRIS_BOOKS !== 'undefined') {
        build();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            if (typeof LIBRIS_BOOKS !== 'undefined') build();
        });
    }
})();
