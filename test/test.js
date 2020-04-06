var board = document.getElementById('board')

board.addEventListener('click', 
    function(event) {
        var text = ''
        var x = event.offsetX;
        var y = event.offsetY;
        document.getElementById("text").innerHTML = x + '<br>' + y;
    }
)