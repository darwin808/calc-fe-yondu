import { useEffect, useState } from "react"

const arr = [
   { label: "C", value: "c", disable: false },
   { label: "-/+", value: "-", disable: true },
   { label: "%", value: "%", disable: true },
   { label: "/", value: "/", disable: false },
   { label: "7", value: "7", disable: false },
   { label: "8", value: "8", disable: false },
   { label: "9", value: "9", disable: false },
   { label: "x", value: "*", disable: false },
   { label: "4", value: "4", disable: false },
   { label: "5", value: "5", disable: false },
   { label: "6", value: "6", disable: false },
   { label: "-", value: "-", disable: false },
   { label: "1", value: "1", disable: false },
   { label: "2", value: "2", disable: false },
   { label: "3", value: "3", disable: false },
   { label: "+", value: "+", disable: false },
   { label: "0", value: "0", disable: false },
   // { label: " ", value: "0", disable: false },
   { label: ".", value: ".", disable: true },
   { label: "=", value: "=", disable: false },
]

function App() {
   const [displaceValue, setdisplaceValue] = useState("")
   const [collection, setcollection] = useState<any>([])
   const [currentKeypress, setcurrentKeypress] = useState("")
   const [currentTotal, setcurrentTotal] = useState("")

   function evil(fn: any) {
      return new Function("return " + fn)()
   }
   useEffect(() => {
      if (currentKeypress === "=") {
         const res1 = collection.filter((e: any) => e !== "=").join("")
         const res = evil(res1)
         setcurrentTotal(res)
         setdisplaceValue(String(res))
         console.log(res, 999)
      }
   }, [currentKeypress, collection])

   const handleClick = (e: { value: string; label: string }) => {
      setcurrentKeypress(e.value)
      setcollection([...collection, e.value])
   }

   useEffect(() => {
      if (currentKeypress !== "=") {
         setdisplaceValue(
            collection.join(",", "").replaceAll(",", "").replaceAll("=", ""),
         )
      }

      if (currentKeypress === "c") {
         setcurrentKeypress("")
         setcollection([])
         setdisplaceValue("")
      }
   }, [collection, currentKeypress])

   return (
      <div
         className="App"
         style={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            background: "pink",
         }}
      >
         <div style={{ height: "50vh", width: "20vw", border: "1px solid black" }}>
            <div style={{ width: "100%", display: "flex" }}>
               <input
                  value={displaceValue}
                  type="text"
                  style={{ width: "100%", height: "3rem", textAlign: "right" }}
                  // onChange={handleChange}
               />
            </div>
            <div
               style={{
                  background: "red",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
               }}
            >
               {arr.map((e) => {
                  return (
                     <button
                        style={{
                           gridColumn: e.value === "0" ? `span 2` : `span 1`,
                        }}
                        disabled={e.disable}
                        onClick={() => handleClick(e)}
                     >
                        {e.label}
                     </button>
                  )
               })}
            </div>
         </div>
      </div>
   )
}

export default App
