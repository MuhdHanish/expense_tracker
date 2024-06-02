import { type Context } from 'hono';

export const getDataFromContextByKey = <T>(c: Context, key: keyof Context['var']): T | undefined => {
    return c.var.hasOwnProperty(key) ? c.var[key] : undefined;
};

export const getUserId = (c: Context) => {
    const { user } = c.var;
    return user.id;
};