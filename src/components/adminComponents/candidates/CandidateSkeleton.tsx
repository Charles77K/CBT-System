// TableSkeleton.jsx
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

export default function CandidateSkeleton({ rows = 5, columns = 6 }) {
	return (
		<table className="w-full text-sm text-left">
			<thead className="bg-gray-100 text-gray-700 text-xs">
				<tr>
					{Array(columns)
						.fill(0)
						.map((_, colIndex) => (
							<th key={colIndex} className="px-4 py-2">
								<Skeleton width={100} />
							</th>
						))}
				</tr>
			</thead>
			<tbody>
				{Array(rows)
					.fill(0)
					.map((_, rowIndex) => (
						<tr key={rowIndex} className="border-b text-xs">
							{Array(columns)
								.fill(0)
								.map((_, colIndex) => (
									<td key={colIndex} className="px-4 py-2">
										<Skeleton width={80} />
									</td>
								))}
						</tr>
					))}
			</tbody>
		</table>
	);
}

CandidateSkeleton.propTypes = {
	rows: PropTypes.number.isRequired,
	columns: PropTypes.number.isRequired,
};
