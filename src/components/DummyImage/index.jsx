/* eslint-disable react/prop-types */
import { randomColor } from "../../utilities/helpers";

export const DummyImage = ({ size }) => {
  return (
    <div
      className="dummy-image"
      role="img"
      style={{
        backgroundColor: randomColor(),
        minHeight: `${size}`,
        minWidth: `${size}`,
        borderRadius: "50%",
        border: "1px solid grey",
        opacity: "0.2",
      }}
    ></div>
  );
};
