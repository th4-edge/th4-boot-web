namespace th4.admin.system{
    interface User{
        userId: number;
        username: string;
        role: th4.admin.system.Role;
        status: th4.framework.Enumerated<boolean>;
    }
}