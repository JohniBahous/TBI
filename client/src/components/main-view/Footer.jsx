import { useState, useEffect } from "react";
import "../../style/main-view/footer.css";
import { GitHubIcon } from "../../assets/icons";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <p className="footer-element">
        <span className="footer-disclaimer">
          This is a portfolio project. Not affiliated with any artist, label or
          music service.
        </span>
      </p>
      <p className="footer-element">
        Johni Bahous •
        <a href="https://github.com/JohniBahous">
          <img
            className="footer-element-icon"
            src={GitHubIcon}
            alt="GitHub logo"
          />
        </a>
        • {year}
      </p>
    </footer>
  );
};

export default Footer;
