import { GetServerSideProps } from "next";

import AppLayout from "@/layouts/AppLayout";
import Heading from "@/atoms/Heading";
import Panel from "@/atoms/Panel";
import Button from "@/atoms/Button";
import NoteItem from "@/molecules/NoteItem";

type MyNotesProps = {
  notes: any;
};

function MyNotes(props: MyNotesProps): JSX.Element {
  const { notes } = props;

  const onAddNewNoteClick = () => {
    console.log("Add new note modal popup"); //  TODO: this will popup add new note model
  };

  const getNoteByID = (id: string) => notes.find((note: any) => note.id === id);

  //  TODO: this will popup view model
  const onViewCallback = (id: string) => {
    const noteById = getNoteByID(id);
    console.log(noteById);
  };

  //  TODO: this will popup delete model
  const onDeleteCallback = (id: string) => {
    const noteById = getNoteByID(id);
    console.log(noteById);
  };

  return (
    <AppLayout>
      <Heading Tag="h1" variant="xl" className="mb-6">
        My Notes
      </Heading>
      <Panel>
        <div className="p-3">
          <div className="flex justify-between mb-11">
            <div className="flex space-x-5">
              <div className="flex border rounded-lg items-center p-4">
                <input type="text" className="" placeholder="Search" />
              </div>
              <div className="flex border rounded-lg items-center p-4 text-crest-sub-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Sort notes
              </div>
            </div>
            <Button variant="primary" onClick={onAddNewNoteClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New note
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {notes.map((note: any) => (
              <NoteItem
                key={note.id}
                id={note.id}
                title={note.title}
                summary={note.summary}
                timestamp={note.timestamp}
                viewCallback={onViewCallback}
                deleteCallback={onDeleteCallback}
              />
            ))}
          </div>
        </div>
      </Panel>
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = [
    {
      id: "68c0b8b9-c4ce-496e-84e0-7ba0af0cd425",
      title: "Note Title",
      summary:
        "If your looking for a deeper dive into design sprints, why not take up with the source? The Google Design Sprint kit is an",
      text: "Curabitur nisl neque, suscipit eget massa a, suscipit rutrum magna. Pellentesque purus purus, gravida eget finibus vitae, tincidunt nec mi. Sed lacinia posuere tortor vel efficitur. Suspendisse ullamcorper lacus nec sapien feugiat semper. Vivamus bibendum fringilla efficitur. Fusce rutrum ante et eros tempus, sed pellentesque lectus condimentum. Sed a feugiat quam. Pellentesque congue elit augue. Aliquam mattis arcu nec lectus consectetur auctor. Donec nunc est, lobortis ac dolor eu, pharetra maximus mi. Cras a placerat leo, sit amet lobortis purus. Quisque vel ipsum interdum, tempor dui facilisis, finibus nisi.",
      timestamp: "10:15am, 21 Oct, 2021",
    },
    {
      id: "281ed5f2-ca6b-485e-ad7e-ad5c35674f64",
      title: "Note Title",
      summary:
        "If your looking for a deeper dive into design sprints, why not take up with the source? The Google Design Sprint kit is an",
      text: "Curabitur nisl neque, suscipit eget massa a, suscipit rutrum magna. Pellentesque purus purus, gravida eget finibus vitae, tincidunt nec mi. Sed lacinia posuere tortor vel efficitur. Suspendisse ullamcorper lacus nec sapien feugiat semper. Vivamus bibendum fringilla efficitur. Fusce rutrum ante et eros tempus, sed pellentesque lectus condimentum. Sed a feugiat quam. Pellentesque congue elit augue. Aliquam mattis arcu nec lectus consectetur auctor. Donec nunc est, lobortis ac dolor eu, pharetra maximus mi. Cras a placerat leo, sit amet lobortis purus. Quisque vel ipsum interdum, tempor dui facilisis, finibus nisi.",
      timestamp: "12:20am, 21 Oct, 2021",
    },
    {
      id: "22765b87-8978-443b-9d94-8e856e10e341",
      title: "Note Title",
      summary:
        "If your looking for a deeper dive into design sprints, why not take up with the source? The Google Design Sprint kit is an",
      text: "Curabitur nisl neque, suscipit eget massa a, suscipit rutrum magna. Pellentesque purus purus, gravida eget finibus vitae, tincidunt nec mi. Sed lacinia posuere tortor vel efficitur. Suspendisse ullamcorper lacus nec sapien feugiat semper. Vivamus bibendum fringilla efficitur. Fusce rutrum ante et eros tempus, sed pellentesque lectus condimentum. Sed a feugiat quam. Pellentesque congue elit augue. Aliquam mattis arcu nec lectus consectetur auctor. Donec nunc est, lobortis ac dolor eu, pharetra maximus mi. Cras a placerat leo, sit amet lobortis purus. Quisque vel ipsum interdum, tempor dui facilisis, finibus nisi.",
      timestamp: "12:20am, 21 Oct, 2021",
    },
    {
      id: "08806a5a-ef37-4282-bd0a-7f6b9489f1bd",
      title: "Note Title",
      summary:
        "If your looking for a deeper dive into design sprints, why not take up with the source? The Google Design Sprint kit is an",
      text: "Curabitur nisl neque, suscipit eget massa a, suscipit rutrum magna. Pellentesque purus purus, gravida eget finibus vitae, tincidunt nec mi. Sed lacinia posuere tortor vel efficitur. Suspendisse ullamcorper lacus nec sapien feugiat semper. Vivamus bibendum fringilla efficitur. Fusce rutrum ante et eros tempus, sed pellentesque lectus condimentum. Sed a feugiat quam. Pellentesque congue elit augue. Aliquam mattis arcu nec lectus consectetur auctor. Donec nunc est, lobortis ac dolor eu, pharetra maximus mi. Cras a placerat leo, sit amet lobortis purus. Quisque vel ipsum interdum, tempor dui facilisis, finibus nisi.",
      timestamp: "12:20am, 21 Oct, 2021",
    },
  ];

  return {
    props: {
      notes,
    },
  };
};

export default MyNotes;
