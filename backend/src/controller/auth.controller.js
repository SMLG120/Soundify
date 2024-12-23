import { User } from "../models/user.model.js"; // User

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        //check if user already eixsts
        const user = await User.findOne({ clerkId: id });
        if (!user) {
            // sign up
            await User.create({
                clerkId: id,
                fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl,
            })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        console.log("Error in auth callback", error);
        res.status(500).json({ message: "Internal server error", error });
        next(error);
    }
}