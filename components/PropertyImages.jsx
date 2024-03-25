import Image from "next/image";
const PropertyImages = ({ image }) => {
  console.log("imagecvbcvbvbcvb", image);
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {image.length === 1 ? (
          <Image
            src={image[0]}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover h-[400px] mx-auto rounded-xl"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {image.map((ima, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    image.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Image
                    src={ima}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-cover h-[400px] w-full rounded-xl"
                    priority={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
