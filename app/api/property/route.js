import connectDB from "@/config/database";
import Property from "@/model/Property";
import { getSessionUser } from "@/utils/getSessionuser";
import { UploadImage } from "@/utils/uploadImage";

// Get all properties...
export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;
    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify({ result }, { status: 200 }));
  } catch (err) {
    console.log("error", err);
    return new Response(
      JSON.stringify({ message: "something went wrong" }, { status: 500 })
    );
  }
};

// set data to db
export const POST = async (request) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const sessionuser = await getSessionUser();

    if (!sessionuser || !sessionuser.user.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }, { status: 400 })
      );
    }
    const { userId } = sessionuser;

    //Access all values from aminities and images

    const amenities = formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    //create property data objects

    const propertyData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // upload image to cloudnary

    const imageUpload = [];

    for (const image of images) {
      const data = await UploadImage(image, "property_pulse");
      imageUpload.push(data.url);
    }
    propertyData.images = imageUpload;
    console.log("propertyData", propertyData);
    const newProperty = new Property(propertyData);
    await newProperty.save();

    console.log("newProperty", newProperty);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL_VERCEL_URL}/property/${newProperty._id}`
    );
  } catch (err) {
    // console.log("error", err);
    return new Response(JSON.stringify(err, { status: 500 }));
  }
};
