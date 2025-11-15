import { useEffect } from "react";

const useScrollReveal = (callback, element) => {
  useEffect(() => {
    let revealed = false;
    const handleScroll = () => {
      if (revealed) return;
      const scrollElement = document.getElementById(element);
      if (scrollElement) {
        const elementBorder = scrollElement.getBoundingClientRect();
        if (elementBorder.top <= window.innerHeight) {
          callback()
          revealed = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, element]);
}

export default useScrollReveal