import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "./index.js";
import "../../style/main-view/modal.css";
import { CloseIcon } from "../../assets/icons";

const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (props.state) {
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [props.state]);

  if (!props.state) return null;

  return ReactDOM.createPortal(
    <div className={`modal modal-show`}>
      <div
        className={`modal-content ${
          animate ? `modal-content-show` : ""
        } modal-content-${props.variant}`}
      >
        <Button
          invisible
          size="big"
          color={props.variant === "main" ? "blue" : "green"}
          alt="Close Button, 'X'"
          icon={CloseIcon}
          onClick={() => {
            props.closeModal(false);
          }}
        />
        {props.modalComp}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
