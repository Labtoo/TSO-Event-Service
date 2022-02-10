export interface IAdventure {
  name: string,
  icon: string,
  percent70: number,
  percent30: number,
  description: string,
  needToFinish?: string,
  loot?: string,
  guide?: IGuide[];
}

export interface IGuide {
  url: string;
  text?: string;
  icon?: string;
}

export const AdventureList: IAdventure[] = [
    {
      name: 'Aли2',
      icon: 'ali2',
      percent70: 7,
      percent30: 12,
      description: 'Наверное лучший прикл. Быстрый, хороший лут, быстро продается, не надо никого ждать.',
      guide: [
        {
          url: 'https://ru.tsomaps.com/adv-map/1001nightssecondthief/Ali_Baba_and_the_second_thief_gm_2sg_v_var_ans_ns_5g_2_fabcam_en.jpeg/1486/',
          text: 'Пример 1:'
        },
        {
          url: 'https://ru.tsomaps.com/adv-map/1001nightssecondthief/ali_baba_and_the_second_thief_gm_var_ns_gb_sg_5g_Adalon_ru.jpeg/1795/',
          text: 'Адалон:'
        }
      ],
    },
    {
      name: 'Лампа',
      icon: 'lampa',
      percent70: 6,
      percent30: 10,
      description: 'lorem ispum dolor'
    },
    {
      name: 'Порох',
      icon: 'powder',
      percent70: 3,
      percent30: 6,
      description: 'lorem ispum dolor'
    },
    {
      name: 'Грабители Могил',
      icon: 'gm',
      percent70: 5,
      percent30: 8,
      description: 'lorem ispum dolor'
    },
    {
      name: 'Вихрь',
      icon: 'vihr',
      percent70: 9,
      percent30: 16,
      description: 'lorem ispum dolor'
    },
    {
      name: 'Озеро',
      icon: 'lake',
      percent70: 7,
      percent30: 11,
      description: 'lorem ispum dolor'
    },
  ]
