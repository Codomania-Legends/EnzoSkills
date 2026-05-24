import axios from "axios"

export async function handleSignup(e) {
    e.preventDefault()
    const [user_name, email, password, user_post] = [
        e.target.user_name.value,
        e.target.email.value,
        e.target.password.value,
        "USER"
    ];

    try {
        const res = await axios.post("http://localhost:3000/user/signup", {
            user_name,
            email,
            user_post,
            password
        });
        return { success: true, data: res.data };
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || error.message;
        return { success: false, error: errorMessage };
    }
}

export async function handleLogin(e) {
    e.preventDefault();
    const user_name = e.target.user_name.value;
    const password = e.target.password.value;
    const user_post = "USER";

    try {
        const res = await axios.post("http://localhost:3000/user/login", {
            user_name, user_post, password
        });
        if (res.data && res.data.user) {
            return { success: true, data: res.data };
        } else {
            return { success: false, error: "Invalid credentials" };
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || error.message;
        return { success: false, error: errorMessage };
    }
}