import './App.css'
import ResultsTable from "./components/results-table/results-table";

const tableData = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 34 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "Diana", age: 40},
  { id: 5, name: "Eve", age: 31},
]
function App() {
  return (
  <ResultsTable results={tableData.length} data={tableData}/>);
}

export default App;
