'use client'

import { useState } from "react";

const DownloadTransactionsReport = ({all}) => {
    const limit = all ? true : false;
    const [downloaded, setDownloaded] = useState(false)

    const downloadReport = async () => {
        try {
            const response = await fetch("/api/excel/"+limit);
            if(response.ok){
                const blob = await response.blob();
    
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Reporte transacciones My Learning.xlsx"; 
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
        
                window.URL.revokeObjectURL(url);
                setDownloaded(true)

                setTimeout(() => {
                    setDownloaded(false)
                }, "5000")
            }
        } catch (error) {
            console.error("Error descargando el archivo:", error.message);
        }
    }

    return (
        <div>
            {downloaded ? (
                <p className="border border-green-500 text-green-500 w-fit mx-auto my-2 px-4 py-2">¡Reporte descargado!</p>
            ) : (
                <button onClick={downloadReport} className="border border-slate-800 hover:bg-slate-400 w-fit mx-auto my-2 px-4 py-2">Descargar reporte</button>
            )}
        </div>
    )
}

export default DownloadTransactionsReport