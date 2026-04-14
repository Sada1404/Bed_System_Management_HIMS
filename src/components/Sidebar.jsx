"use client";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Ambulance,
  BarChart2,
  BarChart3,
  Bed,
  BedIcon,
  Bell,
  Building,
  Calendar,
  CalendarCheck,
  CalendarOff,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  ClipboardCheckIcon,
  ClipboardEdit,
  ClipboardList,
  ClipboardSignature,
  Clock,
  CreditCard,
  DollarSign,
  Droplet,
  Dumbbell,
  Eye,
  FileBadge,
  FileDigit,
  FileEdit,
  FileImage,
  FilePieChart,
  FileSearch,
  FileSignature,
  FileStack,
  FileText,
  FileTextIcon,
  Flag,
  FlaskConicalIcon,
  HeartPulse,
  History,
  Home,
  HomeIcon,
  Info,
  Landmark,
  LayoutDashboard,
  LayoutDashboardIcon,
  LogIn,
  Mail,
  MapIcon,
  MessageSquare,
  MessageSquareIcon,
  Microscope,
  Navigation,
  NotebookPen,
  Package2,
  PackageIcon,
  PaintBucket,
  Phone,
  Pill,
  ScanBarcode,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Skull,
  SquareDashedBottomCode,
  Star,
  Stethoscope,
  StethoscopeIcon,
  TestTube2,
  ThumbsUp,
  User,
  UserPlus,
  Users,
  Users2,
  Utensils,
  Video,
  VideoIcon,
  Wallet,
} from "lucide-react";

