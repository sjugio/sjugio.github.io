document.addEventListener(
    "DOMContentLoaded",
    function() {
        document.getElementById("newsletter").addEventListener(
            "click",
            function() {
                document.getElementById("newsletter").querySelectorAll("span")[0].parentNode.removeChild(document.getElementById("newsletter").querySelectorAll("span")[0]);
                document.getElementById("newsletter").appendChild(document.createElement("input"));
                document.getElementById("newsletter").querySelectorAll("input")[0].className = "newsletterInput";
                document.getElementById("newsletter").querySelectorAll("input")[0].setAttribute("placeholder", "Nyhetsbrev");
                setTimeout(function() {
                    document.getElementById("newsletter").querySelectorAll("input")[0].className = "newsletterInput after";
                    //document.getElementById("newsletter").querySelectorAll("input")[0].setAttribute("placeholder", "Din e-post her...");
                },0)
                setTimeout(function() {
                    document.getElementById("newsletter").querySelectorAll("input")[0].className = "newsletterInput finally";
                    document.getElementById("newsletter").querySelectorAll("input")[0].setAttribute("placeholder", "Din e-post her...");
                },500)
            }
        );
    }
)
