import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getFollowerRouter = express.Router();
getFollowerRouter.get("/", function (req, res) {
	res.send("Hello from getFollowerRouter");
});
getFollowerRouter.post("/", async function (req, res, next) {
	const userFollowers = await prisma.user
		.findMany({
			where: {
				id: req.body.id,
				email: req.body.email,
			},
			select: {
				followedBy: true,
			},
		})
		.then((response) => {
			return response;
		});
	const followers = userFollowers.filter((user) => {
		return user.followedBy.length > 0;
	});
	var arr: any = followers[0].followedBy;
	console.log(arr);
	res.status(200).send(arr);
});
