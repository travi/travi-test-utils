(function (travi) {
    'use strict';

    function float(max) {
        if (undefined === max || 0 > max) {
            max = 100;
        }

        return Math.random() * max;
    }

    function int(max) {
        return Math.floor(float(max));
    }

    function string(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            randomString = '',
            randomNumber,
            i;

        length = length || 8;
        for (i = 0; i < length; i += 1) {
            randomNumber = int(chars.length);
            randomString += chars.substring(randomNumber, randomNumber + 1);
        }

        return randomString;
    }

    travi.namespace('test.any', {
        int: int,
        float: float,
        string: string
    });
}(travi));