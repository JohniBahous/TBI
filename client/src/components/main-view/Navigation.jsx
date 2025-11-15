import { useState } from "react";
import "../../style/main-view/navigation.css";
import { HarpIcon } from "../../assets/icons";
import useScrollRender from "../../hooks/useScrollRender";

const Navigation = () => {
  const [revealName, setRevealName] = useState(false);
  useScrollRender(() => {
    setRevealName(true);
  }, "villain");

  return (
    <div className="navigation">
      <div className="navigation-title">
        {revealName ? (
          <p className="navigation-title-text">BRAGI BRAGI BRAGI</p>
        ) : (
          <img src={HarpIcon} alt="Website logo in the shape of a small harp" />
        )}
      </div>
      <ul className="navigation-ul">
        <li className="navigation-element">
          <a href="#pillars">THE FEATURED</a>
        </li>
        <li className="navigation-element">
          <a href="#strings">THE STRINGS</a>
        </li>
        <li className="navigation-element">
          <a href="#villain">THE WE</a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
