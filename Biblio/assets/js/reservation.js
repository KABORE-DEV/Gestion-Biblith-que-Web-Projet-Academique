/* ==========================================================
   Réservation de livres — modale partagée (Bibliothèque Libris)
   À inclure sur toutes les pages qui contiennent la modale
   #modalOverlay (pages livres/* et nouveaute/).
   ========================================================== */
(function () {
    var currentBook = '';

    function readUser() {
        try {
            return JSON.parse(localStorage.getItem('libris_user') || 'null');
        } catch (e) {
            return null;
        }
    }

    window.openModal = function (title, author) {
        currentBook = title;
        document.getElementById('modalBookTitle').textContent = title + ' — ' + author;
        document.getElementById('formView').style.display = 'block';
        document.getElementById('successView').style.display = 'none';

        var today = new Date().toISOString().split('T')[0];
        document.getElementById('inputDate').min = today;
        document.getElementById('inputDate').value = today;

        var user = readUser();
        if (user && user.nom && !document.getElementById('inputNom').value) {
            document.getElementById('inputNom').value = user.nom;
        }

        document.getElementById('modalOverlay').classList.add('open');
    };

    window.closeModal = function () {
        document.getElementById('modalOverlay').classList.remove('open');
        setTimeout(function () {
            document.getElementById('inputNom').value = '';
            document.getElementById('inputTel').value = '';
        }, 300);
    };

    window.closeOnOverlay = function (e) {
        if (e.target === document.getElementById('modalOverlay')) closeModal();
    };

    window.confirmReservation = function () {
        var nom = document.getElementById('inputNom').value.trim();
        var tel = document.getElementById('inputTel').value.trim();
        var date = document.getElementById('inputDate').value;
        var duree = document.getElementById('inputDuree').value;

        if (!nom || !tel || !date) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        var ref = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        var user = readUser();

        document.getElementById('formView').style.display = 'none';
        document.getElementById('successView').style.display = 'block';
        document.getElementById('successTitle').textContent = currentBook;
        document.getElementById('successRef').textContent = ref;

        var reservation = {
            livre: currentBook,
            nom: nom,
            tel: tel,
            email: user && user.email ? user.email : '',
            date: date,
            duree: duree,
            reference: ref,
            dateReservation: new Date().toISOString()
        };
        var reservations = [];
        try {
            reservations = JSON.parse(localStorage.getItem('libris_reservations') || '[]');
        } catch (e) {}
        reservations.push(reservation);
        localStorage.setItem('libris_reservations', JSON.stringify(reservations));
    };

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var overlay = document.getElementById('modalOverlay');
            if (overlay && overlay.classList.contains('open')) closeModal();
        }
    });
})();
