
//var {sample, pooledSample} = require('./component.mjs');
import {sample, pooledSample} from './component.mjs';
import {test} from './testcase.mjs';
// import {test} from './testcase.production.mjs';
import {createSampleObject,createSampleList, getCollisionGroup, sampleBarcodeCollision, getTotalReads} from './optimizeRun.mjs';

//group samples by run type and return a map
function groupSampleByRunType(sampleObjectList){
    const runTypeList = new Map();
    for (let i = 0; i < sampleObjectList.length; i++){
        if(runTypeList.has(sampleObjectList[i].runLength)){
            runTypeList.get(sampleObjectList[i].runLength).push(sampleObjectList[i]);
        }else{
            runTypeList.set(sampleObjectList[i].runLength, [sampleObjectList[i]]);
        }
    }  
    return(runTypeList);
}

var sampleListTest = [];
for(let i = 0; i < test.length; i++){
    sampleListTest.push(createSampleObject(test[i]));
}

var sampleList = createSampleList(sampleListTest);
var runTypeGroup = groupSampleByRunType(sampleList);
var samplePE100 = runTypeGroup.get('PE100');
//let sampletest = createSampleObject(test[0]);

let result = getCollisionGroup(samplePE100);
console.log(result.length);
console.log(getTotalReads(samplePE100));
// for(let i = 0; i < result.length; i++){
//     for(let j = 0; j < result[i].length; j++){        
//         if(result[i][j].poolID === undefined){
//             console.log(i + " " + result[i][j].sampleID + " " + result[i][j].recipe);
//         }else{
//             console.log(i + " " + result[i][j].poolID + " " + result[i][j].recipe);
//         }
//    }
// }


