function mainClick() {
            document.getElementById("show").style.display = "none";
            document.getElementById("hidden01").style.display = "none";
            document.getElementById("hidden").style.display = "";
            performance.getController().loadhidChart();
        }
        function picClick() {
            document.getElementById("hidden").style.display = "none";
            document.getElementById("hidden01").style.display = "none";
            document.getElementById("show").style.display = "";
            performance.getController().loadChart();
        }
        function mainClick01() {
            document.getElementById("show").style.display = "none";
            document.getElementById("hidden").style.display = "none";
            document.getElementById("hidden01").style.display = "";
            performance.getController().loadhidChart01();
        }