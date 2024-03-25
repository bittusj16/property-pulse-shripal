import connectDB from "@/config/database";
import User from "@/model/User";

import { getSessionUser } from "@/utils/getSessionuser";

export const dynamic = "force-dynamic";

export const POST = async (requset) => {
  try {
    await connectDB();
    const { propertyId } = await requset.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Userid is required", { status: 401 });
    }
    const { userId } = sessionUser;

    //find user in db
    const user = await User.findOne({ _id: userId });
    console.log("user", user);

    //check property is bookmarked

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.log("err", err);
    return new Response("Somthing went wrong", {
      status: 500,
    });
  }
};
