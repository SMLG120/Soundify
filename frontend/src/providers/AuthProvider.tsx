import { axiosInstance } from "@/lib/axios"
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"



const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const { checkAdminStatus } = useAuthStore();
    const { initSocket, disconnectSocket } = useChatStore();
    useEffect(() => {
        /**
         * Initializes the auth state by getting the token and updating the
         * axios instance to include the token in the Authorization header.
         * If the token is valid, it also checks if the user is an admin.
         */
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if (token) {
                    await checkAdminStatus();
                    if (userId) initSocket(userId);
                }
            } catch (error: any) {
                updateApiToken(null);
                console.log("Error in auth provider", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth()

        // clean up
        return () => disconnectSocket();
    }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

    if (loading)
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Loader className='size-8 text-emerald-500 animate-spin' />
            </div>
        );

    return (
        <div>{children}</div>
    )
}

export default AuthProvider;