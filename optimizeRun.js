// function for barcode checking between two samples
function barcodeCollision(seq1, seq2, length, numofMismatch){
    seq1_frag = seq1.substr(0,length);
    seq2_frag = seq2.substr(0,length);
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
    if (mismatch1 <= numofMismatch * 2 && mismatch2 <= numofMismatch * 2){
        return true;
    } else{
        return false;
    }

}

//function for list barcode checking
function listBarcodeCollision(seqList1, seqList2, length, numofMismatch){

}

// function for seperating samples into different lanes based on reads number, barcode and recipe
function assignLane(sampleList, laneNumber){

}

// function for deciding optimized run by given sample list(grouped samples)
function optimizeRun(sampleList){

}


console.log(barcodeCollision("AGCG-ATCG","AGGC-ATCG",9,1));
