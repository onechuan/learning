(function (exports) {
    'use strict';

    function sum(num1, num2) {
        console.log("sum");
        return num1 + num2;
    }
    console.log(sum(1, 2));

    exports.sum = sum;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=bundle.js.map
