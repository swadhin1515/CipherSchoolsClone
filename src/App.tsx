import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Banner } from "./components/Banner";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { Context } from "./Context";
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "react-cookie";
function App() {
	// const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [signin, setSignin] = useState(true);
	const [cookies, setCookies, removeCookies] = useCookies();
	const [token, setToken] = useState(cookies["token"] || null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(cookies["user"] || null);
	useEffect(() => {
		if (token && token !== undefined) setLoggedIn(true);
	}, []);
	async function handleSignup() {
		try {
			const formData = {
				name: firstName + " " + lastName,
				email: email,
				password: password,
			};
			const responseData = await performFetch({
				url: "register",
				formData,
			});
			if (responseData) {
				await handleSignin();
			}
		} catch (error) {
			console.error(error);
		}
	}
	async function handleSignin() {
		const formData = {
			email: email,
			password: password,
		};
		try {
			const response = await performFetch({ url: "login", formData })
				.then((response) => {
					return response;
				})
				.catch((error) => {
					console.error(error);
				});
			if (response) {
				setToken(response.token);
				setCookies("token", response.token);
				setLoggedIn(true);
			}
		} catch (err) {
			console.log(err);
		}
	}
	async function performFetch({ url, formData }) {
		var myHeaders = new Headers();
		if (url === "update")
			myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");

		var requestOptions: RequestInit = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
		};

		// development
		return await fetch(`http://localhost:5174/api/${url}`, requestOptions)
			// production
			// return await fetch(`/api/${url}`, requestOptions)
			.then(async (response) => {
				if (response.status !== 200) {
					const data = await response.json();
					return null;
				}
				const responseData = await response.json();
				setCurrentUser(responseData.user);
				setCookies("user", responseData.user);
				return responseData;
			})
			.catch((error) => {
				return error;
			});
	}
	function logout() {
		removeCookies("token");
		removeCookies("user");
		setToken(null);
		setCurrentUser(null);
		setLoggedIn(false);
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setSignin(true);
	}
	if (loggedIn)
		return (
			<Context.Provider value={{ currentUser, performFetch }}>
				<Navbar />
				<Sidebar handleLogout={logout} />
				<Banner />
				<Main />
			</Context.Provider>
		);
	else {
		return (
			<div className="flex flex-col h-screen justify-center items-center bg-slate-800 bg-opacity-10">
				<main className="text-center p-5 px-20 bg-white rounded-2xl shadow-md xl:w-[50rem]">
					<header className="text-2xl text-left">Signin</header>
					<h1 className="flex gap-4 text-xl font-medium items-center mt-4 justify-center">
						<img
							src="https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png"
							alt=""
							className="w-10"
						/>
						<span>CipherSchools</span>
					</h1>
					<h2 className="text-lg mt-4">
						{signin ? "Hey, Welcome!" : "Create New Account"}
					</h2>
					<p className="text-base mb-4">
						{signin
							? "Please provide your email and password to signin"
							: "Please provide your valid information to signup"}
					</p>
					{!signin && (
						<>
							<input
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) =>
									setFirstName(e.currentTarget.value)
								}
								className="border-2 border-slate-200 p-3 text-base text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) =>
									setLastName(e.currentTarget.value)
								}
								className="border-2 border-slate-200 p-3 text-base text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
							/>
						</>
					)}
					<input
						type="email"
						placeholder="Email ID"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						className="border-2 border-slate-200 p-3 text-base text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:outline-none focus:border-slate-200"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						className="border-2 border-slate-200 p-3 text-base text-slate-600 bg-slate-100 w-full rounded-xl outline-none focus:ring-0 mt-4 focus:border-slate-200"
					/>
					<button
						onClick={signin ? handleSignin : handleSignup}
						className="bg-orange-400 text-white py-4 px-20 rounded-2xl w-full text-base hover:bg-orange-300 duration-200 transition mt-14">
						{signin ? "Signin" : "Create Account"}
					</button>
					<p className="text-base mt-4">
						{signin
							? "Don't have an account ? "
							: "Already have an account ? "}
						<button
							className="text-orange-400"
							onClick={() => setSignin((prev) => !prev)}>
							{signin ? "Get Started" : "Signin Now"}
						</button>
					</p>
					<div className="text-base relative font-bold border-t-2 mt-8">
						<span className="bg-white relative -top-4 p-4">OR</span>
					</div>
					<button
						// onClick={() => loginWithRedirect()}
						className="bg-white text-slate-800 py-4 px-20 rounded-2xl w-full text-base hover:bg-slate-100 duration-200 transition border-2 border-slate-200 font-medium">
						Login with Socials
					</button>
				</main>
			</div>
		);
	}
}

export default App;
