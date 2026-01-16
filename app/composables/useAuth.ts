export const useAuth = () => {
    const isLoggedIn = useState('loggedIn', () => false);
    const fetchUser = async () => {
        try {
             const res = await $fetch('/api/auth/me', {
                credentials: 'include'
            })
            if (res?.success) isLoggedIn.value = true
            else isLoggedIn.value = false

        } catch (error) {
            isLoggedIn.value = false
        }
    }

  return { isLoggedIn, fetchUser }
}