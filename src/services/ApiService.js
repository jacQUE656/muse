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
/**
 * Adds a song to a specific playlist
 * @param {string} playlistId 
 * @param {string} songId 
 */
export const addSongToPlaylist = async (playlistId, songId) => {
    try {
     
        const response = await apiClient.post(`/api/playlists/${playlistId}/songs/${songId}`);
        
        return {
            success: true,
            message: 'Song added to playlist',
            data: response.data
        };
    } catch (error) {
        console.error("API Error adding song:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || 'Failed to add song to playlist' 
        };
    }
};

/**
 * Remove a song from a specific playlist
 * @param {string} playlistId 
 * @param {string} songId 
 */
export const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
        const response = await apiClient.delete(`/api/playlists/delete/${playlistId}/song/${songId}`)
        return {
            success: true,
            message: 'Song deleted from playlist',
            data: response.data
        };
    } catch (error) {
        console.error("API Error deleting song:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || 'Failed to delete song from playlist' 
        };
    }

};

/**
 * Verifies email via a clickable link (GET request)
 * @param {string} email 
 * @param {string} token 
 */
export const verifyViaLink = async (email, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
            params: { email, token }
        });
        return { success: true, message: response.data };
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data || 'Verification failed' 
        };
    }
};

/**
 * Verifies email via manual OTP entry (POST request)
 * @param {string} email 
 * @param {string} token 
 */
export const verifyManualOtp = async (email, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/verify`, {
            email,
            token
        });
        return { success: true, message: response.data };
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data || 'Invalid or expired code' 
        };
    }
};

/**
 * Resends the verification code to the user's email
 * @param {string} email 
 */
export const resendOtp = async (email) => {
    try {
        // Using apiClient to benefit from the base URL and interceptors
        const response = await apiClient.post('/api/auth/resend-otp', { email });
        
        return { 
            success: true, 
            message: response.data.message || 'Verification code resent!' 
        };
    } catch (error) {
        console.error("API Error resending OTP:", error);
        return { 
            success: false, 
            message: error.response?.data?.message || 'Failed to resend code' 
        };
    }
};

export default apiClient;
