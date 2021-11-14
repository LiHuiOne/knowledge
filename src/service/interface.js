import user from './userService.js'
import echart from './echartsService.js'
import menu from './menu.js'
export default {
    ...user,
    ...echart,
    ...menu
};
