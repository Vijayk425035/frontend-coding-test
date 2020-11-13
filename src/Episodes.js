import React from "react";
import "./style.css";

const Episodes = props => {
  return (
    <div className="container">
      <h1>{props.show.name}</h1>
      <img
        src={
          props.show.image && props.show.image.original.toString().substring(5)
        }
      />
      <div dangerouslySetInnerHTML={{ __html: props.show.summary }} />
    </div>
  );
};

export default Episodes;
