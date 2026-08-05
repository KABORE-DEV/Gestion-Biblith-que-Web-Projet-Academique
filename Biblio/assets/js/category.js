/* ==========================================================
   Rendu dynamique d'une page catégorie (Bibliothèque Libris)
   Lit data.js + les attributs du <body> :
     data-category="histoire|bande-dessine|art-culture|sciences|strategie|politique|informatique"
     data-depth="2"
   Disposition : colonne latérale sticky (métadonnées) + grille
   des livres à droite. Génère aussi la modale de réservation.
   ========================================================== */
(function () {
    var KEY = document.body.getAttribute('data-category') || '';

    function depth() {
        return parseInt(document.body.getAttribute('data-depth') || '2', 10);
    }

    function prefix() {
        var d = depth();
        return d <= 0 ? './' : new Array(d + 1).join('../');
    }

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    var meta = LIBRIS_CATEGORIES[KEY];

    function bookCard(b, p) {
        var cover = b.c
            ? '<img class="book-cover" src="' + p + 'assets/images/' + esc(b.c) + '" alt="Couverture de ' + esc(b.t) + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
              '<div class="cover-placeholder" style="display:none;"><i class="fa-solid fa-book-open"></i><small>Couverture</small></div>'
            : '<div class="cover-placeholder"><i class="fa-solid fa-book-open"></i><small>Couverture</small></div>';
        return '' +
            '<div class="book-card">' +
            cover +
            '<div class="book-info">' +
            '<div class="book-title">' + esc(b.t) + '</div>' +
            '<div class="book-author">' + (b.a ? 'par ' + esc(b.a) : '') + '</div>' +
            '<div class="book-desc">' + esc(b.d) + '</div>' +
            '<div class="book-status dispo">Disponible</div>' +
            '<button class="btn-reserve" data-title="' + esc(b.t) + '" data-author="' + esc(b.a) + '">Réserver</button>' +
            '</div>' +
            '</div>';
    }

    function build() {
        if (!meta) return;
        var p = prefix();
        var books = LIBRIS_BOOKS[KEY] || [];
        var app = document.getElementById('app');
        if (!app) return;

        var cards = books.map(function (b) { return bookCard(b, p); }).join('');

        app.innerHTML =
            '<div class="cat-layout">' +
            '<aside class="cat-meta">' +
            '<div class="breadcrumb"><a href="' + p + '">Accueil</a></div>' +
            '<h1 class="cat-h1">' + meta.bannerTitle + '</h1>' +
            '<p class="cat-desc">' + esc(meta.desc) + '</p>' +
            '<div class="book-count"><i class="fa-solid fa-book"></i> ' + books.length + ' livres disponibles</div>' +
            '</aside>' +
            '<section class="cat-books">' +
            '<div class="section-label">Tous les livres</div>' +
            '<div class="books-grid">' + cards + '</div>' +
            '</section>' +
            '</div>' +
            modalMarkup();

        app.querySelectorAll('.btn-reserve').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openModal(btn.getAttribute('data-title'), btn.getAttribute('data-author'));
            });
        });
    }

    function modalMarkup() {
        return '' +
            '<div class="modal-overlay" id="modalOverlay" onclick="closeOnOverlay(event)">' +
            '<div class="modal" id="modalBox">' +
            '<button class="modal-close" onclick="closeModal()">&#10005;</button>' +
            '<div id="formView">' +
            '<div class="modal-icon"><i class="fa-solid fa-book-open"></i></div>' +
            '<h2>Réserver un livre</h2>' +
            '<div class="modal-book-title" id="modalBookTitle">&mdash;</div>' +
            '<div class="form-group"><label for="inputNom">Votre nom complet</label>' +
            '<input type="text" id="inputNom" placeholder="Ex : Aminata Koné"></div>' +
            '<div class="form-group"><label for="inputTel">Téléphone</label>' +
            '<input type="tel" id="inputTel" placeholder="+226 XX XX XX XX"></div>' +
            '<div class="form-group"><label for="inputDate">Date de retrait souhaitée</label>' +
            '<input type="date" id="inputDate"></div>' +
            '<div class="form-group"><label for="inputDuree">Durée d\'emprunt</label>' +
            '<select id="inputDuree">' +
            '<option value="7">7 jours</option>' +
            '<option value="14">14 jours</option>' +
            '<option value="30">1 mois</option>' +
            '</select></div>' +
            '<button class="btn-confirm" onclick="confirmReservation()">Confirmer la réservation</button>' +
            '</div>' +
            '<div id="successView" style="display:none;" class="success-state">' +
            '<span class="check">&#10004;</span>' +
            '<h2>Réservation confirmée !</h2>' +
            '<p>Votre réservation pour <strong id="successTitle"></strong> a bien été enregistrée.</p>' +
            '<p style="margin-top:8px">Présentez-vous à l\'accueil avec votre numéro de référence :</p>' +
            '<div class="ref" id="successRef"></div>' +
            '<button class="btn-confirm" style="margin-top:20px; background:var(--accent);" onclick="closeModal()">Fermer</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    build();
})();
