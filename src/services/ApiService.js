import axios from "axios";


// create axiios instant
const API_BASE_URL = "http://localhost:2011";
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// A\Request interceptor to add token

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

//RESPONSE INTERCEPTORS TO HANDLE AUTH ERRORS GLOBALLY
apiClient.interceptors.response.use(
    response => response, error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            window.location.href = '/login';

        }
        return Promise.reject(error);
    }
)

export const addPlaylist = async (name, description, userId) => {
    try {
        const response = await apiClient.post('api/playlists', { name, description, userId });


        if (response.status === 200 || response.status === 201) {
            return {
                success: true,
                message: 'Playlist created',
                data: response.data

            };
        }
            else {

                return {
                    success: false,
                    message: response.data.message || 'Failed to create playlist'
                };
            }

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Netwiork Failed'
        }
    }


}

export const getUserPlaylists = async (userId) => {
    try {
        const response = await apiClient.get(`/api/playlists/user/${userId}`, { userId })


        return {
            success: true,
            data: response.data

        }

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch playlist'
        }
    }


}

export const deletePlaylist = async (id) => {
    try {
        const response = await apiClient.delete(`/api/playlists/${id}`);
        
        return {
            success: true,
            message: 'playlist deleted!'

        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete playlist'
        };
    }
    
}
export const getPlaylistById = async (id) => {
     try {
        const response = await apiClient.get(`/api/playlists/${id}`);
        
        return {
            success: true,
            data: response.data

        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Playlist not found'
        };
    }
}
export const renamePlaylist = async (id ,newName) => {
try {
        const response = await apiClient.put(`/api/playlists/${id}/rename`, {name: newName});
        
       return {
            success: true,
            data: response.data

        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Playlist not found'
        };
    }
}


export default apiClient;
