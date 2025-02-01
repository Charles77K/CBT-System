import PropTypes from "prop-types";

export default function SelectInput({
	options,
	value,
	onChange,
	label,
	isDisabled,
	optionValue,
	optionMain,
	name,
	multiple,
	style,
	isLoading,
	isError,
}) {
	return (
		<div>
			<label className={`block text-sm font-semibold my-1`}>{label}</label>
			<select
				className={
					style
						? style
						: `block w-full md:w-1/2 bg-gray-100 border border-gray-300 rounded-md`
				}
				name={name}
				value={value}
				onChange={onChange}
				multiple={multiple}
				disabled={isDisabled}
			>
				<option value="All">All Exams</option>

				{isLoading && <option>Loading exams...</option>}
				{isError && <option>Error fetching exams</option>}
				{options?.map((option, index) => (
					<option key={index} value={optionValue(option)}>
						{optionMain(option) ? optionMain(option) : `no ${label} found`}
					</option>
				))}
				{options?.length === 0 && <option>No exams available</option>}
			</select>
		</div>
	);
}

SelectInput.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	value: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	isDisabled: PropTypes.any,
	optionValue: PropTypes.func.isRequired,
	optionMain: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	style: PropTypes.string,
};
