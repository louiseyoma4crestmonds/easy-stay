import HeroSec from "@/molecules/HeroSec";
import { useState } from "react";

function Home(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <HeroSec />

      {/* Add other components as needed */}
    </div>
  );
}

export default Home;
