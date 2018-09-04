(() => {
  setTimeout(() => {
    const stars = document.getElementsByClassName("svgIcon--star");

    for (let i = 0; i < stars.length; i++) {
      const link = stars[i]
        .closest(".extremeHero-postContent")
        .querySelector("a.ds-link");

      const href = link.getAttribute("href");
      console.log(href);
      link.setAttribute("target", "_blank");
    }
  }, 2000);

  window.onclick = function(e) {
    e.preventDefault();
    if (e.target.localName == "a") {
      console.log("a tag clicked!");
    }
  };
})();
