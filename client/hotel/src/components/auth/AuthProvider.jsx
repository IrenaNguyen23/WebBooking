import React, { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => { },
	handleLogout: () => { },
	isAuthenticated: false,
	tokenExpired: false
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [tokenExpired, setTokenExpired] = useState(false);
	const [tokenExpiredAlert, setTokenExpiredAlert] = useState(false);
	const history = useNavigate();

	useEffect(() => {
		const checkAuth = () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					const decodedUser = jwtDecode(token);
					const currentTime = Date.now() / 1000;
					if (decodedUser.exp < currentTime) {
						handleLogout();
						setTokenExpired(true); // Thời gian token hết hạn
						setTokenExpiredAlert(true);
					} else {
						setUser(decodedUser);
						setIsAuthenticated(true);
					}
				} catch (error) {
					console.error("Error decoding token:", error);
					handleLogout();
					setTokenExpired(true);
					setTokenExpiredAlert(true);
				}
			} else {
				handleLogout();
				setTokenExpired(true);
				setTokenExpiredAlert(true); // Không có token và hiển thị thông báo
			}
		};

		checkAuth();
	}, []);

	const handleLogin = (token) => {
		try {
			const decodedUser = jwtDecode(token);
			localStorage.setItem("userId", decodedUser.sub);
			localStorage.setItem("userRole", decodedUser.roles);
			localStorage.setItem("token", token);
			setUser(decodedUser);
			setIsAuthenticated(true);
			setTokenExpired(false); // Reset lại trạng thái khi đăng nhập thành công
			setTokenExpiredAlert(false); // Reset lại trạng thái khi đăng nhập thành công
		} catch (error) {
			console.error("Error decoding token:", error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
		setTokenExpired(false); // Reset lại trạng thái khi đăng xuất
		setTokenExpiredAlert(false); // Reset lại trạng thái khi đăng xuất
	};

	const handleTokenExpiredAlertClose = () => {
		setTokenExpiredAlert(false);
		history.push("/login"); // Điều hướng đến trang đăng nhập
	};
	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout, isAuthenticated, tokenExpired, handleTokenExpiredAlertClose }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
