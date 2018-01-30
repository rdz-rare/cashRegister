var pairWise = function(arr, arg){
    arr = JSON.parse(arr);
    
    var indexSum = 0,
        // Create a temp array
        tempArr = arr.slice(),
        i, j, length = arr.length;
    
    // Iterate twice to compare the first index with the second index
    for (i = 0; i < length; i++) {
        for (j = i + 1; j < length; j++) {
            // Compare the sum of the two numbers with the arg and sum their indices
            if((tempArr[i] + tempArr[j]) == arg){
                indexSum += i + j;
                // Set NaN to the indices that matched to not iterate again
                tempArr[i] = tempArr[j] = NaN;
                break;
            }
        }
    }

    return indexSum;
};

module.exports = pairWise;