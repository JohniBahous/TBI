import "../../style/main-view/input.css";

const Input = (props) => {
  return (
    <div>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
        autocomplete="off"
        className={[`input`, `input-${props.shade}`].join(" ")}
      />
    </div>
  );
};

export default Input;
