import Button from "@/atoms/Button";

import styles from "./SignupLeftside.module.css";

export type SignupLeftsideProps = {
  text?: string;
  onClick?: () => void;
};

function SignupLeftside({ text, onClick }: SignupLeftsideProps) {
  return (
    <div className="h-full relative">
      {/* Background Image */}
      <img
        src="/images/homepage-bg.png"
        alt="Signup background"
        className="h-full w-full object-cover"
      />

      {/* Centered Transparent Modal */}
      <div className={styles.bgdiv}>
        <div className={styles.bgSecond}>
          <h2 className={styles.reviewH2}>
            Ready to find the perfect Short let
          </h2>
          <p className={styles.reviewP2}>We've got you covered.</p>
          <div className="flex justify-between gap-3 w-[78%] mt-7 mb-14">
            <div>
              <img
                src="/images/Frame.png"
                alt="review pic"
                className="h-full w-full object-cover"
              />{" "}
            </div>
            <div className="flex flex-col ">
              <div className="flex items-center mb-1 gap-1">
                <div>
                  {" "}
                  <img
                    src="/images/Stars.png"
                    alt="stars"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className=" text-gray-50 font-normal text-base">5.0</p>
              </div>
              <p className={styles.reviewP}>from 200+ reviews</p>
            </div>
          </div>

          <Button variant="primary" width="full" onClick={onClick}>
            {text}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignupLeftside;
