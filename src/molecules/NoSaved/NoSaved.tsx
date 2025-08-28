import Button from "@/atoms/Button";
import styles from "./NoSaved.module.css";
import { useRouter } from "next/router";

function NoSaved() {
  const router = useRouter();

  const exploreApartments = () => {
    router.push("/");
  };

  return (
    <div className={styles.maindiv}>
      {/* <div className="flex flex-col justify-center items-center "> */}
      <img
        src="/images/no-saved.png"
        width={160}
        height={100}
        className="mt-5 "
      />
      <p className={styles.text}>You have nothing saved yet</p>
      <p className={styles.P1}>
        Time to explore and fill your wishlist with all the apartments you would
        love to book.
      </p>
      <Button variant="primary" onClick={exploreApartments}>
        Explore Apartments
      </Button>
      {/* </div> */}
    </div>
  );
}

export default NoSaved;
