import { client } from '../redisClient';

import FAQ from '../models/FAQ';

const EXPIRE = 60 * 60 * 6; // 6 hours

export default async (faqList: FAQ[]): Promise<boolean> => client.setex('faq_list', EXPIRE, JSON.stringify(faqList));
