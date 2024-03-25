import connectDB from "@/config/database";
import User from "@/model/User";
import Property from "@/model/Property";
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

    let message;

    if (isBookmarked) {
      //if already bookmarked , remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmarked removed successfully";
      isBookmarked = false;
    } else {
      //if not bookmarked , remove it
      user.bookmarks.push(propertyId);
      message = "Bookmared added successfully";
      isBookmarked = true;
    }

    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.log("err", err);
    return new Response("Somthing went wrong", {
      status: 500,
    });
  }
};

// get bookmarked api

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Userid is required", { status: 401 });
    }
    const { userId } = sessionUser;

    //find user in db
    const user = await User.findOne({ _id: userId });
    console.log("user", user);

    // get user bookmarks

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    console.log("bookmarks", bookmarks);

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response("Somthing went wrong", {
      status: 500,
    });
  }
};
