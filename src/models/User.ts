export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    points?: number
    role: 'USER' | 'ADMIN'
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

export interface AuthResponse {
    token: string;
    id: number
    firstName: string
    lastName: string
    email: string
    points?: number
    role: 'USER' | 'ADMIN'
}