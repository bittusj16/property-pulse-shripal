import Image from "next/image";
const PropertyImageHeader = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover h-[400px] w-full"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyImageHeader;
