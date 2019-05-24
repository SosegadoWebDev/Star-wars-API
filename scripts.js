$(document).ready(function () {
    console.log("jquery funcionando...")
    var resultados = []
    //verificar input email
    var inputEmail = $("#input-email")
    var messageErrorEmail = $(".message-error-email")
    inputEmail.on("input", function () {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.val())) {
            inputEmail.addClass("is-valid")
            messageErrorEmail.hide()
            if (inputEmail.hasClass("is-invalid")) {
                inputEmail.removeClass("is-invalid")
            }
        } else {
            inputEmail.addClass("is-invalid")
            messageErrorEmail.css("display", "block")
            messageErrorEmail.show()
            if (inputEmail.hasClass("is-valid")) {
                inputEmail.removeClass("is-valid", "is-invalid")
            }
        }
    })
    //verificar input name
    var inputName = $("#input-name")
    var messageErrorName = $(".message-error-name")
    inputName.on("input", function () {
        if (inputName.val()) {
            inputName.addClass("is-valid")
            messageErrorName.hide()
            if (inputName.hasClass("is-invalid")) {
                inputName.removeClass("is-invalid")
            }
        } else {
            inputName.addClass("is-invalid")
            messageErrorName.show()
            if (inputName.hasClass("is-valid")) {
                inputName.removeClass("is-valid")
            }
        }
    })
    //verificar input comments
    var inputComments = $("#input-comments")
    inputComments.on("input", function () {
        if (inputComments.val()) {
            inputComments.addClass("is-valid")
            if (inputComments.hasClass("is-invalid")) {
                inputComments.removeClass("is-invalid")
            }
        } else {
            inputComments.addClass("is-invalid")
            if (inputComments.hasClass("is-valid")) {
                inputComments.removeClass("is-valid")
            }
        }
    })
    //validar input enviar
    var inputSubmit = $("#input-button-enviar")
    var allInputs = $("input")
    allInputs.on("input", function () {
        if ((inputName.hasClass("is-valid")) && (inputEmail.hasClass("is-valid"))) {
            inputSubmit.attr("disabled", false)
        } else {
            inputSubmit.attr("disabled", true)
        }
    })
    //Manipulando la API para mostrar los datos
    function getData(url, callback) {
        $.ajax({
            url: url,
            method: "GET"
        })
            .done(function (info) {
                //console.log(info)
                callback(info)
            })
            .fail(function (error) {
                callback(error)
            })
    }
    function añadirPeople(info) {
        //resultados = !(JSON.parse(localStorage.getItem("Personajes-Star-Wars"))) ? resultados = [] : resultados = JSON.parse(localStorage.getItem("Personajes-Star-Wars"))
        resultados.push(info.results)
        for (var i = 0; i < info.results.length; i++) {
            $(".char-table").append("<tr>" + "<th>" + $("tr").length + "</th>" + "<th>" + info.results[i].name + "</th>" + "<th>" + info.results[i].gender + "</th>" + "<th>" + info.results[i].height + "</th>" + "<th>" + info.results[i].mass + "</th>" + "<th>" + info.results[i].eye_color + "</th>" + "<th>" + "<button type='button' id='" + ($("tr").length) + "' class='btn btn-success button-save'>" + "Guardar" + "</button>" + "</th>" + "</tr>")
        }
    }
    $(".button-characters").on("click", function (event) {
        var timesClicked = event.target.id
        if (timesClicked <= 8) {
            var numberId = (Number(timesClicked) + 1)
            var url = "https://swapi.co/api/people/?page=" + numberId
            $(".button-characters")[0].id = numberId
            getData(url, añadirPeople)
            if (timesClicked == 8) {
                $(".button-characters").attr("disabled", true)
            }
        }
    })
    //functión button save
    function guardarEnLocalStorage(key, array) {
        if (true) {
            var CharactersList = !(JSON.parse(localStorage.getItem("Personajes-Star-Wars"))) ? CharactersList = [] : CharactersList = JSON.parse(localStorage.getItem("Personajes-Star-Wars"))
            CharactersList.push(array)
            var charJson = JSON.stringify(CharactersList)
            localStorage.setItem(key, charJson)
        }
    }
    function levantarLocalStorage(key) {
        if (localStorage.getItem(key)) {
            var listCharacters = JSON.parse(localStorage.getItem(key))
            return listCharacters
        }
    }
    $(".container").on("click", ".button-save", function (event) {
        var captureIdToSave = event.target.id
        var saveChar = {
            name: $("tr")[captureIdToSave].children[1].textContent,
            gender: $("tr")[captureIdToSave].children[2].textContent,
            height: $("tr")[captureIdToSave].children[3].textContent,
            mass: $("tr")[captureIdToSave].children[4].textContent,
            eye_color: $("tr")[captureIdToSave].children[5].textContent
        }
        $("#" + captureIdToSave).attr("disabled", true)
        //Guardar la data validando antes que no existan en el LocalStorage
        if (levantarLocalStorage("Personajes-Star-Wars")) {
            for (var i = 0; i < (levantarLocalStorage("Personajes-Star-Wars").length); i++) {
                if (!(levantarLocalStorage("Personajes-Star-Wars")[i].name == ($("tr")[captureIdToSave].children[1].textContent))) {
                    if (levantarLocalStorage("Personajes-Star-Wars")[i].name == ($("tr")[captureIdToSave].children[1].textContent)) {
                        return false
                    } else if (levantarLocalStorage("Personajes-Star-Wars")[(levantarLocalStorage("Personajes-Star-Wars").length) - 1].name != ($("tr")[captureIdToSave].children[1].textContent)) {
                        if (i == (levantarLocalStorage("Personajes-Star-Wars").length - 1)) {
                            guardarEnLocalStorage("Personajes-Star-Wars", saveChar)
                        }
                    } else {
                        return false
                    }
                } else {
                    return false;
                }
            }
        } else {
            guardarEnLocalStorage("Personajes-Star-Wars", saveChar)
        }
    })
    //mostrar LocalStorage en la guardados
    function showCharacters(characters) {
        if (levantarLocalStorage("Personajes-Star-Wars")) {
            $(".save-table-head").append("<tr>" + "<th>" + 0 + "</th>" + "<th>" + "Nombre" + "</th>" + "<th>" + "Género" + "</th>" + "<th>" + "Altura" + "</th>" + "<th>" + "Peso" + "</th>" + "<th>" + "Color de ojos" + "</th>" + "<th>" + "Eliminar" + "</th>" + "</tr>")
            for (var i = 0; i < characters.length; i++) {
                $(".save-table-body").append("<tr>" + "<th>" + $("tr").length + "</th>" + "<th>" + characters[i].name + "</th>" + "<th>" + characters[i].gender + "</th>" + "<th>" + characters[i].height + "</th>" + "<th>" + characters[i].mass + "</th>" + "<th>" + characters[i].eye_color + "</th>" + "<th>" + "<button type='button' id='" + ($("tr").length) + "' class='btn btn-danger button-delete'>" + "Eliminar" + "</button>" + "</th>" + "</tr>")
            }
        }
    }
    showCharacters(levantarLocalStorage("Personajes-Star-Wars"))
    //Eliminar personaje de guardado.html
    $(".container").on("click", ".button-delete", function (event) {
        var captureIdToSave = event.target.id
        for (var i = 0; i < levantarLocalStorage("Personajes-Star-Wars").length; i++) {
            if ($("tr")[captureIdToSave].children[1].textContent == levantarLocalStorage("Personajes-Star-Wars")[i].name) {
                var x = levantarLocalStorage("Personajes-Star-Wars")
                x.splice(i, 1)
                localStorage.setItem("Personajes-Star-Wars", JSON.stringify(x))
                $("tr")[i + 1].remove()
                if (localStorage.getItem("Personajes-Star-Wars") == "[]") {
                    localStorage.clear()
                    break;
                }
                for (var ii = 0; ii < $("tr").length - 1; ii++){
                    $(".button-delete")[ii].id = ii + 1
                }
            }
        }
    })
    //termina el ready()
})
