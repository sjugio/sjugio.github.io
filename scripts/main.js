document.addEventListener(
    "DOMContentLoaded",
    function() {
        document.getElementById("newsletter").addEventListener(
            "click",
            function() {
                document.getElementById("newsletter").querySelectorAll("span")[0].parentNode.removeChild(document.getElementById("newsletter").querySelectorAll("span")[0]);
                document.getElementById("newsletter").appendChild(document.createElement("input"));
                document.getElementById("newsletter").querySelectorAll("input")[0].addEventListener(
                    "focus",
                    function() {
                        document.getElementById("newsletter").querySelectorAll("input")[0].setAttribute(
                            "placeholder",
                            ""
                        );
                    }
                );
                document.getElementById("newsletter").querySelectorAll("input")[0].className = "newsletterInput";
                document.getElementById("newsletter").querySelectorAll("input")[0].setAttribute(
                    "placeholder",
                    "Din e-post her..."
                );
            }
        );
    }
)
