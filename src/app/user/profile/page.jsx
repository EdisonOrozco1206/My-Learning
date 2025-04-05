'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, updateSession } from '@/libs/libs';

const ProfilePage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [document_type, setDocumentType] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const sessionCookie = await getSession()
                setUserInfo(sessionCookie.userData);
                setName(sessionCookie.userData.name)
                setLastname(sessionCookie.userData.lastname)
                setPhone(sessionCookie.userData.phone)
                setDocumentType(sessionCookie.userData.document_type)
                setEmail(sessionCookie.userData.email)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        
        const validateNumber = (number) => {
            const numberRegex = /^\d{7,15}$/;
            return numberRegex.test(number);
        };
        
        const validateEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        }
    
        const validateTextOnly = (text) => {
            const textRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
            return textRegex.test(text);
        };
        
        setErrors([]);
        let inputErrors = [];

        if(!name){
            inputErrors["name"] = "Nombre es obligatorio."
        } else if(!validateTextOnly(name)){
            inputErrors["name"] = "Nombre no valido."
        }
            
        if(!lastname){
            inputErrors["lastname"] = "Apellido es obligatorio."
        } else if(!validateTextOnly(lastname)){
            inputErrors["lastname"] = "Apellido no valido."
        }
        if(!phone){
            inputErrors["phone"] = "Teléfono es obligatorio."
        }else if(!validateNumber(phone)){
           inputErrors["phone"] = "Teléfono no valido."
        }
        if(!email) {
            inputErrors["email"] = "Correo es obligatorio.";
        }else if(!validateEmail(email)){
            inputErrors["email"] = "Email no valido.";
        }
        if (!document_type) inputErrors['document_type'] = 'Tipo de documento es obligatorio.';
        setErrors(inputErrors);

        if(Object.keys(inputErrors).length === 0) {
            try {
                const url = `/api/users/${userInfo.id}`;
                setLoading(true);
                document.body.style.cursor = "wait";

                const res = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify({ name, lastname, phone, document_type, email }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (res.ok) {
                    await updateSession(JSON.stringify({ name, lastname, phone, document_type, email }));
                    router.push("/user/profile");
                } else {
                    console.error('Failed to update user profile');
                }
            } catch (error) {
                inputErrors['general'] = 'Error al actualizar perfil';
                setErrors(inputErrors);
            }finally {
                setLoading(false);
                document.body.style.cursor = "default";
            }
        }
    };

    if (!userInfo) return <div className='mt-10 w-full lg:w-2/5 mx-auto'><h2>Cargando información de usuario...</h2></div>;

    return (
        <div className='mt-10 w-full lg:w-2/5 mx-auto'>
            <form onSubmit={onSubmit} className='border p-6'>

                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Perfil | {userInfo.name} {userInfo.lastname}
                </h2>

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tus nombres:' type="text" name='name' defaultValue={userInfo.name} onChange={(e) => setName(e.target.value.trim())} />
                {errors.name && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.name}</p>}

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tus apellidos:' type="text" name='lastname' defaultValue={userInfo.lastname} onChange={(e) => setLastname(e.target.value.trim())} />
                {errors.lastname && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.lastname}</p>}

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu teléfono:' type="number" name='phone' defaultValue={userInfo.phone} onChange={(e) => setPhone(e.target.value.trim())}/>
                {errors.phone && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.phone}</p>}

                {errors.document_type && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.document_type}</p>}
                <select name="document_type" id="" className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800'  defaultValue={userInfo.document_type} onChange={(e) => setDocumentType(e.target.value.trim())}>
                    <option value="">Selecciona tu tipo de documento</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="P">Pasaporte</option>
                </select>

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu correo:' type="email" name='email' defaultValue={userInfo.email} onChange={(e) => setEmail(e.target.value.trim())}/>
                {errors.email && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.email}</p>}

                {errors.general && <p className='text-red-500 w-5/6 block mx-auto text-sm'>{errors.general}</p>}
                <input className='w-5/6 mt-4 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" disabled={loading} value={loading ? "Guardando..." : "Guardar"}/>
            </form>
        </div>
    );
};

export default ProfilePage;
