## Installation

    npm install https://github.com/ezitoir/ezito-utils.git

## Usage

```javascript
const child1 = React.createElement('div' , { type : "e"} , React.createElement('p'));
const child2 = React.createElement('div', { type : "e"} , React.createElement('p'));
console.log(similar(child1,child2));
// output : true

const child1 = React.createElement('div' , { type : "e"} , React.createElement('p'));
const child2 = React.createElement('div', { type : "e"} , );
console.log(similar(child1,child2));
// output : false

const child1 = React.createElement('div' , { className : "file"} , React.createElement('p'));
const child2 = React.createElement('div', { className : "e"} , React.createElement('p'));
console.log(similar(child1,child2));
// output : false


console.log(
    similar(
        { name : "school" , age : { min : 10 }} ,
        { name : "school" , age : { min : 10  , max : 20 }}
    )
);

// output : true

console.log(
    similar(
        { name : "school" , age : { min : 10 , max : 20 }} ,
        { name : "school" , age : { min : 10, }}
    )
);

// output : false