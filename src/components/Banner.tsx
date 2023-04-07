import React, { useContext, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Context } from "../Context";
import { User } from "@auth0/auth0-react";
export function Banner() {
	const { currentUser } = useContext(Context);
	const [showModal, setShowModal] = useState(false);
	return (
		<section className="bg-banner-pattern px-5 py-3 flex items-center justify-between banner relative border-b-2 lg:ml-28">
			<div className="grid grid-cols-3 z-10 items-center gap-x-2">
				<div className="row-span-3 col-span-1 flex items-center justify-center">
					<div className="flex flex-col items-center relative w-3/5">
						<img
							// src="https://lh3.googleusercontent.com/a/AGNmyxYOWA-5hsH5R8WP2J7Gqt5YZsVzKK4ujW4unKqF9g=s96-c"
							src={currentUser?.picture}
							alt="profile-photo"
							className="rounded-full max-w-[5rem]"
						/>
						<button
							onClick={() => setShowModal(true)}
							className="bg-[#202b47] text-white p-1 rounded-full max-w-fit lg:text-lg absolute -bottom-2">
							<MdEdit />
						</button>
					</div>
				</div>
				<span className="sm:text-lg lg:text-xl col-span-2 ">
					Hello,
				</span>
				<span className="text-lg lg:text-xl col-span-2 font-bold leading-4">
					{currentUser?.name}
				</span>
				<span className="sm:text-base lg:text-lg col-span-2 leading-9">
					{currentUser?.email}
				</span>
			</div>
			<button className="z-10 md:text-lg font-medium">
				<span>0 </span>
				<span>Followers</span>
			</button>
			{showModal && <ProfileEditModal setShowModal={setShowModal} />}
		</section>
	);
}
function ProfileEditModal(props) {
	const { performFetch, currentUser } = useContext(Context);
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const number = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	async function handleSave() {
		setError("");
		if (firstName.current && lastName.current && number.current) {
			try {
				const formData = {
					email: currentUser.email,
					name:
						firstName.current?.value +
						" " +
						lastName.current?.value,
					number: number.current?.value || null,
				};
				await performFetch({ url: "update", formData });
			} catch (err) {
				setError(err);
				console.error(err);
			} finally {
				if (error === "") {
					props.setShowModal(false);
					setError("");
				}
			}
		}
	}
	return (
		<div className="z-30   bg-orange-900 bg-opacity-10 w-screen h-screen fixed top-0 flex justify-center items-center">
			<div className="flex flex-col bg-white px-10 py-6 rounded-lg">
				{error !== "" && (
					<div className="text-white text-base bg-red-400 p-2">
						{error}
					</div>
				)}
				<div className="row-span-3 col-span-1 flex items-center justify-center">
					<div className="flex flex-col items-center relative w-3/5">
						<img
							// src="https://lh3.googleusercontent.com/a/AGNmyxYOWA-5hsH5R8WP2J7Gqt5YZsVzKK4ujW4unKqF9g=s96-c"
							src={currentUser?.picture}
							alt="profile-photo"
							className="rounded-full"
						/>
						<button
							onClick={() => props.setShowModal(true)}
							className="bg-[#202b47] text-white p-1 rounded-full max-w-fit lg:text-lg absolute -bottom-2">
							<MdEdit />
						</button>
					</div>
				</div>
				<label
					htmlFor="firstname"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					First Name
				</label>
				<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between lg:w-[40rem]">
					<input
						type="text"
						id="firstname"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="First Name"
						defaultValue={currentUser.name.split(" ")[0]}
						ref={firstName}
					/>
				</div>
				<label
					htmlFor="lastname"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					Last Name
				</label>
				<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
					<input
						type="text"
						id="lastname"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="Last Name"
						value={currentUser.name.split(" ")[1]}
						ref={lastName}
					/>
				</div>
				<label
					htmlFor="email"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					Email
				</label>
				<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
					<input
						type="email"
						id="email"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="Confirm Password"
						value={currentUser.email}
						disabled
					/>
				</div>
				<label
					htmlFor="number"
					className="mt-4 mb-2 font-medium text-base text-slate-600">
					Mobile Number
				</label>
				<div className="flex bg-slate-100 rounded-lg px-4 py-2 justify-between">
					<input
						type="text"
						id="number"
						className="outline-none border-none focus:ring-0 bg-slate-100 text-xs w-full"
						placeholder="Mobile Number"
						defaultValue={currentUser.number || ""}
						ref={number}
					/>
				</div>
				<div className="flex gap-4 mt-8 justify-end">
					<button
						onClick={() => props.setShowModal(false)}
						className="py-2 px-10 text-xs bg-gray-900 rounded-md text-white hover:bg-gray-700 transition duration-200">
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="py-2 px-10 text-xs bg-orange-400 rounded-md text-white hover:bg-orange-300 transition duration-200">
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
