import classNames from "classnames";
import Image from "next/image";
import { ButtonProps } from "./Button.types";

import styles from "./Button.module.css";

function Button(props: ButtonProps) {
  const {
    variant = "primary",
    width = "normal",
    disabled = false,
    onClick,
    children,
    image,
    imageWidth,
    height,
  } = props;

  const btnClassName = classNames({
    [styles.btn]: true,
    [styles.btnFull]: width === "full",
    [styles.btnPrimary]: variant === "primary",
    [styles.btnSecondary]: variant === "secondary",
    [styles.btnMuted]: variant === "muted",
    [styles.btnAccentWithImg]: variant === "accentWithImg",
    [styles.btnBlack]: variant === "black",
  });

  // const handleOnClick = () => onClick;

  return (
    <button
      type="submit"
      className={btnClassName}
      onClick={() => onClick?.()}
      disabled={disabled}
    >
      {variant === "accentWithImg" ? (
        <Image src={image} width={imageWidth} height={height} />
      ) : (
        ""
      )}
      {children}
    </button>
  );
}

export default Button;
