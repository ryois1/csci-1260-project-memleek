const navPaths = [
    { path: "/", name: "Game" },
    { path: "/compress.html", name: "Compress" },
    { path: "/options.html", name: "Options" },
    { path: "/achievements.html", name: "Achievements" }
]

$(document).ready(function() {
    const currentPath = window.location.pathname;

    $('body').prepend(`<!-- BEGIN Nav Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-around">
        <div class="navbar-nav col-4 d-flex justify-content-start">
            <div class="text-white">
                <ul class="navbar-nav" id="navPaths"></ul>
            </div>
        </div>

        <div class="col-4 d-flex justify-content-center">
            <a class="navbar-brand">Mem.Leek <img src="./assets/images/gamelogo.png" class="game-logo" alt="Game Logo"></a>
        </div>

        <button class="navbar-toggler ml-auto align-items-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
            <span class="nav-link">Local Save: <span id="localSaveState"></span></span>
        </div>

    </nav>
    <!-- END Nav Bar -->`);

    navPaths.forEach(function(navPath) {
        $("#navPaths").append(`<li class="nav-item"><span class="nav-link"><a href="${navPath.path}" class="btn btn-outline-info ${ (currentPath == navPath.path ) ? 'active': ''} " id="gameTabBtn">${navPath.name}</a></span></li>`);
    });
});