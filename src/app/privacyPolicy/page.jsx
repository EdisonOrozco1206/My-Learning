
const Page = () => {
    return (
        <div className='bg-slate-300 p-4 lg:w-4/5 mx-auto mt-10'>
            <div>
                <h1 className="text-center text-2xl">Política de privacidad</h1>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Introducción </h2>
                    <p className="py-2 px-4 text-justify">
                        En &quot;My Learning&quot;, valoramos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal.
                    </p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Información que Recopilamos</h2>
                    <p className="py-2 px-4 text-justify">
                        Información proporcionada directamente por el usuario al registrarse, como nombre, correo electrónico, y datos de pago.
                    </p>
                    <p className="py-2 px-4 text-justify">
                        Información recopilada automáticamente, como la dirección IP y datos de uso de la Plataforma.
                    </p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Uso de la Información</h2>
                    <p className="py-2 px-4 text-justify">Para proporcionar acceso a los cursos adquiridos.</p>
                    <p className="py-2 px-4 text-justify">Para personalizar la experiencia del usuario y mejorar nuestros servicios.</p>
                    <p className="py-2 px-4 text-justify">Para procesar transacciones y enviar notificaciones relacionadas con los cursos.</p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Compartición de la Información</h2>
                    <p className="py-2 px-4 text-justify">No compartiremos tu información personal con terceros, salvo en los siguientes casos:</p>
                    <ul className="text-slate-500 mx-4 my-2 list-disc list-inside">
                        <li>Para cumplir con la ley o solicitudes legales.</li>
                        <li>Con proveedores de servicios que nos ayuden a operar la Plataforma (por ejemplo, procesadores de pago).</li>
                    </ul>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Seguridad de la Información</h2>
                    <p className="py-2 px-4 text-justify">
                        Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados.
                    </p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Tus Derechos</h2>
                    <p className="py-2 px-4 text-justify">Derecho a acceder, rectificar o eliminar tus datos personales.</p>
                    <p className="py-2 px-4 text-justify">Derecho a restringir el procesamiento o a oponerte a ciertos usos de tu información.</p>
                    <p className="py-2 px-4 text-justify">Para ejercer estos derechos, contacta con nosotros a través del correo electrónico proporcionado en la Plataforma.</p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Cookies</h2>
                    <p className="py-2 px-4 text-justify">
                        Utilizamos cookies para mejorar la experiencia del usuario. Puedes gestionar las cookies desde la configuración de tu navegador.
                    </p>
                </div>
                <div className="col-span-4 lg:col-span-2 bg-white">
                    <h2 className="capitalize font-bold text-center my-1 text-lg border-b border-slate-400">Cambios en esta Política</h2>
                    <p className="py-2 px-4 text-justify">
                        Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cualquier cambio a través de la Plataforma.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
