import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import PropertySearch from "@/components/PropertySearch";
import Properties from "@/components/Properties";

const page = async () => {
  const { properties } = await fetchProperties();
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default page;
