
const page = () => {
    return (
        <div className='bg-slate-300 p-4 w-5/6 mx-auto mt-10'>
            <div>
                <h1 className="text-center text-2xl">Terminos y condiciones</h1>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Introducción</h2>
                    <p className="py-2 px-4 text-justify">
                        Estas condiciones generales de uso (en adelante, "Condiciones") regulan el acceso y uso de la plataforma "My Learning" (en adelante, "Plataforma"), cuyo objetivo es proporcionar acceso a cursos en línea.
                    </p>
                </div>
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Requisitos de registro</h2>
                    <p className="py-2 px-4 text-justify">
                        Para acceder a ciertos servicios de la Plataforma, es necesario registrarse proporcionando información veraz, completa y actualizada
                    </p>
                    <p className="py-2 px-4 text-justify">
                        Cada usuario es responsable de mantener la confidencialidad de sus credenciales de acceso
                    </p>
                </div>
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Uso aceptable</h2>
                    <p className="py-2 px-4 text-justify">
                        Los usuarios deben utilizar la Plataforma exclusivamente para fines educativos y de acuerdo con las leyes vigentes
                    </p>
                    <p className="py-2 px-4 text-justify">
                        Está prohibido compartir el acceso a los cursos con terceros, así como distribuir o comercializar el contenido de los cursos sin autorización
                    </p>
                </div>
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Adquisición de cursos</h2>
                    <p className="py-2 px-4 text-justify">
                        Una vez completada la compra, los usuarios obtendrán acceso a los cursos adquiridos bajo las condiciones indicadas en la descripción del curso
                    </p>
                    <p className="py-2 px-4 text-justify">
                        Los pagos realizados no son reembolsables, salvo en los casos especificados en nuestra política de reembolsos
                    </p>
                </div>
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Propiedad intelectual</h2>
                    <p className="py-2 px-4 text-justify">
                        Todo el contenido de la Plataforma (textos, videos, imágenes, etc.) está protegido por derechos de propiedad intelectual
                    </p>
                    <p className="py-2 px-4">
                        Queda prohibida la reproducción, distribución o modificación del contenido sin autorización expresa
                    </p>
                </div>
                <div className="col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Suspensión o cancelación de la cuenta</h2>
                    <p className="py-2 px-4 text-justify">
                        Nos reservamos el derecho de suspender o cancelar cuentas en caso de incumplimiento de estas Condiciones
                    </p>
                </div>
                <div className="col-span-4 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Modificaciones</h2>
                    <p className="py-2 px-4 text-justify">
                        Nos reservamos el derecho de modificar estas Condiciones en cualquier momento. Los cambios se notificarán a través de la Plataforma
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page