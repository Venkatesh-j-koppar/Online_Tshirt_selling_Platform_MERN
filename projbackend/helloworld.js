let inputarray1 = [1, 2, 3, 4, 5, 6];
let inputarray2 = [50, 60, 40, 10, 30, 20];

// Selection SortBy

for (let i = 0; i < inputarray2.length - 1; i++) {
  for (let j = i + 1; j < inputarray2.length; j++) {
    if (inputarray2[j] < inputarray2[i]) {
      let temp1 = inputarray1[j];
      let temp2 = inputarray2[j];
      inputarray1[j] = inputarray1[i];
      inputarray2[j] = inputarray2[i];
      inputarray1[i] = temp1;
      inputarray2[i] = temp2;
    }
  }
}

console.log(inputarray1);
console.log(inputarray2);
