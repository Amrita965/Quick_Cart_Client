import logo from "../../assets/logo/quick-cart-logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <section className="footer text-base-content p-10 mt-32 md:max-w-sreen-md lg:max-w-sreen-lg xl:max-w-screen-xl mx-auto">
        <aside>
          <img className="w-16" src={logo} alt="logo" />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
