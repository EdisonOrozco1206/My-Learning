"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lection, setLection] = useState(null);
  const [position, setPosition] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [errors, setErrors] = useState([]);
  const [extension, setExtension] = useState(null)
  const [file, setFile] = useState()

  useEffect(() => {
    if (!params.id) { router.push("/"); return; }

    const fetchLection = async () => {
      try {
        const res = await fetch("/api/lections/" + params.id);
        const content = await res.json();
        setLection(content.lection);
        setTitle(content.lection.title)
        setPosition(content.lection.position)
        setContent(content.lection.content)
      } catch (error) {
        console.error("Error fetching lection:", error);
      }
    };

    fetchLection();
  }, [params.id, router]);

  useEffect(() => {
    if (lection && lection.content) {
      setExtension(lection.content.slice(-4));
    }
  }, [lection]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let inputErrors = [];

    if (!lection) return;
    if(!position) inputErrors['position'] = "La posición es requerida";
    if(!title) inputErrors['title'] = "El título es requerido";
    setErrors(inputErrors)

    const checkPositionQuery = await fetch(`/api/lections/checkPosition/${lection.course_id}/${lection.position}`);
    const checkPosition = await checkPositionQuery.json()
    
    if(checkPosition.lections && lection.position != position){
      inputErrors["general"] = "La posicion de lección ya se encuentra ocupada";
      setErrors(inputErrors)
    }

    if(Object.keys(inputErrors).length == 0) {
      try {
        setLoading(true);
        document.body.style.cursor = "wait";
        let newPortait = content || '';

        if(file){
          const formData = new FormData()
          formData.append("file", file)

          const fileRes = await fetch("/api/upload", {
            method: "POST",
            body: formData
          })
          const fileData = await fileRes.json()
          newPortait = fileData.url
        }

        const data = { title, position, content: newPortait };

        const res = await fetch("/api/lections/" + lection.id, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        if(res.ok) {
          router.push("/course/lections/" + lection.course_id)
          router.refresh()
        }
      } catch (error) {
        inputErrors['general'] = "Error al actualizar la lección";
        setErrors(inputErrors);
      }finally {
        setLoading(false);
        document.body.style.cursor = "default";
      }
    }
  };

  if (!lection) {
    return (
      <div className="mt-10 w-full lg:w-2/5 mx-auto">
        <h2 className="text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full">
          Cargando...
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full lg:w-2/5 mx-auto">
      <form onSubmit={onSubmit} className="border p-6">
        <h2 className="text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full">
          Editar Lección
        </h2>

        <input className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800" placeholder="Titulo:" type="text" name="title" defaultValue={lection.title}  onChange={(e) => setTitle(e.target.value.trim())} />
        {errors.title && <p className="text-red-500 w-5/6 mx-auto">{errors.title}</p>}

        <input className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800" placeholder="Posición:" type="number" name="position" defaultValue={lection.position}  onChange={(e) => setPosition(parseInt(e.target.value.trim()))} />
        {errors.position && <p className="text-red-500 w-5/6 mx-auto">{errors.position}</p>}

        <label htmlFor="content" className="w-5/6 mx-auto mt-8 p-4 block border-b border-slate-800 text-slate-400">Contenido de la lección: </label>  
        <input className='w-5/6 mx-auto mb-8 p-4 outline-none focus:border focus:border-slate-8 block border-b border-slate-800' placeholder='Contenido de la lección:' type="file" name='content' accept="video/*, .zip" onChange={(e) => setFile(e.target.files[0])} />
        {content ? (<p className="text-xs w-5/6 mx-auto mb-4"> {content} </p>) : ''}
        {errors.file && <span className="block text-xs text-red-500 w-5/6 mx-auto">{errors.file}</span>}

        {errors.general && <p className="text-red-500 w-5/6 mx-auto">{errors.general}</p>}
        <input className="w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600" type="submit" value={loading ? "Actualizando..." : "Actualizar"} />
        <Link href={"/course/lections/" + lection.course_id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2" >
          Regresar
        </Link>
      </form>
    </div>
  );
};

export default Page;