const modules = [
  {
    id: "dashboard",
    label: "Dashboard",
    shortLabel: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/dashboard"
  },
  {
    id: "patient",
    label: "Patient",
    shortLabel: "Patient",
    icon: User,
    submodules: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/patient/dashboard",
        icon: SquareDashedBottomCode,
      },
      {
        id: "registration",
        label: "Registration",
        path: "/patient/registration",
        icon: LogIn,
      },
      {
        id: "booking",
        label: "Booking",
        path: "/patient/booking",
        icon: Calendar,
      },
      {
        id: "emergency",
        label: "Emergency",
        path: "/patient/emergency",
        icon: AlertCircle,
      },
      {
        id: "insurance",
        label: "Insurance",
        path: "/patient/insurance",
        icon: Shield,
      },
    ],
  },
  {
    id: "clinic",
    label: "Clinic",
    shortLabel: "Clinic",
    icon: Home,
    submodules: [
      {
        id: "hospitals",
        label: "Hospitals",
        path: "/clinic/hospitals",
        icon: Building,
      },
      {
        id: "doctors",
        label: "Doctors",
        path: "/clinic/doctors",
        icon: Stethoscope,
      },
      {
        id: "specialists",
        label: "Specialists",
        path: "/clinic/specialists",
        icon: Search,
      },
      {
        id: "beds",
        label: "Beds",
        path: "/clinic/beds",
        icon: Bed,
      },
    ],
  },
  {
    id: "policy",
    label: "Policy",
    shortLabel: "Policy",
    icon: FileText,
    submodules: [
      {
        id: "insurance",
        label: "Insurance",
        path: "/policy/insurance",
        icon: Shield,
      },
      {
        id: "schemes",
        label: "Schemes",
        path: "/policy/schemes",
        icon: FileStack,
      },
      {
        id: "details",
        label: "Details",
        path: "/policy/details",
        icon: Info,
      },
      {
        id: "cards",
        label: "Cards",
        path: "/policy/cards",
        icon: CreditCard,
      },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    shortLabel: "Emergency",
    icon: AlertOctagon,
    submodules: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/emergency/dashboard",
        icon: SquareDashedBottomCode,
      },
      {
        id: "detection",
        label: "Detection",
        path: "/emergency/detection",
        icon: Activity,
      },
      {
        id: "redirect",
        label: "Redirect",
        path: "/emergency/redirect",
        icon: Navigation,
      },
      {
        id: "ambulance",
        label: "Ambulance",
        path: "/emergency/ambulance",
        icon: Ambulance,
      },
      {
        id: "alternate",
        label: "Alternate",
        path: "/emergency/alternate",
        icon: MapIcon,
      },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    shortLabel: "Admin",
    icon: Settings,
    submodules: [
      {
        id: "manage",
        label: "Manage",
        path: "/admin/manage",
        icon: FileEdit,
      },
      {
        id: "stats",
        label: "Stats",
        path: "/admin/stats",
        icon: BarChart2,
      },
      {
        id: "approve",
        label: "Approve",
        path: "/admin/approve",
        icon: CheckCircle,
      },
      {
        id: "reviews",
        label: "Reviews",
        path: "/admin/reviews",
        icon: Eye,
      },
    ],
  },
  {
    id: "alerts",
    label: "Alerts",
    shortLabel: "Alerts",
    icon: Bell,
    submodules: [
      {
        id: "reminders",
        label: "Reminders",
        path: "/alerts/reminders",
        icon: Clock,
      },
      {
        id: "alerts",
        label: "Alerts",
        path: "/alerts/alerts",
        icon: AlertTriangle,
      },
      {
        id: "bed-updates",
        label: "Bed Updates",
        path: "/alerts/bed-updates",
        icon: Bed,
      },
      {
        id: "scheme-alerts",
        label: "Scheme Alerts",
        path: "/alerts/scheme-alerts",
        icon: ShieldAlert,
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    shortLabel: "Payments",
    icon: CreditCard,
    submodules: [
      {
        id: "pay",
        label: "Pay",
        path: "/payments/pay",
        icon: Wallet,
      },
      {
        id: "claims",
        label: "Claims",
        path: "/payments/claims",
        icon: FileSignature,
      },
      {
        id: "invoice",
        label: "Invoice",
        path: "/payments/invoice",
        icon: FileText,
      },
      {
        id: "history",
        label: "History",
        path: "/payments/history",
        icon: History
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    shortLabel: "Feedback",
    icon: Star,
    submodules: [
      {
        id: "ratings",
        label: "Ratings",
        path: "/feedback/ratings",
        icon: ThumbsUp,
      },
      {
        id: "feedback",
        label: "Feedback",
        path: "/feedback/feedback",
        icon: MessageSquare,
      },
      {
        id: "public-view",
        label: "Public View",
        path: "/feedback/public-view",
        icon: Eye,
      },
      {
        id: "report",
        label: "Report",
        path: "/feedback/report",
        icon: Flag,
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Find which module contains the current path
    const currentModule = modules.find(
      (module) =>
        module.path === pathname ||
        (module.submodules &&
          module.submodules.some((sub) => pathname.startsWith(sub.path)))
    );
    setActiveModule(currentModule?.id || null);
  }, [pathname]);

  const toggleModule = (moduleId) => {
    const module = modules.find((m) => m.id === moduleId);

    // If module has a direct path (like Dashboard), navigate to it
    if (module.path) {
      router.push(module.path);
      if (isMobile) setIsOpen(false);
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      // Wait for sidebar to open before expanding
      setTimeout(() => {
        setExpandedModules((prev) => ({
          ...prev,
          [moduleId]: true,
        }));
      }, 100);
    } else {
      setExpandedModules((prev) => ({
        ...prev,
        [moduleId]: !prev[moduleId],
      }));
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedModules({});
    }
  };

  const isSubmoduleActive = (submodulePath) => {
    return pathname.startsWith(submodulePath);
  };

  const isModuleActive = (moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    return (
      activeModule === moduleId || (module.path && pathname === module.path)
    );
  };

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={clsx(
          "bg-slate-800 flex flex-col transition-all duration-300 ease-in-out",
          "fixed md:relative h-screen z-50",
          {
            "w-64": isOpen,
            "w-20": !isOpen && !isMobile,
            "w-0": !isOpen && isMobile,
            "shadow-xl": isMobile && isOpen,
          }
        )}
      >
        {/* Toggle Button - Hidden on mobile */}
        {!isMobile && (
          <div className="flex justify-end p-2 border-b border-slate-700">
            <button
              onClick={toggleSidebar}
              className={clsx(
                "p-2 rounded-full transition-all duration-200",
                "hover:bg-slate-700 hover:shadow-md",
                "flex items-center justify-center",
                {
                  "bg-slate-700 text-blue-400": isOpen,
                  "text-blue-400 bg-slate-700 mr-4": !isOpen,
                }
              )}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {modules.map((module) => {
            const isExpanded = expandedModules[module.id] && isOpen;
            const moduleIsActive = isModuleActive(module.id);
            const hasSubmodules =
              module.submodules && module.submodules.length > 0;

            const Icon = module.icon;

            return (
              <div key={module.id} className="mb-1 group">
                <button
                  onClick={() => toggleModule(module.id)}
                  className={clsx(
                    "flex items-center w-full p-3 text-blue-400",
                    "transition-colors duration-200",
                    {
                      "bg-slate-700": isExpanded,
                      "justify-center": !isOpen,
                      "bg-slate-600": moduleIsActive && !isOpen,
                      "text-white hover:bg-slate-700": !moduleIsActive,
                      "px-4": isOpen && isMobile,
                      "mt-2": isMobile && isOpen, // Add some top margin on mobile when open
                    }
                  )}
                >
                  {Icon && (
                    <Icon
                      className={clsx("min-w-[20px]", {
                        "mr-2 w-5 h-5": isOpen,
                        "mx-auto w-7 h-8": !isOpen,
                        "text-blue-400": moduleIsActive && !isOpen,
                      })}
                    />
                  )}
                  {isOpen ? (
                    <>
                      <span className="ml-2 text-md font-medium truncate">
                        {module.label}
                      </span>
                      {hasSubmodules && (
                        <span className="ml-auto">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="absolute left-20 ml-2 px-2 py-1 bg-slate-700 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {module.shortLabel}
                    </div>
                  )}
                </button>

                {isOpen && isExpanded && hasSubmodules && (
                  <div className={clsx("pl-8", { "pr-4": isMobile })}>
                    {module.submodules.map((submodule) => {
                      const SubIcon = submodule.icon || FileText;
                      const submoduleActive = isSubmoduleActive(submodule.path);
                      return (
                        <button
                          key={submodule.id}
                          onClick={() => {
                            router.push(submodule.path);
                            if (isMobile) setIsOpen(false);
                          }}
                          className={clsx(
                            "flex items-center w-full p-2 text-left text-sm",
                            "transition-colors duration-200",
                            {
                              "bg-slate-600 text-white": submoduleActive,
                              "text-slate-300 hover:bg-slate-600 hover:text-white":
                                !submoduleActive,
                            }
                          )}
                        >
                          <SubIcon
                            className={clsx("w-4 h-4 min-w-[16px] mr-2", {
                              "text-blue-400": submoduleActive,
                            })}
                          />
                          <span className="truncate">{submodule.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile toggle button when sidebar is closed */}
        {isMobile && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 p-3 bg-slate-700 rounded-full shadow-lg z-40"
            aria-label="Open sidebar"
          >
            <ChevronRight className="w-6 h-6 text-blue-400" />
          </button>
        )}
      </div>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 3px;
        }
        @media (max-width: 767px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
          }
        }
      `}</style>
    </>
  );
}