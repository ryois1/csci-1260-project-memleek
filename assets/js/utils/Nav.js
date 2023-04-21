const navPaths = [
  { path: "/", name: "Game" },
  { path: "/compress.html", name: "Compress" },
  { path: "/options.html", name: "Options" },
  { path: "/achievements.html", name: "Achievements" },
];

$(document).ready(function () {
  const currentPath = window.location.pathname;

  $("body").prepend(`<!-- BEGIN Nav Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span></button>
    <div class="container d-flex justify-content-around">
      <a class="navbar-brand d-flex">Mem.Leek <img src="./assets/images/gamelogo.png" class="game-logo d-none d-sm-block" alt="Game Logo"></a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarToggle">
      <ul class="navbar-nav" id="navPaths"></ul>
      </div>
      <span class="nav-link d-flex justify-content-end">Local Save: <span id="localSaveState"></span></span>
    </div>
  </nav>
  <!-- END Nav Bar -->`);
  navPaths.forEach(function (navPath) {
    $("#navPaths").append(
      `<li class="nav-item"><span class="nav-link"><a href="${
        navPath.path
      }" class="btn btn-outline-info ${
        currentPath == navPath.path ? "active" : ""
      } " id="gameTabBtn">${navPath.name}</a></span></li>`
    );
  });
});
