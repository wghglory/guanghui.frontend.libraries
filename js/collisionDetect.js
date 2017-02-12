/**
 * square collisionDetect. 注意使用过程中排除自己。自己和自己是碰上的
 * @method collisionDetect
 * @param  {[node]}        obj1 [description]
 * @param  {[node]}        obj2 [description]
 * @return {[boolean]}             [collision returns true]
 */
function collisionDetect(obj1, obj2) {
    var L1 = obj1.offset().left;
    var R1 = obj1.offset().left + obj1.width();
    var T1 = obj1.offset().top;
    var B1 = obj1.offset().top + obj1.height();

    var L2 = obj2.offset().left;
    var R2 = obj2.offset().left + obj2.width();
    var T2 = obj2.offset().top;
    var B2 = obj2.offset().top + obj2.height();

    if (L1 >= R2 || R1 <= L2 || B1 <= T2 || T1 >= B2) {
        return false;
    } else {
        return true;
    }
}
