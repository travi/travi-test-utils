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

    function stubGetTemplates() {
        sinon.stub(travi.templates, 'get', function () {
            var deferred = new $.Deferred(),
                promise = deferred.promise();

            deferred.resolve();

            return promise;
        });
    }

    function assertObjectsHaveSameValues(expected, actual) {
        for (var key in expected) {
            if (expected.hasOwnProperty(key)) {
                assertEquals(expected[key], actual[key]);
            }
        }
    }

    function assertAjaxCallMadeWith(expected, actual) {
        this.assertObjectsHaveSameValues(expected, actual);
    }

    travi.namespace('travi.test.common', {
        restore: restore,
        stubGetTemplates: stubGetTemplates,
        assertObjectsHaveSameValues: assertObjectsHaveSameValues,
        assertAjaxCallMadeWith: assertAjaxCallMadeWith
    });
}(travi));