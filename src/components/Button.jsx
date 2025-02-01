import PropTypes from "prop-types";

export default function Button({ children, className, ...props }) {
	return (
		<div>
			<button
				type="submit"
				className={
					className
						? className
						: "w-full p-2 bg-brandBlue text-white rounded-md hover:bg-blue-800 cursor-pointer transition-all ease-in-out duration-200"
				}
				{...props}
			>
				{children}
			</button>
		</div>
	);
}
Button.propTypes = {
	children: PropTypes.element.isRequired,
	className: PropTypes.string,
};
