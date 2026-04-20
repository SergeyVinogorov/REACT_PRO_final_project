import { http, HttpResponse } from 'msw';

export const userHandlers = [
	http.get('*/users/me', ({ request }) => {
		const auth = request.headers.get('authorization');
		if (!auth) {
			return HttpResponse.json(
				{ message: 'Unauthorized', statusCode: 401 },
				{ status: 401 }
			);
		}

		return HttpResponse.json(
			{
				id: 'u_mock_1',
				email: 'mock@example.com',
				name: 'Mock User',
				about: 'Описание пользователя',
				avatarPath: 'https://i.pravatar.cc/300?img=13',
				phone: '+79999999999',
				roles: ['USER'],
				favoritesPost: [],
				likes: [],
			},
			{ status: 200 }
		);
	}),
];
