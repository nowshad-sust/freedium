(() => {
  const openURL = (url, method) => {
    try {
      chrome.runtime.sendMessage({ url, method });
    } catch (e) {
      if (
        e.message.match(/Invocation of form runtime\.connect/) &&
        e.message.match(/doesn't match definition runtime\.connect/)
      ) {
        console.error(
          "Chrome extension, Actson has been reloaded. Please refresh the page"
        );
      } else {
        throw e;
      }
    }
  };

  const isPaidArticle = dom => {
    // search for stars
    const parentContainer =
      dom.closest(".extremeHero-postContent") ||
      dom.closest(".extremePostPreview-post") ||
      dom.closest("li.u-flex.u-marginBottom24") ||
      dom.parentNode; // for click on images

    return parentContainer
      ? !!parentContainer.querySelector(".svgIcon--star")
      : false;
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
        openURL(e.target.parentNode.href, "incognito");
      } else {
        openURL(e.target.parentNode.href, "tab");
      }
    } else if (
      e.target.href &&
      e.target.className.includes("extremeHero-image")
    ) {
      // the click is on the title image
      if (isPaidArticle(e.target)) {
        openURL(e.target.href, "incognito");
      } else {
        openURL(e.target.href, "tab");
      }
    } else if (e.target.href) {
      openURL(e.target.href, "tab");
    } else {
      return true;
    }
    return false;
  };
  try {
    const homeContainer = document.getElementsByClassName("homeContainer")[0];
    homeContainer.addEventListener("click", openWithIncognito);
  } catch (e) {
    setTimeout(() => {
      const homeContainer = document.getElementsByClassName("homeContainer")[0];
      homeContainer.addEventListener("click", openWithIncognito);
    }, 5000);
  }
  console.log("Initialized Freedium");
})();
