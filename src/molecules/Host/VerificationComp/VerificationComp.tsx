import VerificationHeader from "@/atoms/Host/VerificationHeader";
import styles from "./VerificationComp.module.css";
import { HostIssues } from "src/helpers/dataTypes";
import VerificationTimer from "../VerificationTimer";
import HostIssueAccordion from "../HostIssueAccordion";
import Button from "@/atoms/Button";

type VerificationCompProps = {
  issues: HostIssues[];
};

function VerificationComp(props: VerificationCompProps) {
  const { issues } = props;

  const Categories = [
    {
      label: "Total Properties",
      count: 3,
      bg: "bg-gray-100",
      border: "bg-gray-600",
      image: "/images/explore-default.png",
    },
    {
      label: "Total Apartments ",
      count: 8,
      bg: "bg-blue-100",
      border: "bg-blue-600",
      image: "/images/archive-outline.png",
    },
    {
      label: "Approved Apartments ",
      count: 1,
      bg: "bg-green-100",
      border: "bg-green-600",
      image: "/images/blue_archive_outline.png",
    },
    {
      label: "Rejected Apartments",
      count: 2,
      bg: "bg-red-100",
      border: "bg-red-600",
      image: "/images/red_archive-outline.png",
    },
  ];

  const sharedMessage =
    issues?.[0]?.message || "All properties verified successfully.";
  const sharedTiming = issues?.[0]?.timing || 0;

  return (
    <div className="w-[80%] mt-6 flex justify-center mx-auto  ">
      <div className="space-y-6 ">
        <VerificationTimer timer={sharedTiming} message={sharedMessage} />

        <VerificationHeader categories={Categories} />

        <div className="space-y-4">
          {issues &&
            issues.map((issue, index) => (
              <HostIssueAccordion key={issue.id} issue={issue} index={index} />
            ))}
        </div>

        <div className="flex justify-end ">
          <Button variant="primary">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationComp;
