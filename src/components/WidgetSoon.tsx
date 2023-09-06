import { ComputerDesktopIcon } from "@heroicons/react/20/solid";
const WidgetSoon: React.FC = () => {
  return (
    <div className="grid grid-rows-2 text-gray-600 dark:text-slate-600   justify-center items-center mt-10">
      <div className="flex justify-center items-center mx-auto">
        <ComputerDesktopIcon className="h-32 w-32" />
      </div>
      <div className="flex justify-center items-center">
        <div>Coming soon!</div>
      </div>
    </div>
  );
};

export default WidgetSoon;
