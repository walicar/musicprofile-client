import { ArrowPathIcon } from "@heroicons/react/20/solid";
const WidgetLoad: React.FC = () => {
  return (
    <div className="grid grid-rows-2 text-gray-400 justify-center items-center mt-10">
      <div className="flex justify-center items-center mx-auto">
        <ArrowPathIcon className="h-32 w-32" />
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default WidgetLoad;
