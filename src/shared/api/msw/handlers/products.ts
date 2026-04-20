import { http, HttpResponse } from 'msw';

type Role = 'USER' | 'ADMIN';

type User = {
	id: string;
	createdAt?: string;
	updatedAt?: string;
	email: string;
	provider?: string | null;
	isAdmin?: boolean;
	isBlocked?: boolean;
	name: string;
	avatarPath: string;
	about: string;
	phone: string;
	roles: Role[];
	likes?: Array<{
		id: string;
		userId: string;
		productId: string;
		product?: any;
	}>;
	favoritesPost?: any[];
};

type Category = {
	id: number;
	name: string;
	slug: string;
};

type Like = {
	id: string;
	userId: string;
	productId: string;
	user?: User;
};

type Review = {
	id: string;
	createdAt: string;
	text: string;
	rating: number;
	user: Pick<
		User,
		'id' | 'email' | 'name' | 'about' | 'avatarPath' | 'phone' | 'roles'
	> & {
		likes?: any[];
		favoritesPost?: any[];
	};
	product?: any;
};

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string;
	createdAt: string;
	updatedAt: string;
	slug: string;
	discount: number;
	isPublished: boolean;
	stock: number;
	wight: string;
	tags: string[];

	categoryId: number;
	userId: string;

	likes: Like[];
	category: Category;
	reviews: Review[];
	user: User;
};

function isoDaysAgo(days: number) {
	const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
	return d.toISOString();
}

function makeCategory(n: number): Category {
	const categories: Category[] = [
		{ id: 1, name: 'Наборы', slug: 'nabory' },
		{ id: 2, name: 'Пиво', slug: 'pivo' },
		{ id: 3, name: 'Закуски', slug: 'snacks' },
		{ id: 4, name: 'Игрушки', slug: 'toys' },
	];
	return categories[n % categories.length];
}

function makeUser(n: number): User {
	return {
		id: `cmi_user_${n}`,
		createdAt: isoDaysAgo(300 - n),
		updatedAt: isoDaysAgo(10 - (n % 5)),
		email: `user${n}@mail.ru`,
		provider: null,
		isAdmin: n % 7 === 0,
		isBlocked: false,
		name: `User ${n}`,
		avatarPath: `https://i.pravatar.cc/300?img=${(n % 70) + 1}`,
		about: 'Описание пользователя',
		phone: `+7 (900) 000-00-${String(n).padStart(2, '0')}`,
		roles: ['USER'],
		favoritesPost: [],
	};
}

function makeProduct(n: number): Product {
	const category = makeCategory(n);
	const user = makeUser((n % 9) + 1);

	const id = `cm87itfy7_mock_${n}`;
	const createdAt = isoDaysAgo(n); // smaller n => newer
	const updatedAt = createdAt;

	const likes: Like[] = Array.from({ length: n % 3 }).map((_, i) => ({
		id: `like_${n}_${i}`,
		userId: makeUser(((n + i) % 12) + 1).id,
		productId: id,
	}));

	const reviews: Review[] = Array.from({ length: (n + 1) % 3 }).map((_, i) => {
		const ru = makeUser(((n + i + 3) % 12) + 1);
		return {
			id: `review_${n}_${i}`,
			createdAt: isoDaysAgo(n - 1),
			text: `Отзыв ${i + 1} для продукта ${n}`,
			rating: ((n + i) % 5) + 1,
			user: {
				id: ru.id,
				email: ru.email,
				name: ru.name,
				about: ru.about,
				avatarPath: ru.avatarPath,
				phone: ru.phone,
				roles: ru.roles,
				likes: [],
				favoritesPost: [],
			},
		};
	});

	return {
		id,
		name: `Олег ${n}`,
		slug: `oleg-${n}`,
		description: 'Норм Олег норм олег норм олег',
		price: 12 + n,
		images:
			'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=60',
		discount: n % 4,
		stock: 100 + n,
		wight: `${n} гр`,
		tags: ['Пиво'],
		isPublished: true,
		createdAt,
		updatedAt,
		categoryId: category.id,
		userId: user.id,
		likes,
		category,
		reviews,
		user,
	};
}

const DB: Product[] = Array.from({ length: 50 }).map((_, i) =>
	makeProduct(i + 1)
);

function sortProducts(items: Product[], sort: string | null) {
	if (sort === 'newest') {
		return [...items].sort(
			(a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
		);
	}
	if (sort === 'oldest') {
		return [...items].sort(
			(a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
		);
	}
	return items;
}

export const productHandlers = [
	// LIST: GET /products?sort=newest&perPage=6&searchTerm=...
	http.get('*/products', ({ request }) => {
		const url = new URL(request.url);

		const sort = url.searchParams.get('sort');
		const perPage = Number(url.searchParams.get('perPage') ?? '6');
		const searchTerm = (url.searchParams.get('searchTerm') ?? '').toLowerCase();

		let items = DB;

		if (searchTerm) {
			items = items.filter(
				(p) =>
					p.name.toLowerCase().includes(searchTerm) ||
					p.description.toLowerCase().includes(searchTerm)
			);
		}

		items = sortProducts(items, sort);

		const slice = items.slice(0, perPage);

		return HttpResponse.json(
			{
				products: slice,
				length: items.length,
			},
			{ status: 200 }
		);
	}),

	// DETAIL: GET /products/:id (RTK Query expects plain Product object, not wrapped)
	http.get('*/products/:id', ({ params }) => {
		const { id } = params as { id: string };

		const product = DB.find((p) => p.id === id || p.slug === id);

		if (!product) {
			return HttpResponse.json(
				{ message: 'Product not found', statusCode: 404 },
				{ status: 404 }
			);
		}

		return HttpResponse.json(product, { status: 200 });
	}),

	// Like endpoints (used by LikeButton and product detail)
	http.put('*/products/:id/likes', ({ params }) => {
		const { id } = params as { id: string };
		return HttpResponse.json(
			{
				like: { id: `like_added_${id}`, userId: 'u_mock_1', productId: id },
				message: 'Like set',
			},
			{ status: 200 }
		);
	}),

	http.delete('*/products/:id/likes', ({ params }) => {
		const { id } = params as { id: string };
		return HttpResponse.json(
			{
				product: {
					id: `like_deleted_${id}`,
					userId: 'u_mock_1',
					productId: id,
				},
				message: 'Like removed',
			},
			{ status: 200 }
		);
	}),
];
