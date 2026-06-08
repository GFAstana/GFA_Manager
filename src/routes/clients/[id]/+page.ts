import { error } from '@sveltejs/kit';
import { getClientProfile } from '$lib/client-profile';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const profile = getClientProfile(params.id);
	if (!profile) error(404, 'Клиент не найден');
	return { profile };
};
