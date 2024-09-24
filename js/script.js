$(document).ready(function() {
    const form = $('.form-container form');
    const nom = $('#nom');
    const prenom = $('#prenom');
    const email = $('#email');
    const date = $('#dateNaissance');
    const errorNom = $('#errorNom');
    const errorPrenom = $('#errorPrenom');
    const errorMail = $('#errorMail');
    const errorDate = $('#errorDate');
    const notValidMail = $('#notValidMail');
    const notValidDate = $('#notValidDate');
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const btnReset = $('#btnReset');
    const btnSubmit = $('#btnSubmit');
    const imgPreview = $('#imgPreview');
    const defaultImgSrc = imgPreview.attr('src');

    // INIT DE MES ERREURS //
    $('.empty').hide().css("color", "red");
    $('.notValid').hide().css("color", "red");

    // TRANSFORMATION DES CARACTERES DANS L'INPUT DATE
    $(date).on('input', function() {
        let dateValue = $(this).val();
        dateValue = dateValue.replace(/[.\- ]/g, '/');
        $(this).val(dateValue);
    });

    // CHARGEMENT ET AFFICHAGE DE MA PHOTO
    $('#photoUpload').on('change', function(e) {
        var files = e.target.files;
        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imgPreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);
        }
    });

    // VERIFICATION A LA SAISIE DES DIFFERENTS INPUTS//
    $(form).on("input", function() {
        // VERIFICATION DU CHAMP NOM  
        if ($(nom).val() == "") {
            errorNom.show();
            nom.addClass("border-danger");
            nom.removeClass("border-success");
        } else {
            nom.removeClass("border-danger");
            nom.addClass("border-success");
            errorNom.hide();
            nom.addClass("text-success");
        }

        // VERIFICATION DU CHAMP PRENOM  
        if ($(prenom).val() == "") {
            errorPrenom.show();
            prenom.addClass("border-danger");
            prenom.removeClass("border-success");
        } else {
            prenom.removeClass("border-danger");
            prenom.addClass("border-success");
            errorPrenom.hide();
            prenom.addClass("text-success");
        }

        // VERIFICATION DU CHAMP DATE 
        if ($(date).val() == "") {
            errorDate.show();
            date.addClass("border-danger");
            date.removeClass("border-success");
        } else {
            date.removeClass("border-danger");
            date.addClass("border-success");
            errorDate.hide();
        }

        if (!dateRegex.test($(date).val())) {
            notValidDate.show();
            date.addClass("border-danger");
            date.addClass("text-danger");
            date.removeClass("border-success");
        } else {
            date.removeClass("border-danger");
            date.removeClass("text-danger");
            date.addClass("border-success");
            date.addClass("text-success");
            notValidDate.hide();
        }

        // VERIFICATION DU CHAMP EMAIL
        if ($(email).val() == "") {
            errorMail.show();
            email.addClass("border-danger");
            email.removeClass("border-success");
        } else {
            email.removeClass("border-danger");
            email.addClass("border-success")
            errorMail.hide();
        }

        if (!emailRegex.test($(email).val())) {
            notValidMail.show();
            email.addClass("border-danger");
            email.addClass("text-danger");
            email.removeClass("border-success");
        } else {
            email.removeClass("border-danger");
            email.removeClass("text-danger");
            email.addClass("border-success")
            email.addClass("text-success");
            notValidMail.hide();
        }
    });

    // ENVOI DU FORMULAIRE AVEC MODALE DE CONFIRMATION
    $(btnSubmit).on("click", function(e) {
        e.preventDefault();
        let formValid = true;

        // VERIFICATION DU CHAMP NOM  
        if ($(nom).val() == "") {
            formValid = false;
            errorNom.show();
            nom.addClass("border-danger");
            nom.removeClass("border-success");
        }

        // VERIFICATION DU CHAMP PRENOM  
        if ($(prenom).val() == "") {
            formValid = false;
            errorPrenom.show();
            prenom.addClass("border-danger");
            prenom.removeClass("border-success");
        }

        // VERIFICATION DU CHAMP EMAIL
        if ($(email).val() == "") {
            formValid = false;
            errorMail.show();
            email.addClass("border-danger");
            email.addClass("text-danger");
        }

        if (!emailRegex.test($(email).val())) {
            formValid = false;
            notValidMail.show();
            email.addClass("border-danger");
            email.addClass("text-danger");
        }

        // VERIFICATION DU CHAMP DATE  
        if ($(date).val() == "" || !dateRegex.test($(date).val())) {
            formValid = false;
            notValidDate.show();
            date.addClass("border-danger");
            date.addClass("text-danger");
        }

        if (formValid) {
            $('#confirmationModal').modal('show');
        }
    });

    // CONFIRMATION DE LA MODALE
    $('#confirmSubmit').on("click", function() {
        form.submit();
    });

    // BOUTON RESET
    $(btnReset).on("click", function() {
        form.trigger("reset");
        $('.border-danger').removeClass("border-danger");
        $('.border-success').removeClass("border-success");
        $('.text-danger').removeClass("text-danger");
        $('.text-success').removeClass("text-success");
        $('.empty').hide();
        $('.notValid').hide();
        imgPreview.attr('src', defaultImgSrc);
    });

    // ALERTE MESSAGES PERSONNALISÉS
    $('input[type="radio"]').change(function() {
        var message = $(this).data('message');
        alert(message);
    });

    // FERMETURE DE LA MODALE AVEC LE BOUTON ANNULER
    $('.modal .btn-danger, .modal .close').on("click", function() {
        $('#confirmationModal').modal('hide');
    });
});
