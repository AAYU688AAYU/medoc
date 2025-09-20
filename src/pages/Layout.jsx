
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    Brain, 
    Home, 
    Info, 
    Upload, 
    FileText, 
    Stethoscope, 
    MessageCircle, 
    LayoutDashboard,
    LogOut,
    User as UserIcon,
    Settings,
    Bell
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User as UserEntity } from "@/api/entities";

import FloatingAIAssistant from "../components/ui/FloatingAIAssistant";

const navigationItems = [
    {
        title: "Dashboard",
        url: createPageUrl("Home"),
        icon: Home,
    },
    {
        title: "New Analysis",
        url: createPageUrl("Diagnosis"),
        icon: Upload,
    },
    {
        title: "Patient Reports",
        url: createPageUrl("Reports"),
        icon: FileText,
    },
    {
        title: "Find Specialists",
        url: createPageUrl("Doctors"),
        icon: Stethoscope,
    },
    {
        title: "AI Assistant",
        url: createPageUrl("Chat"),
        icon: MessageCircle,
    },
    {
        title: "About",
        url: createPageUrl("About"),
        icon: Info,
    },
];

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await UserEntity.me();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            }
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        await UserEntity.logout();
        window.location.reload();
    };

    return (
        <SidebarProvider>
            <style>{`
                :root {
                    --background: 255 255 255;
                    --foreground: 51 65 85;
                    --card: 255 255 255;
                    --card-foreground: 51 65 85;
                    --popover: 255 255 255;
                    --popover-foreground: 51 65 85;
                    --primary: 14 165 233;
                    --primary-foreground: 255 255 255;
                    --secondary: 6 182 212;
                    --secondary-foreground: 255 255 255;
                    --muted: 248 250 252;
                    --muted-foreground: 100 116 139;
                    --accent: 239 246 255;
                    --accent-foreground: 30 64 175;
                    --destructive: 239 68 68;
                    --destructive-foreground: 255 255 255;
                    --border: 226 232 240;
                    --input: 226 232 240;
                    --ring: 14 165 233;
                    --radius: 12px;
                }
                
                body {
                    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: rgb(248 250 252);
                    line-height: 1.6;
                }
                
                .medical-gradient {
                    background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
                }
                
                .trust-shadow {
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }
            `}</style>
            <div className="min-h-screen flex w-full bg-gray-50">
                <Sidebar className="border-r border-gray-200/80 bg-white shadow-sm">
                    <SidebarHeader className="border-b border-gray-100 p-6 bg-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 medical-gradient rounded-2xl flex items-center justify-center shadow-lg">
                                <Brain className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-xl tracking-tight">MINDHUE</h2>
                                <p className="text-sm text-gray-500 font-medium">Medical AI Platform</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    
                    <SidebarContent className="p-4 bg-white">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton 
                                                asChild 
                                                className={`font-medium justify-start hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl py-3 px-4 ${
                                                    location.pathname === item.url 
                                                        ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200 font-semibold' 
                                                        : 'text-gray-600 hover:shadow-sm'
                                                }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-3">
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {user?.role === 'admin' && (
                            <SidebarGroup>
                                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                                    Administration
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild className="font-medium justify-start text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl py-3 px-4">
                                                <Link to={createPageUrl("AdminDashboard")} className="flex items-center gap-3">
                                                    <LayoutDashboard className="w-5 h-5" />
                                                    <span>Admin Panel</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )}
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-100 p-4 bg-white">
                        {user ? (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-800 text-sm truncate">{user.full_name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                onClick={() => UserEntity.login()} 
                                className="w-full medical-gradient hover:opacity-90 text-white font-semibold shadow-md rounded-xl py-3"
                            >
                                Sign In / Sign Up
                            </Button>
                        )}
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 flex flex-col min-h-screen">
                    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 md:hidden" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">{currentPageName}</h1>
                                <p className="text-sm text-gray-500">Powered by AI for better healthcare</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-xl">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-xl">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto p-6">
                        {children}
                    </div>
                </main>
                
                <FloatingAIAssistant />
            </div>
        </SidebarProvider>
    );
}
