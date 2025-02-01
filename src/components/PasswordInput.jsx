import PropTypes from "prop-types";
import { forwardRef } from "react";

const PasswordInput = forwardRef(
	({ htmlFor, label, icon, type, icon2, onClick, error, ...props }, ref) => {
		return (
			<div className="text-sm flex flex-col gap-1">
				<label htmlFor={htmlFor}>{label}</label>
				<div className="flex gap-1 border-2 border-gray-200 p-2 rounded-md">
					{icon}
					<input
						className="text-xs flex-1 bg-transparent outline-none"
						type={type || "text"}
						{...props}
						ref={ref}
						required
					/>
					<div onClick={onClick} className="cursor-pointer">
						{icon2}
					</div>
				</div>
				{error && <p className="text-red-500 text-xs">{error}</p>}
			</div>
		);
	}
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

PasswordInput.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	icon2: PropTypes.element.isRequired,
	type: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	error: PropTypes.string,
};
