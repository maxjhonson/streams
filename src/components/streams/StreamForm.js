import React from "react";
import { Field, reduxForm } from "redux-form";

function StreamForm(props) {
  const renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  const renderInput = (formProps) => {
    const { input, label, meta, type } = formProps;
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    //console.log(formValues);
    props.onSubmit(formValues);
  };

  return (
    <div>
      <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
        <Field name="title" component={renderInput} label="Enter Title" />
        <Field
          name="description"
          component={renderInput}
          label="Enter Description"
          type="text"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "StreamForm",
  validate: validate,
})(StreamForm);
