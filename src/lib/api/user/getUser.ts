import apiClient from "@/lib/api/axios";

export const getUser = async () => {
    try {
        const response = await apiClient.get("/auth");
        console.log(response.headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};  