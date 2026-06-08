import { error } from '@sveltejs/kit';
import { getTrainerProfile } from '$lib/trainer-profile';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const profile = getTrainerProfile(params.id);
	if (!profile) error(404, 'Тренер не найден');
	return { profile };
};
