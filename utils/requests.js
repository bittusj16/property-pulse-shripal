const apidomain = process.env.NEXT_PUBLIC_DOMAIN_VERCEL_URL || null;

//Fetch all property
async function fetchProperties() {
  try {
    //Handle the case where the domain is not available yet.
    if (!apidomain) {
      return [];
    }

    const res = await fetch(`${apidomain}/property`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("err", error);
    return [];
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    //Handle the case where the domain is not available yet.
    if (!apidomain) {
      return null;
    }

    const res = await fetch(`${apidomain}/property/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("err", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
