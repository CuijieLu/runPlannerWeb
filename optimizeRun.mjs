// function for barcode checking between two samples
function barcodeCollision(seq1, seq2, length, numOfMismatch){
    var seq1_frag = seq1.substr(0,length);
    var seq2_frag = seq2.substr(0,length);
    var mismatch1 = 0;
    var mismatch2 = 0;
    if (seq1.includes('-')){
        for (let i = 0; i < seq1_frag.indexOf('-'); i++){
            if (seq1_frag[i] != seq2_frag[i]){
                mismatch1 = mismatch1 + 1;
            }
        }
        for (let i = seq1_frag.indexOf('-'); i < seq1_frag.length; i++){
            if (seq1_frag[i] != seq2_frag[i]){
                mismatch2 = mismatch2 + 1;
            }
        }
    } else{
        for (let i = 0; i < length; i++){
            if (seq1_frag[i] != seq2_frag[i]){
                mismatch1 = mismatch1 + 1;
            }
        }
    }               
    if (mismatch1 <= numOfMismatch * 2 && mismatch2 <= numOfMismatch * 2){
        return true;
    } else{
        return false;
    }

}

//function for list barcode checking
function listBarcodeCollision(seqList1, seqList2, numOfMismatch){
    //merge single barcode/list barcode into one array
    var emptyList = [];
    emptyList.push(seqList1, seqList2);
    var newSeqList = emptyList.flat();
    //get minimum barcode length
    var minLength = 18;
    for (let i = 0; i < newSeqList.length; i++){
        if(newSeqList[i].length < minLength){
            minLength = newSeqList[i].length;
        }
    }
    //check barcode collision one by one
    for(let i = 0; i < newSeqList.length - 1; i++){
        for(let j = i + 1; j < newSeqList.length; j++){
            if (barcodeCollision(newSeqList[i], newSeqList[j], minLength, numOfMismatch)){
                return true;
            }
        }
    }
    return false;
}

// function for seperating samples into different lanes based on reads number, barcode and recipe
function assignLane(sampleList, laneNumber){
    var freeList = sampleList.concat();
    var groupList = [];
    // seperate the samples into freeList and groupList based on barcode
    for(let i = 0; i < sampleList.length; i++){
        for(let j = 0; j < sampleList.length; j++){
            if((i != j) && (listBarcodeCollision(sampleList[i].barcodeSeq, sampleList[j].barcodeSeq,0))){
                // if collision happens, push it out from freelist
                for(let m = 0; m < freeList.length; m++){ 
                    if (freeList[m] === sampleList[i]) { 
                        freeList.splice(m, 1); 
                    }
                }
                //then push the sample with collision barcode into groupList
                if (groupList.length != 0){
                    for (let i = 0; i < groupList.length; i++){
                        var add = true;
                        for(let j = 0; j < groupList[i].length; j++){

                        }
                    }
                    console.log(sampleList[i]);
                }else{
                    groupList.push([sampleList[i]]);
                }
                
                break;
            }
        }
    }
    return freeList;
}

// function for deciding optimized run by given sample list(grouped samples)
function optimizeRun(sampleList){

}


export {barcodeCollision, listBarcodeCollision, assignLane};
