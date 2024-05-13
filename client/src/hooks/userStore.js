import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    token: JSON.parse(localStorage.getItem("token")) || "",


    setUser: set((user) => ({ user })),
    setToen: set((token) => ({ token }))
}))

export default useUserStore