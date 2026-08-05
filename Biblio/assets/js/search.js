/* ==========================================================
   Recherche du catalogue (Bibliothèque Libris)
   Filtre les cartes de catégories en temps réel.
   ========================================================== */
(function () {
    function init() {
        var input = document.querySelector('.recher');
        if (!input) return;

        var grid = document.querySelector('#categoryGrid') ||
            document.querySelector('.grid');
        if (!grid) return;

        var cards = Array.prototype.slice.call(grid.querySelectorAll('.cat-card, .card'));
        if (!cards.length) return;

        function filter() {
            var q = input.value.trim().toLowerCase();
            var visible = 0;

            cards.forEach(function (card) {
                var text = card.textContent.toLowerCase();
                var match = !q || text.indexOf(q) !== -1;
                card.style.display = match ? '' : 'none';
                if (match) visible++;
            });

            var empty = grid.querySelector('.search-empty');
            if (!visible) {
                if (!empty) {
                    empty = document.createElement('p');
                    empty.className = 'search-empty';
                    empty.textContent = 'Aucune catégorie ne correspond à votre recherche.';
                    grid.appendChild(empty);
                }
            } else if (empty) {
                empty.remove();
            }
        }

        input.addEventListener('input', filter);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
