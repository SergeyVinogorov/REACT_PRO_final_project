import { http, HttpResponse } from 'msw';

export const reviewHandlers = [
  http.post('*/reviews/leave/:productId', async ({ params, request }) => {
    const { productId } = params as { productId: string };
    const body = (await request.json()) as { text?: string; rating?: number };

    return HttpResponse.json(
      {
        id: `review_${productId}_${Date.now()}`,
        createdAt: new Date().toISOString(),
        text: body.text ?? '',
        rating: body.rating ?? 5,
        user: {
          id: 'u_mock_1',
          email: 'mock@example.com',
          name: 'Mock User',
          about: 'Описание пользователя',
          avatarPath: 'https://i.pravatar.cc/300?img=13',
          phone: '+79999999999',
          roles: ['USER'],
        },
      },
      { status: 201 },
    );
  }),
];
