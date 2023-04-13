const navPaths = [
    { path: "/", name: "Game" },
    { path: "/compress.html", name: "Compress" },
    { path: "/options.html", name: "Options" },
    { path: "/achievements.html", name: "Achievements" }
]

$(document).ready(function() {
    const currentPath = window.location.pathname;
    navPaths.forEach(function(navPath) {
        $("#navPaths").append(`<li class="nav-item"><span class="nav-link"><a href="${navPath.path}" class="btn btn-outline-info ${ (currentPath == navPath.path ) ? 'active': ''} " id="gameTabBtn">${navPath.name}</a></span></li>`);
    });
});