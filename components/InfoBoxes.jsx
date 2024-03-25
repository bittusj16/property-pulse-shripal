import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    // <!-- Renters and Owners -->
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            children={
              "Find your dream rental property. Bookmark properties and contact owners."
            }
            buttonInfo={{
              link: "/property",
              text: "Add Renters",
              backgroundColor: "bg-black",
            }}
          />
          <InfoBox
            heading={"For Property Owners"}
            children={
              "List your properties and reach potential tenants. Rent as an airbnb or long term."
            }
            buttonInfo={{
              link: "/property/add",
              text: "Add Property",
              backgroundColor: "bg-blue-500",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
