import {
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
const className = "h-6 w-6 rounded-full ";
const statusIcons: StatusIcons = {
  promoted: (
    <ChevronUpIcon
      data-label="promoted"
      className={className + "bg-green-200 text-green-900"}
    />
  ),
  unchanged: (
    <MinusIcon
      data-label="unchanged"
      className={className + "bg-gray-100 text-gray-600"}
    />
  ),
  demoted: (
    <ChevronDownIcon
      data-label="demoted"
      className={className + " bg-red-200 text-red-900"}
    />
  ),
  new: (
    <SparklesIcon
      data-label="new"
      className={className + "bg-yellow-200 text-yellow-500"}
    />
  ),
};

export default statusIcons;
