(function (travi) {
    'use strict';

    function restore(toRestore) {
        function restoreFunction(functionName) {
            if (functionName.restore) {
                functionName.restore();
            }
        }

        if ($.isArray(toRestore)) {
            $(toRestore).each(function () {
                restoreFunction(this);
            });
        } else {
            restoreFunction(toRestore);
        }
    }

    function assertObjectsHaveSameValues(expected, actual) {
        var key;

        for (key in expected) {
            if (expected.hasOwnProperty(key)) {
                assert.equals(expected[key], actual[key]);
            }
        }
    }

    function assertAjaxCallMadeWith(expected, actual) {
        this.assertObjectsHaveSameValues(expected, actual);
    }

    travi.namespace('test.common', {
        restore: restore,
        assertObjectsHaveSameValues: assertObjectsHaveSameValues,
        assertAjaxCallMadeWith: assertAjaxCallMadeWith
    });
}(travi));