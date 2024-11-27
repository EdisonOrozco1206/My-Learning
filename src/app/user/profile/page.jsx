'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, updateSession } from '@/libs/libs';

const ProfilePage = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const sessionCookie = await getSession()
                setUserInfo(sessionCookie.userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const url = `/api/users/${userInfo.id}`;

        const name = e.target.name.value;
        const lastname = e.target.lastname.value;
        const phone = e.target.phone.value;
        const document_type = e.target.document_type.value;
        const email = e.target.email.value;

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
    };

    if (!userInfo) return <div>Cargando informacion de usuario...</div>;

    return (
        <div className='mt-10 w-2/5 mx-auto'>
            <form onSubmit={onSubmit} className='border p-6'>

                <h2 className='text-2xl text-slate-800 border-b border-slate-800 text-center pb-4 w-full'>
                    Perfil | {userInfo.name} {userInfo.lastname}
                </h2>

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tus nombres:' type="text" name='name' defaultValue={userInfo.name} required />
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tus apellidos:' type="text" name='lastname' defaultValue={userInfo.lastname} required />
                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu telefono:' type="number" name='phone' defaultValue={userInfo.phone}/>

                <select name="document_type" id="" className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' required defaultValue={userInfo.document_type}>
                    <option value="">Selecciona tu tipo de documento</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CC">Cedula de ciudadanía</option>
                    <option value="CE">Cedula de extranjeria</option>
                    <option value="P">Pasaporte</option>
                </select>

                <input className='w-5/6 mx-auto my-8 p-4 outline-none focus:border focus:border-slate-8 p-600 block border-b border-slate-800' placeholder='Ingresa tu correo:' type="email" name='email' defaultValue={userInfo.email} required/>

                <input className='w-5/6 mx-auto block cursor-pointer bg-slate-800 text-white text-xl p-3 hover:bg-slate-600' type="submit" value="Guardar cambios"/>
            </form>
        </div>
    );
};

export default ProfilePage;
