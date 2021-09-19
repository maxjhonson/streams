import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import Modal from "../Modal";

function StreamDelete(props) {
  const id = props.match.params.id;
  useEffect(() => {
    props.fetchStream(id);
  }, []);
  const actions = (
    <React.Fragment>
      <button
        onClick={() => props.deleteStream(id)}
        className="ui button negative"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );
  const renderContent = () => {
    return !props.stream
      ? "Are you sure you want to delete this stream"
      : `Are you sure you want to delete the stream with the title ${props.stream.title}`;
  };
  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
}

const mapStateToProps = (state, owmProps) => {
  return { stream: state.streams[owmProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
