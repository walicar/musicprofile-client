const Footer: React.FC = () => {
  return (
    <footer
      className="bg-white dark:bg-slate-900 lg:px-8"
      aria-labelledby="footer-heading"
    >
      <div className="my-2 md:flex md:items-center md:justify-between">
        <div className="flex justify-center items-center space-x-6 md:order-2">
          <a
            key="contact"
            href="#"
            className="text-xs text-gray-400 hover:text-gray-300"
          >
            Contact
          </a>
        </div>
        <p className="text-xs text-gray-400 pr-6">
          &copy; 2023 Musicprofile, All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          All copyrighted content on this platform belongs to their respective
          owners. We do not claim ownership over any copyrighted material unless
          explicitly stated.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
