import bannerImg from "../../assets/images/banner-img.gif";

const HeroSection = () => { 
  return (
    <section className="card lg:card-side bg-base-100 items-center rounded-none md:gap-20 mt-14">
      <div className="card-body basis-1/2 justify-center gap-5 p-3">
        <h2 className="card-title text-3xl md:text-3xl md:leading-normal">
          Transform Your Business <br /> with Quick Cart POS!
        </h2>
        <p className="flex-grow-0">
          Experience seamless sales, effortless inventory tracking, and
          data-driven insights with Quick Cart POS. Simplify your operations and
          boost productivity like never before!
        </p>
        <div className="flex gap-2">
          <button className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            START SALE
          </button>
          <button className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            LOGIN
          </button>
        </div>
      </div>
      <figure className="basis-1/2">
        <img src={bannerImg} alt="Album" />
      </figure>
    </section>
  );
};

export default HeroSection;
