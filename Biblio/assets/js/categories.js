/* ==========================================================
   Cartes de catégories rendues depuis data.js
   Deux dispositions selon l'attribut data-disposition :
     "index"  (accueil)  → liste numérotée dans #categoryIndex
     "cards"  (catalogue) → cartes horizontales dans #categoryGrid
   ========================================================== */
(function () {
    function prefix() {
        var d = parseInt(document.body.getAttribute('data-depth') || '0', 10);
        return d <= 0 ? './' : new Array(d + 1).join('../');
    }

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function indexMarkup(p) {
        return Object.keys(LIBRIS_CATEGORIES).map(function (key, i) {
            var m = LIBRIS_CATEGORIES[key];
            var count = (LIBRIS_BOOKS[key] || []).length;
            var num = i + 1 < 10 ? '0' + (i + 1) : '' + (i + 1);
            return '' +
                '<a class="index-row" href="' + p + 'livres/' + key + '/">' +
                '<span class="index-num">' + num + '</span>' +
                '<span class="index-name">' + esc(m.title) + '<small>' + count + ' livres</small></span>' +
                '<span class="index-arrow"><i class="fa-solid fa-arrow-right"></i></span>' +
                '</a>';
        }).join('');
    }

    function cardMarkup(p) {
        return Object.keys(LIBRIS_CATEGORIES).map(function (key) {
            var m = LIBRIS_CATEGORIES[key];
            return '' +
                '<a class="cat-card" href="' + p + 'livres/' + key + '/">' +
                '<div class="cat-img"><img src="' + p + 'assets/images/' + esc(m.image) + '" alt="' + esc(m.title) + '"></div>' +
                '<div class="cat-body">' +
                '<span class="cat-tag">' + esc(m.tag) + '</span>' +
                '<h3 class="cat-title">' + esc(m.title) + '</h3>' +
                '<p class="cat-sub">' + esc(m.sub) + '</p>' +
                '<span class="cat-link">Explorer <i class="fa-solid fa-arrow-right"></i></span>' +
                '</div>' +
                '</a>';
        }).join('');
    }

    function render() {
        var p = prefix();
        var index = document.getElementById('categoryIndex');
        var grid = document.getElementById('categoryGrid');
        if (index) index.innerHTML = indexMarkup(p);
        if (grid) grid.innerHTML = cardMarkup(p);
    }

    render();
})();
