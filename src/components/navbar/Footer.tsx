import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="bg-white dark:bg-slate-900 px-1 lg:px-8 mt-2"
      aria-labelledby="footer-heading"
    >
      <div className="my-2 md:flex md:items-center md:justify-between">
        <div className="flex text-gray-400 dark:text-gray-700 justify-center items-center space-x-6 md:order-2">
          <a
            key="contact"
            href="#"
            className="text-xs  hover:text-gray-300"
          >
            Contact
          </a>
          <a
            key="privacy"
            onClick={() => navigate("/privacy")}
            className="text-xs  hover:text-gray-300 hover:cursor-pointer"
          >
            Privacy
          </a>
        </div>
        <div className="flex-col-2 sm:flex text-center">
        <p className="text-xs text-gray-400 dark:text-gray-700 pr-6">
          &copy; 2023 Musicprofile, All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-700 ">
          All copyrighted content on this platform belongs to their respective
          owners. We do not claim ownership over any copyrighted material unless
          explicitly stated.
        </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
