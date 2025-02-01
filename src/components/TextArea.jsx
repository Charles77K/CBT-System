import PropTypes from "prop-types";
import { forwardRef } from "react";

const TextArea = forwardRef(({ name, label, rows, error, ...props }, ref) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="text-xs md:text-sm">
				{label}
			</label>
			<textarea
				id={name}
				name={name}
				ref={ref} // Correct use of `ref`
				rows={rows}
				{...props}
				className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
			/>
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</div>
	);
});

TextArea.displayName = "TextArea";

TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Allow both string and number
	error: PropTypes.any,
};

export default TextArea;
