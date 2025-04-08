import {  useState } from "react"
import CurrDocs from "./CurrDocs";
import NewDocs from "./NewDocs";

const Doctors = () => {
  const [docs,setDocs]=useState("Current");

  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className="doc-title">Doctors</div>
        <div className="doc-buttons">
          <div className={`view-docs ${(docs==="Current")?"active":""}`} onClick={()=>setDocs("Current")}>Doctors</div>
        </div>
      </div>
      <div className="doc-content">

      {(docs==="Current") && <CurrDocs/>}
      </div>

    </div>
  )
}

export default Doctors;