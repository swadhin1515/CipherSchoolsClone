import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
export function ProfessionalInformation() {
	return (
		<section className="border-b-2 pb-10 mt-10 lg:mx-10 lg:ml-40 mx-4">
			<header className="flex justify-between items-center mb-4">
				<h1 className="font-bold text-base">
					PROFESSIONAL INFORMATION
				</h1>
				<button className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
					Edit
				</button>
			</header>
			<div className="grid grid-cols-2 gap-10">
				<div>
					<h2 className="text-base font-medium mb-2 text-gray-600">
						Highest Education
					</h2>
					<div className="p-3 text-base text-gray-600  rounded-lg items-center bg-white flex justify-between">
						<span>Graduation</span>
						<RiArrowDropDownLine />
					</div>
				</div>
				<div>
					<h2 className="text-base font-medium mb-2 text-gray-600">
						What do you do currently?
					</h2>
					<div className="p-3 text-base  text-gray-600 rounded-lg items-center bg-white flex justify-between">
						<span>College Student</span>
						<RiArrowDropDownLine />
					</div>
				</div>
			</div>
		</section>
	);
}
