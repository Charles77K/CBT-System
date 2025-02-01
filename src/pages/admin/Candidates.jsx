import CreateCandidate from "./adminComponents/candidates/CreateCandidate";
import ViewCandidates from "./adminComponents/candidates/ViewCandidates";

export default function Candidates() {
	return (
		<div>
			<CreateCandidate />
			<hr className="my-5"></hr>
			<ViewCandidates />
		</div>
	);
}
