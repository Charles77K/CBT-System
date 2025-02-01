import PropTypes from "prop-types";

export default function Overviews({ icon, title, number }) {
	return (
		<div className="flex justify-center text-xs items-center border-2 rounded-xl bg-white text-black min-h-20 max-w-[15rem] w-full h-full">
			<div className="flex gap-5 items-start">
				<section className="rounded-full bg-gray-100 p-2">
					<div className="rounded-full bg-white p-2 shadow-sm shadow-gray-400">
						{/* <MdPeopleAlt color="blue" size={15} /> */}
						{icon}
					</div>
				</section>
				<section className="space-y-2">
					<p className="text-gray-700 font-normal">{title}</p>
					<p className="font-semibold text-sm text-gray-800">{number}</p>
				</section>
			</div>
		</div>
	);
}

Overviews.propTypes = {
	icon: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
};
