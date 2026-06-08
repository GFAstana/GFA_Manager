import type { TimeSlot } from '$lib/types';

export const timeSlots: TimeSlot[] = [
	{
		id: 's1',
		day: 'Понедельник',
		time: '10:00',
		direction: 'Долгий меч',
		hall: 'Зал А',
		defaultTrainerId: 't1'
	},
	{
		id: 's2',
		day: 'Понедельник',
		time: '18:30',
		direction: 'Рапира и кинжал',
		hall: 'Зал Б',
		defaultTrainerId: 't2'
	},
	{
		id: 's3',
		day: 'Вторник',
		time: '11:00',
		direction: 'Меч и щит',
		hall: 'Зал А',
		defaultTrainerId: 't3'
	},
	{
		id: 's4',
		day: 'Вторник',
		time: '19:00',
		direction: 'Вольное фехтование',
		hall: 'Ринг',
		defaultTrainerId: 't4'
	},
	{
		id: 's5',
		day: 'Среда',
		time: '10:00',
		direction: 'Сабля',
		hall: 'Зал Б',
		defaultTrainerId: 't5'
	},
	{
		id: 's6',
		day: 'Среда',
		time: '18:30',
		direction: 'Долгий меч',
		hall: 'Зал А',
		defaultTrainerId: 't1'
	},
	{
		id: 's7',
		day: 'Четверг',
		time: '17:30',
		direction: 'Рапира и кинжал',
		hall: 'Зал Б',
		defaultTrainerId: 't2'
	},
	{
		id: 's8',
		day: 'Пятница',
		time: '18:00',
		direction: 'Меч и щит',
		hall: 'Зал А',
		defaultTrainerId: 't3'
	},
	{
		id: 's9',
		day: 'Суббота',
		time: '11:00',
		direction: 'Вольное фехтование',
		hall: 'Ринг',
		defaultTrainerId: 't4'
	},
	{
		id: 's10',
		day: 'Суббота',
		time: '13:00',
		direction: 'Открытая тренировка HEMA',
		hall: 'Зал А',
		defaultTrainerId: 't5'
	}
];
