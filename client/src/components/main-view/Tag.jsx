import "../../style/main-view/tag.css";

const Tag = (props) => {
  return (
    <div className={`tag tag-${props.color}`}>
      <p className="tag-content">{props.content}</p>
    </div>
  );
};

export default Tag;
