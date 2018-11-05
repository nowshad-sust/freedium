(() => {
  const incognito = url => {
    chrome.runtime.sendMessage({ url });
  };

  const isPaidArticle = dom => {
    // search for stars
    const parentContainer =
      dom.closest(".extremeHero-postContent") ||
      dom.closest(".extremePostPreview-post") ||
      dom.closest("li.u-flex.u-marginBottom24");

    return !!parentContainer.querySelector(".svgIcon--star");
  };

  const redirect = url => {
    window.location.replace(url);
  };

  const openWithIncognito = e => {
    e.preventDefault();
    e.stopPropagation();

    // if it's a link to the article, then open in incognito
    if (
      (e.target.nodeName === "H3" && e.target.parentNode.nodeName === "A") ||
      e.target.className.includes("ui-summary")
    ) {
      // the click is on the title/subtitle
      if (isPaidArticle(e.target)) {
        incognito(e.target.parentNode.href);
      } else {
        redirect(e.target.parentNode.href);
      }
    } else if (
      e.target.href &&
      e.target.className.includes("extremeHero-image")
    ) {
      // the click is on the title image
      // NOT WORKING
      if (isPaidArticle(e.target)) {
        incognito(e.target.href);
      } else {
        redirect(e.target.href);
      }
    } else if (e.target.href) {
      redirect(e.target.href);
    } else {
      return true;
    }
    return false;
  };

  console.log("Initialized Freedium");

  const homeContainer = document.getElementsByClassName("homeContainer")[0];
  homeContainer.addEventListener("click", openWithIncognito);
})();
