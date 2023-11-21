/* eslint-disable react/prop-types */
import { randomColor } from "../../utilities/helpers";

export const DummyImage = ({ size }) => {
  return (
    <div
      className="dummy-image"
      role="img"
      style={{
        backgroundColor: randomColor(),
        height: `${size}`,
        width: `${size}`,
        borderRadius: "50%",
        opacity: "0.2",
      }}
    ></div>
  );
};
