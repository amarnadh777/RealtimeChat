import axios from 'axios'

const apiInstance = axios.create({
    baseURL:'http://localhost:3000',
    
    headers: {
        'Content-Type': 'application/json', 
      },
})

export const signin =async(data) =>
{
    try {
        const response = await apiInstance.post("/auth/signin",data)
        return response.data

        
        
    } catch (error) {
        console.log(error)
        throw error.response?.data || { message: 'Something went wrong' };
        
    }

}

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
            const response =  await apiInstance.post("/message/send",{senderId:data.senderId,receiverId:data.receiverId,message:data.message})
            
    
            return response.data
        } catch (error) {
            console.log(error)
            
        }
    
    }
    



