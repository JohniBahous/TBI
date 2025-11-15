import "../../style/main-view/villain.css";
// import { Button, Form } from "./index.js";
// import { UpArrowIcon, DownArrowIcon } from "../../assets/icons";

const Villain = () => {
  // const [show, setShow] = useState(false);
  // const handleCollapsibleClick = () => setShow(!show);
  const lineCount = 9;
  return (
    <div className="villain" id="villain">
      <div className="villain-title">
        <div className="villain-title-left">THE BR</div>
        <div className="villain-title-right">AGI INITIATIVE</div>
      </div>
      <div className="villain-body">
        <div className="villain-body-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias hic,
          cumque vel odio at sed provident quo deleniti minus obcaecati nulla
          libero. Accusantium illo a magnam aperiam magni aspernatur rerum.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
          temporibus, quae consequuntur sequi porro molestiae nemo! Repellat,
          obcaecati. Quaerat quibusdam sed reiciendis sunt. Quo, amet eum
          nostrum ex facere sunt.
        </div>
        <div className="villain-body-middle">
          AGI AGI AGI AGI AGI AGI AGI AGI AGI
        </div>
        <div className="villain-body-right">
          <span className="villain-body-right-text">INIT</span>
        </div>
      </div>
      <div>
        {Array.from({ length: lineCount }).map((_, i) => (
          <hr
            key={i}
            style={{
              border: "none",
              height: `${1 + i}px`,
              backgroundColor: "#1A1A1A",
            }}
          />
        ))}
      </div>
      <div className="villain-eot">BRAGI --- END OF TRANSMISSION --- BRAGI</div>
      {/* <div className="villain-form">
        <h2>Want to get featured</h2>
        <Button
          invisible
          size="big"
          alt="Chevron pointing downwards"
          icon={show ? UpArrowIcon : DownArrowIcon}
          color="black"
          onClick={handleCollapsibleClick}
        ></Button>
        {show && <Form />}
      </div> */}
    </div>
  );
};

export default Villain;
