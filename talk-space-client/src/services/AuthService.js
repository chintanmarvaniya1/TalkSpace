import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
export class AuthServices{
    URL
    constructor(){
        URL = "http://localhost:9000/api/signup"
    }
    async createAccount(data){
        try {
            const response = await axios.post(URL,data)
            if (response) {
                return response;
            }
            toast.error("Something Went Wrong")
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return null;
        }
    }
}

const authService = new AuthServices();
export default authService