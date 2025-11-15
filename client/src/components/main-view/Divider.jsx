import "../../style/main-view/divider.css";
import DividerRow from "../../assets/dividers/dividerRow.svg";
import DividerOval from "../../assets/dividers/dividerOval.svg";
import DividerBlob from "../../assets/dividers/dividerBlob.svg";

const Divider = () => {
  return (
    <div className="divider">
      <div className="divider-top">
        <img
          className="divider-top-svg"
          src={DividerBlob}
          alt="Decorative icon in the bottom left side of the section in the shape of two filled connected circles"
        />
        <img
          className="divider-top-svg"
          src={DividerOval}
          alt="Decorative icon in the bottom left side of the section in the shape of an horizontal oval"
        />
      </div>
      <div className="divider-bottom">
        <img
          className="divider-bottom-svg"
          src={DividerRow}
          alt="Decorative strip spanning the entire page width in a checkers pattern"
        />
      </div>
    </div>
  );
};

export default Divider;
