namespace th4.admin.monitor{
    interface SystemData{
        name:string;
        cpuUsage:number;
        memoryUsage:number;
        diskUsage:number;
        totalMemory:number;
        availableMemory:number;
        totalDisk:number;
        freeDisk:number;
        networkRecv:number;
        networkSent:number;
    }
}