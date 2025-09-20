
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    Eye, 
    Home, 
    Info, 
    Upload, 
    FileText, 
    Stethoscope, 
    MessageCircle, 
    LayoutDashboard,
    LogOut,
    User
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

const navigationItems = [
    {
        title: "Home",
        url: createPageUrl("Home"),
        icon: Home,
    },
    {
        title: "Diagnosis",
        url: createPageUrl("Diagnosis"),
        icon: Upload,
    },
    {
        title: "Reports",
        url: createPageUrl("Reports"),
        icon: FileText,
    },
    {
        title: "Doctors",
        url: createPageUrl("Doctors"),
        icon: Stethoscope,
    },
    {
        title: "AI Chat",
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
                // User not authenticated
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
            <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
                <Sidebar className="border-r border-slate-200/60 bg-white/80 backdrop-blur-sm">
                    <SidebarHeader className="border-b border-slate-200/60 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-lg">RetinAI</h2>
                                <p className="text-xs text-slate-500 font-medium">Advanced Eye Diagnostics</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    
                    <SidebarContent className="p-3">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton 
                                                asChild 
                                                className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mb-1 ${
                                                    location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                                                }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {user?.role === 'admin' && (
                            <SidebarGroup>
                                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                                    Admin
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild className="hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg">
                                                <Link to={createPageUrl("AdminDashboard")} className="flex items-center gap-3 px-3 py-2.5">
                                                    <LayoutDashboard className="w-5 h-5" />
                                                    <span className="font-medium">Dashboard</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )}
                    </SidebarContent>

                    <SidebarFooter className="border-t border-slate-200/60 p-4">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 text-sm truncate">{user.full_name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={handleLogout}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                onClick={() => UserEntity.login()} 
                                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium"
                            >
                                Sign In
                            </Button>
                        )}
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 flex flex-col">
                    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
                            <h1 className="text-xl font-bold text-slate-900">RetinAI</h1>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
