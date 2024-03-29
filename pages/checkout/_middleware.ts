import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';



export async function middleware (req: NextRequest, ev: NextFetchEvent) {
	
	const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

	if(!session){
		const { origin } = req.nextUrl.clone()
		const requestedPage = req.page.name;
        return NextResponse.redirect(`${ origin }/auth/login?p=${ requestedPage }`)
	}

	return NextResponse.next();

	/* const {token = ''} = req.cookies;

	/* return new Response('No autorizado', {
		status: 401
	}); */

	/* try {

		await jwt.isValidToken(token);
		return NextResponse.next();

	} catch (error) {
		
		//const requestedPage = req.page.name;
		//return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
		const url = req.nextUrl.clone()
		url.pathname = '/auth/login';
		url.search = `p=${req.page.name}`;
		return NextResponse.redirect(url);

	} */


}