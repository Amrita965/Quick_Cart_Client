import manImg from "../../assets/images/man.jpg";
import HappyClientSpotlight from "./HappyClientSpotlight";

const HappyClientsSpotlight = () => {
  const clients = [
    {
      id: 1,
      name: "Jhon Doe",
      title: "CEO & Founder",
      image: manImg,
    },
    {
      id: 2,
      name: "Jhon Doe",
      title: "CEO & Founder",
      image: manImg,
    },
    {
      id: 3,
      name: "Jhon Doe",
      title: "CEO & Founder",
      image: manImg,
    },
    {
      id: 4,
      name: "Jhon Doe",
      title: "CEO & Founder",
      image: manImg,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-3">
      {clients.map((client) => (
        <HappyClientSpotlight key={client.id} client={client} />
      ))}
    </section>
  );
};

export default HappyClientsSpotlight;
