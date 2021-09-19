import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import reducers from "../../reducers";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

function StreamCreate(props) {
  const onSubmit = (formValues) => {
    //console.log(formValues);
    props.createStream(formValues);
  };

  return (
    <div>
      <h3>Ctreate a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
}

export default connect(null, { createStream })(StreamCreate);
