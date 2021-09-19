import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

function StreamShow(props) {
  const id = props.match.params.id;
  const videoRef = useRef();
  let player;

  useEffect(() => {
    props.fetchStream(id);
    buildPlayer();
    return () => player?.destroy();
  }, []);

  useEffect(() => {
    buildPlayer();
  }, [props.stream]);

  const buildPlayer = () => {
    if (!props.stream) {
      return;
    }
    console.log(id);

    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };

  if (!props.stream) return <div>Loading</div>;
  const { title, description } = props.stream;
  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls={true} />
      <h1>{title}</h1>
      <h1>{description}</h1>
    </div>
  );
}

const mapStateToProps = (state, owmProps) => {
  return { stream: state.streams[owmProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
