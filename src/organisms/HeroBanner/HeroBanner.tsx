import { useRouter } from "next/router";
import Button from "@/atoms/Button";

import { HeroBannerProps } from "./HeroBanner.types";
import CustomerNavArea from "@/molecules/CustomerNavArea";
import styles from "./HeroBanner.module.css";

function HeroBanner(props: HeroBannerProps) {
  const { primaryText, secondaryText, backgroundImg, buttons, isLoggedIn } =
    props;
  const router = useRouter();

  return (
    <section className=" w-full">
      <CustomerNavArea
        isLoggedIn={isLoggedIn}
        isOnImage={false}
        leftIcon="/images/menu-white.png"
        defaultTextColor="text-gray-500"
      />

      <div className=" relative w-full">
        {/**background image */}
        <img
          src={backgroundImg}
          alt="Section img"
          className=" h-full w-full  "
        />

        <div className={styles.seconddiv}>
          {primaryText && <p className={styles.P1}>{primaryText}</p>}
          {secondaryText && <p className={styles.P2}>{secondaryText}</p>}

          <div className="flex gap-4 pt-3">
            {(buttons ?? []).map((btn, idx) => (
              <Button
                key={idx}
                variant={btn.variant as any}
                onClick={() => {
                  if (btn.onClick) btn.onClick();
                  else if (btn.link) router.push(btn.link);
                }}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
