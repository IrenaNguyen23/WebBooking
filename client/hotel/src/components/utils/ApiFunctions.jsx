import axios from "axios";
export const api = axios.create({
	baseURL: "http://localhost:8080"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append("photo", photo);
	formData.append("roomType", roomType);
	formData.append("roomPrice", roomPrice);

	// Lấy headers từ getHeader và xóa Content-Type
	const headers = { ...getHeader() };
	delete headers['Content-Type'];

	try {
		const response = await api.post("/rooms/add/new-room", formData, {
			headers: headers
		});

		if (response.status === 201) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error uploading file:', error);
		return false;
	}
}

export async function addComment(image, content, rating, roomId, userId) {
	const formData = new FormData()
	formData.append("image", image);
	formData.append("content", content)
	formData.append("rating", rating)
	formData.append("roomId", roomId)
	formData.append("userId", userId)

	const response = await api.post("/comments/add-comment", formData,)
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

export async function getCommentByRoomId(roomId) {
	try {
		const resuilt = await api.get(`/comments/room/${roomId}`)
		return resuilt.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

export async function editComment(commentId, commentData) {
	const formData = new FormData()
	formData.append("image", commentData.image);
	formData.append("content", commentData.content)
	formData.append("rating", commentData.rating)

	const response = await api.put(`/comments/update-comment/${commentId}`, formData,)
	return response
}

export async function deleteComment(id, email) {
	try {
		const result = await api.delete(`/comments/delete-comment/${id}?email=${email}`, {
			headers: getHeader()
		});
		return result.data;
	} catch (error) {
		throw new Error(`Error deleting comment: ${error.message}`);
	}
}

export async function deleteCommentByAdmin(id) {
	try {
		const result = await api.delete(`/comments/delete/comment/${id}`, {
			headers: getHeader()
		});
		return result.data;
	} catch (error) {
		throw new Error(`Error deleting comment: ${error.message}`);
	}
}

export async function getAllComments() {
	try {
		const resuilt = await api.get("/comments/all-comments")
		return resuilt.data
	} catch (error) {
		throw new Error("Error fetching comments")
	}
}

export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

export async function getAllRooms() {
	try {
		const resuilt = await api.get("/rooms/all-rooms")
		return resuilt.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}


export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}

export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`, formData, {
		headers: getHeader()
	})
	return response
}

export async function getRoomById(roomId) {
	try {
		const resuilt = await api.get(`/rooms/room/${roomId}`)
		return resuilt.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.message.data)
		} else {
			throw new Error(`Error booking room: ${error.message}`)
		}
	}
}

export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.message.data)
		} else {
			throw new Error(`Error find booking: ${error.message}`)
		}
	}
}

export async function cancelBooking(bookingId) {
	try {
		const resuilt = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return resuilt.data
	} catch (error) {
		throw new Error(`Error cancelling booking ${error.message}`)
	}
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const encodedCheckInDate = encodeURIComponent(checkInDate.trim());
	const encodedCheckOutDate = encodeURIComponent(checkOutDate.trim());
	const encodedRoomType = encodeURIComponent(roomType.trim());

	const result = await api.get(
		`rooms/available-rooms?checkInDate=${encodedCheckInDate}&checkOutDate=${encodedCheckOutDate}&roomType=${encodedRoomType}`
	);
	return result;
}


export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}


export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllUsers() {
	try {
		const response = await api.get(`/users/all`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}