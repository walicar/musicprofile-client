import {
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
const className = "h-6 w-6";
const statusIcons: StatusIcons = {
  promoted: (
    <ChevronUpIcon data-label="promoted" className={className} color="green" />
  ),
  unchanged: <MinusIcon data-label="unchanged" className={className} />,
  demoted: (
    <ChevronDownIcon data-label="demoted" className={className} color="red" />
  ),
};

export default statusIcons;
