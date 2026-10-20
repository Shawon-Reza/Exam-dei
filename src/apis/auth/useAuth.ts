    "use client";

    import { useQuery } from "@tanstack/react-query";
    import { authApi } from "./auth.api";
    import type { CurrentUser } from "./auth.types";


    export const useAuth = (initialUser?: CurrentUser | null) => {
        const query = useQuery({
            queryKey: ["auth", "me"],
            queryFn: authApi.me,
            initialData: initialUser ?? undefined,

            staleTime: 15 * 60 * 1000, // 15 minutes
            gcTime: 15 * 60 * 1000,   // 15 minutes

            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            retry: false,
        });

        return query;
    };


    