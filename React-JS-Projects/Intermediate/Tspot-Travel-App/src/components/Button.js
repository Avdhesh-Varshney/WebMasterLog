import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  // conditional button class
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  // conditional button size.
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return(
    <Link to="/sign-up" className="btn-mobile">
      <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      type={type}
      onClick={onClick}>
        {children}
      </button>
    </Link>
  )
};
