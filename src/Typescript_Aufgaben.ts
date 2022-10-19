/**
 * Aufgabe 1
 * Gegeben: Ein Integer x und ein Integer y
 * Es soll die Summe von x und y zurückgegeben werden
 */
function add(x: number, y: number): number {

    //TODO

    return x + y;

}

/**
 * Aufgabe 2
 * Gegeben: Eine Liste aus Strings "list" und ein String "word"
 * Es soll der String "word" zurückgegeben werden, sofern dieser unabhängig von der Schreibweise hinsichtlich Groß- und Kleinschreibung in der Liste "list" enthalten ist.
 * Ist der String "word" nicht in der Liste enthalten, soll "Nicht gefunden!" zurückgegeben werden.
 */
function returnContainedWord(list: string[], word: string): string {

    //TODO
    for (let i = 0; i < list.length;i++) {
        if (list[i].toUpperCase() === word.toUpperCase()) {
            return list[i];
        }
    }
    return 'Nicht gefunden!'
}


/**
 * Aufgabe 3 (entnommen aus https://leetcode.com/)
 * Gegeben: Eine Liste aus Integern "list" und eine Zahl "x"
 * Es soll die Anzahl der Subarrays zurückgegeben werden, deren Summe die Zahl "x" ergibt
 *
 *      Lösung nach: https://leetcode.com/problems/subarray-sum-equals-k/solutions/818583/on-typescript/
 */
function amountOfSubarraySum(list: number[], x: number): number {

    //TODO
    let res :number[][]= [];
    let temp :number[] = [];
    let len = Math.pow(2,list.length);
    //go through every possible combination
    for (let i = 0; i < len; i++){
        //go through every number in list
        temp.splice(0);
        for(let j = 0; j < list.length;j++){
            if((i & Math.pow(2,j))){
                temp.push(list[j]);
            }
        }
        //add combinations to results
        if(temp.length > 0 && res.indexOf(temp) == -1){
            if(getSum(temp) == x) {
                res.push(temp);
                console.log(temp);
            }
        }
    }
    return res.length;
}

function getSum(numbers :number[]):number {
    let res = 0;
    for(let i = 0; i < numbers.length; i++){
        res += numbers[i];
    }
    return res;
}

/**
 * Aufgabe 4 (entnommen aus https://leetcode.com/)
 * Gegeben: Eine Anzahl an Items "amountOfItems" und eine Anzahl an Personen "amountOfPeople"
 * Die Items sollen auf die Personen verteilt werden und die Anzahl der Items, welche die einzelnen Personen haben, soll zurückgegeben werden.
 * Die Verteilung der Items auf die Personen erfolgt gemäß folgendem System:
 *      -> Runde 1: die erste Person erhält ein Item, die zweite Person zwei Items, ... und die letzte Person "amountOfPeople" Items (sofern genügend Items "amountOfItems" existieren)
 *      -> Runde 2: die erste Person erhält "amountOfPeople" + 1 Items, die zweite Person "amountOfPeople" + 2  Items, ... und die letzte Person 2 * "amountOfPeople" Items
 *      -> Runde 3: ...
 *      ...
 *      Der Prozess der Verteilung der Items wird gestoppt, sobald keine Items mehr existieren (sprich: Es können nie mehr Items verteilt werden als tatsächlich existieren)
 *
 *      Lösung nach: https://github.com/eddyhdzg/leetcode-typescript-solutions/blob/master/src/problems/1103-Distribute-Candies-to-People.ts
 */
function handleOutItems(amountOfItems: number, amountOfPeople: number): number[] {

    //TODO
    let people : number[] = [];
    let next = 0;
    for (let i = 0; i < amountOfPeople; i++){
        people.push(0);
    }
    for (let i = 1; amountOfItems >= i; i++ ){
        if(next == amountOfPeople){
            next = 0;
        }
        people[next] += i;
        amountOfItems -= i;
        next++;
    }
    people[next] += amountOfItems;
    return people;
}


/**
 * Aufgabe 5 (entnommen aus https://leetcode.com/)
 * Gegeben: Ein String "stringToBeChecked", welcher Buchstaben und die Zeichen '(' und ') enthält.
 * Der String "stringToBeChecked" soll modifiziert werden, sodass dieser den Aufbau von regulären Ausdrücken entspricht.
 * Konkret muss gewährleistet werden, dass jeder Substring S eindeutig in Klammern eingebettet ist, sprich '('S')'.
 * Ein Substring ist dabei auch ein bereits in Klammern eingebetteter String, z.B: S = '(abc)'.
 * Nicht korrekt gesetzte Klammern (d.h. Klammern, welche entweder kein Ende oder kein Anfang haben) sollen entfernt werden, z.B. '('S')'')' ==> '('S')'
 * Wenn der korrekte String nach der Modifikation leer ist, soll "(empty)" zurückgegeben werden
 *
 *      Lösung nach: https://github.com/eddyhdzg/leetcode-typescript-solutions/blob/master/src/problems/1249.Minimum-Remove-to-Make-Valid-Parentheses.ts
 */
