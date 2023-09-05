import {
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
const className = "h-6 w-6";
const statusIcons: StatusIcons = {
  promoted: (
    <ChevronUpIcon data-label="promoted" className={className +  " rounded-full bg-green-200 text-green-900"} />
  ),
  unchanged: <MinusIcon data-label="unchanged" className={className + " rounded-full bg-gray-100"} />,
  demoted: (
    <ChevronDownIcon data-label="demoted" className={className + " rounded-full bg-red-200 text-red-900"} />
  ),
};

export default statusIcons;
