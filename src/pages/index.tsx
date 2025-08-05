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

  return (
    <AppLayout>
      <div className="flex flex-col space-y-4 desktop:flex-row desktop:space-x-6 desktop:mb-6 desktop:space-y-0">
        <div className="w-full desktop:w-3/4 space-y-6 mt-4 lg:mt-0">
          <Panel variant="deepBlue">
            <div className="p-4 lg:px-4 lg:py-8">
              <span className="flex">My learning path</span>
              <Heading
                Tag="h1"
                variant="xxl"
                mode="dark"
                className="mb-7 lg:mb-10"
              >
                Agile Business Analyst
              </Heading>
              <Button variant="accent" onClick={() => setShowModal(true)}>
                Continue learning
              </Button>
            </div>
          </Panel>
        </div>
        <div className="hidden desktop:block desktop:w-1/4">
          <Panel>
            <div className="px-4 py-8">
              <span className="flex">Current course</span>
              <Heading Tag="h4" variant="sm" className="mb-7 lg:mb-10">
                First learning journey
              </Heading>
            </div>
          </Panel>
        </div>
      </div>

      <div className="">
        <div className="flex w-full space-x-7">
          <div className="w-3/4">
            <Panel>
              <div className="p-3">
                <Heading Tag="h3" variant="lg" className="mb-8">
                  First learning journey
                </Heading>
                <div className="flex font-medium text-crest-gray justify-between mb-5">
                  <span>Learning objective</span>
                  <span>Progress Status</span>
                </div>
              </div>
            </Panel>
          </div>
          <div className="w-1/4">
            <Panel>
              <Heading Tag="h3" variant="md" className="mb-8">
                Points leaderboard
              </Heading>
            </Panel>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="p-4 mt-10 bg-crest-deep-blue rounded text-white"
        onClick={() => setShowModal(true)}
      >
        Open Modal Test
      </button>
      <Modal onClose={() => onCloseModal()} isOpen={showModal}>
        <p className="mb-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          voluptatum tempora debitis exercitationem reprehenderit alias velit,
          eveniet, eligendi ipsum vel odio sit suscipit fugiat a officia, eaque
          minus asperiores libero.
        </p>
        <button
          type="button"
          className="bg-crest-purple text-white px-3 py-2 rounded-md"
          onClick={() => onCloseModal()}
        >
          Close Modal Button Test
        </button>
      </Modal>
    </AppLayout>
  );
}

export default Home;
