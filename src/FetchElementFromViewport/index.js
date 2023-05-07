//After that we have to capture the items from viewport
const checkElementInViewport = (element) => {
  const elementDimension = element.getBoundingClientRect();
  const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewPortWidth =
    window.innerWidth || document.documentElement.clientWidth;

  return (
    elementDimension.top >= 0 &&
    elementDimension.left >= 0 &&
    elementDimension.right <= viewPortWidth &&
    elementDimension.bottom <= viewPortHeight
  );
};

//If user stops scrolling  : so we have to use debounded scroll event

const detect = () => {
  const resultedElements = [];
  const blocks = document.querySelectorAll(".blocks");
  blocks.forEach((element) => {
    if (checkElementInViewport(element)) {
      resultedElements.push(element.textContent);
    }
  });
  console.log(resultedElements);
};
const deboundedFunction = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const debouncedDetect = deboundedFunction(detect, 1000);
window.addEventListener("scroll", debouncedDetect, false);
