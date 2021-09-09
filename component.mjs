// define class of individual samples

class sample{
    constructor(poolID, sampleID, recipe, requestID, RequestName, sampleConc, units, volume, barcodeSeq, runLength, readsRequest, readsRemaining){
        this.poolID = poolID; // if doesn't exist, show as undefined
        this.sampleID = sampleID;
        this.recipe = recipe;
        this.requestID = requestID;
        if(RequestName.includes("Investigator Prepared") ){
            this.isUser = true;
        }else{
            this.isUser = false;
        }
        this.sampleConc = sampleConc;
        this.units = units;
        this.volume = volume;
        this.barcodeSeq = barcodeSeq;
        this.runLength = runLength;
        this.readsRequest = Number(readsRequest);
        this.readsRemaining = readsRemaining;
    }

}


// class of pooled samples

class pooledSample{
    //calculate totalreads from list of samples
    getTotalReads(listOfSamples) {
        var totalReads = 0;
        for(let i = 0; i < listOfSamples.length; i++){
            totalReads = totalReads + listOfSamples[i].readsRequest;
        }
        return totalReads;
    }
    ifcontainNormal(listOfSamples){
        let contain = false;
        for(let i = 0; i < listOfSamples.length; i++){
            if (listOfSamples[i].sampleID.includes("NORMAL")){
                contain = true;
                break;
            }
        }
        return contain;
    }
    createBarcodeList(listOfSamples){
        var barcodeList = [];
        for(let i = 0; i < listOfSamples.length; i++){
            if(listOfSamples[i].sampleID.includes("NORMAL")){
                barcodeList.unshift(listOfSamples[i].barcodeSeq);
            }else{
                barcodeList.push(listOfSamples[i].barcodeSeq);
            }
        }
        return barcodeList;
    }
    constructor(listOfSamples){ 
        this.readsRequest = this.getTotalReads(listOfSamples);
        this.containNormal = this.ifcontainNormal(listOfSamples);
        this.poolID = listOfSamples[0].poolID;
        this.recipe = listOfSamples[0].recipe;
        this.isUser = listOfSamples[0].isUser;
        this.runLength = listOfSamples[0].runLength;
        this.barcodeSeq = this.createBarcodeList(listOfSamples);
    }
}
export {sample, pooledSample};


