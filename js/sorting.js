console.log("hello");


let arraySize = document.querySelector('#arr_sz');
let delayElement = document.querySelector('#speed_input');
let delay = 260;

let array = [];
let cloneBars = [];

function deleteChild() {
    const bars = document.querySelector("#bars");
    bars.innerHTML = '';
}
const bar_temp = document.querySelectorAll('.bar');

function createNewArray(noOfBars = 60) {
    // calling helper function to delete old bars from dom
    deleteChild();

    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 250) + 1);
    }
    console.log(array);
    cloneBars = [...array];

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
      
    
}

window.addEventListener('load',function(){
    createNewArray();
})

const newArray = document.querySelector('.newArray');
newArray.addEventListener('click', function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    createNewArray(arraySize.value);
});

const reset = document.querySelector('.reset');
reset.addEventListener('click',function(){
    deleteChild();
    const bars = document.querySelector('#bars');

    for (let i = 0; i < cloneBars.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();

});

arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 320 - parseInt(delayElement.value);
});


function disableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

function enableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}


function waitfor(milisec){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('');
        },milisec);
    })
}

function swap(bar1,bar2){
    console.log('In swap()');
    let temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;

}

async function bubbleSortHandler(){
    console.log('In bubbe()');
    const bars = document.querySelectorAll('.bar');
    for(let i = 0; i < bars.length-1; i++){
        console.log('In ith loop');
        for(let j = 0; j < bars.length-i-1; j++){
            console.log('In jth loop');
            bars[j].style.background = 'yellow';
            bars[j+1].style.background = 'yellow';

            await waitfor(delay);
            if(parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)){
                console.log('In if condition');
                swap(bars[j],bars[j+1]);
            }

            bars[j].style.background = 'cyan';
            bars[j+1].style.background = 'cyan';
        }
        bars[bars.length-1-i].style.background = 'green';
    }

    bars[0].style.background = 'green';

}

const bubbleSortBtn = document.querySelector('.bubbleSort');
bubbleSortBtn.addEventListener('click',async()=>{
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await bubbleSortHandler();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();

})

async function selectionSortHandler(){
    console.log('In selection()');
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length; i++){
        console.log('In ith loop');
        let min_index = i;
        ele[i].style.background = 'blue';
        for(let j = i+1; j < ele.length; j++){
            console.log('In jth loop');
            ele[j].style.background = 'red';

            await waitfor(delay);
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                console.log('In if condition height comparision');
                if(min_index !== i){
                    ele[min_index].style.background = 'cyan';
                }
                min_index = j;
            } 
            else{
                ele[j].style.background = 'cyan';
            }   
        }
        await waitfor(delay);
        swap(ele[min_index], ele[i]);
        ele[min_index].style.background = 'cyan';
        ele[i].style.background = 'green';
    }
}

const selectionSortBtn = document.querySelector(".selectionSort");
selectionSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await selectionSortHandler();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

async function insertionSortHandler(){
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
   
    ele[0].style.background = 'green';
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        
        ele[i].style.background = 'yellow';

        await waitfor(delay);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('In while loop');
            
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitfor(delay);

            for(let k = i-1; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = 'green';
    }
}

const insertionSortBtn = document.querySelector(".insertionSort");
insertionSortBtn.addEventListener('click', async function(){
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertionSortHandler();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});


async function partitionHandler(ele, l, r){
    console.log('In partitionLomuto()');
    let i = l - 1;
    ele[r].style.background = 'red';
    for(let j = l; j <= r - 1; j++){
        console.log('In partitionLomuto for j');
        
        ele[j].style.background = 'yellow';
        await waitfor(delay);

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            console.log('In partitionLomuto for j if');
            i++;
            swap(ele[i], ele[j]);
            
            ele[i].style.background = 'orange';
            if(i != j){
                ele[j].style.background = 'orange';
            }
            
            await waitfor(delay);
        }
        else{
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    await waitfor(delay);
    swap(ele[i], ele[r]);
    console.log(`i = ${i}`, typeof(i));

    ele[r].style.background = 'pink';
    ele[i].style.background = 'green';

    
    await waitfor(delay);
    
    
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = 'cyan';
    }

    return i;
}

async function quickSortHandler(ele, l, r){
    console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
    if(l < r){
        let pivot_index = await partitionHandler(ele, l, r);
        await quickSortHandler(ele, l, pivot_index - 1);
        await quickSortHandler(ele, pivot_index + 1, r);
    }
    else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
}


const quickSortBtn = document.querySelector(".quickSort");
quickSortBtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSortHandler(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

async function mergeArrayHandler(ele, low, mid, high){
    console.log('In merge()');
    console.log(`low=${low}, mid=${mid}, high=${high}`);
    const n1 = mid - low + 1;
    const n2 = high - mid;
    console.log(`n1=${n1}, n2=${n2}`);
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitfor(delay);
        console.log('In merge left loop');
        console.log(ele[low + i].style.height + ' at ' + (low+i));
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await waitfor(delay);
        console.log('In merge right loop');
        console.log(ele[mid + 1 + i].style.height + ' at ' + (mid+1+i));
        ele[mid + 1 + i].style.background = 'yellow';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await waitfor(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await waitfor(delay);
        console.log('In merge while loop');
        console.log(parseInt(left[i]), parseInt(right[j]));
        
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            console.log('In merge while loop if');
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            console.log('In merge while loop else');
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            } 
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await waitfor(delay);
        console.log("In while if n1 is left");
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await waitfor(delay);
        console.log("In while if n2 is left");
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSortHandler(ele, l, r){
    console.log('In mergeSort()');
    if(l >= r){
        console.log(`return cause just 1 elemment l=${l}, r=${r}`);
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    console.log(`left=${l} mid=${m} right=${r}`, typeof(m));
    await mergeSortHandler(ele, l, m);
    await mergeSortHandler(ele, m + 1, r);
    await mergeArrayHandler(ele, l, m, r);
}

const mergeSortBtn = document.querySelector(".mergeSort");
mergeSortBtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await mergeSortHandler(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});













