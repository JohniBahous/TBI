import { useState, useEffect } from "react";
import { Button, Input } from "../main-view/index.js";
import "../../style/main-view/form.css";
import { SendEmailIcon } from "../../assets/icons";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("formSubmitted");
    if (isSubmitted) {
      setSubmitted(true);
    }
    setHasLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formSubmitted", "true");
    setSubmitted(true);
    setName("");
    setEmail("");
  };

  if (!hasLoaded) return null;

  return (
    <form onSubmit={handleSubmit} className="form" action="#" method="get">
      {submitted ? (
        <div>
          <h2>
            Thanks for your interest, we will be getting back to you shortly.
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem("formSubmitted");
              setSubmitted(false);
            }}
          >
            Reset Form
          </button>
        </div>
      ) : (
        <div>
          <div className="form-inputField">
            <Input
              name="Fullname"
              placeholder="Full Name"
              type="text"
              shade="dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="Email"
              placeholder="Email"
              type="email"
              shade="dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-submitButton">
            <Button
              size="big"
              invisible
              alt="Send Button in the shape of an envelop with visual effects"
              icon={SendEmailIcon}
              color="black"
              type="submit"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
