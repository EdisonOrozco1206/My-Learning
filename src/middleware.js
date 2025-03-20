import { NextResponse } from 'next/server';

export function middleware(req) {
  const authRoutes = ['/user/login', '/user/register'];
  const publicRoutes = ['/', '/about', '/contact', "/conditions", "/contact", "/privacyPolicy", "/category", "/cart", "/search"];
  const protectedRoutes = {
    user: ["/checkout/success", "/checkout/pending", "/checkout/failure", "/mylearning", '/user/profile', '/user/courses'],
    teacher: ["/checkout/success", "/checkout/pending", "/checkout/failure", '/teacher', '/course/new', "/admins/certificates", "/course/edit", "/course/lections", "/lections/new", "/lections/edit", "/mylearning"],
    admin: ["/checkout/success", "/checkout/pending", "/checkout/failure", '/admins/dashboard', "/mylearning"],
  };

  const currentPath = req.nextUrl.pathname;
  const token = req.cookies.get("session")?.value;

  if (publicRoutes.some((route) => currentPath.startsWith(route)))  return NextResponse.next(); 

  if (token && authRoutes.includes(currentPath))  return NextResponse.redirect(new URL('/mylearning', req.url));

     
  if (!token) return NextResponse.redirect(new URL('/user/login', req.url))

  try {
    const userData = JSON.parse(atob(token.split('.')[1]));
    const userRole = userData.role;
    const allowedRoutes = protectedRoutes[userRole] || [];

    if (!allowedRoutes.some((route) => currentPath.startsWith(route))) return NextResponse.redirect(new URL('/', req.url));

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/user/login', req.url));
  }
}
