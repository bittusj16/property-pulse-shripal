"use client";
import { useEffect, useState } from "react";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyImageHeader from "@/components/PropertyImageHeader";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookMarkButton from "@/components/BookMarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const page = () => {
  //useRouter for pushing the navigation to different page.
  // const router = useRouter();

  //useParams is used for getting the ids
  const { id } = useParams();
  // useSearchParams is used for getting  query string
  // const SearchParams = useSearchParams();
  // const name = SearchParams.get("name");

  //usepathname is used for getting route path
  // const Pathname = usePathname();

  const [propertystate, setPropertystate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const { property } = await fetchProperty(id);
        console.log("property", property);
        setPropertystate(property);
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    };

    if (propertystate === null) {
      fetchPropertyData();
    }
  }, [id, propertystate]);

  if (!propertystate && !loading) {
    return (
      <h1 classNameName="text-center text-2xl font-bold m-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {/* <button
        onClick={() => {
          router.push("/");
        }}
        classNameName="bg-blue-500 p-2"
      >
        Go Home {id + " " + name + " " + Pathname}
      </button> */}

      {loading && <Spinner loading={loading} />}
      {!loading && propertystate && (
        <>
          <PropertyImageHeader image={propertystate?.images[0]} />
          {/* <!-- Go Back --> */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/property"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowAltCircleLeft className="fas fa-arrow-left mr-2" /> Back
                to Properties
              </Link>
            </div>
          </section>
          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={propertystate} />
                <aside className="space-y-4">
                  <BookMarkButton property={propertystate} />
                  <ShareButtons property={propertystate} />
                  <PropertyContactForm property={propertystate} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages image={propertystate?.images} />
        </>
      )}
    </>
  );
};

export default page;
