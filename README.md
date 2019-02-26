# @dvo/batch-query
This tool is meant to merge a mySQL query and a data array into a formatted query that does what it needs in batch. For example, the query
```
let query =
'REPLACE INTO common_surnames
  (america, spain, korea)
VALUES
  (?,?,Kim)'
```
could be combined with data like
```
let data = [
  ['Johnson', 'Gutierrez'],
  ['Lee', 'Pança'],  
  ['McDonald', 'Plata']
]
```
when called with `batchQuery( query, data )` to produce the results
```
let formattedQuery =
'REPLACE INTO common_surnames
  (america, spain, korea)
VALUES
  (Johnson,Gutierrez,Kim),
  (Lee,Pança,Kim),
  (McDonald,Plata,Kim)'
```
