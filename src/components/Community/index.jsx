/* eslint-disable react/prop-types */
import "./index.scss";
import moment from "moment";
export const Community = ({ community }) => {
  const { subscribers, display_name_prefixed, public_description, created } =
    community.data;
  return (
    <div className="community-wrapper">
      <div className="community-top">
        <h1>{display_name_prefixed}</h1>
        <small>Created {moment.unix(created).fromNow()}</small>
      </div>
      <div className="community-bottom">
        <span>{public_description}</span>
        <br />
        <span>subscribers: {subscribers}</span>
      </div>
    </div>
  );
};