function convertToCorrectStringFormat(stringToBeChecked: string): string {

    //TODO

    // Save unused '(' in opened & unused ')' in closed
    let opened : number[] = [];
    let closed : number[] = [];
    let temp : number[] = [];

    let letters = stringToBeChecked.split('');
    letters.join(' ');
    for(let i = 0; i < letters.length;i++){
        if(letters[i] === '('){
            opened.push(i);
            if (closed.length > 0){
                opened.shift();
                closed.shift();
            }
        } else if(letters[i] === ')'){
            closed.push(i);
            if (opened.length > 0){
                opened.shift();
                closed.shift();
            }else {
                temp.push(i);
                closed.shift();
            }
            //else closed pop and add to temp array
        }
    }

    let leftovers = opened.concat(temp, closed);
    leftovers.sort();

    for(let i = 0; i < leftovers.length; i++){
      letters.splice(leftovers[i] - i, 1);
    }

    if(letters.length == 0){
        return '(empty)'
    }
    return letters.join('');
}

/**
 * Aufgabe 1
 */
console.log("[Aufgabe 1] Ergebnis: \t\t\t" + add(300,61))
console.log("[Aufgabe 1] Erwartetes Ergebnis: \t361" )
console.log("===============")


/**
 * Aufgabe 2
 */
console.log("[Aufgabe 2] Ergebnis: \t\t\t" + returnContainedWord(['Rot', 'Grün', 'Gelb', 'Blau'], 'bLAu'))
console.log("[Aufgabe 2] Erwartetes Ergebnis: \tBlau" )
console.log("===============")

console.log("[Aufgabe 2] Ergebnis: \t\t\t" + returnContainedWord(['Rot', 'Grün', 'Gelb', 'Blau'], 'asdf'))
console.log("[Aufgabe 2] Erwartetes Ergebnis: \tNicht gefunden!" )
console.log("===============")


/**
 * Aufgabe 3
 */
console.log("[Aufgabe 3] Ergebnis: \t\t\t" + amountOfSubarraySum([1,5,5,2,3,1,6], 6));
console.log("[Aufgabe 3] Erwartetes Ergebnis: \t3" )
console.log("===============")

console.log("[Aufgabe 3] Ergebnis: \t\t\t" + amountOfSubarraySum([1,2,1,3,1,2,1], 3));
console.log("[Aufgabe 3] Erwartetes Ergebnis: \t5" )
console.log("===============")


/**
 * Aufgabe 4
 */
console.log("[Aufgabe 4] Ergebnis: \t\t\t[" + handleOutItems(5, 6) + "]");
console.log("[Aufgabe 4] Erwartetes Ergebnis: \t[1,2,2,0,0,0]")
console.log("===============")

console.log("[Aufgabe 4] Ergebnis: \t\t\t[" + handleOutItems(83, 8) + "]");
console.log("[Aufgabe 4] Erwartetes Ergebnis: \t[10,12,14,16,10,6,7,8]" )
console.log("===============")


/**
 * Aufgabe 5
 */
console.log("[Aufgabe 5] Ergebnis: \t\t\t" + convertToCorrectStringFormat("(Soft)(ware D)ev(el(o)p)ment ((a)nd) (P(rogr)(amm)i)ng(("));
console.log("[Aufgabe 5] Erwartetes Ergebnis: \t(Soft)(ware D)ev(el(o)p)ment ((a)nd) (P(rogr)(amm)i)ng" )
console.log("===============")

console.log("[Aufgabe 5] Ergebnis: \t\t\t" + convertToCorrectStringFormat("(Soft)(ware D)ev(el(o)p)men)((t) ((a)nd) (P(rogr)((amm)i)ng(("));
console.log("[Aufgabe 5] Erwartetes Ergebnis: \t(Soft)(ware D)ev(el(o)p)men((t) ((a)nd) (P(rogr)amm)i)ng" )
console.log("===============")

console.log("[Aufgabe 5] Ergebnis: \t\t\t" + convertToCorrectStringFormat(")))(("));
console.log("[Aufgabe 5] Erwartetes Ergebnis: \t(empty)" )
console.log("===============")