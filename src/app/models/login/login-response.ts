export class LoginResponse {
    status: string
    success: boolean
    message: string
    result: LoginServiceResponse 
}

export class LoginServiceResponse {
    access_token: string
    struserId: string
    userId: number
    userName: string
    Email: string
    Mobile: string
    isResetPassword: boolean
    displayMessage: string
    LoginInfoId: string
    IsAllowMultiLogin?: boolean
    IsApproved?: boolean
}
