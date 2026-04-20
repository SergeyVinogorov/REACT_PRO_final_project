import { http, HttpResponse } from 'msw';

// Matches both same-origin and absolute API URL requests:
// - /auth/login
// - https://api.v2.react-learning.ru/auth/login
// because of wildcard: */auth/login
export const authHandlers = [
	http.post('*/auth/login', async ({ request }) => {
		const body = (await request.json()) as {
			email?: string;
			password?: string;
		};

		if (!body.email || !body.password) {
			return HttpResponse.json(
				{ message: 'email/password required', statusCode: 400 },
				{ status: 400 }
			);
		}

		return HttpResponse.json(
			{
				user: { id: 'u_mock_1', email: body.email },
				accessToken: 'mock_access_token',
			},
			{ status: 200 }
		);
	}),

	http.post('*/auth/register', async ({ request }) => {
		const body = (await request.json()) as {
			email?: string;
			password?: string;
			name?: string;
		};

		if (!body.email || !body.password) {
			return HttpResponse.json(
				{ message: 'email/password required', statusCode: 400 },
				{ status: 400 }
			);
		}

		return HttpResponse.json(
			{
				user: { id: 'u_mock_2', email: body.email },
				accessToken: 'mock_access_token',
			},
			{ status: 201 }
		);
	}),
];
