import { Home, LayoutDashboard, Settings, Speech, User, LogOut } from "lucide-react";

const Sidebar = ({ onLinkClick }: { onLinkClick: (label: string) => void }) => {
  return (
    <div className=" w-64 bg-[#171717] from-gray-900 to-gray-800 text-white flex flex-col border-r-2">
      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink icon={<Home size={20} />} label="Home" onClick={onLinkClick} />
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={onLinkClick} />
        <SidebarLink icon={<Speech size={20} />} label="Seek Jobs" onClick={onLinkClick} />
        <SidebarLink icon={<User size={20} />} label="Profile" onClick={onLinkClick} />
      </nav>

      {/* <div className="p-4 border-t border-gray-700">
        <SidebarLink icon={<LogOut size={20} />} label="Logout" onClick={onLinkClick} />
      </div> */}
    </div>
  );
};

const SidebarLink = ({
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

export default Sidebar;
