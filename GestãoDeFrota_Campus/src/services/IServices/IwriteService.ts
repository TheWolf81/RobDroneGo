
export default interface Write {
    setData(data: any, filePath: string):Promise<void>;
}