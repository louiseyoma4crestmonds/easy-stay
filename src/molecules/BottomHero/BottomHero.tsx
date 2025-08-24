import Button from "@/atoms/Button";
import { useRouter } from "next/router";
import styles from "./BottomHero.module.css";

type BottomHeroProps = {
  backgroundImage: string;
  leftImage?: string;
  title?: string;
  divClass?: string;
  description?: string;
  hasOverlay?: boolean;
  buttons?: {
    label?: string;
    link?: string;
    variant?: string;
    onClick?: () => void;
  }[];
};

function BottomHero({
  backgroundImage,
  leftImage,
  title,
  description,
  buttons,
  hasOverlay,
  divClass,
}: BottomHeroProps) {
  const router = useRouter();
  return (
    <section className="relative w-full">
      <img
        src={backgroundImage}
        alt="section bg"
        className="w-full object-cover "
      />

      {hasOverlay && (
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50" />
      )}

      <div className={styles.firstdiv}>
        {leftImage && (
          <img
            src={leftImage}
            alt="side visual"
            className="w-[200px] h-[200px] "
          />
        )}
        <div className={`flex flex-col ${divClass} `}>
          <p className={styles.P1}>{title} </p>
          <p className={styles.P2}>{description}</p>
          {/* <div className="pt-3">
            <Button variant="explore">Explore Apartments</Button>
          </div> */}
          <div className="pt-3">
            {(buttons ?? []).map((btn, idx) => (
              <Button
                key={idx}
                type="button"
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

export default BottomHero;
