import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputField = forwardRef(
	({ htmlFor, label, icon, type, error, className, ...props }, ref) => {
		return (
			<div className="text-sm flex flex-col gap-1">
				<label htmlFor={htmlFor} className="text-xs md:text-sm">
					{label}
				</label>
				<div className="flex gap-1 border-2 border-gray-200 p-2 rounded-md">
					{icon}
					<input
						className={
							className
								? className
								: `text-xs flex-1 bg-transparent outline-none`
						}
						type={type || "text"}
						{...props}
						ref={ref}
					/>
				</div>
				{error && <p className="text-red-500 text-xs">{error}</p>}
			</div>
		);
	}
);

InputField.displayName = "InputField";

export default InputField;

InputField.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	type: PropTypes.string,
	error: PropTypes.any,
	className: PropTypes.string,
};
