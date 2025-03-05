import ViewCandidates from "../../components/adminComponents/candidates/ViewCandidates";
import CreateCandidate from "../../components/adminComponents/candidates/CreateCandidate";

export default function Candidates() {
  return (
    <div>
      <CreateCandidate />
      <hr className="my-5"></hr>
      <ViewCandidates />
    </div>
  );
}
