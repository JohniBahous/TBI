import "../../style/main-view/button.css";

const Button = (props) => {
  return (
    <div
      className={
        props.variant == "unstyled" || props.disabled
          ? null
          : `button-back-layer-${props.variant} button-background-${props.color}`
      }
    >
      <button
        type="submit"
        onClick={props.onClick}
        id=""
        alt=""
        disabled={props.disabled}
        className={[
          `button`,
          `button-${props.size}`,
          props.variant == "unstyled"
            ? `button-unstyled button-background-invisible`
            : props.variant == "helper"
            ? `button-variant-helper`
            : props.variant == "snippet"
            ? `button-variant-snippet`
            : null,
          props.invisible ? `button-background-invisible` : null,
          props.outline
            ? `button-outline button-background-${props.color}`
            : null,
          props.disabled ? `button-disabled` : null,
        ].join(" ")}
      >
        {props.icon && (
          <img
            src={props.icon}
            alt={props.alt}
            className={`button-${props.size}-icon button-fill-${props.color}`}
          />
        )}
      </button>
    </div>
  );
};

export default Button;
