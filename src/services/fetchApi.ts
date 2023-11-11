import axios, {AxiosResponse} from "axios";

export const fetchApi = async (category:string):Promise<object | undefined> => {

    try {
        const res = await axios({
            method: "GET",
            url: import.meta.env.VITE_BASE_URL,
            headers: {
                "X-Api-Key": import.meta.env.VITE_MY_KEY,
            },
            params: {
                category,
            },
            responseType: "json",
        });                
        return res as AxiosResponse<object>;
    } catch (error) {
        console.log(error);
    }
};
