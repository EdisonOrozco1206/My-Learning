
import { prisma } from "@/libs/prisma";
import { cookies } from 'next/headers';
import { getSession } from "@/libs/libs";
import NavbarClient from "./NavbarClient";

const getCategories = async () => {
    return await prisma.category.findMany();
};

const Navbar = async () => {
    const categories = await getCategories();
    const userSession = await getSession();
    const user = userSession ? userSession.userData : '';
    const sessionCookie = cookies().get("session")

    return (
        <NavbarClient categories={categories} user={user} sessionCookie={sessionCookie}/>
    );
};

export default Navbar;
