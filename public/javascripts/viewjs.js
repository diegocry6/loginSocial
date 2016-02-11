
$( document ).ready(function() {
    autoRefresco();
});


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function autoRefresco() {
    setTimeout(function () {
        window.location.reload(1);
    }, 8000);
}

function valueSwap(id,campo) {
    var newValue = prompt("Por favor introduzca el nuevo Valor");
    if (newValue != null) {
        console.log(newValue);
        console.log(campo);
        console.log(id);

        jQuery.ajax({
            url: "/sqlite",
            type: "PUT",
            dataType:'json',
            data: {
                id: id,
                campo: campo,
                valor: newValue
            }
        });

    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}