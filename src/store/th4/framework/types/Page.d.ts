namespace th4.framework {
    interface Page <T>{
        first: boolean;
        last: boolean;
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
        content: T[];
    }
}