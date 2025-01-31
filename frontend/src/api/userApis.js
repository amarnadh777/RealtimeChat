import axios from 'axios'

const apiInstance = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    
    headers: {
        'Content-Type': 'application/json', 
      },
})

export const signin =async(data) =>
{
    try {
        const response = await apiInstance.post("/auth/signin",data)
        console.log("dsfdsf",data)
        return response.data

        
        
    } catch (error) {
        console.log(error)
        throw error.response?.data || { message: 'Something went wrong' };
        
    }

}


export const signup = async (data) => {
    try {
      const response = await apiInstance.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message);
      throw error.response?.data || { message: "Something went wrong" };
    }
  };

export const getUserList = async(userId) =>
{
    try {

        if(userId)
        {

            const response =  await apiInstance.post("/user/getusers",{ loggedInUserId:userId})

            return response.data
        }
      
    } catch (error) {
        console.log(error)
        
    }
}

export const getMessages = async(data) =>
{

    try {
        const response =  await apiInstance.post("/message/getmeesage",{senderId:data.senderId,receiverId:data.receiverId})

        return response.data
    } catch (error) {
        console.log(error)
        
    }

}


export const sendMessage = async(data) =>
    {
    
        try {
            const response =  await apiInstance.post("/message/send",{sender:data.sender,receiver:data.receiver,message:data.message})
            
    
            return response.data
        } catch (error) {
            console.log(error)
            
        }
    
    }
    



