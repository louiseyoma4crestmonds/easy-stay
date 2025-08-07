import { useState } from "react";

import AppLayout from "@/layouts/AppLayout";
import Modal from "@/molecules/Modal";
import Panel from "@/atoms/Panel";
import Button from "@/atoms/Button";
import Heading from "@/atoms/Heading";

function Home(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  return <div>HELLO EXPLORE PAGE</div>;
}

export default Home;
