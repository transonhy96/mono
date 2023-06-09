export const APP_CONFIG = {
    JWT_EXPIRED: 1 * 24 * 60 * 60 * 1000, // 1 day
}
export const dev = () => process.env.NODE_ENV !== 'production'