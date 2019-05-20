const fs = require('fs')
const system_view_controller = fs.readFileSync('./SystemViewController.json', 'utf8')

// save the parsed JSON file
const data = JSON.parse(system_view_controller)

// Testing how to get into the deeply nested data
// console.log(data.subviews[0].subviews[0].subviews[0].subviews[0].class)
// console.log(data['subviews'][0]['class'])

// Defining the result array, views that match the selector will be pushed here
const result = []

// Testing an iterator for an array which will push the array element to into the
// 'result' array if the element matches the selector

// const arrayIterate = (array, selector) => {
//   for (let i = 0; i < array.length; i++) {
//     if (array[i].length) {
//       arrayIterate(array[i], selector)
//     } else if (array[i] === selector) {
//       result.push(array[i])
//     }
//   }
// }

  const printViews = (selector, object) => {
    // pull the keys and values from the object
    let entriesArray = Object.entries(object)

    // iterate over the entriesArray to see if any of the values are an Object
    for (let i = 0; i < entriesArray.length; i++) {
      // if the value matches the selector
      if (entriesArray[i][1] === selector) {
        // push the entire element to result
        result.push(entriesArray[i])
      // if the selector is subviews
      } else if (selector === 'subviews') {
        // push the element to result
        result.push(entriesArray[i])
        // and then run the iterator again
        // this gives a RangeError: Maximum call stack size exceeded
          // printViews(selector, entriesArray[i][1])

      // if the key matches the selector
      } else if (entriesArray[i][0] === selector) {
        // push the element to result
        result.push(entriesArray[i])
      // else if one of the values is itself an oject
      } else if (typeof entriesArray[i][1] === 'object') {
        // run the iterator again
        printViews(selector, entriesArray[i][1])
      }
    }
  }

// node functionality
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

// node function to accept user input
  readline.question(`Please enter selector: `, (selector) => {
    // run the printViews function using the user input and the data object
    printViews(selector, data)
    // print the result
    console.log(`Found ${result.length} views.`)
    readline.close()
  })

// Function for searching through the data object for the matching selector
  // const search = (selector, object) => {
  //   for (let key in object) {
  //       if (key === 'subviews') {
  //         console.log('key is subviews')
  //         for (let i = 0; i < key.length; i++) {
  //           search(selector, key)
  //         }
  //       }
  //   }
  //   console.log('result is', result)
  // }
    // iterate over the key value pairs in the object
  //   Object.entries(data).forEach(([key, value]) => {
  // if the key is subviews, run the function again
  //     if (key === 'subviews') {
  //       search(value, selector)
  // if the selector is the same as the value, push to the result array
  //     } else if (selector === value) {
  //       result.push(value)
  //     }
  //   })
  // print the result
  //   console.log(result)
  // }

  // testing if the object is an array. if the object[key] has a length, iterate over the array
  // if (object[key].length) {
  //   arrayIterate(object[key], selector)
  // } else if (object[key] === selector) {
  //   result.push(object[key])
  // } else if (Object.keys(object[key])) {
  //   search(object[key], selector)
  // }
// })

// Try using forEach to loop through the keys array
// const iterate = (obj, selector) => {
//   Object.keys(obj).forEach(key => {
//     if (obj[key] === selector) {
//         console.log('obj[key] is', obj[key])
//         result.push(obj[key])
//     } else if (typeof obj[key] === 'object' || typeof obj[key] === 'array') {
//         console.log('iterating again')
//         iterate(obj[key])
//     } else {
//       return
//     }
//   })
//   console.log(result)
// }
