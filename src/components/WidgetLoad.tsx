import { ArrowPathIcon } from "@heroicons/react/20/solid";
type Prop = {
  message?: string;
};
const WidgetLoad: React.FC<Prop> = ({ message }) => {
  return (
    <div className="grid grid-rows-2 text-gray-400 justify-center items-center mt-10">
      <div className="flex justify-center items-center mx-auto">
        <ArrowPathIcon className="h-32 w-32" />
      </div>
      <div>{message ? message : "Loading..."}</div>
    </div>
  );
};

export default WidgetLoad;
