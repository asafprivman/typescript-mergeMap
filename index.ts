// Import stylesheets
import "./style.css";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/operator/delay";
import { concatMap, mergeMap, switchMap, delay } from "rxjs/operators";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log("starting run");

const lastEditedNumbers = (name, timeToWait) => {
  console.log("name:", name, " timeToWait:", timeToWait);
  return Observable.from([1, 2, 3]).pipe(
    concatMap(item =>
      Observable.of(`name:${name}|item:${item}|delay:${timeToWait}`).pipe(
        delay(timeToWait * 1000)
      )
    )
  );
};

Observable.from(["jon", "sam"])
  .pipe(
    concatMap(name => Observable.of(name).delay(11 * 1000)),
    mergeMap(name => {
      console.log(name);
      let timeToWait = 10;
      if (name === "sam") {
        timeToWait = 0.1;
      }
      return lastEditedNumbers(name, timeToWait).pipe(
        switchMap(() => {
          return lastEditedNumbers(name, 3);
        })
      );
    })
  )
  .subscribe(msg => console.log(msg));
