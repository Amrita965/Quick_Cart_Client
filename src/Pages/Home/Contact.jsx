const Contact = () => {
  return (
    <section className="card lg:card-side bg-base-100 items-center rounded-none gap-10 my-2 mt-32 px-3">
      <div className="card-body lg:basis-1/2 justify-center gap-5 p-3">
        <h2 className="card-title text-3xl md:leading-normal font-semibold">
          Reach Out to Us: Let's Connect and Explore Opportunities Together
        </h2>
        <div>
          <h3 className="text-2xl font-semibold">Address</h3>
          <p>1686 Geraldine Lane New York, NY 10013</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          <p>hello@wireframes.org</p>
          <p>+ 7-843-672-431</p>
        </div>
      </div>
      <div className="w-full lg:basis-1/2">
        <form className="flex flex-col gap-5" action="">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-secondary w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-secondary w-full"
          />
          <textarea
            className="textarea textarea-secondary"
            rows="5"
            placeholder="Bio"
          ></textarea>
          <button className="btn bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white">
            SEND
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
