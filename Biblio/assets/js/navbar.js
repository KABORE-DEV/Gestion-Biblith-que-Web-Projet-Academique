/* ==========================================================
   Navbar "masthead" + footer partagés (Bibliothèque Libris)
   Structure injectée :
     nav-top   : logo | horaires | zone compte
     nav-bottom: navigation | recherche

   Chaque page définit sur <body> :
     data-page="accueil|catalogue|nouveaute|recherche|connexion|inscription|reservations"
     data-depth="0" (accueil à la racine)
     data-depth="1" (catalogue, nouveaute, recherche)
     data-depth="2" (livres/*, compte/*)
   ========================================================== */
(function () {
    function readUser() {
        try {
            return JSON.parse(localStorage.getItem('libris_user') || 'null');
        } catch (e) {
            return null;
        }
    }

    function buildNav() {
        var body = document.body;
        if (!body || body.getAttribute('data-nav') === 'off') return;

        var depth = parseInt(body.getAttribute('data-depth') || '0', 10);
        var prefix = depth <= 0 ? './' : new Array(depth + 1).join('../');
        var active = body.getAttribute('data-page') || '';
        var user = readUser();

        var links = [
            { key: 'accueil', label: 'Accueil', href: prefix },
            { key: 'catalogue', label: 'Catalogue', href: prefix + 'catalogue/' },
            { key: 'nouveaute', label: 'Nouveautés', href: prefix + 'nouveaute/' }
        ];

        /* ---- Navbar ---- */
        var nav = document.createElement('nav');
        nav.className = 'nav';

        var navInner = document.createElement('div');
        navInner.className = 'nav-inner';

        /* --- Ligne haute : logo / horaires / compte --- */
        var navTop = document.createElement('div');
        navTop.className = 'nav-top';

        var logo = document.createElement('a');
        logo.className = 'nav-logo';
        logo.href = prefix;
        logo.innerHTML = 'Libris<span>.</span>';

        var hours = document.createElement('span');
        hours.className = 'nav-hours';
        hours.textContent = 'Lun–Ven 08–19 · Sam 08–13';

        var account = document.createElement('div');
        account.className = 'nav-account';

        if (user && user.nom) {
            var greeting = document.createElement('span');
            greeting.className = 'nav-greeting';
            greeting.textContent = 'Bienvenue, ' + user.nom;
            var myResa = document.createElement('a');
            myResa.className = 'nav-btn nav-btn-outline';
            myResa.href = prefix + 'compte/reservations/';
            myResa.textContent = 'Mes réservations';
            var logout = document.createElement('a');
            logout.className = 'nav-btn nav-btn-solid';
            logout.href = '#';
            logout.textContent = 'Déconnexion';
            logout.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('libris_user');
                window.location.reload();
            });
            account.appendChild(greeting);
            account.appendChild(myResa);
            account.appendChild(logout);
        } else {
            var signup = document.createElement('a');
            signup.className = 'nav-btn nav-btn-outline';
            signup.href = prefix + 'compte/inscription/';
            signup.textContent = 'S\'inscrire';
            var login = document.createElement('a');
            login.className = 'nav-btn nav-btn-solid';
            login.href = prefix + 'compte/connexion/';
            login.textContent = 'Se connecter';
            account.appendChild(signup);
            account.appendChild(login);
        }

        navTop.appendChild(logo);
        navTop.appendChild(hours);
        navTop.appendChild(account);

        /* --- Ligne basse : navigation / recherche --- */
        var navBottom = document.createElement('div');
        navBottom.className = 'nav-bottom';

        var ul = document.createElement('ul');
        ul.className = 'nav-links';
        links.forEach(function (item) {
            var li = document.createElement('li');
            if (item.key === active) li.className = 'active';
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            li.appendChild(a);
            ul.appendChild(li);
        });

        var search = document.createElement('form');
        search.className = 'nav-search';
        search.addEventListener('submit', function (e) {
            e.preventDefault();
            var q = document.getElementById('navSearchInput').value.trim();
            if (!q) return;
            window.location.href = prefix + 'recherche/?q=' + encodeURIComponent(q);
        });
        var searchInput = document.createElement('input');
        searchInput.id = 'navSearchInput';
        searchInput.type = 'search';
        searchInput.placeholder = 'Rechercher un livre…';
        searchInput.setAttribute('aria-label', 'Rechercher un livre');
        var searchBtn = document.createElement('button');
        searchBtn.type = 'submit';
        searchBtn.setAttribute('aria-label', 'Lancer la recherche');
        searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
        search.appendChild(searchInput);
        search.appendChild(searchBtn);

        navBottom.appendChild(ul);
        navBottom.appendChild(search);

        navInner.appendChild(navTop);
        navInner.appendChild(navBottom);
        nav.appendChild(navInner);

        /* ---- Footer ---- */
        var footer = document.createElement('footer');
        footer.className = 'footer';

        var footerInner = document.createElement('div');
        footerInner.className = 'footer-inner';

        var brand = document.createElement('div');
        brand.className = 'footer-brand';
        var brandLogo = document.createElement('a');
        brandLogo.className = 'footer-logo';
        brandLogo.href = prefix;
        brandLogo.innerHTML = 'Libris<span>.</span>';
        var brandText = document.createElement('p');
        brandText.textContent = 'Une bibliothèque au cœur de la ville, ouverte à toutes et à tous.';
        brand.appendChild(brandLogo);
        brand.appendChild(brandText);

        var navCol = document.createElement('div');
        navCol.className = 'footer-col';
        var navTitle = document.createElement('h4');
        navTitle.textContent = 'Navigation';
        var navUl = document.createElement('ul');
        links.concat([
            { key: 'recherche', label: 'Recherche', href: prefix + 'recherche/' },
            { key: 'connexion', label: 'Se connecter', href: prefix + 'compte/connexion/' }
        ]).forEach(function (item) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            li.appendChild(a);
            navUl.appendChild(li);
        });
        navCol.appendChild(navTitle);
        navCol.appendChild(navUl);

        var hoursCol = document.createElement('div');
        hoursCol.className = 'footer-col';
        var hoursTitle = document.createElement('h4');
        hoursTitle.textContent = 'Horaires';
        var hoursUl = document.createElement('ul');
        [['Lundi – Vendredi', '08h – 19h'], ['Samedi', '08h – 13h'], ['Dimanche', 'Fermé']].forEach(function (row) {
            var li = document.createElement('li');
            li.textContent = row[0] + ' : ' + row[1];
            hoursUl.appendChild(li);
        });
        hoursCol.appendChild(hoursTitle);
        hoursCol.appendChild(hoursUl);

        footerInner.appendChild(brand);
        footerInner.appendChild(navCol);
        footerInner.appendChild(hoursCol);

        var bottom = document.createElement('div');
        bottom.className = 'footer-bottom';
        bottom.innerHTML = '&copy; 2026 Bibliothèque Libris — Tous droits réservés';

        footer.appendChild(footerInner);
        footer.appendChild(bottom);

        body.insertBefore(nav, body.firstChild);
        body.appendChild(footer);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }
})();
