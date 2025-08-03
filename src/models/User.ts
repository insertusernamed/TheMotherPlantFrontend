export interface User {
    firstName: string
    lastName: string
    email: string
    points?: number
    role?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface CreateUserRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}