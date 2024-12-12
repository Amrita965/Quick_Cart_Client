const HappyClientSpotlight = ({ client }) => {
  const { name, title, image } = client;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={image} alt="Shoes" />
      </figure>
      <div className="card-body gap-0 p-4">
        <h2 className="text-xl font-semibold text-center">{name}</h2>
        <p className="text-center">
          <small>{title}</small>
        </p>
      </div>
    </div>
  );
};

export default HappyClientSpotlight;
