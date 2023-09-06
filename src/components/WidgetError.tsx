import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
type Prop = {
  message?: string;
};
const WidgetError: React.FC<Prop> = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-rows-2  text-gray-600 dark:text-slate-600 justify-center items-center mt-10">
      <div className="flex justify-center items-center mx-auto">
        <ExclamationTriangleIcon className="h-32 w-32" />
      </div>
      <div className="flex justify-center items-center">
        <div>{message ? message : "An error happened!"}</div>
      </div>
      <button
        className="underline text-sm"
        onClick={() => navigate("/settings")}
      >
        Go to settings
      </button>
    </div>
  );
};

export default WidgetError;
