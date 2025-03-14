"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = ({ params }) => {
  const router = useRouter();
  const [lection, setLection] = useState(null);
  const [position, setPosition] = useState(null);
  const [title, setTitle] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!params.id) {
      router.push("/");
      return;
    }

    const fetchLection = async () => {
      try {
        const res = await fetch("/api/lections/" + params.id);
        const content = await res.json();
        setLection(content.lection);
      } catch (error) {
        console.error("Error fetching lection:", error);
      }
    };

    fetchLection();
  }, [params.id, router]);

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
        const data = { title, position };
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
      }
    }
  };

  if (!lection) {
    return (
      <div className="mt-10 w-2/5 mx-auto">
        <h2 className="text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full">
          Cargando...
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-10 w-2/5 mx-auto">
      <form onSubmit={onSubmit} className="border p-6">
        <h2 className="text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full">
          Editar Lección
        </h2>

        <input className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800" placeholder="Titulo:" type="text" name="title" defaultValue={lection.title}  onChange={(e) => setTitle(e.target.value.trim())} />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <input className="w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-800 block border-b border-slate-800" placeholder="Posición:" type="number" name="position" defaultValue={lection.position}  onChange={(e) => setPosition(parseInt(e.target.value.trim()))} />
        {errors.position && <p className="text-red-500">{errors.position}</p>}

        {errors.general && <p className="text-red-500">{errors.general}</p>}
        <input className="w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600" type="submit" value="Actualizar" />
        <Link href={"/course/lections/" + lection.course_id} className="w-5/6 mx-auto block cursor-pointer border border-slate-800 mb-4 text-slate-900 text-xl p-3 hover:bg-slate-100 text-center mt-2" >
          Regresar
        </Link>
      </form>
    </div>
  );
};

export default Page;
