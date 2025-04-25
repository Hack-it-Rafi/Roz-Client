import { Bot, Speech, Settings, User, LogOut } from "lucide-react";

const DashNav = ({ onLinkClick }: { onLinkClick: (label: string) => void }) => {
  return (
    <div className="bg-[#171717] border-r-2">
      <nav className="flex gap-4">
        <DashNavLink icon={<Bot size={20} />} label="AI Jobs" onClick={onLinkClick} />
        <DashNavLink icon={<Speech size={20} />} label="Applied Jobs" onClick={onLinkClick} />
        {/* <DashNavLink icon={<Settings size={20} />} label="Settings" onClick={onLinkClick} />
        <DashNavLink icon={<User size={20} />} label="Profile" onClick={onLinkClick} /> */}
      </nav>
    </div>
  );
};

const DashNavLink = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: (label: string) => void;
}) => (
  <button
    onClick={() => onClick(label)}
    className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-700 transition-all duration-200 text-gray-300 hover:text-white"
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default DashNav;
