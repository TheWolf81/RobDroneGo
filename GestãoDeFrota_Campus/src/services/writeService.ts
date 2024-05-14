import { Inject, Service } from "typedi";

import * as fs from 'fs';
import * as util from 'util';

import IwriteService from './IServices/IwriteService';
import config from "../../config";
import IHallwayConnectionRepo from "./IRepos/IHallwayConnectionRepo";
@Service()
export default class WriteService implements IwriteService {
    constructor(
        @Inject('logger') private logger
    ) { }

    public async setData(data: any, filePath: string): Promise<any> {
        const writeFile = util.promisify(fs.writeFile);
        const readFile = util.promisify(fs.readFile);
        let newFilePath = './../Vizualization/src/assets/mazes/'+filePath;

        await writeFile(newFilePath, data, 'utf8');
        console.log('Data written to new file');

        // Abre o arquivo para leitura e escrita
        let datatoDefaulta = "./../../assets/mazes/"+filePath + '"' + ",";
        let filePathtoDefaulta = "./../Vizualization/src/app/Modules/three-dvisualization/Components/view-floor/default_data.js"
        let lineNumber = 8; // A linha onde você quer remover
        let position = 10; // A posição na linha onde você quer remover
        let originalData = await readFile(filePathtoDefaulta, 'utf8');
        let lines = originalData.split('\n');

        if (lineNumber < 0 || lineNumber >= lines.length) {
             const waitForLines = (lines: any[]) => {
                return new Promise((resolve) => {
                    const intervalId = setInterval(() => {
                        if (lines.length > 10) {
                            clearInterval(intervalId);
                            resolve(null);
                        }
                    }, 1000); // Check every second
                });
            };
            console.log("teste on write service"+lines.length)
            await waitForLines(lines);
           // throw new Error('Line number is out of range '+lineNumber+" "+filePathtoDefaulta + " number of lines in file  "+ lines.length);

        }

        let line = lines[lineNumber];
        if (position < 0 || position > line.length) {
            throw new Error('Position is out of range');
        }

        lines[lineNumber] = line.slice(0, position) + datatoDefaulta;

        let newData = lines.join('\n');

        await writeFile(filePathtoDefaulta, newData, 'utf8')
        console.log('Data written to file');

        return "done";



    }
}