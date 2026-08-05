/* ==========================================================
   Authentification (Bibliothèque Libris)
   Comptes gérés dans le navigateur via localStorage.
   - compte/inscription : formulaire #form
   - compte/connexion   : formulaire #connexion
   ========================================================== */
(function () {
    var USERS_KEY = 'libris_users';
    var SESSION_KEY = 'libris_user';

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function message(form, text, isError) {
        var existing = form.querySelector('.auth-message');
        if (existing) existing.remove();

        var p = document.createElement('p');
        p.className = 'auth-message';
        p.style.cssText =
            'text-align:center;font-size:14px;padding:8px;border-radius:6px;margin-top:10px;color:#fff;' +
            (isError ? 'background:#d94f4f;' : 'background:#2a9a5a;');
        p.textContent = text;
        form.appendChild(p);
    }

    function initInscription() {
        var form = document.getElementById('form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nom = document.getElementById('nom').value.trim();
            var prenom = document.getElementById('prenom').value.trim();
            var password = document.getElementById('password').value;
            var email = document.getElementById('email').value.trim();
            var adresse = document.getElementById('adresse').value.trim();
            var tel = document.getElementById('tel_number').value.trim();

            if (!nom || !prenom || !password || !email || !adresse || !tel) {
                message(form, 'Veuillez remplir tous les champs.', true);
                return;
            }
            if (password.length < 6) {
                message(form, 'Le mot de passe doit contenir au moins 6 caractères.', true);
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                message(form, 'Adresse email invalide.', true);
                return;
            }

            var users = getUsers();
            var exists = users.some(function (u) { return u.email.toLowerCase() === email.toLowerCase(); });
            if (exists) {
                message(form, 'Un compte existe déjà avec cet email.', true);
                return;
            }

            users.push({
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                adresse: adresse,
                tel: tel
            });
            saveUsers(users);
            localStorage.setItem(SESSION_KEY, JSON.stringify({ nom: nom, email: email }));
            message(form, 'Inscription réussie ! Redirection...', false);
            setTimeout(function () { window.location.href = '../'; }, 1200);
        });
    }

    function initConnexion() {
        var form = document.getElementById('connexion');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var email = document.getElementById('email').value.trim();
            var password = document.getElementById('password').value;

            if (!email || !password) {
                message(form, 'Veuillez saisir votre email et votre mot de passe.', true);
                return;
            }

            var users = getUsers();
            var user = users.find(function (u) {
                return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
            });

            if (!user) {
                message(form, 'Email ou mot de passe incorrect.', true);
                return;
            }

            localStorage.setItem(SESSION_KEY, JSON.stringify({ nom: user.nom, email: user.email }));
            message(form, 'Connexion réussie ! Redirection...', false);
            setTimeout(function () { window.location.href = '../'; }, 1200);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initInscription();
            initConnexion();
        });
    } else {
        initInscription();
        initConnexion();
    }
})();
