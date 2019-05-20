$(document).ready(function () {
    console.log("jquery funcionando...")
    //verificar input email
    var resultados = []


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
        
        resultados = info.results
        for (var i = 0; i < info.results.length; i++) {
                $("tbody").append("<tr>" + "<th>" + $("tr").length + "</th>" + "<th>" + info.results[i].name + "</th>" + "<th>" + info.results[i].gender + "</th>" + "<th>" + info.results[i].height + "</th>" + "<th>" + info.results[i].mass + "</th>" + "<th>" + info.results[i].eye_color + "</th>" + "<th>" + "<button type='button' id='"+($("tr").length)+"' class='btn btn-success button-save'>" + "Guardar" + "</button>" + "</th>" + "</tr>")
        }
    }
    $(".button-characters").on("click", function (event) {
        var timesClicked = event.target.id
        if (timesClicked <= 8) {
        var numberId = (Number(timesClicked) + 1)
        var url = "https://swapi.co/api/people/?page=" + numberId
        $(".button-characters")[0].id = numberId
        getData(url, añadirPeople) 
            if(timesClicked == 8) {
                $(".button-characters").attr("disabled", true)
            }
        }
    })
    //functión button save
    $(".container").on("click", ".button-save", function(event){
        var captureIdToSave = event.target.id
    
        //var $btn = $(event.target)
        console.log(resultados)
        console.log(resultados[captureIdToSave])

        //console.log($("tr")[captureIdToSave].childNodes[0].innerText)
        
    })
    //termina el ready()
})